# T-003 — Session auth + CORS/CSRF for web↔API

- **Milestone:** M1
- **Feature:** FEAT-007
- **Size:** M
- **Risk:** medium
- **Depends on:** T-001, T-002
- **Status:** done

## Goal

Single operator can log in from the React app and call an authenticated API route.

## Acceptance

- [x] One operator user creatable via `manage.py ensure_operator`
- [x] Login/logout from web works against API (Vite `/api` proxy)
- [x] Unauthenticated operator routes return 401
- [x] CORS/CSRF documented (`apps/api/docs/AUTH.md`) + Docker compose stack

## Verification

```bash
cd apps/api && uv run pytest accounts/tests
cd apps/web && pnpm test && pnpm build
docker compose up --build
# open http://127.0.0.1:5173  user/pass: operator / operator
```
