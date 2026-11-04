# ADR-0007 — Host API on a PaaS (Render)

- **Status:** accepted
- **Date:** 2026-11-04
- **Deciders:** human (G3 approved 2026-11-04)
- **Supersedes:** none

## Context

`apps/web` deploys to Netlify. `apps/api` needs a Python/Django host plus PostgreSQL. Personal scale; prefer managed ops over self-run Kubernetes.

## Decision

Deploy the Django API to **Render** with managed PostgreSQL and cron for management commands. Web stays on Netlify. No Kubernetes.

Web remains on **Netlify**; API is a separate origin (or later custom domain).

## Alternatives

| Option | Why not chosen (default) |
|---|---|
| Netlify Functions as primary API | Poor fit for long Django/ML jobs |
| Always-on home lab only | Fragile for paper window discipline |
| Multi-service K8s | Overkill for one operator |

## Consequences

**Positive**
- Managed DB/backups; cron support; matches split deploy tracks

**Negative**
- Vendor lock / cost; cold starts on free tiers may need paid instance for cron reliability

**Neutral**
- Promotion tracks still map `dev/backend` → staging, `prod/backend` → production

## Revisit if

- Cost exceeds comfort
- Need GPU on same host for Kronos (then separate GPU runner)

## References

- `project/03-architecture.md`
- layout-split-apps profile
