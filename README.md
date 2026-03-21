# yt-fixed

A Firefox extension that fixes YouTube the way it should have been built.

## What it does

- **Subscriptions as homepage** — navigating to youtube.com takes you straight to your subscriptions feed instead of the algorithm-driven home page
- **Shorts removed everywhere** — Shorts are hidden from search results, the sidebar, channel pages, and any shelf they appear in
- **No autoplay** — the autoplay toggle UI is removed
- **No end screen junk** — end screen cards and the suggested video overlay are hidden
- **No algorithm noise** — recommended shelves and promoted content in search results are removed

## Installation

This extension is not yet listed on addons.mozilla.org. To install it manually:

1. Download or clone this repo
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on**
4. Navigate to the repo folder and select `manifest.json`

Note: temporary add-ons are removed when Firefox restarts. For a permanent install without signing, use Firefox Developer Edition or Librewolf and set `xpinstall.signatures.required` to `false` in `about:config`.

## Files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration and permissions |
| `style.css` | Hides unwanted elements at page load before they render |
| `content.js` | Watches for dynamically injected elements and removes them |
| `redirect.js` | Background script that redirects youtube.com to subscriptions |

## Troubleshooting

YouTube updates its UI regularly and sometimes changes element names, which can cause some junk to slip through. If you notice something that should be hidden:

1. Right click the element → Inspect
2. Find the `ytd-` tag name wrapping it
3. Add it to the `SELECTORS_TO_REMOVE` array in `content.js`
4. Reload the extension in `about:debugging`

Pull requests welcome.

## Philosophy

YouTube's default experience is designed to maximize watch time, not user satisfaction. This extension strips it back to what most people actually want: their subscriptions, search, and nothing else pushing them toward content they didn't ask for.

## License
