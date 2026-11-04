# freqtrade — research notes

**Docs:** https://www.freqtrade.io/en/stable/  
**Code:** https://github.com/freqtrade/freqtrade  
**Niche:** Open-source **crypto** trading bot (Python)

---

## Capabilities that matter

- Strategy as pandas Python class  
- Historical download, backtesting, hyperopt  
- Dry-run (paper) and live on major CEX via ccxt-style integrations  
- Telegram + WebUI control  
- **FreqAI**: walk-forward ML (LightGBM, XGBoost, CatBoost, PyTorch) with live retraining  
- Built-in **lookahead analysis** helpers (rare and valuable)  
- Optional RL via FreqAI  

Hard limitation called out by framework reviews: **crypto-focused**. Not the right primary shell for XAUUSD on MT5.

---

## Fit for Lets Win

| Asset | Tool |
|---|---|
| BTC / ETH / XRP execution & paper | Strong candidate (Phase 4) |
| Gold / forex | MT5 Python API instead |
| Shared signal models | Train outside (our pipeline); optionally feed signals into freqtrade strategy or Telegram |

Steal from freqtrade even if we don’t adopt it wholesale:

1. Lookahead / bias checks  
2. Dry-run before live  
3. Hyperopt discipline with held-out periods  
4. Ops: Telegram alerts with entry/stop/target  

---

## Related (execution alternatives)

From framework survey (autotradelab blog):

- **NautilusTrader** — serious multi-asset production execution  
- **QuantConnect LEAN** — broad ecosystem  
- **MT5** — natural for gold/forex if broker is MT5  

Our phased plan: signals first → Telegram → then MT5/freqtrade execution.
