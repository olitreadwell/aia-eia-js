# canada-ca/aia-eia-js context
> refreshed 2026-09-05 | upstream default: master @ b900dc7

## Identity & policies
- upstream: canada-ca/aia-eia-js, default branch master, primary language Vue/TS (bilingual EN/FR)
- English-first: yes (bilingual EN/FR, English primary)
- CLA/DCO: none
- AI-assisted PR policy: unstated (no ban, no disclosure requirement found in CONTRIBUTING or org)
- signed commits required: no
- PR template: none in repo or org (canada-ca/.github does not exist) -> use pipeline fallback body
- external tracker: github

## Conventions (verified from merged PRs)
- branch naming: maintainer uses long-lived `fourth-dadm-review-2025`; older fixes use `fix-<issue>` / `fix_<issue>_<desc>` (e.g. fix-1126-serviceId, fix_1066_3rdreview_questions)
- commit style: plain imperative, lowercase, often references issue number ("fix #1153", "workaround for issue #1148")
- test command: `npm run test:unit` (jest, 2 suites: store.spec.ts, Score.spec.ts)
- lint command: `npm run lint` (vue-cli-service lint; pre-existing auto-fix issues in ActionButtonBar.vue, TextResult.vue, RiskArea.ts, Home.vue, Results.vue)
- spellcheck: `npm run spellcheck:code`, `npm run spellcheck:questions`
- CI: ci.yml runs npm ci, lint, test:unit, spellcheck:code, spellcheck:questions on node 16

## Maintainer picture
- active maintainer: MrDeshaies (responds to issues, merges via fourth-dadm-review-2025 branch)
- repo last pushed 2025-10-03; recent activity is periodic DADM review merges
- maintainer actively works the survey content (fourth-dadm-review-2025) - avoid content edits

## Issue-area health
- #1148 (French missing on results for checkbox with same English) - open bug, maintainer applied a data workaround (added period to fr text) but root cause unfixed. Root cause: SurveyJS getLocaleText("fr") returns "" when fr == default, so choiceData.fr is empty -> blank on results page. Quiet area, no in-flight PR.
- #1155 (PDF export requires CSP unsafe-eval) - open bug, dependency upgrade, not attempted
- #1143 (Scoring updates for conditional questions) - open bug, complex survey logic, maintainer says still an issue
- #609 (PDF accessibility) - open bug, complex pdfmake/pdfkit internals, not tractable

## Gap ledger (dedupe - READ FIRST, never re-pick)
- 2026-09-05 issue #1148 (self-found root cause) - pr-opened - fixed choiceData.fr empty fallback in store.ts; regression test added

## Mined gaps (discovered, not yet attempted)
- 2026-09-05 tests/CI: repo has only 2 unit test suites; no test for MultiChoiceResult.vue getItemLabel locale path - status: proposed (component test needs vue-jest/deasync, not run locally)
