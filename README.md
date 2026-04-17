# Responsive Browser-Based Calculator

A clean, fully responsive calculator built with **HTML, CSS, and JavaScript**. Supports mouse clicks **and** keyboard input, handles edge cases like divide-by-zero, and avoids JavaScript floating-point quirks.

## ✨ Features
- All standard arithmetic: `+`, `−`, `×`, `÷`
- `%`, `+/−`, `AC` (clear all)
- **Keyboard support**: digits, operators, `Enter`, `Esc`, `Backspace`
- Edge-case handling: divide-by-zero shows `Error`
- Floating-point rounding (no more `0.1 + 0.2 = 0.30000000000000004`)
- Mobile-responsive layout using **CSS Grid + aspect-ratio**

## 🧠 Concepts Used
| Concept | Where |
|---|---|
| **CSS Grid + Flexbox** | Responsive 4-column key layout |
| **CSS Custom Properties** | Theme tokens in `:root` |
| **Data attributes** (`data-num`, `data-op`) | Wiring buttons to actions |
| **State machine** | `current`, `previous`, `operator`, `justEvaluated` |
| **Event delegation** | Single `keydown` listener for all keyboard input |
| **Edge cases** | Divide by zero, multiple decimals, floating-point precision |
| **Accessibility** | `aria-live`, semantic roles |

## 📁 Files
```
calculator/
├── index.html   # Layout & buttons
├── style.css    # Theme, grid layout, responsiveness
└── script.js    # State machine & keyboard handler
```

## 🚀 Run Locally
Open `index.html` in any browser.

## 🌐 Deploy to GitHub Pages

1. **Push to GitHub**:
   ```bash
   cd calculator
   git init
   git add .
   git commit -m "Initial commit: Calculator app"
   git branch -M main
   git remote add origin https://github.com/<your-username>/calculator.git
   git push -u origin main
   ```

2. **Enable Pages**: Repo → **Settings** → **Pages** → Source: `main` / `(root)` → Save.

3. Visit `https://<your-username>.github.io/calculator/`
