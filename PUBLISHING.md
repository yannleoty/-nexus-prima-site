# Publishing a new Nexus Prima Journal article

The site now has a permanent three-level structure:

1. `index.html` — Nexus Prima homepage
2. `journal/index.html` — publication library
3. `journal/<article-slug>/index.html` — individual publication

## Workflow

1. Duplicate the `article-template` folder.
2. Rename the duplicated folder using a lowercase URL slug, for example `the-adjacent-possible`.
3. Replace the title, subtitle, metadata, article body, references and image.
4. Add one publication card to `journal/index.html`.
5. Add the new URL to `sitemap.xml`.

The shared header, typography, mobile design, references layout and navigation already exist in `styles.css` and `script.js`. Future articles require content changes, not a new website design.
