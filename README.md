# 📰 NewsManager — Redux & TypeScript News Dashboard

**NewsManager** is an advanced news feed management application built with React, Redux Toolkit, and TypeScript. This project demonstrates best practices in global state management, complex data sorting, and persistent browser storage.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

---

## ✨ Key Features

- **Full CRUD Cycle:** Seamlessly Add, Read, Edit, and Delete news entries.
- **Smart Sorting (via useMemo):**
    - **By Time:** Keep the latest news at the top.
    - **By Type:** Group news by importance levels (High > Medium > Low).
    - **Random:** A shuffle mode for a fresh look at your feed.
- **Priority Pinning:** "Stick" important news to the top of the list regardless of the active sorting method.
- **Visual Prioritization:** Instant recognition of importance through color-coded status indicators (Red/Orange/Green).
- **Data Persistence:** All news and settings are automatically synced with `LocalStorage` to prevent data loss on refresh.
- **Interactive UI:** A modern dark-themed interface built with Tailwind CSS, featuring smooth state transitions.

---

## 🛠 Tech Stack

- **Frontend Framework:** React (Vite-powered)
- **State Management:** Redux Toolkit (Slices, Typed Hooks)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS
- **Utilities:** Web Crypto API (for UUID generation), Native Date API

---

## 🏗 Project Architecture

The application is structured into logical layers to ensure scalability:
- `store/`: Centralized global store configuration and custom typed hooks (`useAppDispatch`, `useAppSelector`).
- `store/slices/`: Isolated business logic for news management using RTK Slices.
- `App.tsx`: High-performance main component utilizing `useMemo` for on-the-fly data filtering and sorting.

## 👨‍💻 Author
**Vladyslav Kholod**

- **LinkedIn:** https://www.linkedin.com/in/vladyslav-kholod-86647120a/
- **Telegram:** @kah13x