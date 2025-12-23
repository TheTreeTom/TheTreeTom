# Copilot instructions for TheTreeTom repository

**Status:** Minimal repository — currently contains only `README.md` (profile README). No code, CI, or clear build steps exist yet.

## Goal
Help contributors (and AI coding agents) be immediately productive by: 1) asking targeted discovery questions, 2) making safe, small scaffolding changes only with explicit consent, and 3) documenting any conventions introduced.

## High-level rules ✅
- This is a profile repository (`README.md` appears on the GitHub profile). **Do not** change public-facing content (the profile README or website) without maintainer approval. See `README.md` for the current content.
- If you need to add code, first ask the maintainer: preferred language, package manager, CI requirements, branch policy, and hosting/deployment details.
- Keep changes small, self-contained, and well-documented. Use an explanatory commit message and open a PR for review.

## Discovery checklist (always ask these before implementing):
- What language / framework should I use (Node/Python/Go/etc.)?
- What are the build/test commands and CI expectations?
- Are there any existing infra secrets, hosting, or deployment targets I should know about?
- Who should review PRs and what is the merge policy (squash/merge/master/main)?

## Safe scaffolding actions (only after explicit approval) 🔧
- Create a minimal project layout: `src/`, `tests/`, `.gitignore`, and a small README section describing build/test commands.
- Add one small, focused unit test with the chosen test framework.
- Add a simple CI workflow under `.github/workflows/ci.yml` that runs the project's tests.
- Use branch naming `agent/<short-description>` and include a PR body that explains intent and manual verification steps.

### Example PR body
- What changed: short summary
- Why: reason and maintainer-request (if any)
- How to test: exact commands to run locally
- Checklist: tests added, README updated, CI passes

## Project-specific patterns and notes 📌
- Current repo contains only `README.md` with the note: "TheTreeTom/TheTreeTom is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile." Avoid editing this without sign-off.
- No package manifests, scripts, or workflows were found — assume none exist until added and documented.

## Integration & external dependencies
- There are no discoverable integrations or external services configured — request API keys, deployment targets, and analytic endpoints before building integrations (e.g., marketing automation, site scraping).

## Marketing agent / `www.aditechusa.com` — discovery & MVP checklist 🧭
If asked to build a marketing agent for aditechusa.com, start by asking:
- Primary goals (lead gen, content creation, SEO, paid ad automation, email nurture, etc.)
- Data sources available (site CMS, Google Analytics, CRM, product catalog, current marketing assets)
- Access & credentials available for integrations (CMS, Google, email provider, analytics)
- Allowed channels and frequency (email, socials, paid ads) and legal constraints (CAN-SPAM, GDPR)

MVP steps (after approval):
1. Create a small design doc with goals, KPIs, and required integrations.
2. Prototype content templates and sample workflows (email/SMS/social posts) using real site copy.
3. Build connectors to data sources (read-only first) and demonstrate one automated workflow (e.g., weekly newsletter draft draft generation).
4. Add monitoring and metrics collection (open rate, CTR, conversions) and a manual approval step before outbound sends.

## When in doubt
- Ask maintainers before making public-facing or production changes.
- If documentation is missing, add a `docs/` or `README.md` section describing how to run, test, and release.

---
If you'd like, I can: 1) open a PR with this file, 2) start a scaffold (after your language/CI preferences), or 3) begin discovery for the marketing agent (I listed the questions above). Please tell me which you'd like next.