const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", rating: 4.5, inStock: true },
    { id: 2, name: "Samsung S24", price: 22990000, category: "phone", rating: 4.4, inStock: true },
    { id: 3, name: "MacBook Pro", price: 45990000, category: "laptop", rating: 4.8, inStock: true },
    { id: 4, name: "Dell XPS", price: 35990000, category: "laptop", rating: 4.6, inStock: true },
    { id: 5, name: "iPad Air", price: 16990000, category: "tablet", rating: 4.6, inStock: true },
    { id: 6, name: "Xiaomi Pad", price: 7990000, category: "tablet", rating: 4.2, inStock: true },
    { id: 7, name: "AirPods Pro", price: 6990000, category: "accessory", rating: 4.3, inStock: true },
    { id: 8, name: "Galaxy Buds", price: 3490000, category: "accessory", rating: 4.1, inStock: true }
];

let filtered = [...products];
let cartCount = 0;

// ================= RENDER =================
function render() {
    const list = document.querySelector("#productList");
    list.innerHTML = "";

    filtered.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>${p.price.toLocaleString()}đ</p>
            <p>⭐ ${p.rating}</p>
            <button class="add">Add to cart</button>
        `;

        // modal
        div.addEventListener("click", () => showModal(p));

        // add cart
        div.querySelector(".add").addEventListener("click", (e) => {
            e.stopPropagation();
            cartCount++;
            document.querySelector("#badge").textContent = cartCount;
        });

        list.appendChild(div);
    });
}

// ================= SEARCH =================
document.querySelector("#search").addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase();

    filtered = products.filter(p =>
        p.name.toLowerCase().includes(val)
    );

    render();
});

// ================= CATEGORY =================
document.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
        const cat = btn.dataset.cat;

        filtered = cat === "all"
            ? products
            : products.filter(p => p.category === cat);

        render();
    });
});

// ================= SORT =================
document.querySelector("#sort").addEventListener("change", (e) => {
    const val = e.target.value;

    if (val === "asc") {
        filtered.sort((a,b) => a.price - b.price);
    }
    if (val === "desc") {
        filtered.sort((a,b) => b.price - a.price);
    }
    if (val === "name") {
        filtered.sort((a,b) => a.name.localeCompare(b.name));
    }
    if (val === "rating") {
        filtered.sort((a,b) => b.rating - a.rating);
    }

    render();
});

// ================= MODAL =================
const modal = document.querySelector("#modal");
const modalBody = document.querySelector("#modalBody");

function showModal(p) {
    modal.classList.remove("hidden");
    modalBody.innerHTML = `
        <h2>${p.name}</h2>
        <p>Price: ${p.price.toLocaleString()}đ</p>
        <p>Rating: ${p.rating}</p>
    `;
}

document.querySelector("#close").addEventListener("click", () => {
    modal.classList.add("hidden");
});

// ================= DARK MODE =================
document.querySelector("#darkMode").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// INIT
render();