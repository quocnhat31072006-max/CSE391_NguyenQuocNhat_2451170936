# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1

### 1. Function Declaration

```javascript
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue,
        thuc_nhan: luong - thue
    };
}
```

### 2. Function Expression

```javascript
const tinhThueBaoHiem2 = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue,
        thuc_nhan: luong - thue
    };
};
```

### 3. Arrow Function

```javascript
const tinhThueBaoHiem3 = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thue,
        thuc_nhan: luong - thue
    };
};
```

### Hoisting

Function Declaration được hoisting hoàn toàn:

```javascript
hello();

function hello() {
    console.log("Hi");
}
```

Function Expression và Arrow Function không hoạt động trước khi khai báo:

```javascript
sayHi();

const sayHi = () => {
    console.log("Hello");
};
```

Kết quả:

```javascript
ReferenceError
```

---

## Câu A2

### Đoạn 1

```javascript
1
2
3
2
2
```

Giải thích:

* `count` được closure ghi nhớ
* increment tăng count
* decrement giảm count

---

### Đoạn 2

Output:

```javascript
var: 3
var: 3
var: 3

let: 0
let: 1
let: 2
```

Giải thích:

* `var` dùng chung 1 biến `i`
* Sau vòng lặp, `i = 3`
* `setTimeout` chạy sau nên đều in 3

`let` tạo block scope riêng cho mỗi lần lặp nên giữ giá trị riêng.

---

## Câu A3

```javascript
const nums = [1,2,3,4,5,6,7,8,9,10];

// 1
nums.filter(x => x % 2 === 0);

// 2
nums.map(x => x * 3);

// 3
nums.reduce((sum, x) => sum + x, 0);

// 4
nums.find(x => x > 7);

// 5
nums.some(x => x > 10);

// 6
nums.every(x => x > 0);

// 7
nums.map(x => `Số ${x} là ${x % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8
[...nums].reverse();
```

---

## Câu A4

```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};
```

### Destructuring

```javascript
const { name, price, specs: { ram, color } } = product;

console.log(name, price, ram, color);
```

Output:

```javascript
iPhone 16 25990000 8 Titan
```

```javascript
console.log(specs);
```

Kết quả:

```javascript
ReferenceError
```

Vì không có biến `specs` được tạo riêng.

---

### Spread

```javascript
const updated = { ...product, price: 23990000, sale: true };
```

Output:

```javascript
updated.price // 23990000
updated.sale // true
product.price // 25990000
```

Object gốc không đổi.

---

### Spread gotcha

```javascript
const copy = { ...product };

copy.specs.ram = 16;

console.log(product.specs.ram);
```

Output:

```javascript
16
```

Vì spread chỉ copy shallow copy.
Object `specs` vẫn dùng chung reference.

---

# PHẦN C

## Câu C1

### Code refactor

```javascript
const processOrders = (orders) =>
    orders
        .filter(order => order.status === "completed" && order.total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
```

### Cải thiện

* Ngắn gọn hơn
* Dễ đọc hơn
* Không dùng nested loops
* Dùng `filter`, `map`, `sort`
* Dùng destructuring + arrow function

---

## Câu C2

```javascript
const miniArray = {

    map(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }

        return result;
    },

    filter(arr, fn) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }

        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;

        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }

        return accumulator;
    }

};
```

### Test

```javascript
console.log(miniArray.map([1,2,3], x => x * 2));

console.log(miniArray.filter([1,2,3,4], x => x > 2));

console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0));
```
