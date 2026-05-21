function createCart() {
    let items = [];
    let discount = 0;

    function findItem(productId) {
        return items.find(i => i.product.id === productId);
    }

    return {
        addItem(product, quantity = 1) {
            const existing = findItem(product.id);

            if (existing) {
                existing.quantity += quantity;
            } else {
                items.push({ product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(i => i.product.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            const item = findItem(productId);
            if (item) item.quantity = newQuantity;
        },

        getTotal() {
            let total = items.reduce(
                (sum, i) => sum + i.product.price * i.quantity,
                0
            );

            if (discount > 0) {
                total = total - total * discount;
            }

            return total;
        },

        applyDiscount(code) {
            if (code === "SALE10") discount = 0.1;
            else if (code === "SALE20") discount = 0.2;
            else if (code === "FREESHIP") discount = 30000;
        },

        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng │");

            items.forEach((i, idx) => {
                const total = i.product.price * i.quantity;

                console.log(
                    `│ ${idx + 1} │ ${i.product.name.padEnd(12)} │ ${i.quantity
                        .toString()
                        .padStart(2)} │ ${i.product.price
                        .toLocaleString()
                        .padStart(10)} │ ${total
                        .toLocaleString()
                        .padStart(10)} │`
                );
            });

            console.log("├──────────────────────────────────────────────┤");
            console.log(
                "│ Tổng cộng: " +
                    this.getTotal().toLocaleString() +
                    "đ │"
            );
            console.log("└──────────────────────────────────────────────┘");
        },

        getItemCount() {
            return items.reduce((sum, i) => sum + i.quantity, 0);
        },

        clearCart() {
            items = [];
            discount = 0;
        }
    };
}

// ================= TEST =================

const cart = createCart();

console.log("\n=== ADD ITEMS ===");

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

console.log("\n=== DISCOUNT ===");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("\n=== COUNT ===");
console.log(cart.getItemCount());