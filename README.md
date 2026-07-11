<div align="center">

<br/>

```
 _                                _   _       _     
| |                              | | | |     | |    
| |      ___  __ _ _ __ _ __     | |_| |_   _| |__  
| |     / _ \/ _` | '__| '_ \    |  _  | | | | '_ \ 
| |____|  __/ (_| | |  | | | |   | | | | |_| | |_) |
\_____/ \___|\__,_|_|  |_| |_|   \_| |_/\__,_|_.__/ 
                                                    
```

### A Premium Full-Stack E-Learning Platform with Interactive Video Courses

<br/>

[![MongoDB](https://img.shields.io/badge/MongoDB-database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Express](https://img.shields.io/badge/Express-v4.18.2-000000?style=for-the-badge&logo=express&logoColor=black)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-v18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-v4.4.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![License: ISC](https://img.shields.io/badge/License-ISC-F59E0B?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Local_Development-orange?style=for-the-badge)](#-deployment)

<br/>

> **Learn and teach anytime, anywhere.** — A modern, full-stack e-learning web application built on the MERN stack with course creation, payment enrollment, interactive video player, progress tracking, and automated completion certificate generation.
>
> 🚧 **Note:** This project is currently runnable locally only. A live hosted deployment is planned — see [Deployment](#-deployment) below for the roadmap.

<br/>

[Features](#-key-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Demo Accounts](#-demo-accounts) · [Architecture](#-project-structure) · [Deployment](#-deployment)

---

</div>

## 🤝 Contributors

Thanks to all the amazing people who have contributed to **LearnHub**! 🎉

<br/>

<div align="center">

<table>
  <tbody>
    <tr>
      <!-- Repeat this <td> block for each contributor -->
      <td align="center" valign="top" width="14.28%">
        <a href="https://github.com/udaycodespace">
          <img src="https://github.com/udaycodespace.png" width="80px;" style="border-radius:50%" alt="udaycodespace"/>
          <br/><sub><b>udaycodespace</b></sub>
        </a>
        <br/>💻 🐛 ⚡ 🎨 📖
      </td>
      <!-- /repeat -->
    </tr>
  </tbody>
</table>

</div>

<br/>

> 💻 Code &nbsp;·&nbsp; 🐛 Bug fix &nbsp;·&nbsp; 🧪 Tests &nbsp;·&nbsp; 🔒 Security &nbsp;·&nbsp; ⚡ Performance &nbsp;·&nbsp; 🎨 Design &nbsp;·&nbsp; 📖 Docs &nbsp;·&nbsp; 🚇 Infrastructure &nbsp;·&nbsp; ♿ Accessibility &nbsp;·&nbsp; 👀 Review

---

<br/>

## 🌟 Overview

**learnhub** is a full-stack educational web application designed to connect students with expert educators. It provides students with an intuitive, self-paced learning environment featuring video-based courses, structured progress tracking, and downloadable completion certificates. For educators, the platform offers robust course management and publishing tools, creating a seamless and premium e-learning experience for all users.

<br/>

## 🛠 Tech Stack

<div align="center">

### Backend

| | Technology | Purpose |
|---|---|---|
| <img src="https://skillicons.dev/icons?i=express" width="30"/> | **Express.js** | Web server framework for handling routes, middleware, and controllers. |
| <img src="https://skillicons.dev/icons?i=mongodb" width="30"/> | **MongoDB** | NoSQL database used to store users, courses, payments, and activity logs. |
| <img src="https://skillicons.dev/icons?i=nodejs" width="30"/> | **Node.js** | JavaScript runtime environment powering the server-side application. |

### Frontend

| | Technology | Purpose |
|---|---|---|
| <img src="https://skillicons.dev/icons?i=react" width="30"/> | **React** | Frontend library for building a dynamic, component-based user interface. |
| <img src="https://skillicons.dev/icons?i=mui" width="30"/> | **Material UI (MUI)** | Component library used for styled tables, dashboard buttons, and icons. |
| <img src="https://skillicons.dev/icons?i=bootstrap" width="30"/> | **Bootstrap** | CSS framework providing responsive grid layouts, forms, and modal components. |

### Tooling & DevX

| | Technology | Purpose |
|---|---|---|
| <img src="https://skillicons.dev/icons?i=vite" width="30"/> | **Vite** | Fast, modern frontend build tool and development server. |
| <img src="https://skillicons.dev/icons?i=postman" width="30"/> | **Axios** | Promise-based HTTP client for making API requests to the backend. |

</div>

<br/>

## ✨ Key Features

<table>
<tr>
<td width="33%" valign="top">

### 👨‍🎓 Student
- Browse and search courses by title or category.
- Secure payment-simulated enrollment for paid courses, and instant access to free courses.
- Stream course content seamlessly with an integrated video player.
- Track learning progress by marking sections complete and download PDF certificates.

</td>
<td width="33%" valign="top">

### 👩‍🏫 Teacher / Educator
- Create new courses with title, categories, description, and pricing options.
- Upload structured lectures/sections as `.mp4` video files.
- Manage self-authored courses, including monitoring student enrollment numbers.
- Delete self-created courses from the library.

</td>
<td width="33%" valign="top">

### 🛡️ Admin
- Access a secure, dedicated administrative portal to monitor the entire platform.
- Manage users by viewing all registered accounts and deleting accounts if necessary.
- Manage all platform courses, including the ability to delete any course.
- View system activity logs, enrollments, and track course payment transactions.

</td>
</tr>
</table>

<br/>

## 📁 Project Structure

```
learnhub/
│
├── backend/                    # Express API and database models
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # Express routes
│   │   ├── middleware/         # Auth verification middlewares
│   │   └── config/             # DB Connection configuration
│   ├── .env
│   └── package.json
│
└── frontend/                   # React SPA powered by Vite
    ├── src/
    │   ├── pages/              # Routing pages
    │   ├── hooks/              # Custom React hooks (if any)
    │   └── components/         # Frontend components grouped by Admin/User/Common
    └── package.json
```

<br/>

## 🚀 Getting Started

> ℹ️ There is currently no live demo — please run the project locally using the steps below.

### Prerequisites

- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white) **Node.js 18+**
- ![MongoDB](https://img.shields.io/badge/MongoDB-local_or_cloud-47A248?style=flat&logo=mongodb&logoColor=white) **MongoDB**

---

### 1. Clone & Install

```bash
git clone https://github.com/udaycodespace/learnhub.git
cd learnhub

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment

Create a `backend/.env` file:

```env
PORT=5000
MONGO_DB=mongodb://localhost:27017/video-course-application
JWT_KEY=your_jwt_secret_key
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Run Locally

```bash
# Terminal A — Backend
cd backend
npm start
# → Server running at http://localhost:5000
```

```bash
# Terminal B — Frontend
cd frontend
npm run dev
# → App running at http://localhost:5173
```

### 4. Seed Demo Data *(optional)*

```bash
# TODO: confirm (No database seeder script available in this project)
```

<br/>

## 🔑 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | `TODO: confirm` | `TODO: confirm` |
| Teacher | `TODO: confirm` | `TODO: confirm` |
| Admin | `admin` | `admin123` |

<br/>

## 🪝 Notable Custom Hooks

```ts
// TODO: confirm (No custom hooks detected in frontend)
// const { hookExports } = useCustomHook();
```

<br/>

## 📜 Scripts

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `npm start` | Starts the backend server in development mode using nodemon |

### Frontend (`frontend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the production bundle |
| `npm run preview` | Previews the production build locally |

<br/>

## 🌐 Deployment

> 🚧 **Status: Not yet deployed.** LearnHub currently runs in local development only. Hosted deployment is on the roadmap — planned steps below.

**Planned deployment plan:**

1. **Environment variables** — `PORT`, `MONGO_DB`, `JWT_KEY`, `CLIENT_ORIGIN` will need to be set on the hosting provider.
2. **Frontend (planned)** — Build via `npm run build` and host the static `dist/` output on a platform such as Vercel or Netlify.
3. **Backend (planned)** — Deploy the Express server to a Node-friendly host such as Render or Railway, connected to a managed MongoDB instance (e.g. MongoDB Atlas).
4. **Database (planned)** — Migrate from local MongoDB to a managed cloud instance before go-live.

```bash
# Example (future): run backend with PM2 once deployed
pm2 start index.js --name learnhub-api
```

*Contributions toward CI/CD setup and deployment configuration are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).*

<br/>

## 📄 License

Distributed under the **ISC License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

<br/>

**Built with 💙 as a flagship full-stack e-learning project**

*If you found this project helpful, please consider giving it a ⭐*

<br/>

[![Tech](https://skillicons.dev/icons?i=mongodb,express,react,nodejs,mui,bootstrap,vite)](https://skillicons.dev)

</div>