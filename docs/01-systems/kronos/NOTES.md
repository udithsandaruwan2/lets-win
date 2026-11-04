# Kronos — research notes

**Org:** Tsinghua University (IIIS + Automation)  
**Venue:** AAAI 2026  
**Paper:** Shi et al. — *Kronos: A Foundation Model for the Language of Financial Markets*  
**arXiv:** 2508.02739 · **AAAI:** https://ojs.aaai.org/index.php/AAAI/article/view/39730  
**Code:** https://github.com/shiyu-coder/Kronos (MIT)  
**PDFs:** `kronos-2508.02739.pdf`, `kronos-aaai-39730.pdf`  
**Demo:** https://shiyu-coder.github.io/Kronos-demo/ (BTC/USDT)

---

## What it is

First major **open-source foundation model for financial candlesticks (K-lines)**.

### Two-stage design

1. **Tokenizer** — quantizes continuous OHLCVA into **hierarchical discrete tokens** (price dynamics + trade activity)  
2. **Autoregressive Transformer** — pretrained next-token prediction on token sequences  

### Pretraining corpus

- **>12 billion** K-line records  
- **45+** global exchanges  
- Crypto, forex, futures (and equity markets in corpus)

### Model zoo (Hugging Face NeoQuasar)

| Model | Context | Params | Open |
|---|---|---|---|
| Kronos-mini | 2048 | 4.1M | Yes |
| Kronos-small | 512 | 24.7M | Yes |
| Kronos-base | 512 | 102.3M | Yes |
| Kronos-large | 512 | 499.2M | No |

**Critical:** small/base `max_context = 512`. Lookback should not exceed that for best results.

Fine-tuning scripts released (2025-08-17). Pipeline example uses **Qlib** for A-share data prep + simple top-K backtest (demo, not production).

---

## Headline metrics (paper) — read carefully

Kronos reports **RankIC** improvements for price-series forecasting:

- **+93%** RankIC vs leading general TSFM  
- **+87%** RankIC vs best non-pretrained baseline  
- **~9%** lower MAE on volatility forecasting  
- **~22%** better generative fidelity for synthetic K-lines  

### RankIC ≠ win rate

**Rank IC** = Spearman correlation between predicted ranks and realized return ranks (usually cross-sectional). It answers: “Do higher scores tend to rank better assets?”

It does **not** answer:

- What fraction of trades are winners?  
- Is expectancy positive after spread/slippage?  
- Will a single-asset directional bet print?

Useful signals often have Rank IC ~0.02–0.10 with hit rates only slightly above 50%. Kronos is closest to “small model we can fine-tune on candles,” but evaluate it with **our** costs and **our** labeling, not paper RankIC alone.

---

## Inference sketch (from README)

```python
from model import Kronos, KronosTokenizer, KronosPredictor

tokenizer = KronosTokenizer.from_pretrained("NeoQuasar/Kronos-Tokenizer-base")
model = Kronos.from_pretrained("NeoQuasar/Kronos-small")
predictor = KronosPredictor(model, tokenizer, max_context=512)

pred_df = predictor.predict(
    df=x_df,              # open,high,low,close[,volume,amount]
    x_timestamp=x_timestamp,
    y_timestamp=y_timestamp,
    pred_len=pred_len,
    T=1.0, top_p=0.9, sample_count=1
)
```

Supports `predict_batch` for multi-asset GPU parallelism. Sampling params enable **probabilistic** paths — good for meta-layer confidence.

---

## Fit for Lets Win architecture

| Role | Recommendation |
|---|---|
| Phase 1 | Skip until LightGBM baseline exists |
| Phase 3 | Fine-tune Kronos-small/base on XAUUSD / BTC / ETH / XRP separately |
| Output | Probabilistic forecast / return distribution → meta-model feature |
| Compute | Single consumer GPU or cloud rental is enough for small/base |
| Don’t | Treat zero-shot RankIC as live win rate |

Authors themselves warn: finetune demo signals are **raw**; production needs portfolio constraints, factor neutralization, and realistic costs.

---

## Citation

```bibtex
@misc{shi2025kronos,
  title={Kronos: A Foundation Model for the Language of Financial Markets},
  author={Yu Shi and Zongliang Fu and Shuo Chen and Bohan Zhao and Wei Xu and Changshui Zhang and Jian Li},
  year={2025},
  eprint={2508.02739},
  archivePrefix={arXiv},
  primaryClass={q-fin.ST},
  url={https://arxiv.org/abs/2508.02739}
}
```
