# More Results - Increase Search Results

A Chrome extension that lets you choose how many Google search results to show per page (up to 100).

Choose from 10, 20, 30, 40, 50, 60, 80, or 100 results per page via the popup. Toggle on/off anytime.

## How It Works

Google removed the `&num=100` URL parameter in September 2025. This extension silently fetches Google's paginated result pages (`start=10, 20, 30...`) and merges the organic results into your current page.

## Files

- `manifest.json` – Extension manifest (MV3)
- `background.js` – Service worker (sets defaults on install)
- `content.js` – Injected into Google search pages (fetches & merges results)
- `popup.html` / `popup.js` – Popup UI (toggle + result count selector)
- `icons/` – 16/32/48/128 PNG icons
- `privacy.html` – Privacy policy page

## License

MIT
