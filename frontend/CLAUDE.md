
---

# 📄 `CLAUDE.md`
*(Instructions specifically for AI like Claude / ChatGPT when editing your project)*

```md
# CLAUDE.md

## 🧠 Context
This is a Next.js App Router project using modern React patterns.

You are assisting as a senior frontend developer.

---

## 🎯 Your Role
- Write clean, maintainable React code
- Follow project structure strictly
- Do not introduce unnecessary complexity

---

## 📁 Key Directories

- app/ → routing (App Router)
- components/ → reusable UI
- lib/ → API logic
- hooks/ → reusable logic

---

## ⚙️ Coding Guidelines

### Components
- Use functional components
- Keep components small
- Extract reusable parts into components/

### Data Fetching
- Prefer server-side fetching when possible
- Use `fetch` or centralized API client

---

## 🔌 API Rules
- Always use `lib/apiClient.js`
- Do NOT hardcode URLs

---

## 🧼 Clean Code Rules
- No unused variables
- No console.log in production code
- Use meaningful variable names

---

## 🚀 Performance
- Avoid unnecessary re-renders
- Use dynamic imports if needed
- Use server components by default

---

## ❗ Important Constraints
- Do NOT change folder structure unless asked
- Do NOT introduce new libraries unless necessary
- Do NOT over-engineer

---

## ✍️ When Generating Code
- Provide complete working code
- Follow existing patterns in project
- Keep it simple and readable

---

## 🧪 Debugging
- Identify root cause before fixing
- Do not apply random fixes

---

## ✅ Output Style
- Prefer minimal explanation
- Focus on code quality