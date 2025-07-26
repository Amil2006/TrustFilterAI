# 🛡️ TrustFilterAI

**TrustFilterAI** is a full-stack AI-powered platform designed to ensure **product authenticity**, detect **fake reviews**, and flag **counterfeit items** using modern deep learning and LLM techniques.

This project empowers e-commerce platforms to maintain **trust and safety** at scale through intelligent automation and modular design.

---

## 📌 Table of Contents

- [🚀 Project Overview](#-project-overview)
- [🎯 Goals](#-goals)
- [🧠 AI Features](#-ai-features)
- [🖥️ Tech Stack](#-tech-stack)
- [⚙️ Installation](#️-installation)
- [📊 Dashboard Features](#-dashboard-features)
- [☁️ Cloudinary Integration](#-cloudinary-integration)
- [🤖 LLM Integration](#-llm-integration)
- [🧪 Counterfeit Detection (Planned)](#-counterfeit-detection-planned)
- [📎 HackOn Pitch Deck](#-hackon-pitch-deck)
- [📌 License](#-license)

---

## 🚀 Project Overview

TrustFilterAI was initially conceptualized during **HackOn with Amazon – Season 5**, under the theme _"AI-Powered Trust & Safety Platform."_ While it didn't progress past the first round, it now serves as a long-term personal project for practical learning and portfolio development.

> 📎 [View HackOn Pitch Deck »](https://drive.google.com/file/d/1_PmpqlBncIugI3_VDfuKnpe6W8DS2LV9/view?usp=sharing)

---

## 🎯 Goals

- Detect and classify fake reviews using a local LLM (Mistral 7B)
- Identify counterfeit products using image + metadata with ResNet
- Provide moderators with an intuitive review classification dashboard
- Maintain transparency with verified, pending, and flagged reviews

---

## 🧠 AI Features

### ✅ Completed

- [x] Fake review detection with Mistral-7B using llama.cpp API
- [x] Cloudinary integration for image upload & rendering
- [x] Rating system via interactive star inputs
- [x] Review status badge: ✅ Real / ❌ Fake / ⏳ Pending

### 🛠️ In Progress

- [ ] Image-based counterfeit detection (ResNet + metadata)
- [ ] Anomaly detection in review timelines (Isolation Forest)

---

## 🖥️ Tech Stack

| Layer         | Tools & Technologies                             |
|--------------|--------------------------------------------------|
| **Frontend**  | React.js, Chart.js / Recharts |
| **Backend**   | Node.js, Express.js                              |
| **Database**  | MongoDB, Mongoose                                |
| **LLM Engine**| Mistral-7B via llama.cpp (OpenAI-compatible)     |
| **AI Models** | ResNet-50, DistilBERT, Isolation Forest (planned) |
| **Media CDN** | Cloudinary                                       |

---

## ⚙️ Installation

1. Clone the repo  
   ```bash
git clone https://github.com/yourusername/TrustFilterAI.git
cd TrustFilterAI
```

### 2. Start the LLM server (via `text-generation-webui` or `llama-server`)
```bash
python server.py --model mistral-7b-instruct-v0.2.Q4_K_M.gguf --api --nowebui --extensions openai --api-port 5001
```

### 3. Setup Backend
```bash
cd backend
npm install
# Create a `.env` with your MongoDB and Cloudinary creds
node index.js
```

### 4. Setup Frontend
```bash
cd frontend
npm install
npm start
```

---

## 🔍 Example Classification

```
Review: "This is the best keyboard I’ve ever used!"
→ LLM Response: { classification: "real", confidence: 0.97 }

Review: "Totally useless, broke in one day. DO NOT BUY!!!"
→ LLM Response: { classification: "fake", confidence: 0.92 }
```

---

📊 Dashboard Features
🌐 Review classification tags: Verified ✅ | Fake ❌ | Pending ⏳

📉 Pie chart showing % of fake vs real reviews

🖊️ Edit or delete flagged reviews with confirmation modals

🔍 Filter reviews by product, classification, or confidence

⏳ Loading spinner while waiting for LLM classification

☁️ Cloudinary Integration
TrustFilterAI uses Cloudinary for product image management:

✅ Benefits:

Secure cloud storage

Optimized image delivery via CDN

Essential for image-based ML analysis

🤖 LLM Integration
The app integrates Mistral 7B via llama-b5921-bin-win-cuda-12.4-x64 with OpenAI-style API compatibility.

🧪 Counterfeit Detection (Planned)
Using ResNet-50 + metadata to classify product images as either:

✅ Genuine

❌ Counterfeit

Combined with title, description & brand matching for stronger detection.

📌 License
This project is open-source under the MIT License.
