# 🚀 RoomSpace

A modern and minimal **room management app** built with **React, Node.js, Express, and MongoDB**.  
RoomSpace provides a simple way to create, manage, and share rooms — perfect for collaborative projects, discussions, or study groups.  

![RoomSpace Banner](https://via.placeholder.com/1200x400?text=RoomSpace) <!-- Replace with actual screenshot -->

---

## ✨ Features

- 🏠 **Room Management** – Create, view, and delete rooms easily  
- 🎨 **Modern UI** – Beautiful design with Tailwind CSS + shadcn/ui  
- ⚡ **Fast & Responsive** – Built with Vite + React for snappy performance  
- 🌐 **API Integration** – Node.js + Express backend with MongoDB database  
- 🔒 **Secure** – REST API with proper error handling and validation  
- 📂 **GitHub Ready** – Includes repo link in the header for easy access  

---

## 🖼️ UI Highlights

- **Header with Branding** – Gradient text logo + interactive GitHub button  
- **Tooltip Enhancements** – Clean hover tooltips for actions  
- **Smooth Animations** – Hover scaling, shadows, and blur effects for a premium look  

---

## 🛠️ Tech Stack

**Frontend:**  

- React (Vite)  
- Tailwind CSS  
- shadcn/ui components  
- Lucide Icons  

**Backend:**  

- Node.js + Express  
- MongoDB (Mongoose)  

---

## 📂 Project Structure

roomspace/
│── backend/           # Express + MongoDB API
│   ├── models/        # Database schemas
│   ├── routes/        # API routes
│   └── server.js      # Main server
│
│── frontend/          # React (Vite) frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page views
│   │   └── utils/        # API helpers
│   └── vite.config.js
│
└── README.md

## 🚦 Getting Started

### 🔹 Prerequisites

- Node.js (>= 18)  
- MongoDB Atlas or local MongoDB  

### 🔹 Setup

1. **Clone repo**

   ```bash
   git clone https://github.com/amie-dev/RoomSpace.git
   cd RoomSpace


2. **Install dependencies**

   * Frontend:

     ```bash
     cd frontend
     npm install
     ```

   * Backend:

     ```bash
     cd backend
     npm install
     ```

3. **Setup environment variables** (`.env`)

   ```env
   MONGO_URI=your-mongodb-connection
   PORT=5000
   ```

4. **Run the app**

   * Backend:

     ```bash
     cd backend
     npm run dev
     ```

   * Frontend:

     ```bash
     cd frontend
     npm run dev
     ```

## 📡 API Endpoints (Rooms)

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/rooms`     | Get all rooms       |
| POST   | `/api/rooms`     | Create a new room   |
| DELETE | `/api/rooms/:id` | Delete a room by ID |

---

## 📸 Screenshots

> Add screenshots of UI here (home page, room list, delete functionality, etc.)

---

## 🚀 Deployment

* **Frontend** → Vercel / Netlify
* **Backend** → Render / Railway / Heroku
* **Database** → MongoDB Atlas

---

## 📌 Roadmap

- [ ] Add authentication (JWT / OAuth)
- [ ] Real-time rooms (WebSocket / Socket.io)
- [ ] Dark mode support
- [ ] User profile + settings

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Submit a PR 🚀

---

## 📜 License

MIT License © 2025 [Aminul](https://github.com/amie-dev)

---

## 💡 Tagline

**“RoomSpace – Your shared space for ideas.”**

---

Would you like me to also **add shields.io badges** at the top (e.g. React, Node.js, MongoDB, License, Stars) so your GitHub page looks more professional?
