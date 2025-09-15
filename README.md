
# 💰 Expense Tracker

A full-stack Expense Tracker web application built with **Node.js, Express, MongoDB, and React**.  
Users can add, view, delete, and summarize their expenses with category breakdown.

---

## 🚀 Live Demo
- **Frontend (React):** [https://expense-tracker-wheat-seven-72.vercel.app/](https://expense-tracker-wheat-seven-72.vercel.app/)  
- **Backend (Express):** [https://expense-tracker-backend-five-eosin.vercel.app/](https://expense-tracker-backend-five-eosin.vercel.app/)  

---

## 🛠 Tech Stack
### Frontend
- React (Vite)
- Axios (API calls)
- TailwindCSS (styling)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- dotenv (env management)
- CORS middleware

### Deployment
- Frontend: Vercel  
- Backend: Render  
- Database: MongoDB Atlas  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repositories
```bash
# Backend
git clone https://github.com/your-username/expense-tracker-backend.git
cd backend
npm install

# Frontend
git clone https://github.com/your-username/expense-tracker-frontend.git
cd frontend
npm install
````

---

### 2️⃣ Backend Setup

1. Create a `.env` file inside `expense-tracker-backend/`

   ```env
   MONGO_URI=your_mongo_connection_string
   PORT=5000
   ```
2. Run backend server:

   ```bash
   npm start
   ```
3. Backend will run at:

   ```
   http://localhost:5000
   ```

---

### 3️⃣ Frontend Setup

1. Update `API_URL` inside `src/App.jsx` with your backend URL:

   ```js
   const API_URL = "http://localhost:5000/api/expenses"; // Local
   // OR
   const API_URL = "https://your-backend.onrender.com/api/expenses"; // Deployed
   ```
2. Run frontend:

   ```bash
   npm run dev
   ```
3. Frontend will run at:

   ```
   http://localhost:5173
   ```

---

### 4️⃣ Deployment

* **Backend**: Deploy to Render (Node service, connect GitHub repo, add `MONGO_URI` in env vars).
* **Frontend**: Deploy to Vercel (import GitHub repo, set build command `npm run build`, output directory `dist`).

---

## 📊 API Endpoints

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| GET    | `/api/expenses`         | Fetch all expenses       |
| POST   | `/api/expenses`         | Add a new expense        |
| DELETE | `/api/expenses/:id`     | Delete an expense        |
| GET    | `/api/expenses/summary` | Get category-wise totals |

---

## 📌 Features

* Add new expenses with title, amount, category, and date
* View all expenses in a table
* Delete expenses with confirmation
* Category-wise summary (with totals)
* Clean UI with TailwindCSS
* Ready for deployment

---

## 👨‍💻 Author

* Name: Rudresh
* Role: Engineering Student
* Project: Internship Assignment – Expense Tracker

