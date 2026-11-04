# Quick comparison matrix

| System | Type | Predicts price? | Open weights/code | Live trading | Honest use case |
|---|---|---|---|---|---|
| TradingAgents | Multi-agent LLM | Indirect (decisions) | Code yes | No (research) | News/debate workflow |
| Kronos | K-line foundation model | Yes (forecast / RankIC) | Yes (mini/small/base) | No | Fine-tune probabilistic candles |
| TimesFM | General TSFM | Yes | Yes | No | Not for returns zero-shot |
| Chronos | General TSFM | Yes | Yes | No | Not for returns zero-shot |
| FinBERT | Sentiment classifier | No | Yes | N/A | Headline sentiment feature |
| FinGPT | FinLLM + LoRA recipes | No (sentiment/tasks) | Yes | N/A | Domain NLP fine-tunes |
| Qlib | Quant research platform | Via your models | Yes | Limited / research | Experiment harness |
| FinRL | DRL research | Policy actions | Yes | Research-oriented | Late-stage RL experiments |
| freqtrade | Crypto bot | Via strategy/FreqAI | Yes | Yes (CEX) | Crypto paper/live execution |
| LightGBM (ours) | Tabular GBDT | Yes | Yes | Via our stack | **Phase-1 baseline** |

## Metric literacy

| If someone says… | Ask… |
|---|---|
| 80% accuracy | On which bars? Coverage? Costs? OOS period? |
| High Sharpe | Sample length? Deflated for trials? Live or BT? |
| RankIC +90% relative | Absolute RankIC? Cross-section size? vs win rate? |
| Beat Buy&Hold | Same volatility? Same costs? Same window cherry-pick? |
