# Research Collector — Lets Win Trading System

**Collected:** 2026-11-04  
**Purpose:** Ground-truth research dump for building a realistic multi-asset signal system (gold + crypto), not an 80%-win-rate fantasy.

## Short verdict

| Claim | Reality from sources |
|---|---|
| 80%+ directional accuracy on prices | Not realistic for liquid markets; usually leakage / overfitting / cost-blind eval |
| Useful edge | Small edge + RR + costs + selectivity beats high hit-rate theater |
| Best first model | LightGBM/XGBoost/CatBoost on point-in-time features |
| Where LLM fits | News / macro / narrative → structured features (not candle prediction) |
| Closest K-line foundation model | **Kronos** (AAAI 2026) — RankIC gains, not win rate |
| Off-the-shelf TimesFM/Chronos on returns | Fail (e.g. TimesFM R² ≈ −2.80%) |
| TradingAgents | Valuable architecture to study; results are short backtests, not live capital proof |

## Folder map

```
docs/
├── 00-index/          ← you are here
├── 01-systems/        ← per-project research notes
│   ├── tradingagents/
│   ├── kronos/
│   ├── timesfm-chronos/
│   ├── fingpt-finbert/
│   ├── qlib/
│   ├── finrl/
│   └── freqtrade/
├── 02-methodology/    ← validation, expectancy, leakage
├── 03-architecture/   ← recommended stack & phases
├── 04-papers/pdfs/    ← downloaded PDFs
├── 05-sources/        ← link dump
└── 06-notes/          ← master synthesis + original brief
```

## Start reading order

1. [`06-notes/MASTER_SYNTHESIS.md`](../06-notes/MASTER_SYNTHESIS.md)
2. [`03-architecture/RECOMMENDED_STACK.md`](../03-architecture/RECOMMENDED_STACK.md)
3. [`01-systems/kronos/NOTES.md`](../01-systems/kronos/NOTES.md)
4. [`01-systems/tradingagents/NOTES.md`](../01-systems/tradingagents/NOTES.md)
5. [`02-methodology/`](../02-methodology/)
6. PDFs in [`04-papers/pdfs/`](../04-papers/pdfs/)

## Downloaded PDFs (local)

| File | Topic |
|---|---|
| `tradingagents-2412.20138.pdf` | TradingAgents (arXiv) |
| `kronos-2508.02739.pdf` | Kronos extended arXiv |
| `kronos-aaai-39730.pdf` | Kronos AAAI proceedings |
| `fingpt-2306.06031.pdf` | FinGPT |
| `finbert-1908.10063.pdf` | FinBERT |
| `qlib-2009.11189.pdf` | Microsoft Qlib |
| `finrl-2011.09607.pdf` | FinRL |
| `timesfm-revisiting-2511.18578.pdf` | Revisiting TSFMs in finance |
| `tsfm-finance-forecasting-2606.27100.pdf` | Pretrained TSFMs for return forecasting |
