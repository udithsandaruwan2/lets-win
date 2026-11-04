# Data leakage & point-in-time — research notes

Leakage is the #1 reason people “achieve” 80%+ accuracy. This note lists the failure modes we must design against.

---

## Classic leakage channels

1. **Look-ahead features** — using same-bar close to decide same-bar entry; using future indicators  
2. **Label overlap** — train labels that resolve during the test period (needs purge)  
3. **Survivorship** — only assets that exist today  
4. **Restatement bias** — fundamentals revised later (TradingAgents/SEC EDGAR PIT discussion is the right idea)  
5. **News timestamp wrong** — article published at T+1 tagged as T  
6. **Global normalization** — scaling with full-sample mean/std including future  
7. **Hyperparam peeking** — tuning on the final test window  
8. **LLM pretraining contamination** — model memorized 2024 events then “predicts” 2024 backtest  
9. **Session join bugs** — merging daily macro onto intraday with wrong as-of time  
10. **Order book / OI futures** — using revised or delayed vendor snapshots as if live  

---

## Point-in-time (PIT) rules

- Every feature row has an **as-of timestamp** = last moment information was knowable  
- Economic calendar: use **release time**, not period-end date  
- Fundamentals: filing time, not fiscal period end  
- Sentiment: message post time; no edits from the future  
- Corporate actions / splits applied as known at as-of  

TradingAgents README/changelog history shows how hard this is even for a popular framework — treat vendor “historical” endpoints as guilty until proven PIT.

---

## Checklist before trusting a backtest

- [ ] Entry uses only data available at signal time (usually prior bar close for bar strategies)  
- [ ] Train/test purged + embargoed for overlapping labels  
- [ ] Costs ≥ live median spread + commission + slippage buffer  
- [ ] No feature computed with future window endpoints  
- [ ] LLM prompts do not include post-date knowledge (hard — prefer structured news DB with dates)  
- [ ] Random baseline / shuffled-label sanity check fails to beat model by much after costs  
- [ ] Live paper tracks same feature code path as backtest  

---

## Sanity tests

- **Shuffle labels:** performance should collapse  
- **Time shift features +1 day:** edge should vanish or reverse  
- **Widen spread 2×:** still positive?  
- **Embargo 0 vs 2%:** if scores jump with embargo=0, you had leakage  

If a model clears 70–80% hit rate on dense 5m bars with these tests, re-audit before celebrating.
