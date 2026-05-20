## 🅱️ TRACK A — BOOTSTRAP 5

### PHẦN A — ĐỌC HIỂU (20 điểm)

#### Câu A1 (10đ) — Grid System

Đọc tài liệu Grid System. Không chạy code, vẽ layout cho HTML sau ở 3 kích thước:

```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|---|---|---|---|
| Số cột | 1 | 2 | 4 |
| Box layout | Box xếp dọc | 2 box mỗi hàng | 4 box cùng hàng |

---

Mobile (<768px)

```txt
Box 1
Box 2
Box 3
Box 4
```

Tablet (768px - 991px)

```txt
Box 1 | Box 2
Box 3 | Box 4
```

Desktop (≥992px)

```txt
Box 1 | Box 2 | Box 3 | Box 4
```
---

**Câu hỏi thêm:** `col-md-6` nghĩa là gì? Tại sao không cần viết `col-sm-12`?
---

`col-md-6` nghĩa là:
- từ breakpoint `md` trở lên
- phần tử chiếm 6/12 cột
- tức 50% chiều rộng

---

Không cần viết `col-sm-12` vì:
- Bootstrap mặc định mobile-first
- nếu không khai báo thì block tự chiếm 100% width

#### Câu A2 (10đ) — Utilities & Components

1. Giải thích class `d-none d-md-block`. Element này hiển thị khi nào, ẩn khi nào?

`d-none d-md-block`

- `d-none` → ẩn element
- `d-md-block` → từ màn hình `md` (≥768px) thì hiện dạng `block`

---
Kết quả:
- Mobile: ẩn
- Tablet/Desktop: hiện

2. Liệt kê 5 spacing utilities (margin/padding) và giải thích. VD: `mt-3`, `px-4`, `mb-auto`

| Utility | Ý nghĩa |
|---|---|
| `mt-3` | margin-top |
| `mb-auto` | margin-bottom auto |
| `mx-2` | margin trái + phải |
| `py-4` | padding trên + dưới |
| `px-4` | padding trái + phải |

---
3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`?

| Class | Ý nghĩa |
|---|---|
| `.container` | container fixed width theo breakpoint |
| `.container-fluid` | full width 100% |
| `.container-md` | full width đến breakpoint md, sau đó fixed width |

### PHẦN C — PHÂN TÍCH (20 điểm)
#### Câu C1 (10đ) — Tùy biến Bootstrap


1.

Đổi `$primary` sang `#E63946`

Các bước:
- cài Bootstrap source + Sass
- tạo file `custom.scss`
- sửa biến trước khi import Bootstrap

```scss
$primary: #E63946;

@import "bootstrap";
```

- compile SCSS → CSS bằng:
    - VS Code Live Sass Compiler
    - npm sass
    - vite / webpack

---

2.

Không nên:

```css
.btn-primary{
    background: red;
}
```

Vì:
- phải sửa nhiều component liên quan
- dễ bị Bootstrap override
- khó maintain

Dùng SASS variable:
- đồng bộ toàn bộ theme
- button, alert, link đều đổi màu theo
- dễ bảo trì hơn

---

#### Câu C2 (10đ) — So sánh


CSS thuần:

```css
nav{
    display:flex;
    justify-content:space-between;
}

.card{
    border:1px solid #ccc;
    padding:20px;
}
```

Bootstrap:

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

<div class="card p-3">
```

---

So sánh

| CSS thuần | Bootstrap |
|---|---|
| viết nhiều CSS hơn | ít viết CSS |
| tùy biến mạnh | code nhanh |
| tốn thời gian | phát triển nhanh |
| hợp project riêng | hợp admin/shop/blog |

---

Nên dùng Bootstrap khi:
- cần làm nhanh
- project nhỏ/trung bình
- không muốn tự build UI

Không nên dùng khi:
- cần design độc quyền
- website animation/custom nhiều

---

