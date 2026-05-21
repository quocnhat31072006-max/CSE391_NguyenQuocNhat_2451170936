    const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const count = document.querySelector("#count");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// ================= RENDER =================
function render() {
    list.innerHTML = "";

    let filtered = todos;

    if (currentFilter === "active") {
        filtered = todos.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        filtered = todos.filter(t => t.completed);
    }

    filtered.forEach(todo => {
        const li = document.createElement("li");
        li.dataset.id = todo.id;

        li.innerHTML = `
            <span class="${todo.completed ? "completed" : ""}">
                ${todo.text}
            </span>
            <div>
                <button class="edit">✏️</button>
                <button class="delete">❌</button>
            </div>
        `;

        list.appendChild(li);
    });

    updateCount();
    localStorage.setItem("todos", JSON.stringify(todos));
}

// ================= ADD =================
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = input.value.trim();
    if (!value) return;

    todos.push({
        id: Date.now(),
        text: value,
        completed: false
    });

    input.value = "";
    render();
});

// ================= EVENT DELEGATION =================
list.addEventListener("click", (e) => {
    const id = Number(e.target.closest("li").dataset.id);

    // DELETE
    if (e.target.classList.contains("delete")) {
        todos = todos.filter(t => t.id !== id);
    }

    // TOGGLE
    if (e.target.tagName === "SPAN") {
        todos = todos.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
    }

    // EDIT
    if (e.target.classList.contains("edit")) {
        const newText = prompt("Edit todo:");
        if (newText) {
            todos = todos.map(t =>
                t.id === id ? { ...t, text: newText } : t
            );
        }
    }

    render();
});

// ================= FILTER =================
document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        render();
    });
});

// ================= CLEAR COMPLETED =================
document.querySelector("#clearCompleted").addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    render();
});

// ================= COUNT =================
function updateCount() {
    const active = todos.filter(t => !t.completed).length;
    count.textContent = `${active} items left`;
}

// ================= INIT =================
render();