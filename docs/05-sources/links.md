# Source links (canonical)

## Papers / arXiv

| Project | Link |
|---|---|
| TradingAgents | https://arxiv.org/abs/2412.20138 · https://arxiv.org/pdf/2412.20138.pdf |
| TradingAgents HTML | https://arxiv.org/html/2412.20138 |
| Kronos arXiv | https://arxiv.org/abs/2508.02739 · https://arxiv.org/pdf/2508.02739.pdf |
| Kronos AAAI | https://ojs.aaai.org/index.php/AAAI/article/view/39730 · PDF download `/article/download/39730/43691` |
| FinGPT | https://arxiv.org/abs/2306.06031 |
| FinBERT | https://arxiv.org/abs/1908.10063 |
| Qlib | https://arxiv.org/abs/2009.11189 |
| FinRL | https://arxiv.org/abs/2011.09607 |
| Revisiting TSFMs in finance | https://arxiv.org/abs/2511.18578 |
| Pretrained TSFMs for returns | https://arxiv.org/abs/2606.27100 |
| LambdaRankIC (Rank IC) | https://arxiv.org/html/2605.00501 |

## GitHub / code

| Project | Link |
|---|---|
| TradingAgents | https://github.com/TauricResearch/TradingAgents |
| Kronos | https://github.com/shiyu-coder/Kronos |
| FinGPT | https://github.com/AI4Finance-Foundation/FinGPT |
| FinNLP | https://github.com/AI4Finance-Foundation/FinNLP |
| Qlib | https://github.com/microsoft/qlib |
| FinRL | https://github.com/AI4Finance-Foundation/FinRL |
| freqtrade | https://github.com/freqtrade/freqtrade |
| purged-cross-validation | https://github.com/eslazarev/purged-cross-validation |

## Hugging Face / models

| Model | Link |
|---|---|
| Kronos-mini / small / base | https://huggingface.co/NeoQuasar |
| ProsusAI FinBERT | https://huggingface.co/ProsusAI/finbert |
| FinText (finance-pretrained Chronos/TimesFM) | https://huggingface.co/FinText |
| TradingAgents paper page | https://huggingface.co/papers/2412.20138 |

## Analysis / commentary

| Source | Link | Why it matters |
|---|---|---|
| Tim Frenzel — TSFMs in finance | https://tim-frenzel.com/insights/re-visiting-time-series-foundation-models-in | TimesFM −2.80% R²; CatBoost still strong |
| SoloSoft TradingAgents audit | https://www.solosoft.dev/post/tradingagents-116096-stars-lookahead-audit/ | Sharpe 8.21 skepticism; look-ahead audit |
| DEV: TradingAgents cost anatomy | https://dev.to/itxtayab/tradingagents-by-tauric-research-a-trading-firm-of-12-llm-agents-and-what-one-decision-costs-4dfa | LLM call costs, PIT data notes |
| Quant Memo — Rank IC vs Pearson IC | https://quantmemo.com/concepts/rank-ic-versus-pearson-ic | Metric literacy |
| Micro Alphas — hit rate | https://microalphas.com/glossary/hit-rate/ | Win rate ≠ profitability |
| Quant Lessons — purge/embargo | https://5x5x5x5.github.io/quant-lessons/backtest/purging-embargo/ | Lopez de Prado CV |
| IBKR — CV in finance | https://www.interactivebrokers.com/campus/contributors/cross-validation-in-finance-purging-embargoing-combination/ | Purge + embargo overview |
| Framework comparison | https://autotradelab.com/blog/nautilus-vs-vectorbt-vs-freqtrade-20-python-quant-trading-frameworks-compared | Qlib/FinRL/freqtrade roles |
| Kronos live demo | https://shiyu-coder.github.io/Kronos-demo/ | BTC demo |
| FinRL site | https://www.finrl.ai/ | RL platform |
| freqtrade docs | https://www.freqtrade.io/en/stable/ | Crypto bot |
| Tauric | https://tauric.ai | TradingAgents org |

## Data / tooling (build stack)

| Tool | Role |
|---|---|
| MetaTrader 5 Python API | Gold / forex prices & later execution |
| ccxt / Binance | BTC, ETH, XRP OHLCV + extras |
| LightGBM / XGBoost / CatBoost | Primary tabular signal models |
| LangGraph | Agent orchestration (TradingAgents pattern) |
| Gemini / Google GenAI | News/macro RAG features (via Netlify AI Gateway or direct) |
