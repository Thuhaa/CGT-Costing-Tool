# CGT Costing Site

A static, three-page site for estimating the cost of implementing the Care Georeferencing Tool (CGT). Built on Bulma (loaded from CDN), no build step, deploys straight to GitHub Pages.

## Pages

- **index.html** — Client-facing investment estimator. Context inputs, three packages, indicative ranges, deliverables, the seven-phase journey, five-year cost view, and an info modal on each field.
- **faq.html** — Frequently asked questions: what the CGT is, what drives the cost, and what each package includes.
- **internal.html** — Internal estimating view (NOT linked from the public navbar). Full mechanics: editable day rate, person-days, effort by phase, cost composition and exact figures. For UNDP estimating and calibration.

## Shared files

- **cgt.css** — CGT palette + Bulma overrides + bespoke component styles.
- **costing.js** — The cost model, formatting helpers, chart and modal logic. Edit the constants here to recalibrate.

## Important notes

- All cost figures are **illustrative placeholders**. Calibrate the baselines and multipliers in `costing.js` against real Bhutan and Malaysia implementation costs before using these numbers in proposals.
- `internal.html` is unlinked but **still publicly reachable** by anyone who knows the URL, since GitHub Pages serves the whole repo. It is not secured; do not put anything truly confidential here.

## Deploy to GitHub Pages

1. Create a public repo (e.g. `cgt-costing`) and upload all five files (and this README) to the root.
2. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
3. After a minute, the site is live at `https://<username>.github.io/cgt-costing/`.
4. The client page is the homepage (`index.html`). The internal page is at `.../internal.html`.

## Recalibrating costs

Open `costing.js`. The key things to adjust:
- `PHASES[].base` — baseline person-days per phase for a reference implementation.
- `M` — multipliers for area, population, terrain, data, categories, and service tiers.
- `DATA_ACQ`, `SUPPORT_RECUR` — non-labour and recurring support costs.
- `RATE_DEFAULT` — the blended day rate used on the client page (hidden from clients).
