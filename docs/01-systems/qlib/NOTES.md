# Microsoft Qlib — research notes

**Paper:** *Qlib: An AI-oriented Quantitative Investment Platform* (arXiv:2009.11189)  
**Code:** https://github.com/microsoft/qlib (~37k★ class popularity)  
**PDF:** `qlib-2009.11189.pdf`  
**Also:** RD-Agent (Microsoft) for LLM-driven R&D automation on top of Qlib

---

## What it is

End-to-end **quant research platform**, not a live broker bot:

- Data layer + processors  
- Expression / factor engine  
- Supervised ML, market-dynamics / concept-drift models, RL hooks  
- Portfolio optimization + nested strategy/executor simulation  
- Analysis / online serving hooks  

Covers the research chain: **alpha → risk → portfolio → order execution research**.

Strongest in **equity cross-sectional** workflows (esp. China A-share examples in docs/community). Kronos’s official finetune demo literally uses **pyqlib** for data prep and a top-K backtest.

---

## What it is not

- Not a production multi-asset executor for MT5 gold or Binance crypto  
- Not a substitute for purged walk-forward with your own cost model  
- Framework comparison blogs rate it highly for **prediction research**, poorly as a live trading system  

---

## Use for Lets Win

| Use | Skip |
|---|---|
| Study data handlers / dataset / recorder patterns | Rewriting our whole stack inside Qlib Day 1 |
| Steal workflow ideas (train → predict → backtest → analyze) | Expecting out-of-box XAUUSD 5m support |
| Optional backend when fine-tuning Kronos on equities | Using Qlib as the crypto/gold execution layer |

**Practical:** Phase 1 can be plain pandas + LightGBM. Revisit Qlib if we need standardized experiment tracking across many equity-style factors.
