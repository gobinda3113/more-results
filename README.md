# More Results - Increase Search Results

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-blue?logo=googlechrome)](https://chromewebstore.google.com/)
[![Firefox Add-on](https://img.shields.io/badge/Firefox-Addon-orange?logo=firefox)](https://addons.mozilla.org/)

Choose how many Google search results to show per page — 10, 20, 30, 40, 50, 60, 80, or 100.

No data collection. All settings stored locally. Works on all Google domains.

---

## Features

- **Toggle on/off** from the popup with one click
- **8 result options** — 10, 20, 30, 40, 50, 60, 80, or 100
- **Persistent** — remembers your preference across sessions (syncs via chrome.storage)
- **Lightweight** — no background processes, no tracking, no third-party code
- **Works everywhere** — google.com, google.co.uk, google.de, google.co.jp, etc.

## How It Works

Google disabled the `&num=100` URL parameter in September 2025. Instead, this extension fetches paginated result pages (`start=10, 20, 30...`) and merges organic results into the current page. All requests are `same-origin` — nothing is sent to third-party servers.

## Installation

### Chrome / Edge / Opera

1. Download from the [Chrome Web Store]() or load unpacked from source
2. Click the extension icon in the toolbar
3. Toggle on and select your preferred result count
4. Search on Google

### Firefox

1. Download from [Firefox Add-ons]() or load temporarily from `about:debugging`
2. Same usage as Chrome

## Permissions

| Permission | Why |
|------------|-----|
| `storage` | Saves your results-per-page setting across sessions |
| `host_permissions` (`google.com/search*`) | Fetches additional result pages to merge into the current page |

No personal data is collected, stored, or transmitted.

## Building from Source

No build step required. The extension is plain JavaScript (no bundler, no dependencies).

```
more-results/
├── manifest.json       # MV3 manifest
├── background.js       # Service worker (sets defaults on install)
├── content.js          # Injected into Google search pages
├── popup.html          # Popup UI
├── popup.js            # Popup logic
├── privacy.html        # Privacy policy
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
```

To load unpacked: open `chrome://extensions`, enable Developer mode, click "Load unpacked", select the folder.

## Browser Support

| Browser | Status |
|---------|--------|
| Chrome (MV3) | ✅ Supported |
| Edge (MV3) | ✅ Supported (same code) |
| Opera (MV3) | ✅ Supported (same code) |
| Firefox (MV3) | ✅ Supported |
| Safari | ❌ Not tested |

## Privacy

- No analytics
- No trackers
- No third-party requests
- No data collection
- All settings stored locally in `chrome.storage.sync`

Full privacy policy at [privacy.html](privacy.html).

## Known Limitations

- Google may rate-limit background fetches. If results stop loading, toggle the extension off and on, or wait a few minutes.
- Google changes their search page DOM periodically. The extension uses structural selectors (`a:has(h3)`) to stay resilient.

## License

MIT
