// ===== Responsive Calculator =====
// Concepts: state machine, DOM events, keyboard input, edge-case handling

const output = document.getElementById("output");
const history = document.getElementById("history");

// Calculator state
const state = {
  current: "0",     // number being typed
  previous: null,   // stored operand
  operator: null,   // pending operator
  justEvaluated: false,
};

// ---------- Display ----------
function updateDisplay() {
  output.textContent = formatNumber(state.current);
  history.textContent =
    state.previous !== null && state.operator
      ? `${formatNumber(state.previous)} ${symbol(state.operator)}`
      : "";
  // Highlight active operator button
  document.querySelectorAll(".key--op").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.op === state.operator && !state.justEvaluated);
  });
}

function formatNumber(n) {
  const str = String(n);
  if (str === "Error") return str;
  const [intPart, decPart] = str.split(".");
  const formatted = Number(intPart).toLocaleString("en-US");
  return decPart !== undefined ? `${formatted}.${decPart}` : formatted;
}

function symbol(op) {
  return { "+": "+", "-": "−", "*": "×", "/": "÷" }[op] || op;
}

// ---------- Input handlers ----------
function inputDigit(d) {
  if (state.justEvaluated) {
    state.current = d;
    state.justEvaluated = false;
  } else {
    state.current = state.current === "0" ? d : state.current + d;
  }
  updateDisplay();
}

function inputDecimal() {
  if (state.justEvaluated) {
    state.current = "0.";
    state.justEvaluated = false;
  } else if (!state.current.includes(".")) {
    state.current += ".";
  }
  updateDisplay();
}

function chooseOperator(op) {
  if (state.current === "Error") return;
  if (state.operator && !state.justEvaluated && state.previous !== null) {
    compute();
  }
  state.previous = parseFloat(state.current);
  state.operator = op;
  state.justEvaluated = false;
  state.current = "0";
  updateDisplay();
  // After choosing operator, "current" is reset but we want the next digit to start fresh
  // Use a flag: we treat the next digit input by checking state.current === "0"
}

function compute() {
  if (state.operator === null || state.previous === null) return;
  const a = state.previous;
  const b = parseFloat(state.current);
  let result;
  switch (state.operator) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/":
      if (b === 0) { result = "Error"; break; }
      result = a / b; break;
  }
  if (result !== "Error") {
    // Round to avoid floating-point junk like 0.1+0.2=0.30000000000000004
    result = Math.round((result + Number.EPSILON) * 1e10) / 1e10;
  }
  state.current = String(result);
  state.previous = null;
  state.operator = null;
  state.justEvaluated = true;
  updateDisplay();
}

function clearAll() {
  state.current = "0";
  state.previous = null;
  state.operator = null;
  state.justEvaluated = false;
  updateDisplay();
}

function toggleSign() {
  if (state.current === "0" || state.current === "Error") return;
  state.current = state.current.startsWith("-")
    ? state.current.slice(1)
    : "-" + state.current;
  updateDisplay();
}

function percent() {
  if (state.current === "Error") return;
  state.current = String(parseFloat(state.current) / 100);
  updateDisplay();
}

// ---------- Click events ----------
document.querySelectorAll(".key").forEach((btn) => {
  btn.addEventListener("click", () => {
    const { num, op, action } = btn.dataset;
    if (num !== undefined) inputDigit(num);
    else if (op !== undefined) chooseOperator(op);
    else if (action === "decimal") inputDecimal();
    else if (action === "equals") compute();
    else if (action === "clear") clearAll();
    else if (action === "sign") toggleSign();
    else if (action === "percent") percent();
  });
});

// ---------- Keyboard support ----------
document.addEventListener("keydown", (e) => {
  const k = e.key;
  if (/^[0-9]$/.test(k)) inputDigit(k);
  else if (k === ".") inputDecimal();
  else if (["+", "-", "*", "/"].includes(k)) chooseOperator(k);
  else if (k === "Enter" || k === "=") { e.preventDefault(); compute(); }
  else if (k === "Escape") clearAll();
  else if (k === "Backspace") {
    state.current = state.current.length > 1 ? state.current.slice(0, -1) : "0";
    updateDisplay();
  } else if (k === "%") percent();
});

// Initial render
updateDisplay();
