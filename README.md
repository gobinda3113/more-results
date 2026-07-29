# SERP100 – Google Search Results Per Page

A Chrome extension that lets you choose how many Google search results to show per page (up to 100).

## How It Works

Google removed the `&num=100` URL parameter in September 2025. That old hack no longer works. This extension uses the only remaining approach: silently fetching Google's own paginated result pages (`start=10, 20, 30...`) and merging the organic results into the current page.

## Research: Why `&num=100` Is Dead

| Source | Finding |
|---|---|
| Seobility (Oct 2025) | "Google Drops Support for &num=100 Parameter" |
| Morningscore (Feb 2026) | "Google has removed support for the &num=100 search parameter" |
| Refolk (May 2026) | "Google killed num=100 in September 2025" |
| Olostep (Jun 2026) | "num=100 is dead; you must paginate 10 results at a time" |
| SEO Sherpa (May 2026) | Confirmed disabled around Sep 10-14, 2025 |
| SERoundTable | Parameter no longer works reliably, often defaults back to 10 |

**The paginated fetch approach (this extension) is the only viable method** as of 2026.

## Reliability Concerns

Google changes their search results page DOM frequently. Known issues:

- CSS class names on result containers (`MjjYud`, `yuRUbf`, `VwiC3b`) change without notice
- `div.g` selectors stopped working as of March 2026 (confirmed by GitHub issue #27, foxhound project)
- The `a:has(h3)` structural selector used in this extension is more resilient but not guaranteed
- Google may rate-limit or CAPTCHA automated page fetches
- Cloned DOM nodes from other pages may have broken relative URLs or lazy-loaded content

## Fixes Applied

1. **manifest.json** – Fixed broken JSON syntax on `run_at` field (was `"document_idle"document_end"`)
2. **content.js** – Replaced fragile hardcoded CSS class selectors with structural `a:has(h3)`-based approach that dynamically identifies result containers regardless of Google's current class names

## Alternative: Custom Search Engine

Instead of this extension, you can set up a Chrome custom search engine with `&num=100` appended. This approach stopped working in September 2025 and is no longer a viable alternative.

## License

MIT
