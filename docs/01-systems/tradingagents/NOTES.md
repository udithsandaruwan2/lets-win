# TradingAgents — research notes

**Org:** UCLA / MIT / Tauric Research  
**Paper:** Xiao, Sun, Luo, Wang — *TradingAgents: Multi-Agents LLM Financial Trading Framework* (arXiv:2412.20138)  
**Code:** https://github.com/TauricResearch/TradingAgents  
**PDF:** `docs/04-papers/pdfs/tradingagents-2412.20138.pdf`  
**Status:** Explicitly **research-only**, not trading advice.

---

## What it is

A multi-agent LLM trading firm simulation built on **LangGraph**. Specialized agents gather evidence, debate, then a trader + risk team produce a decision.

### Agent graph (high level)

1. **Analyst team** (parallel): market/technical, sentiment/social, news, fundamentals  
2. **Research team**: Bull vs Bear debate → Research Manager plan  
3. **Trader**: synthesizes plan into action  
4. **Risk team**: aggressive / neutral / conservative debate  
5. **Portfolio / Fund manager**: final approval  

Communication mixes **structured reports** (to avoid “telephone effect”) with **natural-language debates** for bull/bear and risk.

### LLM routing

- **Quick models** (e.g. gpt-4o / mini class): retrieval, summarization, most agent turns  
- **Deep models** (reasoning class): research manager, portfolio manager, heavy analysis  
- Providers supported in repo: OpenAI, Google (Gemini), Anthropic, xAI, DeepSeek, Qwen, GLM, MiniMax, OpenRouter, Ollama, Azure, etc.  
- Python ≥ 3.11; LangGraph + langchain-*; yfinance, stockstats  

### Useful API shape

```python
from tradingagents.graph.trading_graph import TradingAgentsGraph
from tradingagents.default_config import DEFAULT_CONFIG

ta = TradingAgentsGraph(debug=True, config=DEFAULT_CONFIG.copy())
state, decision = ta.propagate("NVDA", "2026-09-01")
ta.save_reports(state, "NVDA")
```

---

## Claimed results (paper)

Backtest window roughly **2024-01-01 → 2024-03-29** on mega-cap tech (AAPL, NVDA, MSFT, META, GOOG).

Reported (order of magnitude from paper text):

- Cumulative returns ~**23–27%** over ~3 months on sampled stocks  
- Sharpe ratios reported as high as **~5.6–8.2**  
- Beats simple rule baselines: Buy&Hold, MACD, KDJ+RSI, ZMR, SMA  

Authors’ own footnote: Sharpe above ~3 is “excellent”; their highest SR **exceeds their expected empirical range**. They attribute it to few pullbacks in the short window and say they report numbers faithfully. That is a red flag for small-sample SR, not proof of durable edge.

Cost note from paper: ~**11 LLM calls + 20+ tool calls per prediction** — expensive to extend the backtest.

---

## Skepticism (must keep)

| Source | Point |
|---|---|
| Hugging Face paper comments | Results look too good; leakage / pretraining window concerns raised by readers |
| SoloSoft audit (2026) | High SR on ~61 sessions has huge SE; changelog shows multiple look-ahead fixes after paper claims; some feeds return uncertainty stubs on historical dates |
| DEV anatomy | Backtests multiply API cost quickly; not all data feeds are truly point-in-time |
| Repo disclaimer | Performance varies; non-deterministic; **not** investment advice |

**Takeaway for us:** Steal the **workflow** (analyst → debate → risk → abstain/act), not the headline Sharpe. Any Gemini/LangGraph layer should output **structured features + confidence**, not raw “buy because GPT said so.”

---

## What to reuse for Lets Win

- Multi-role decomposition: fundamentals / news / sentiment / technical as **feature producers**  
- Bull/Bear + risk debate as optional **meta-check** when confidence is borderline  
- Structured report schema instead of free-form chat history  
- Gemini as news/macro analyst with RAG over past event→reaction pairs  
- Do **not** use as primary price predictor for XAUUSD 5m scalp  

## What not to copy blindly

- Short equity backtest as proof for gold/crypto  
- Ignoring spreads, slippage, and LLM stochasticity  
- Assuming Yahoo/news APIs are point-in-time without verification  
- Running full agent graph every candle (cost + latency)  

---

## Citation

```bibtex
@misc{xiao2025tradingagentsmultiagentsllmfinancial,
  title={TradingAgents: Multi-Agents LLM Financial Trading Framework},
  author={Yijia Xiao and Edward Sun and Di Luo and Wei Wang},
  year={2025},
  eprint={2412.20138},
  archivePrefix={arXiv},
  primaryClass={q-fin.TR},
  url={https://arxiv.org/abs/2412.20138}
}
```
