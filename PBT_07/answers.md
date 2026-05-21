# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1

### Đoạn 1
```javascript
console.log(x);
var x = 5;
```

Output:
```javascript
undefined
```

Giải thích:
- `var` được hoisting
- biến tồn tại trước khi gán giá trị

---

### Đoạn 2
```javascript
console.log(y);
let y = 10;
```

Output:
```javascript
ReferenceError
```

Giải thích:
- `let` có TDZ (Temporal Dead Zone)

---

### Đoạn 3
```javascript
const z = 15;
z = 20;
```

Output:
```javascript
TypeError
```

Giải thích:
- `const` không thể gán lại

---

### Đoạn 4
```javascript
const arr = [1,2,3];
arr.push(4);
```

Output:
```javascript
[1,2,3,4]
```

Giải thích:
- không đổi reference
- chỉ thay đổi nội dung mảng

---

### Đoạn 5
```javascript
Trong block: 2
Ngoài block: 1
```

Giải thích:
- `let` có block scope

---

## Câu A2

```javascript
typeof null           // object
typeof undefined      // undefined
typeof NaN            // number
"5" + 3               // "53"
"5" - 3               // 2
"5" * "3"             // 15
true + true           // 2
[] + []               // ""
[] + {}               // "[object Object]"
{} + []               // 0
```

Giải thích:
- `+` ưu tiên nối chuỗi
- `-` luôn ép kiểu sang number

---

## Câu A3

```javascript
5 == "5"              // true
5 === "5"             // false
null == undefined     // true
null === undefined    // false
NaN == NaN            // false
0 == false            // true
0 === false           // false
"" == false           // true
```

Nên dùng:
```javascript
===
```

Vì:
- so sánh cả giá trị và kiểu dữ liệu
- tránh lỗi ép kiểu

---

## Câu A4

Falsy values:
```javascript
false
0
-0
0n
""
null
undefined
NaN
```

Kết quả:

```javascript
"A"  // có
"B"  // không
"C"  // có
"D"  // có
"E"  // không
"F"  // không
"G"  // có
"H"  // có
```

---

## Câu A5

### Cách 1
```javascript
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

### Cách 2
```javascript
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

### Cách 3
```javascript
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

---

# PHẦN C

## Câu C1

Lỗi 1:
```javascript
if (giaSauGiam = 0)
```

Sai:
- dùng phép gán `=`

Đúng:
```javascript
if (giaSauGiam === 0)
```

---

Lỗi 2:
```javascript
"100000"
```

Sai:
- truyền string thay vì number

Đúng:
```javascript
100000
```

---

Lỗi 3:
Không kiểm tra `giaBan`

Sửa:
```javascript
if (typeof giaBan !== "number")
```

---

Lỗi 4:
Không kiểm tra số âm

Sửa:
```javascript
if (giaBan < 0)
```

---

Lỗi 5:

Không kiểm tra phanTramGiam có phải number hay không

Sửa:
if (typeof phanTramGiam !== "number")

---

Lỗi 6:
```javascript
var i
```

Trong `setTimeout`, `var` dùng chung biến.

Kết quả:
```javascript
Item 5
Item 5
Item 5
```

Sửa:
```javascript
for (let i = 0; i < 5; i++)
```

Vì:
- `let` tạo block scope riêng cho mỗi vòng lặp