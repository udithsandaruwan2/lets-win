# FinRL — research notes

**Org:** AI4Finance Foundation  
**Site:** https://www.finrl.ai/  
**Paper:** arXiv:2011.09607 (`finrl-2011.09607.pdf`)  
**Code:** https://github.com/AI4Finance-Foundation/FinRL  

---

## What it is

Deep **reinforcement learning** toolkit for quantitative trading research:

- Gymnasium-compatible market environments (equities, ETFs, crypto, futures, FX — depending on env)  
- Algorithms via Stable-Baselines3 / ElegantRL / Ray RLlib: PPO, SAC, DDPG, TD3, A2C, DQN, ensembles  
- Tutorials + reproducible benchmarks  

Designed so one policy artifact can move from backtest → paper → live **in their ecosystem**, but community consensus treats FinRL as **research-first**.

---

## Caveats

- RL policies are **unstable** out of sample; reward hacking and non-stationarity are endemic in markets  
- Simulated costs/slippage must be audited; many published RL trading curves are optimistic  
- Not the Phase-1 baseline — trees + clear labels beat opaque policies for debugging  

Freqtrade’s FreqAI also has an RL mode; same skepticism applies.

---

## Use for Lets Win

- Optional Phase 4+ experiment **after** a profitable supervised pipeline exists  
- Useful ideas: turbulence filters, reward shaping that includes **transaction costs**, vectorized multi-asset envs  
- Do **not** start the project as “train PPO on gold 5m”
