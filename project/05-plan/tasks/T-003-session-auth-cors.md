# T-003 — Session auth + CORS/CSRF for web↔API

- **Milestone:** M1
- **Feature:** FEAT-007
- **Size:** M
- **Risk:** medium
- **Depends on:** T-001, T-002
- **Status:** todo

## Goal

Single operator can log in from the React app and call an authenticated API route.

## Context

- ADR-0006
- Spike S-002
- PRD FR-08

## Acceptance

- [ ] One operator user creatable via manage.py
- [ ] Login/logout from web works against API
- [ ] Unauthenticated operator routes return 401
- [ ] CORS/CSRF documented for local + Netlify↔Render origins

## Out of scope

- OAuth / Netlify Identity
- Telegram auth

## Verification

```bash
# API auth tests + manual login from web
```
