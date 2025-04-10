![image](https://github.com/user-attachments/assets/cb09a890-77e6-4a1b-85ae-75ffb6401020)
# ⚡ Full Stack Socket App with Web Terminal

This is a full-stack real-time application that includes:

- A **React frontend** (`FRONTEND/`)
- A **Node.js backend** with socket support (`BACKEND/`)
- A **WebSocket-powered terminal backend**, containerized using Docker

---

## 📁 Project Structure

```
.
├── FRONTEND/         # React app (frontend)
├── BACKEND/          # Node.js backend (sockets)
├── Dockerfile        # Dockerfile for terminal backend (inside BACKEND)
├── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2. Setup FRONTEND

```bash
cd FRONTEND
npm install
npm run dev
```

The frontend will run at `http://localhost:5173` or similar (based on Vite config).

---

### 3. Setup BACKEND (Socket Server)

```bash
cd ../BACKEND
npm install
npm run dev
```

Backend server will typically run at `http://localhost:3000` (check your code to confirm).

---

### 4. Run Terminal WebSocket Backend (Standalone)

This backend powers the terminal using WebSockets.

```bash
cd BACKEND
node src/terminalApp.js
```

---

### 5. 🐳 Run Docker-based Terminal (Optional)

Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop/) is running.

#### 🛠️ Build the Image (only once)

```bash
docker build -t sandbox .
```

#### ▶️ Run the Container

```bash
docker run -it sandbox
```

This opens an interactive shell inside the container — you can link this to your terminal frontend.

---

## 🧠 Notes

- Ensure **all three parts** (frontend, backend, and terminal backend) are running concurrently for full functionality.
- If using ports other than default (e.g., 3000, 5173), update configurations accordingly.

---

## ✅ Prerequisites

- Node.js + npm
- Docker Desktop (for terminal backend)
- Git

---

## 👨‍💻 Author

**Sankalp Ghansham Meshram**  
B.Tech CSE, VNIT Nagpur  
📧 sankalpmeshram2003@gmail.com  
🌐 [GitHub](https://github.com) • [LinkedIn](https://linkedin.com)

