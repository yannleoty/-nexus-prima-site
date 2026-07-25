# Nexus Prima — Journal System Final Build

Deployment-ready static website for `nexusprima.org`.

## Live structure

- `/` — original Nexus Prima homepage
- `/journal/` — Nexus Prima Journal library
- `/journal/mars-city/` — Article 001, “Mars City”

The homepage is not an article. It remains the institutional homepage and links to the Journal.

## Deploy

Upload the **contents of this folder** to the repository root while preserving the folders exactly as shown. In particular, do not move `journal/mars-city/index.html` to the repository root: the root `index.html` is the Nexus Prima homepage.

## Future articles

The Journal design is shared through `/styles.css`. To publish another article, duplicate the folder `journal/_publishing/article-template/`, rename it with the article slug, replace its content and image, then add one card to `journal/index.html`. No redesign of the homepage or Journal is required.
