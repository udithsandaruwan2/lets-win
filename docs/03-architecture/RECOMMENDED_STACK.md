# Recommended architecture (from research brief + collected evidence)

```
[1 DATA] → [2 FEATURES] → [3 SIGNAL MODELS] → [4 META-LAYER] → [5 RISK] → [6 OUTPUT]
                                  ↑                                              ↓
                         [7 BACKTEST / VALIDATION] ←——— [8 MONITORING & FEEDBACK]
```

---

## 1. Data layer

| Stream | Source ideas |
|---|---|
| Gold / forex OHLC | MT5 |
| BTC, ETH, XRP | ccxt / Binance |
| Crypto microstructure | funding, OI, liquidations, order book, on-chain flows |
| Macro | CPI, NFP, FOMC calendar; DXY; US yields & **real yields** (gold driver) |
| News / sentiment | vendor feeds + Gemini/FinBERT tagging |

All joins **point-in-time**.

## 2. Feature store

Technical indicators, realized/implied vol proxies, session/time features, cross-asset correlations. No future leakage. Versioned feature definitions.

## 3. Signal models (independent)

| Model | Job | Evidence |
|---|---|---|
| **LightGBM / XGBoost / CatBoost** | Primary directional / return rank baseline | Beats zero-shot TSFMs on returns (Frenzel / 2511.18578) |
| **Kronos** (fine-tuned) | Probabilistic K-line forecaster | AAAI 2026; RankIC-focused |
| **Regime detector** | Trend / range / high-vol gate | Standard quant practice |
| **LLM + RAG (Gemini)** | Structured news/macro features | TradingAgents pattern without price prediction |

## 4. Meta-layer

Second model / rules: combine signals + regime → **calibrated p** and **abstain** when low confidence. Main path to high accuracy on a **narrow trade set**.

## 5. Risk engine

Vol sizing, daily loss limit, max DD stop, news blackouts, correlation limits.

## 6. Output

Telegram / dashboard: entry, stop, target, confidence. MT5/freqtrade execution **after** paper proof.

## 7. Validation

Walk-forward + purged CV + realistic costs → 2–3 months paper.

## 8. Monitoring

Live vs backtest, drift, scheduled retrain.

---

## Phased build

| Phase | Scope |
|---|---|
| **1** | XAUUSD only: data pipeline, LightGBM, honest backtest |
| **2** | Regime detector + Gemini news/macro layer |
| **3** | Kronos + meta-layer |
| **4** | BTC, ETH, XRP + paper trade; optional freqtrade |

**Start one asset.** Gold ≠ crypto; separate models per asset class.

### Timeframe choice (open)

| | 5m scalp | 1H / 4H swing |
|---|---|---|
| Signal quality | Worse (noise + costs) | Generally better |
| Cost sensitivity | Extreme | More forgiving |
| Research recommendation | Harder first project | Prefer for Phase 1 |

---

## Compute

No cluster required. One GPU (or Colab/rental) for Kronos fine-tune; CPU fine for LightGBM. Spend effort on **data quality + validation**.

## Explicit non-goals

- Fine-tuning LLM to predict candles  
- Claiming 80% win rate on all bars  
- Blind trust of TradingAgents / FinRL published curves  
- Zero-shot TimesFM/Chronos as production signal  
