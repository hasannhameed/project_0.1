# AGENTS.md

## 🧠 Project Overview
This is a Next.js (App Router) frontend application.

Tech stack:
- Next.js (App Router)
- React
- Tailwind CSS
- Axios (API calls)

Backend is a separate Node.js service.

---

## 📁 Project Structure

app/            → Routes (App Router)
components/     → Reusable UI components
lib/            → API clients & helpers
hooks/          → Custom React hooks
styles/         → Global styles

---

## ⚙️ Development Rules

### 1. Code Style
- Use functional components only
- Use arrow functions
- Prefer async/await over .then()
- Keep components small and reusable

### 2. Naming Conventions
- Components → PascalCase (UserCard.jsx)
- Functions → camelCase
- Files → kebab-case or PascalCase (consistent)

### 3. Folder Usage
- Put UI in `components/`
- Put API logic in `lib/`
- Do NOT mix UI and business logic

---

## 🔌 API Communication
- All API calls must go through `/lib/apiClient.js`
- Do NOT call backend directly inside components

Example:
```js
import api from '@/lib/apiClient';

await api.get('/users');