![image](https://github.com/user-attachments/assets/cb09a890-77e6-4a1b-85ae-75ffb6401020)
# Code . | Cloud Development Environment

### 🗓️ Project Duration
**31 March – 10 April 2023**

### 🌐 Overview
**Code .** is a lightweight yet powerful **cloud-based IDE** developed to emulate a real-time development environment in the browser. Designed with performance and modularity in mind, this full-stack solution integrates code editing, terminal interaction, and containerized workspaces — perfect for cloud dev and education platforms.

---

### 🚀 Features

- ⚛️ **Frontend** built using **React.js** and **Monaco Editor** for a VS Code–like editing experience  
- 🖥️ **Real-time terminal emulation** using **xterm.js** and **WebSocket protocol**  
- 🐳 **Containerized execution environments** using **Docker**, offering isolated and secure coding sandboxes  
- 📦 **Multi-container orchestration** powered by **Docker Compose**, enhancing system modularity and fault isolation  
- ⚡ **Optimized Docker images** with **multi-stage builds** and **layer caching**, ensuring fast boot times and minimal resource usage  
- 📡 **Live Preview** with HMR (Hot Module Replacement) to instantly reflect changes made in code  

---

### 🧩 Tech Stack

| Layer         | Tools/Tech                           |
|---------------|--------------------------------------|
| Frontend      | React.js, Vite, Monaco Editor        |
| Terminal      | xterm.js, WebSocket API              |
| Backend       | Node.js, Express                     |
| Containerization | Docker, Docker Compose             |
| Others        | ESLint, HMR, JSX, Vite Dev Server    |

---

### 📸 Preview

![Live Demo Screenshot](./image.png)  
_Example of Vite + React dev environment running with Hot Module Replacement (HMR)._

---

### 🛠️ How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/code-dot-ide.git
cd code-dot-ide

# 2. Start Docker containers
docker-compose up --build

# 3. Access the development environment
# Visit http://localhost:5173 for the editor
# Terminal runs via WebSocket in browser
```

---

### 📁 Project Structure (simplified)

```
.
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── assets/
├── public/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

### 📌 Key Takeaways

- Implemented secure, multi-user coding sandboxes inside browser
- Achieved modular service orchestration with Docker Compose
- Provided a near-native IDE experience using web technologies
