# 🍳 Recipe Ideas — React + Vite + Tailwind

A simple web app to find **recipe ideas by ingredient** using the free **TheMealDB** API.
Built as part of the **Aganitha Full Stack Developer** take-home challenge.

> **Candidate ID :** Naukri1025
> **Live Demo :** 🖐 *https://stackblitz.com/github/anjali-1607/aganitha-recipe-ideas?file=README.md*
> **ChatGPT Link (Level 1)** : 🖐 *https://chatgpt.com/share/6901d924-1a40-800c-b99b-c5a07f43b192*

---

## 🚀 Overview

Search for meals based on an ingredient (e.g. `egg`, `chicken`, `paneer`).
The app fetches data from TheMealDB and displays recipe cards with images and “View Recipe” links.

---

## ✨ Features

* 🔍 Ingredient-based search
* ⚡ Instant API results with loading state
* 📱 Responsive card layout (Tailwind CSS)
* 🙌 Error & “no results” handling
* 🧭 Clean and minimal UI for clarity

---

## 🧮 Tech Stack

| Layer    | Technology           |
| -------- | -------------------- |
| Frontend | React (Vite)         |
| Styling  | Tailwind CSS         |
| Data     | TheMealDB Public API |
| Build    | Vite 7 (ESM)         |
| Lang     | JavaScript (ES2023)  |

---

## ⚙️ Setup  (Development)

```bash
# Clone the repo
git clone https://github.com/anjali-1607/aganitha-recipe-ideas.git
cd aganitha-recipe-ideas

# Install dependencies
npm install

# Run development server
npm run dev
# Open the printed URL (e.g. http://localhost:5173)
```

### 🧱 Build & Preview (Production)

```bash
npm run build
npm run preview
```

---

## 🗂️ Project Structure

```
src/
 ├─ components/
 │   ├─ SearchBar.jsx
 │   └─ RecipeCard.jsx
 ├─ App.jsx
 ├─ main.jsx
 └─ index.css
```

---

## 🔗 API Reference

**Endpoint**

```
https://www.themealdb.com/api/json/v1/1/filter.php?i=<ingredient>
```

**Example**

```
https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken
```

**Returns**

```json
{
  "meals": [
    {
      "strMeal": "Brown Stew Chicken",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg",
      "idMeal": "52940"
    }
  ]
}
```

If `meals` is `null`, no results are found.

---

## 💅 Design Notes

* Built with Tailwind for fast styling and mobile responsiveness
* Simple two-component architecture (Search Bar + Recipe Grid)
* Clear typography and color contrast for readability

---

## ✅ Submission Checklist (Aganitha)

* [x] Working app deployed to CodeSandbox / StackBlitz
* [x] ChatGPT conversation link (shared as Level 1)
* [x] GitHub repository with README (Level 3)
* [x] Candidate ID included → `Naukri1025`

---

## 🪪 License

MIT © 2025 Rishabh Sahu

---

**Thank you Aganitha team for reviewing this submission 💡**
The project emphasizes clean code, clarity, and a solid understanding of React and frontend development.
