const foods = [
    { name: "Pho Bo", price: 65000, quantity: 2 },
    { name: "Tra Da", price: 5000, quantity: 3 },
    { name: "Bun Cha", price: 55000, quantity: 1 }
];

const isWednesday = true;
const hasTip = true;

let total = 0;

console.log("╔══════════════════════════════════════╗");
console.log("║          HOA DON NHA HANG           ║");
console.log("╠══════════════════════════════════════╣");

for (let i = 0; i < foods.length; i++) {

    let item = foods[i];
    let itemTotal = item.price * item.quantity;

    total += itemTotal;

    console.log(
        `${i + 1}. ${item.name} x${item.quantity} = ${itemTotal.toLocaleString()}đ`
    );
}

console.log("╠══════════════════════════════════════╣");

let discount = 0;

if (total > 1000000) {
    discount = total * 0.15;
}
else if (total > 500000) {
    discount = total * 0.10;
}

if (isWednesday) {
    discount += total * 0.05;
}

let afterDiscount = total - discount;

let vat = afterDiscount * 0.08;

let tip = 0;

if (hasTip) {
    tip = afterDiscount * 0.05;
}

let finalTotal = afterDiscount + vat + tip;

console.log(`Tong cong: ${total.toLocaleString()}đ`);
console.log(`Giam gia: ${discount.toLocaleString()}đ`);
console.log(`VAT (8%): ${vat.toLocaleString()}đ`);
console.log(`Tip (5%): ${tip.toLocaleString()}đ`);

console.log("╠══════════════════════════════════════╣");

console.log(`THANH TOAN: ${finalTotal.toLocaleString()}đ`);

console.log("╚══════════════════════════════════════╝");