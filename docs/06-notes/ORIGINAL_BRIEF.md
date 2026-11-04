# Original research brief (user)

> Preserved verbatim as the design north star that triggered this collector.

Short answer first: a system that is correct more than 80% of the time on price direction isn't realistic, and I'd design around a different target. Here's what exists, what I'd build, and why.

## About the 80% target

Markets are noise-dominated. Financial series have a low signal-to-noise ratio, unlike weather or energy data, so even good models get a small edge, not near-certainty. Claims of 80%+ accuracy almost always come from data leakage, overfitting, or ignoring spreads and slippage.

You don't need 80% to make money. With a 1:2 risk-reward ratio, a 40-45% win rate is already profitable. A better target is:

- **Calibrated probabilities**: when the model says 65%, it wins about 65% of the time.
- **Positive expectancy after costs**: spread, commission and slippage included.
- **Controlled drawdown** and a decent Sharpe ratio.

You can reach a high hit rate on a selective subset, where the system only signals when many things align and abstains most of the time. That should be measured out-of-sample, not assumed.

## Existing systems worth studying

- **TradingAgents** (UCLA/Tauric Research, open source). It uses specialized LLM agents, from fundamental, sentiment and technical analysts to a trader and a risk team, who debate to reach a decision. It is built on LangGraph and supports several providers, including Google and Anthropic models and local Ollama, so Gemini plugs in easily. It's explicitly a research tool. One reader on the paper's Hugging Face page questioned whether results that good were verified with real capital, and that's a fair question to ask of any such result.
- **Kronos** (Tsinghua, AAAI 2026). A foundation model pre-trained on over 12 billion candlestick records from 45 exchanges, covering crypto, forex and futures. It is the closest thing to what you described as a small model you could fine-tune. Note that its headline result is a RankIC improvement, which measures ranking quality, not win rate. The small and base models have a context length of 512 tokens.
- **General time-series models** (TimesFM, Chronos). One analysis reports that TimesFM scored a negative R² of -2.80% on financial data, so don't use them off the shelf.
- **FinGPT / FinBERT.** FinGPT used LoRA fine-tuning on about 50K finance samples. These are useful for news sentiment, not for predicting price.
- **Others to look at**: Microsoft Qlib (quant research platform), FinRL (reinforcement learning), and freqtrade (crypto bot framework).

## Recommended architecture

```
[1 DATA] → [2 FEATURES] → [3 SIGNAL MODELS] → [4 META-LAYER] → [5 RISK] → [6 OUTPUT]
                                  ↑                                              ↓
                         [7 BACKTEST / VALIDATION] ←——— [8 MONITORING & FEEDBACK]
```

**1. Data layer** — MT5 for gold/forex; ccxt/Binance for crypto; funding/OI/liquidations/order book/on-chain; macro calendar + DXY + real yields; news/sentiment.

**2. Feature store** — Technicals, vol, session/time, cross-asset; point-in-time only.

**3. Signal models** — LightGBM/XGBoost; Kronos fine-tuned; regime detector; LLM+RAG (Gemini) for structured news/macro features (not price prediction).

**4. Meta-layer** — Trust/abstain; calibrated probability; selective high accuracy.

**5. Risk engine** — Vol sizing, daily loss limits, max DD, news blackouts, correlation limits.

**6. Output** — Telegram/dashboard; MT5 automation later.

**7. Validation** — Walk-forward, purged CV, realistic costs, 2–3 months paper.

**8. Monitoring** — Live vs backtest, drift, retrain schedule.

## Practical notes

- No cluster needed; one GPU / Colab for Kronos.
- Don't fine-tune LLM to predict candles.
- Phases: XAUUSD LightGBM → regime+Gemini → Kronos+meta → crypto paper trade.
- Start with one asset; separate models per asset class.

Open question: gold 5m scalp vs 1H/4H swing? Prefer slower TF for Phase 1.
