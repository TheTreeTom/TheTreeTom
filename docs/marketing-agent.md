# Marketing Agent — Design Doc

Status: Draft — created to capture discovery questions, a focused MVP, and next steps for implementation.

## Context
This repository currently only contains a profile `README.md`. This doc captures the minimal plan to build a marketing agent for `www.aditechusa.com` and includes the discovery checklist that must be completed before implementation.

> NOTE: Do not change `README.md` (profile README) without maintainer approval. See `.github/copilot-instructions.md` for contributor rules.

---

## Discovery checklist (Fill in answers before starting work)
- Primary goals (select up to 2): lead gen / content creation / SEO / paid ads / email nurture / other:
- Top KPIs to optimize/report (e.g., MQLs, conversion rate, open rate, CTR):
- CMS name (and whether read-access/credentials are available):
- Analytics: GA4 / Universal / none (do you have read access?):
- CRM: (e.g., HubSpot, Mailchimp, Salesforce) — access available?:
- Product feed or catalogue available? (yes/no):
- Channels to use (email / social / SMS / paid / other):
- Desired cadence (daily/weekly/monthly/triggered):
- Approvers for content (role or email):
- Prioritized integrations (top 2):
- Legal / compliance constraints (GDPR, CAN-SPAM, region-specific rules):
- Brand assets & templates location (style guide, tone, email templates):
- Preferred tech stack (Node / Python / serverless / container / no preference):


## Localization checklist (St. Johns County) 📍
- Canonical county name: **St. Johns County (FL)** — confirm spelling and postal conventions.
- Target cities / ZIPs: e.g., St. Augustine, Ponte Vedra Beach, 32080, 32092 (fill exact list).
- Local keywords & SEO phrases: e.g., "St. Johns County [service]", "St. Augustine [service]" — include in meta and H1.
- Local events / partners to monitor: county fairs, chamber events, school calendars.
- Local contact info & times: add county-specific address/phone in templates; use Eastern Time (ET).
- Assets: local photos, logos, testimonials (store under `assets/local/st-johns/`).
- CRM segment/tag: `st-johns-county`.
- PR / draft naming: `content/drafts/st-johns-YYYY-MM-DD.md`.
- Ads & geotargeting: restrict paid campaigns to St. Johns County + approved ZIPs; use county-level GA segments for reporting.

## Proposed MVP (goal: deliver value quickly)
1. Goal: Weekly newsletter draft generation and a simple campaign reporting dashboard.
2. Inputs:
   - Read-only access to CMS (site content) or a feed; optionally GA4 for top pages.
   - Brand copy + 1 email template.
3. Outputs:
   - A generated newsletter draft (Markdown or HTML) in a PR for manual review and approval.
   - A small report with top content stats (page views, CTR suggestions).
4. Human-in-the-loop: All content changes require manual approval before publication or send.


## Architecture (minimal, low-friction)
- Connector layer: scripts to fetch content (CMS API or site scraping if no API) and analytics (GA4) — run as serverless functions or scheduled jobs.
- Generator: a lightweight service (Node.js or Python) that composes newsletter drafts using templates and content signals.
- Storage: generated drafts as files under `content/drafts/` with metadata (source snippets, score, timestamp).
- Workflow: Scheduled job -> fetch content -> generate draft -> open PR / create draft issue for review -> on approval, push to scheduled send (if configured).


## Minimal repo scaffold
- docs/marketing-agent.md (this file)
- src/
  - connectors/ (cms, analytics, crm)
  - generators/ (template rendering, copy refinement)
  - workflows/ (schedulers, orchestrators)
- templates/ (email, social, report templates)
- content/drafts/ (draft outputs, metadata)
- tests/
- .github/workflows/ci.yml (lint, tests)


## Example automation: Weekly newsletter draft
1. Scheduler (weekly) triggers workflow.
2. Fetch top 10 pages from GA4 (or top pages from CMS if no analytics).
3. Extract summaries and headlines; select 3 highlight items.
4. Render `templates/newsletter.html` with selected items and an intro paragraph.
5. Create a draft file in `content/drafts/` and open a PR with the draft and a short report.
6. Reviewer edits/approves, then merge for publication or export to CRM/email platform.


## Security, compliance & operations
- Store all credentials in GitHub Secrets or a secure vault — do not commit secrets.
- Respect GDPR/CAN-SPAM: include unsubscribe links, only send to opt-in lists, log consent provenance.
- Manual approval gate required before any send or publish.
- Keep logs of generated content and approvals for audit.
- For local development, use `src/connectors/mock_cms.js`. Replace with a real CMS connector once credentials are available and add tests that mock network responses.


## First implementation tasks (approx. timeline)
1. (1–2 days) Discovery: collect answers to the checklist above and approve project scope.
2. (2–4 days) Scaffold repo and CI, add templates and a sample connector (read-only CMS or site scraper).
3. (3–7 days) Implement generator for newsletter draft, create PR automation to save drafts. (Added: a Node generator scaffold is available at `src/generator/index.js`.)
4. (2–4 days) Add GA4 connector and simple reporting.
5. (1–2 days) Set up credentials, secrets, and add manual approval workflow.
6. (ongoing) Iterate on templates, QA, and add additional integrations (CRM, ads).


## How to run locally
- Preview templates:
  - `npm run preview:landing`
  - `npm run preview:newsletter`
- Generate a draft locally (no PR):
  - `npm run generate:st-johns`
- Generate a draft and create a branch + PR (requires `gh` auth locally):
  - `node src/generator/index.js --pr`
- Tests:
  - `npm test` (requires `jest` installed in devDependencies)

## Connector setup (WordPress + GA4 placeholders)
- WordPress (optional): set the following repository secrets if you want to use a real WP instance:
  - `WP_API_URL` — base URL for the WordPress site (e.g., `https://example.com`)
  - `WP_API_KEY` — optional Bearer token / API key if the WP site requires auth
- GA4 (optional): set service account JSON as a secret (e.g., `GA4_SA_KEY`) and the property ID (`GA4_PROPERTY_ID`) to enable analytics-based selection
- The generator will prefer the WordPress connector when `WP_API_URL` is present; otherwise it uses `src/connectors/mock_cms.js` for local dev and tests.
- Do NOT commit credentials; use GitHub Secrets and document secret names in PRs when enabling production.


## Acceptance criteria
- A weekly job runs and produces a draft PR in the repo.
- A documented manual approval process exists and is used before publishing or sending.
- Minimal tests and CI pass for connectors and generators.


## Questions / Decisions for maintainers
- Preferred tech stack and runtime (Node/Python, serverless vs container)?
- Which integrations are highest priority (Mailchimp, HubSpot, GA4, etc.)?
- Who will serve as content approver(s) for week-one drafts?


---

If you want, I can: 1) open a PR with this doc and a small scaffold, 2) start implementing step (2) above, or 3) schedule a short discovery call (or message) to fill in the checklist answers.
3
