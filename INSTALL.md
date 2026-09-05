# Nexus Prima — Phase 3

This update adds Earth → Solar System → Galactic → Universal between the introduction and the six pillars. Scroll down to advance; scroll up to reverse. The four chapter buttons move to a horizon, and “Continue to the pillars” skips the journey.

## Install on GitHub

1. Save `nexus-prima-phase-3.zip` to the Files app. Tap it to extract the folder.
2. Open `yannleoty/-nexus-prima-site` on GitHub, on `main`.
3. In the main repository folder, beside the existing `index.html` and `favicon.svg`, choose **Add file → Upload files**. On iPhone, choose **Browse** to select the extracted files from the Files app, preserving their names and formats.
4. Upload `index.html` and **all eleven files whose names begin with `np-`** together. This replaces the current HTML and adds the matching image and animation files. The twelve website files belong at the same level; no new folder is needed.
5. Commit the upload. After GitHub Pages completes the deployment, reload https://nexusprima.org/ and scroll below the introduction.

The existing legal/privacy folders, favicon, domain settings, manifest and other repository files remain in place. The older image files may remain; this version uses the new WebP copies.

If using GitHub's text editor for `index.html`, first upload all eleven `np-` files, then replace the complete contents of `index.html` with `index-phase-3.txt`, supplied separately. The text copy and `index.html` contain exactly the same code.

## Website files

- `index.html`
- `np-motion.min.js`
- `np-horizon-earth.webp`
- `np-horizon-solar.webp`
- `np-horizon-galaxy.webp`
- `np-horizon-universe.webp`
- `np-civilisation.webp`
- `np-ai.webp`
- `np-energy.webp`
- `np-space.webp`
- `np-biotechnology.webp`
- `np-consciousness.webp`

`INSTALL.md` and `ARTWORK.md` are reference notes and do not need uploading.

## Behaviour and checks

- Horizontal artwork at every screen size; side-by-side text and images on desktop, stacked on mobile.
- Native page scrolling, with a sticky scene and GSAP ScrollTrigger controlling zooms and crossfades.
- No video, framework, build step, external CDN or server needed.
- Reduced-motion settings, missing animation scripts, unavailable artwork, or insufficient screen height retain a readable static sequence. Slow-loading scenes are not stacked until decoded. If someone reaches the cards before they are ready, the static view remains to avoid moving the content they are reading.
- The animation adapts to orientation changes. Enlarged text or short landscape screens may intentionally use the static version.
- The Universal frame adds faint red connections to express an imagined network, not observed links between civilisations.
- All ten images total 1,111,430 bytes. The original five selected landscape uploads and the existing cropped AI image were encoded as WebP; the new four astronomical illustrations were generated and encoded as WebP.
- Completed checks: JavaScript syntax, structured metadata, local image/script references, unique IDs, anchor targets, four stages, six original pillar texts, and identical HTML/text copies.
- A live browser/device test of this new version has not been performed. After deployment, check forward/reverse scrolling, the four chapter buttons, the skip link, the phone menu and the reduced-motion setting on your iPhone.

## Animation library

`np-motion.min.js` bundles GSAP and ScrollTrigger 3.15.0 from the official `greensock/GSAP` repository. Original copyright and license notices are retained in the bundle. License: https://gsap.com/standard-license/

The public website has not been changed by preparing this package.
