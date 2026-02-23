# 🤖 MindGPT AI Web App 
https://disha-mind-gpt-pfewiiac8-disha-vs-projects.vercel.app

A full-stack AI chat application built using a Hugging Face large language model.  
This project includes a Node.js backend connected to the Hugging Face Inference API and a responsive frontend that mimics the ChatGPT interface.

---

## 🚀 Features

- ✅ Hugging Face LLM integration
- ✅ Secure API key handling (.env)
- ✅ Real-time AI responses
- ✅ Full-stack architecture
- ✅ Easy deployment


---

## ⚙️ Tech Stack

- Node.js
- Express.js
- Hugging Face Inference API
- HTML
- CSS
- JavaScript

---

## 🔑 Setup Instructions

### 1️⃣ Clone Repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

---

### 2️⃣ Backend Setup
cd backend
npm install
Create a `.env` file:
HF_API_KEY=your_huggingface_api_key
MODEL=meta-llama/Meta-Llama-3-8B-Instruct
Run backend:
node server.js
Server runs at:
http://localhost:5000

---

### 3️⃣ Frontend Setup

Open frontend folder:
cd ../frontend

Run with Live Server  
OR open `index.html` directly in browser.

---

## 🔄 How It Works

1. User types message in frontend.
2. Frontend sends request to backend.
3. Backend calls Hugging Face API.
4. Model generates response.
5. Response is sent back and displayed in chat UI.

---

## 🔐 Environment Variables

| Variable | Description |
|----------|------------|
| HF_API_KEY | Hugging Face API Key |
| MODEL | Selected Hugging Face Model |

---

## 🌍 Deployment

You can deploy:

- Backend → Render / Railway / VPS
- Frontend → Vercel / Netlify

---

## 📌 Future Improvements

- Conversation memory
- Streaming responses
- Authentication system
- Database integration
- Docker support

---

## 📜 License

This project is for educational purposes.

---

## 👨‍💻 Author

Disha V
GitHub: https://github.com/disha654




