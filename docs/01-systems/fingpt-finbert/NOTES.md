# FinGPT / FinBERT — research notes

**Role in our stack:** NLP **sentiment / news tagging** features — **not** price prediction models.

**PDFs:** `fingpt-2306.06031.pdf`, `finbert-1908.10063.pdf`

---

## FinBERT (Araci, 2019)

- BERT further pretrained on financial corpus (Reuters TRC2 subset) then fine-tuned on **Financial PhraseBank**  
- Labels: positive / negative / neutral  
- HF model: https://huggingface.co/ProsusAI/finbert  
- Strong on sentence-level financial sentiment; tiny labeled set still works because of pretrained LM  
- Production blog: Prosus AI Medium post (accuracy claims ~86–97% depending on annotator-agreement subset)

**Use:** Fast, cheap local sentiment score on headlines / snippets.  
**Don’t use:** As a standalone trade trigger.

---

## FinGPT (AI4Finance, Yang et al., arXiv:2306.06031)

- **Data-centric** open FinLLM stack (not one frozen proprietary model)  
- Emphasizes automatic data curation + **LoRA / QLoRA** lightweight fine-tunes  
- Companion: FinNLP for data pipelines  
- Code: https://github.com/AI4Finance-Foundation/FinGPT  

### Sentiment fine-tune (v3 series) — reported Weighted F1

| Model | FPB | FiQA-SA | TFNS | NWGI | Rough cost |
|---|---|---|---|---|---|
| FinGPT v3.3 (Llama2-13B) | 0.882 | 0.874 | 0.903 | 0.643 | ~17h RTX 3090 |
| FinGPT v3.2 (Llama2-7B) | 0.850 | 0.860 | 0.894 | 0.636 | ~5.5h A100 |
| FinGPT v3.1 (ChatGLM2-6B) | 0.855 | 0.850 | 0.875 | 0.642 | ~5.5h A100 |
| FinBERT (paper table) | 0.880 | 0.596 | 0.733 | 0.538 | — |
| GPT-4 (zero-shot, table) | 0.833 | 0.630 | 0.808 | — | — |

Paper/README also mention LoRA on ~**50K** finance samples and labeling via **relative price change** bins (market-as-label) for some pipelines — powerful but easy to leak if timestamps are wrong.

### Applications they advertise

Robo-advising demos, sentiment analysis, instruction tuning — **assistants**, not execution engines.

---

## How this maps to Gemini in our architecture

| Approach | When |
|---|---|
| Gemini zero-shot + structured JSON schema | Default Phase 2 (news, FOMC minutes, CPI narrative → `{sentiment, event_risk, assets_affected}`) |
| FinBERT | Offline batch scoring of headline streams; cheap baseline feature |
| FinGPT LoRA | Only if Gemini/FinBERT miss domain labels we need and we have clean PIT labels |

**Do not fine-tune an LLM to predict next candle.** Compute is better spent on LightGBM + Kronos + validation.

---

## Citations

```bibtex
@article{araci2019finbert,
  title={FinBERT: Financial Sentiment Analysis with Pre-trained Language Models},
  author={Araci, Dogu},
  journal={arXiv preprint arXiv:1908.10063},
  year={2019}
}

@article{yang2023fingpt,
  title={FinGPT: Open-Source Financial Large Language Models},
  author={Yang, Hongyang and others},
  journal={arXiv preprint arXiv:2306.06031},
  year={2023}
}
```
