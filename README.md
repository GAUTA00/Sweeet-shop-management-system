# 🍬 Sweet Shop Management System

The **Sweet Shop Management System** is a complete backend solution built using Node.js, Express, and MongoDB. It is designed to manage a sweet shop's inventory efficiently, allowing for CRUD operations, stock tracking, search/sort functionality, and purchase/restock actions.

---
## 🌐 Live Deployment

- **Frontend:** [https://sweet-shop-frontend-nine.vercel.app/](https://sweet-shop-frontend-nine.vercel.app/)
- **Backend:** [https://sweeet-shop-management-system.onrender.com](https://sweeet-shop-management-system.onrender.com)

---

## 📦 API Endpoints

**Base URL**: `https://sweeet-shop-management-system.onrender.com/api/v1`

## ✨ Features

- ➕ Add sweets to the shop
- 📄 View all sweets
- 🗃️ Search and sort sweets (by name, category, price, quantity)
- ✏️ Update sweet details
- ❌ Delete sweets
- 🛒 Purchase sweets (decrease stock)
- 📦 Restock sweets (increase stock)
- ✅ Prevent duplicates (merge quantity if same name & category)
- ✅ Full test coverage using **Jest + Supertest**

---

## 🛠️ Tech Stack

| Tool         | Purpose                        |
|--------------|--------------------------------|
| Node.js      | JavaScript runtime             |
| Express.js   | HTTP server & routing          |
| MongoDB      | NoSQL database                 |
| Mongoose     | ODM for MongoDB                |
| Jest         | Testing framework              |
| Supertest    | HTTP assertions for tests      |
| dotenv       | Load environment variables     |
| nodemon      | Auto-reloads on server changes |
| cors         | Cross-origin request support   |

---
## 📦 Requirements

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/GAUTA00/Sweeet-shop-management-system.git
cd sweet-shop-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/sweetshop
```

Or use your MongoDB Atlas URI.

### 4. Start the server

```bash
npm run dev
```

The server will run on `http://localhost:8080`.

---

## 📦 API Endpoints

**Base URL**: `http://localhost:8080/api/v1`

| Method | Endpoint              | Description                   |
|--------|------------------------|-------------------------------|
| GET    | /getSweets             | Fetch all sweets              |
| GET    | /searchSweets          | Search/filter/sort sweets     |
| POST   | /addSweets             | Add new sweet                 |
| PUT    | /updateSweet/:id       | Update sweet by ID            |
| DELETE | /deleteSweet/:id       | Delete sweet by ID            |
| PUT    | /purchaseSweet/:id     | Purchase (decrease quantity)  |
| PUT    | /restockSweet/:id      | Restock (increase quantity)   |

---

## 🧪 Testing

- Tests are located in `/tests/`
- Each test suite covers core functionality using Jest and Supertest

---

## 📂 Folder Structure

```
📁 Backend/
├── 📁 controllers/
├── 📁 models/
├── 📁 routes/
├── 📁 tests/
├── 📁 utils/
├── app.js
├── server.js
└── .env
```

## 🧠 Search/Sort Query Example

```http
GET /api/v1/searchSweets?name=barfi&sortBy=price&order=desc
```

- `name`: search by sweet name (case-insensitive)
- `category`: filter by category
- `sortBy`: price or quantity
- `order`: asc or desc

---

---

## 👨‍💻 Author

- **Gautam Prajapati** - [GitHub](https://github.com/GAUTA00)

---
