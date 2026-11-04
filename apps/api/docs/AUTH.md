# Session auth (T-003)

## Local / Docker

1. Ensure operator exists: `uv run python manage.py ensure_operator`  
   Defaults: user `operator` / password `operator` (override via `DJANGO_SUPERUSER_*`).
2. Browser uses Vite **proxy** (`/api` → API) so cookies are same-origin on `:5173`.
3. Flow:
   - `GET /api/v1/auth/csrf/` → sets CSRF cookie, returns `{ csrfToken }`
   - `POST /api/v1/auth/login/` with JSON `{username,password}` + header `X-CSRFToken`
   - `GET /api/v1/auth/me/` / `GET /api/v1/operator/ping/` require session
   - `POST /api/v1/auth/logout/`

Unauthenticated operator routes return **401**.

## Netlify ↔ Render (later)

Set `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` to the Netlify origin. Prefer `SameSite=None; Secure` cookies only over HTTPS. Documented again in T-012.
