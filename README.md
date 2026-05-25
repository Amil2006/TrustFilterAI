# 🛡️ TrustFilterAI

**TrustFilterAI** is a full-stack AI-powered platform designed to ensure **trust and authenticity in e-commerce systems** by detecting:

- Fake product reviews  
- Subtle spam and manipulation  
- Counterfeit product indicators *(planned)*   

The system combines **Transformer-based NLP, Deep Learning, and full-stack engineering** into a unified moderation pipeline.

---

## Project Overview

TrustFilterAI started as a HackOn prototype and evolved into a **real-world ML system** focused on:

- Dataset engineering and quality optimization  
- Model generalization on noisy real-world data  
- Scalable ML pipeline design  
- Full-stack AI integration   

The project has progressed from a **CNN-based baseline (V1)** to a **Transformer-based DistilBERT model (V2)**, with future plans for a **multimodal trust scoring system** combining text and image analysis.

📎 [HackOn Pitch Deck](https://drive.google.com/file/d/1_PmpqlBncIugI3_VDfuKnpe6W8DS2LV9/view?usp=sharing)


---

## Core Features

### V1: CNN-based Review Classification

- Built a **Convolutional Neural Network (CNN)** model using **TensorFlow/Keras** for text classification  
- Takes a raw **input review** and processes it through a complete NLP pipeline:
  - Preprocessing (cleaning, normalization)  
  - Tokenization and sequence padding  
  - Embedding layer for semantic representation  
  - CNN (Conv1D + pooling) for feature extraction  
- Classifies reviews into:
  - Genuine  
  - Fake  
  - Spam (including subtle and hard-to-detect spam)

- Designed to handle **real-world noisy data** using balanced and augmented datasets  
- Evaluated using **precision, recall, and F1-score** to ensure robust performance beyond accuracy  
#### V1 Model Performance

| Metric | Value |
|------|------|
| Test Accuracy | ~91–93% |
| Precision / Recall | Balanced |
| Generalization | High |

---

### V2: DistilBERT-based Review Analysis (Latest)

- Implemented a Transformer-based NLP model (**DistilBERT**) for advanced fake review detection.
- Designed to overcome limitations of the CNN by capturing contextual and semantic relationships in text.

#### Key Improvements over V1
- Context-aware understanding using pretrained transformer embeddings.
- Reduced dependence on superficial features like keywords or rating bias.
- Improved detection of:
  - Subtle spam
  - Exaggerated promotional language
  - Rating-text inconsistencies

#### Model Design
- **Base model:** `distilbert-base-uncased`
- Fine-tuned for binary classification (Fake / Genuine).
- **Input representation:**
  - Review text (primary signal)
  - Rating (controlled influence via mixed formatting)

#### Training Strategy
- **Dataset size:** 10,000 samples.
- **Data composition:**
  - 75% clean curated data
  - 25% noisy real-world data
- Duplicate removal to prevent data leakage.
- Controlled validation split (clean-only validation).

#### V2 Model Performance

| Metric | Value |
| :--- | :--- |
| Accuracy | 98% |
| Precision (Fake) | 1.00 |
| Recall (Fake) | 0.98 |
| F1 Score | ~0.99 |
| Avg Confidence | 0.96 |

#### Confusion Matrix
```text
[[4302    7]
 [ 133 5558]]
```

---

### V1 vs V2 Comparison

| Feature | CNN (V1) | DistilBERT (V2) |
| :--- | :--- | :--- |
| **Context Understanding** | Limited | Strong |
| **Handling Subtle Spam** | Moderate | High |
| **Generalization** | Good | Excellent |
| **Architecture** | CNN | Transformer |
| **Accuracy** | ~92% | ~98% |

---

### Advanced Dataset Engineering

- Synthetic review generation  
- Hard/ambiguous sample creation  
- Subtle spam injection  
- Real-world dataset integration (~40K reviews subset)

---


### Key Insight

> Increasing dataset difficulty reduced accuracy slightly but significantly improved model robustness and real-world performance.

---

## ML Pipeline

### V1: CNN Review Classification Pipeline

![CNN Pipeline](assets/cnn_pipeline.png)

### V2: DistilBERT Review Classification Pipeline
![DistilBERT Pipeline](assets/DistilBERT_Pipeline_V2.png)

---

## Tech Stack

| Layer | Technologies |
|------|------------|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ML Framework | PyTorch, TensorFlow/Keras |
| NLP | DistilBERT (Transformers), CNN (V1) |
| Media | Cloudinary |
<!-- | Computer Vision (Planned) | ResNet50 | -->

---

## Project Structure

```text
TrustFilterAI/
├── backend/
├── frontend/
│   ├── public/
│   └── src/
├── data/
│   ├── processed/
│   └── raw/
├── text/
│   ├── api/
│   ├── distilbert/
│   ├── ensemble/
│   └── keras_cnn/
│       └── saved/
├── V2/
│   ├── data/
│   │   ├── processed/
│   │   └── raw/
│   ├── models/
│   │   └── distilbert_v2/
│   ├── notebooks/
│   ├── outputs/
│   │   ├── metrics/
│   │   └── plots/
│   └── src/
├── assets/
├── .gitignore
├── README.md
└── LICENSE
```
---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone [https://github.com/Amil2006/TrustFilterAI.git](https://github.com/Amil2006/TrustFilterAI.git)
cd TrustFilterAI
```

### 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 4. ML Setup

```bash
python -m venv .venv
.venv\Scripts\activate
pip install pandas numpy scikit-learn tensorflow torch transformers
```

### 5. Train Models

**🔹 V1 (CNN Model)**
```bash
python ml/text/keras_cnn/train.py
```
**🔹 V2(DistilBERT Model) Run the training notebook**
```bash
jupyter notebook ml/V2/notebooks/02_model_training.ipynb
```

### 6.Evaluation & Demo
```bash
jupyter notebook ml/V2/notebooks/03_model_evaluation_and_demo.ipynb
```

## Example Output

```json
{
  "label": "fake",
  "confidence": 0.91
}
```

## Evaluation Metrics
* Accuracy
* Precision
* Recall
* F1-score
* Class-wise performance analysis

## Key Learning Outcomes

* Data quality and distribution significantly impact model performance
* Importance of preventing data leakage in ML pipelines
* Transition from CNN to Transformer-based NLP (DistilBERT)
* Handling real-world noisy data vs curated datasets
* Designing robust and scalable ML pipelines
* Model evaluation beyond accuracy (precision, recall, F1, confidence)
* Balancing model performance with interpretability

## Upcoming Modules

### Counterfeit Detection (ResNet50)
* Image feature extraction using pretrained ResNet50
* Visual embedding generation
* Similarity-based counterfeit detection
* Basic image retrieval system using cosine similarity

### Trust Score Engine
* Combines:
  * Review analysis (DistilBERT)
  * Image similarity (ResNet50)
  * Rule-based signals (pattern detection)
* Outputs unified trust score (0–100)
* Designed for real-time moderation systems

## 📌 License
MIT License