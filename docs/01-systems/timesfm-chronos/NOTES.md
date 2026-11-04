# TimesFM / Chronos (and general TSFMs) — research notes

**Question:** Can we take Google TimesFM or Amazon Chronos off the shelf and forecast financial returns?  
**Answer from literature:** No. Generic TSFMs fail on returns; finance-native pretraining helps but still rarely beats a tuned tree on fit.

**PDFs:**  
- `timesfm-revisiting-2511.18578.pdf` — *Revisiting Time Series Models in Finance*  
- `tsfm-finance-forecasting-2606.27100.pdf` — *Pretrained Time-Series Foundation Models for Financial Return Forecasting*

**Commentary:** Tim Frenzel summary — https://tim-frenzel.com/insights/re-visiting-time-series-foundation-models-in  
**Related models:** FinText HF org (finance-pretrained Chronos/TimesFM variants)

---

## Key numbers (Frenzel / 2511.18578 family)

Next-day excess return forecasting, large US universe, OOS ~2001–2023:

| Model | Approx OOS R² | Notes |
|---|---|---|
| Chronos-Large (long window) | **−1.37%** | Best of generic Chronos sizes still negative |
| TimesFM-500M | **−2.80%** | Directional accuracy below coin flip |
| CatBoost (reference tree) | **−0.10%** | “Unusable vs merely humble” |
| Finance-pretrained Chronos-Small @512d | **−0.59%** | Large uplift vs zero-shot; still behind tree on fit |

Economic “paper-frame” Sharpes in these papers are **gross comparative artifacts** (daily long-short, no costs). Use for **relative** ranking only.

### Fine-tuning generic weights

Fine-tuning off-the-shelf TSFMs on finance often **fails to close the gap** — the generic prior is a bias to unlearn, not a head start.

### From-scratch finance pretraining

Same architectures pretrained **only** on financial data recover most of the gap and can approach CatBoost on directional accuracy / paper Sharpe. Moat = **corpus + point-in-time hygiene**, not rented weights.

Short lookbacks (e.g. 5 days) make zero-shot Chronos catastrophic (R² ~ −77% in one reported setting). That is a warning for **intraday / post-event** seats.

---

## Second paper (2606.27100) — 5 liquid US names

Equalized context L=512, rolling-origin:

- TSFMs win many **MAE rankings** (Moirai-2.0, TimesFM-2.5, Chronos)  
- Skill vs random walk is **small and sparse**  
- Diebold–Mariano significance rare  
- Lesson: ranking well on MAE ≠ economically meaningful predictability  

---

## Implications for Lets Win

1. **Do not** use TimesFM/Chronos zero-shot as the XAUUSD/BTC signal model.  
2. Prefer **LightGBM/CatBoost** as Phase-1 baseline (matches Frenzel’s desk advice).  
3. If we want a foundation-model path, prefer **Kronos** (K-line native) or **finance-pretrained** Chronos/TimesFM (FinText), not Google/Amazon generic checkpoints.  
4. Always report **cost-adjusted expectancy**, not MAE rank alone.  

---

## Related reading

- Gu, Kelly, Xiu (2020): monthly OOS R² for best ML return models often ~**0.5%** — absolute predictability is tiny even for SOTA.  
- Rank IC / hit rate notes in `02-methodology/expectancy-risk/NOTES.md`
