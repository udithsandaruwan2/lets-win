# lets-win API

Django + DRF (Python-first). Local Postgres via Docker Compose on port **5434**.

```bash
docker compose up -d
cp .env.example .env   # if needed
uv sync
uv run python manage.py migrate
uv run python manage.py runserver
curl http://127.0.0.1:8000/api/health/
uv run pytest
```
