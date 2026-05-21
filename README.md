# 🛡️ TrustFilterAI

**TrustFilterAI** is a full-stack AI-powered platform designed to ensure **trust and authenticity in e-commerce systems** by detecting:

- Fake product reviews  
- Subtle spam and manipulation  
- Counterfeit product indicators (planned)  

The system combines **Deep Learning, NLP, and full-stack engineering** into a unified moderation pipeline.

---

## 🚀 Project Overview

TrustFilterAI started as a HackOn prototype and evolved into a **real-world ML system** focused on:

- Dataset engineering  
- Model generalization  
- ML pipeline design  
- Full-stack integration  

📎 [HackOn Pitch Deck](https://drive.google.com/file/d/1_PmpqlBncIugI3_VDfuKnpe6W8DS2LV9/view?usp=sharing)

---

## 🧠 Core Features

### ✅ V1: CNN-based Review Classification

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

---


### ✅ Advanced Dataset Engineering

- Synthetic review generation  
- Hard/ambiguous sample creation  
- Subtle spam injection  
- Real-world dataset integration (~40K reviews subset)

---

### 📊 Model Performance

| Metric | Value |
|------|------|
| Test Accuracy | ~91–93% |
| Precision / Recall | Balanced |
| Generalization | High |

---

### 🧠 Key Insight

> Increasing dataset difficulty reduced accuracy slightly but significantly improved model robustness and real-world performance.

---

## 🧪 ML Pipeline

### 🧠 V1: CNN Review Classification Pipeline

![CNN Pipeline](assets/cnn_pipeline.png)

---

## 🖥️ Tech Stack

| Layer | Technologies |
|------|------------|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ML Framework | TensorFlow / Keras |
| NLP | Tokenization + CNN |
| Media | Cloudinary |

---

## 📂 Project Structure

```text
TrustFilterAI/
├── backend/
│ ├── models/
│ │ └── Product.js
│ ├── routes/
│ │ ├── aiRoutes.js
│ │ └── productRoutes.js
│ └── server.js
│
├── frontend/
│ ├── public/
│ │ ├── index.html
│ │ ├── favicon.ico
│ │ └── assets...
│ ├── src/
│ │ ├── components/
│ │ │ ├── AddProductForm.jsx
│ │ │ ├── ModeratorDashboard.jsx
│ │ │ ├── Navbar.jsx
│ │ │ ├── ProductCard.jsx
│ │ │ ├── ProductDetail.jsx
│ │ │ └── ProductList.jsx
│ │ ├── App.jsx
│ │ └── index.js
│
├── ml/
│ ├── data/
│ │ ├── eda_dataset.ipynb
│ │ └── raw/
│ │ └── generate_dataset.py
│ └── text/
│ └── keras_cnn/
│ ├── model.py
│ ├── preprocess.py
│ └── train.py
│
├── assets/
│ └── cnn_pipeline.png
│
├── .gitignore
├── README.md
└── LICENSE
```
---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone [https://github.com/yourusername/TrustFilterAI.git](https://github.com/yourusername/TrustFilterAI.git)
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
pip install pandas numpy scikit-learn tensorflow
```

### 5. Train Model

```bash
python ml/text/keras_cnn/train.py
```

## 📊 Example Output

```json
{
  "label": "fake",
  "confidence": 0.91
}
```

## 📊 Evaluation Metrics
* Accuracy
* Precision
* Recall
* F1-score
* Class-wise performance analysis

## 🔥 Key Learning Outcomes
* Dataset quality > model complexity
* Handling overfitting vs generalization
* Importance of ambiguous samples
* Real-world ML pipeline design
* Model evaluation beyond accuracy

## 🚧 Upcoming Modules

### 🔵 DistilBERT (Next Step)
* Transformer-based NLP model
* Expected performance improvement over CNN

### 🟡 Counterfeit Detection
* CNN-based image classification
* Visual anomaly detection

### 🟣 Trust Score Engine
* Combines:
  * Review analysis
  * Image authenticity
* Outputs unified trust score

## 📌 License
MIT License