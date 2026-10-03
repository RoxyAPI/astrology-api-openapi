#!/usr/bin/env bun
/**
 * Regenerates the README regions from the committed `openapi.json`:
 *   - `<!-- BEGIN:DOMAINS -->` the numbered domain list, in spec tag order.
 *   - `<!-- BEGIN:ENDPOINTS -->` the operation count, rendered as `N+`.
 *
 * A tag is a domain when its path segment has a Remote MCP server, read by a
 * `tools/list` on `https://roxyapi.com/mcp/{slug}`: 200 is a domain, 404 is an
 * account or utility tag. Anything else fails the run, as does a tag spanning two
 * path segments or a missing marker.
 *
 * Run with: bun scripts/sync-readme.ts
 */
import { readFileSync, writeFileSync } from 'node:fs';

type Spec = {
	tags?: { name: string }[];
	paths?: Record<string, Record<string, { tags?: string[] }>>;
};

function fail(message: string): never {
	console.error(`sync-readme: ${message}`);
	process.exit(1);
}

async function hasMcpServer(slug: string): Promise<boolean> {
	const url = `https://roxyapi.com/mcp/${slug}`;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json, text/event-stream',
		},
		body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
	});
	if (res.status === 404) return false;
	if (!res.ok) fail(`${url} answered ${res.status}`);
	return true;
}

const spec = JSON.parse(readFileSync('openapi.json', 'utf-8')) as Spec;
const operations = Object.entries(spec.paths ?? {}).flatMap(([path, methods]) =>
	Object.values(methods).map((op) => ({ path, tag: op.tags?.[0] })),
);

const domains: string[] = [];
for (const { name } of spec.tags ?? []) {
	const segments = new Set(
		operations.filter((o) => o.tag === name).map((o) => o.path.split('/')[1]),
	);
	if (segments.size !== 1)
		fail(`tag "${name}" spans ${segments.size} path segments, expected one`);
	if (await hasMcpServer([...segments][0] as string)) domains.push(name);
}
if (!domains.length) fail('no domain tags found');

function replaceRegion(text: string, marker: string, content: string): string {
	const begin = `<!-- BEGIN:${marker} -->`;
	const end = `<!-- END:${marker} -->`;
	const from = text.indexOf(begin);
	const to = text.indexOf(end);
	if (from === -1 || to < from) fail(`README.md is missing ${begin} or ${end}`);
	return text.slice(0, from + begin.length) + content + text.slice(to);
}

let readme = readFileSync('README.md', 'utf-8');
readme = replaceRegion(
	readme,
	'DOMAINS',
	`\n${domains.map((d, i) => `${i + 1}. ${d}`).join('\n')}\n`,
);
readme = replaceRegion(readme, 'ENDPOINTS', `${operations.length}+`);
writeFileSync('README.md', readme);

console.log(
	`sync-readme: ${domains.length} domains, ${operations.length} endpoints`,
);
