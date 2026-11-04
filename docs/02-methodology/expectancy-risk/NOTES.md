# Expectancy, win rate, RankIC, risk — research notes

## Why 80% directional accuracy is the wrong target

Financial returns are **noise-dominated**. Even strong academic ML models often show monthly OOS R² around **~0.5%** (Gu–Kelly–Xiu style results). Directional accuracy near 50–55% with good payoff can still be valuable; 80%+ on liquid bars almost always means:

- Label leakage / look-ahead  
- Overfit hyperparameters on the test window  
- Ignoring spread, commission, slippage  
- Measuring only an ultra-selective subset without reporting coverage  

### Better targets

1. **Calibrated probabilities** — when model says 65%, empirical win rate ≈ 65% (reliability diagram)  
2. **Positive expectancy after costs**  
3. **Controlled drawdown** + acceptable Sharpe / Sortino / Calmar  
4. **Selective coverage** — high hit rate *on traded subset* with most bars abstained, measured OOS  

---

## Expectancy math (keep this tattooed)

\[
E = (p_w \cdot \bar{W}) - (p_l \cdot \bar{L}) - \text{costs}
\]

With risk:reward **1:2** (lose 1R, win 2R):

- Break-even win rate ≈ **33%** before costs  
- **40–45%** win rate is already profitable if RR holds and costs are small vs R  

So chasing 80% is unnecessary if payoff asymmetry and selectivity are designed in.

---

## Rank IC vs hit rate vs P&L

| Metric | Measures | Limitation |
|---|---|---|
| **Rank IC** | Spearman corr of predicted vs realized ranks | Not trade P&L; cross-sectional by nature |
| **Pearson IC** | Linear corr of scores vs returns | Outlier-sensitive |
| **Hit rate / win rate** | % profitable trades or correct signs | Ignores magnitude |
| **Profit factor / expectancy** | Economic edge | Needs realistic costs |
| **Sharpe** | Risk-adjusted mean | Unstable in short samples (see TradingAgents SR~8) |

Kronos optimizes / reports **RankIC** — valuable for ranking systems, incomplete for single-asset scalp bots.

Rule of thumb: positive IC ⇒ hit rate only **slightly** above 50% under normality-like assumptions. Huge hit rates without huge IC are suspicious.

---

## Risk engine checklist (architecture layer 5)

- Volatility targeting / ATR position sizing  
- Daily loss limit  
- Max drawdown circuit breaker  
- News blackouts (NFP, FOMC, CPI)  
- Correlation caps across gold + crypto books  
- Max trades / day; cooldown after stop-outs  
- Never size from LLM confidence alone without calibration  

---

## Selective high-accuracy mode (meta-layer)

To get “high accuracy on a narrow set”:

1. Primary models emit \(p(\text{up})\), \(p(\text{down})\), regime  
2. Meta-model or thresholds require agreement + high confidence + favorable regime  
3. Else **abstain**  
4. Report: coverage %, win rate on traded, expectancy, max DD — all OOS  

Without coverage reporting, “92% accurate” is marketing.
