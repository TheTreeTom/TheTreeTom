# Preview scripts

This repository includes a small Node preview script to render the St. Johns templates and open them in your default browser.

Usage

- Install Node (if not already available).
- Run the landing preview:

  npm run preview:landing

- Run the newsletter preview (uses the sample draft in `content/drafts/`):

  npm run preview:newsletter

Notes

- The script uses simple placeholder substitution and a minimal markdown-to-HTML converter for quick previews only. It is not meant to be a production renderer.
- To preview a different draft, pass `--draft=path/to/draft.md` to the script (e.g., `node scripts/preview/render_preview.js --type newsletter --draft content/drafts/my-draft.md`).
