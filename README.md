# UoI Accessibility Suite

<p align="right">
  <strong>English</strong> · <a href="README.el.md">Ελληνικά</a>
</p>

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-brightgreen.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Firefox](https://img.shields.io/badge/Firefox-142%2B-orange.svg?logo=firefox)](https://addons.mozilla.org/firefox/)
[![Chromium](https://img.shields.io/badge/Chromium-supported-4285F4.svg?logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/)
[![Release](https://img.shields.io/github/v/release/vrallis/uoi-accessibility-suit)](https://github.com/vrallis/uoi-accessibility-suit/releases)

A browser extension (Firefox + Chromium, Manifest V3) that improves accessibility and usability on University of Ioannina web platforms.

---

## Features

### eCourse — Folder Expander
Expands Moodle folder contents **inline** on `ecourse.uoi.gr` — no new tab, no page reload. Each folder gets an expand button; the popup's **Expand All** button expands everything at once.

### MODIP — Layout & Accessibility Fixes
Applies layout corrections and accessibility improvements to questionnaires on `evaluate.modip.uoi.gr`:
- **Layout Fixes** — corrects visual alignment and display issues
- **Large Text & Numbers** — enlarges question numbers for readability

Both features are toggleable independently from the popup.

---

## Installation

### From a release (recommended)
1. Download the latest `.xpi` (Firefox) or `.zip` (Chromium) from [Releases](https://github.com/vrallis/uoi-accessibility-suit/releases).
2. **Firefox:** Drag the `.xpi` onto `about:addons`, or install via the Add-ons Manager.
3. **Chromium:** Go to `chrome://extensions`, enable Developer Mode, click **Load unpacked**, and select the extracted folder.

### From source
```sh
git clone https://github.com/vrallis/uoi-accessibility-suit.git
```
Then load the `src/` directory as an unpacked extension (see step 3 above for Chromium, or `about:debugging` → Load Temporary Add-on for Firefox).

---

## Usage

Click the extension icon on any supported page.

- **eCourse tab** — click **Expand All Folders** while on an `ecourse.uoi.gr` course page.
- **MODIP tab** — toggle Layout Fixes and Large Text & Numbers; changes apply instantly.
- **Language toggle** — switch between Greek (EL) and English (EN) in the popup footer.

---

## Supported Sites

| Site | URL |
|------|-----|
| eCourse (Moodle) | `https://ecourse.uoi.gr/*` |
| MODIP | `https://evaluate.modip.uoi.gr/*` |

---

## License

GNU General Public License v3.0 — see [LICENSE](LICENSE).

---

Made with ♥ by the [Orailab](https://github.com/orailab) team.
