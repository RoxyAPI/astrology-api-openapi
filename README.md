# Astrology API OpenAPI Specification

The OpenAPI 3.1 specification for the RoxyAPI astrology API: 258+ endpoints across 18+ insight domains on one API key, the data layer for insight apps. It covers Western astrology, Vedic astrology, forecast, human design, Chinese astrology, feng shui, Mesoamerican astrology, vastu, numerology, kabbalah, tarot, biorhythm, ayurveda, I-Ching, crystals, dreams, angel numbers and location.

The source of truth is the live spec at **https://roxyapi.com/api/v2/openapi.json**. The `openapi.json` in this repository is a copy refreshed every day by a GitHub Actions workflow, so a clone, a submodule or a raw file URL always tracks the current API.

## How do I generate an astrology API client from the OpenAPI spec?

Point any OpenAPI 3.1 generator at `openapi.json` (or the live URL). Each command below writes a client into `./client`.

TypeScript types ([openapi-typescript](https://openapi-ts.dev)):

```bash
npx openapi-typescript https://roxyapi.com/api/v2/openapi.json -o ./roxyapi.d.ts
```

Python, Go, C# and PHP ([OpenAPI Generator](https://openapi-generator.tech)):

```bash
npx @openapitools/openapi-generator-cli generate -i openapi.json -g python -o ./client
npx @openapitools/openapi-generator-cli generate -i openapi.json -g go -o ./client
npx @openapitools/openapi-generator-cli generate -i openapi.json -g csharp -o ./client
npx @openapitools/openapi-generator-cli generate -i openapi.json -g php -o ./client
```

## Prefer a typed SDK?

The official SDKs are generated from this same spec and published for each language, so there is nothing to generate by hand:

- TypeScript: [RoxyAPI/sdk-typescript](https://github.com/RoxyAPI/sdk-typescript)
- Python: [RoxyAPI/sdk-python](https://github.com/RoxyAPI/sdk-python)
- PHP: [RoxyAPI/sdk-php](https://github.com/RoxyAPI/sdk-php)
- .NET: [RoxyAPI/sdk-dotnet](https://github.com/RoxyAPI/sdk-dotnet)
- Go: [RoxyAPI/sdk-go](https://github.com/RoxyAPI/sdk-go)

## What does the astrology API cover?

One spec describes every domain, in this order:

1. Western Astrology
2. Vedic Astrology
3. Forecast
4. Human Design
5. Chinese Astrology
6. Feng Shui
7. Mesoamerican Astrology
8. Vastu
9. Numerology
10. Kabbalah
11. Tarot
12. Biorhythm
13. Ayurveda
14. I-Ching
15. Crystals and Healing Stones
16. Dreams
17. Angel Numbers
18. Location and Timezone

Natal charts, daily horoscopes, compatibility, birth-chart interpretations, Vedic kundli, dashas and panchang, human design bodygraphs, tarot spreads, numerology profiles and more all sit behind the same base URL. Positions come from the NASA JPL DE440 ephemeris, verified against NASA JPL Horizons.

## Is there an MCP server for the astrology API?

Yes. Every domain is also available as a Remote MCP server, so AI agents can call the same endpoints as tools. Setup for Claude, ChatGPT, Cursor and other clients: https://roxyapi.com/docs/mcp

## Where is the API reference and pricing?

- API reference with request and response examples: https://roxyapi.com/api-reference
- Plans and pricing: https://roxyapi.com/pricing

## How current is this spec?

The workflow in `.github/workflows/refresh-openapi.yml` fetches the live spec daily and commits `openapi.json` only when it changed, so the git history of that one file is the changelog of the API surface. Run it by hand from the Actions tab with the workflow dispatch button.

## What license applies?

The spec describes the RoxyAPI service. The MIT license in `LICENSE` covers this repository, meaning the copy of the spec and the workflow, and does not grant rights to the service itself. Copyright Roxy Labs.
