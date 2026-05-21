# 📋 PBT09 — ANSWERS

---

# PHẦN A

## A1 — DOM + QuerySelector

DOM tree:
- div#app
  - header → h1, nav
  - main → form#todoForm → input, button
         → ul#todoList → li, li

Query:
document.querySelector("h1");
document.querySelector("#todoForm input");
document.querySelectorAll(".todo-item");
document.querySelector("nav a.active");
document.querySelector("#todoList li:first-child");
document.querySelectorAll("nav a");

---

## A2 — innerHTML vs textContent

- innerHTML: render HTML → nguy hiểm XSS
- textContent: chỉ text → an toàn

XSS:
document.querySelector("#result").innerHTML =
"<img src=x onerror='alert(1)'>";

FIX:
document.querySelector("#result").textContent = userInput;

---

## A3 — Event Bubbling

Output:
BUTTON
INNER
OUTER

Nếu stopPropagation():
BUTTON

---

## A4 — Destructuring + Spread

Output:
iPhone 16 25990000 8 Titan

specs → ReferenceError

Spread:
updated.price = 23990000
updated.sale = true
product.price = 25990000

Shallow copy:
product.specs.ram = 16

---

# PHẦN C

## C1 — Debug fixed

const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", () => {
    count++;
    countDisplay.textContent = count;

    const li = document.createElement("li");
    li.textContent = "Count " + count;
    li.onclick = () => li.remove();

    historyList.appendChild(li);
});

document.querySelector("#decrementBtn").addEventListener("click", () => {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count;
    historyList.innerHTML = "";
});

document.querySelector("#clearHistory").addEventListener("click", () => {
    historyList.querySelectorAll("li").forEach(li => li.remove());
});

window.addEventListener("load", () => {
    count = Number(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
});

---

## C2 — Performance

Event delegation:
- 1 listener thay vì 1000 → tối ưu memory

DocumentFragment:

const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = i;
    fragment.appendChild(div);
}
document.body.appendChild(fragment);

Lý do nhanh:
- chỉ 1 reflow
- giảm render DOM

---

# END