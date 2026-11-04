# T-002 — Bootstrap React/Vite web + Netlify config

- **Milestone:** M1
- **Feature:** FEAT-008 (shell)
- **Size:** M
- **Risk:** low
- **Depends on:** none
- **Status:** todo

## Goal

`apps/web` Vite React app builds; Netlify config present; placeholder page loads.

## Context

- `.agents/profiles/web-react-vite-netlify.md`
- `apps/web/AGENTS.md`
- ADR-0007 (web on Netlify)

## Acceptance

- [ ] `npm`/`pnpm` install + dev server works
- [ ] Production build succeeds
- [ ] Netlify config file present for later deploy

## Out of scope

- Full signal UI (T-004)
- Auth wiring (T-003)

## Verification

```bash
# from apps/web — follow nested AGENTS.md build/dev
```
