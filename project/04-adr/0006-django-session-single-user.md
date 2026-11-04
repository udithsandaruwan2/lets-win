# ADR-0006 — Django session auth for single operator

- **Status:** accepted
- **Date:** 2026-11-04
- **Deciders:** human (G3 approved 2026-11-04)
- **Supersedes:** none

## Context

G2 locked single-operator auth via Django session + one local user. Web is on Netlify (separate origin); API must support cookie/session or token carefully across origins.

## Decision

Use **Django’s session authentication** with **one superuser/operator account** created via manage.py. For Netlify → API cross-origin: configure CORS + CSRF trusted origins, or same-site reverse proxy later. No multi-tenant roles in v1. Telegram (Should) will use a bot token / API key separate from browser sessions when added.

## Alternatives

| Option | Why not chosen (for v1) |
|---|---|
| Netlify Identity | Splits identity from Django; more moving parts |
| JWT-only SPA | Extra complexity for one user |
| No auth | Rejected — NFR-003 |

## Consequences

**Positive**
- Matches Django defaults; fast to implement; G2-aligned

**Negative**
- Cross-origin cookie setup needs care on Netlify

**Neutral**
- Can add token auth for Telegram without changing session for UI

## Revisit if

- Multi-user product pivot
- Cookie/CORS pain exceeds JWT cost

## References

- G2 PRD FR-08 / Q2
- `project/rules/stack.md`
