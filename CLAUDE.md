# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Browser extension (Firefox + Chromium, Manifest V3) merging two UoI accessibility tools:
- **E-Course Folder Expander** — inline folder expansion on `ecourse.uoi.gr`
- **MODIP Fix** — layout + accessibility fixes on `evaluate.modip.uoi.gr`

No build system. The `src/` directory **is** the extension — load it directly in the browser.

## Loading the extension locally

**Chrome/Chromium:** `chrome://extensions` → Enable Developer mode → Load unpacked → select `src/`

**Firefox:** `about:debugging` → This Firefox → Load Temporary Add-on → select `src/manifest.json`

## Releasing

Push a `v*` tag. GitHub Actions zips `src/` into `.xpi` (Firefox) and `.zip` (Chromium) and creates a GitHub release.

```sh
git tag v1.0.1
git push origin v1.0.1
```

## Architecture

```
src/
  manifest.json           # MV3 manifest — host permissions, content_scripts
  modules/
    ecourse/
      content.js          # Injected on ecourse.uoi.gr — folder expansion logic
      content.css         # Styles for injected folder UI
    modip/
      content.js          # Injected on evaluate.modip.uoi.gr — layout/a11y fixes
      content.css         # CSS overrides for MODIP
  popup/
    popup.html            # Tabbed UI (240px wide), all styles inline
    popup.js              # Tab switching, language toggle, chrome API calls
  assets/icons/           # icon-16/48/128.png
  _locales/el|en/
    messages.json         # i18n strings for content scripts (chrome.i18n)
```

### Module isolation

Each module under `modules/` is fully self-contained — no cross-module imports. Communication with the popup:
- **ecourse**: `chrome.runtime.onMessage` — popup sends `{ action: 'expandAll' }`
- **modip**: `chrome.storage.local` — popup writes `{ layoutFix, a11yFix }`, content.js listens via `chrome.storage.onChanged`

Adding a new site = new `src/modules/<site>/` folder + new tab panel in popup + new `content_scripts` entry in manifest.

### Localization split

There are **two i18n systems** in play:
- `_locales/*/messages.json` + `chrome.i18n.getMessage()` — used by content scripts (ecourse reads `loadingText`, `noFilesMessage`, `errorMessage`, `expandButtonLabel`)
- `STRINGS` object in `popup.js` — used by the popup UI; language stored in `chrome.storage.local` key `lang`, toggled at runtime

These are separate — popup strings do **not** use `chrome.i18n`.

### chrome.storage keys

| key | owner | values |
|-----|-------|--------|
| `layoutFix` | MODIP | `true`/`false` (default `true`) |
| `a11yFix` | MODIP | `true`/`false` (default `true`) |
| `lang` | popup | `'el'` / `'en'` (default: browser UI language) |
