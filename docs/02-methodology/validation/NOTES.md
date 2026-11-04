# Validation protocol — research notes

**Primary reference:** López de Prado, *Advances in Financial Machine Learning* (purged CV, embargo, combinatorial purged CV)  
**Practical notes:** https://5x5x5x5.github.io/quant-lessons/backtest/purging-embargo/  
**Code sketch:** https://github.com/eslazarev/purged-cross-validation  

---

## Nested protocol we should use

### Outer loop — Walk-forward

- Expanding or sliding train window  
- Strictly future test window  
- Retrain on schedule (e.g. weekly/monthly)  
- Final story of “would this have worked through time?”

### Inner loop — Purged k-fold (+ embargo)

- Contiguous folds, **never** shuffled k-fold  
- **Purge:** drop train samples whose **label horizon** overlaps the test fold  
- **Embargo:** drop a buffer after the test fold to fight serial correlation leakage  
- Use for hyperparams / feature selection / thresholds  

### After modeling

1. Backtest with **realistic spread + commission + slippage** (asset-specific)  
2. Stress: wider spreads, delayed fills, missed stops  
3. **≥2–3 months paper trading** before real capital  
4. Live vs backtest monitoring + drift detection  

---

## Metrics to log every fold

- Hit rate, avg win/loss, expectancy, profit factor  
- Sharpe / Sortino / max DD / Calmar  
- Coverage (% bars traded) if selective  
- Calibration (reliability) of probabilities  
- Turnover and cost drag  
- Deflated / probabilistic Sharpe when many trials (multiple testing)

---

## Anti-patterns

| Bad | Why |
|---|---|
| Random k-fold on time series | Leakage across time |
| Same window for feature selection and final test | Selection bias |
| Optimize Sharpe on 3 months of LLM decisions | Noise + cost; see TradingAgents |
| Ignore embargo with overlapping triple-barrier labels | Label leakage |
| Report only best seed | Non-determinism (esp. LLM agents) |

---

## Paper trading gate

Ship to paper when:

- Walk-forward expectancy > 0 after costs on primary asset  
- Max DD within risk budget in OOS  
- No unexplained gap between CV and walk-forward  
- Ops: alerts, kill switch, logging ready  

Only then consider MT5 / freqtrade live with tiny size.
