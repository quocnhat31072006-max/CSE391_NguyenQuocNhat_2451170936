## Phần A

### Câu A1 (5đ) — Viewport & Mobile-First

1. Viết chính xác thẻ `<meta viewport>` chuẩn. Giải thích từng thuộc tính.

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   ```

   - `width=device-width`  
     → chiều rộng trang bằng chiều rộng thiết bị

   - `initial-scale=1.0`  
     → mức zoom ban đầu là 100%

   ***

2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào? (Đọc chương 13)

   Nếu thiếu thẻ viewport:
   - iPhone sẽ render trang như desktop (~980px)
   - nội dung bị thu nhỏ
   - chữ rất bé
   - phải zoom tay để đọc

   ***

3. Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px. Tại sao Mobile-First được khuyên dùng?

   Mobile-First:
   - viết CSS cho mobile trước
   - dùng `min-width`

   ```css
   .box {
     width: 100%;
   }

   @media (min-width: 768px) {
     .box {
       width: 50%;
     }
   }
   ```

   Desktop-First:
   - viết CSS desktop trước
   - dùng `max-width`

   ```css
   .box {
     width: 50%;
   }

   @media (max-width: 768px) {
     .box {
       width: 100%;
     }
   }
   ```

   Mobile-First được khuyên dùng vì:
   - tối ưu mobile trước
   - performance tốt hơn
   - responsive dễ mở rộng
   - phù hợp xu hướng mobile users hiện nay

### Câu A2 (5đ) — Breakpoints

Ghi lại breakpoints chuẩn (theo tài liệu hoặc Bootstrap). Cho mỗi breakpoint:

- Kích thước pixel
- Thiết bị đại diện
- Ví dụ: lưới sản phẩm nên hiển thị mấy cột?

Bài làm:
| Breakpoint | Pixel | Thiết bị | Grid sản phẩm |
|---|---|---|---|
| Extra Small | < 576px | Mobile nhỏ | 1 cột |
| Small | ≥ 576px | Mobile lớn | 2 cột |
| Medium | ≥ 768px | Tablet | 2-3 cột |
| Large | ≥ 992px | Laptop | 3-4 cột |
| Extra Large | ≥ 1200px | Desktop | 4-5 cột |
| XXL | ≥ 1400px | Màn hình lớn | 5-6 cột |

---

### Câu A3 (5đ) — Media Queries

Đọc CSS sau, cho biết ở mỗi kích thước màn hình, `.container` có `width` bao nhiêu? Điền bảng.

```css
.container {
  width: 100%;
  padding: 10px;
}

@media (min-width: 576px) {
  .container {
    width: 540px;
  }
}
@media (min-width: 768px) {
  .container {
    width: 720px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 960px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1140px;
  }
}
```

Bài làm:

| Chiều rộng màn hình | `.container` width |
| ------------------- | ------------------ |
| 375px (iPhone SE)   | 100%               |
| 600px               | 540px              |
| 800px               | 720px              |
| 1000px              | 960px              |
| 1400px              | 1140px             |

---

### Câu A4 (5đ) — SCSS Basics

Đọc chương 16. Giải thích 4 tính năng chính của SCSS và cho ví dụ:

1. Variables (`$primary-color`)

   Dùng để lưu giá trị tái sử dụng.

   ```scss
   $primary-color: blue;

   button {
     background: $primary-color;
   }
   ```

---

2. Nesting (viết CSS lồng nhau)

   Cho phép viết CSS lồng nhau giống cấu trúc HTML.

   ```scss
   nav {
     a {
       color: red;
     }
   }
   ```

---

3. Mixins (`@mixin`, `@include`)

   Tạo block CSS tái sử dụng.

   ```scss
   @mixin center {
     display: flex;
     justify-content: center;
     align-items: center;
   }

   .box {
     @include center;
   }
   ```

---

4. `@extend` / Inheritance

   Kế thừa style từ class khác.

   ```scss
   .button {
     padding: 10px;
   }

   .primary-btn {
     @extend .button;
     background: blue;
   }
   ```

---

Tại sao trình duyệt KHÔNG đọc được file `.scss`? Cần bước gì để chuyển SCSS → CSS?

Trình duyệt không đọc được `.scss` vì:

- SCSS không phải CSS chuẩn
- trình duyệt chỉ hiểu CSS

Cần:

- compile/transpile SCSS → CSS bằng Sass compiler

Ví dụ:

```bash
sass scss/style.scss scss/style.css
```

---

## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Phân tích trang web thực

Website chọn: YouTube

---

375px (Mobile)

- Navigation đổi thành hamburger menu
- Sidebar bị ẩn
- Video hiển thị 1 cột
- Một số nút text bị đổi thành icon
- Font size nhỏ hơn desktop

---

768px (Tablet)

- Sidebar thu gọn
- Video hiển thị khoảng 2-3 cột
- Navigation vẫn compact
- Một số menu dropdown xuất hiện

---

1440px (Desktop)

- Sidebar hiện đầy đủ
- Header hiển thị search bar và nhiều nút
- Grid video mở rộng 4-6 cột
- Font size lớn hơn và khoảng cách rộng hơn

---

Media queries quan sát được:

- `@media (max-width: 768px)`
- `@media (min-width: 1200px)`

---

### Câu C2 (10đ) — Thiết kế Responsive Strategy

Thiết kế trang Đặt bàn nhà hàng responsive.

Mobile (375px):

- Header: logo + số điện thoại trên cùng
- Hero image chiếm toàn màn hình phía trên
- Grid 6 ảnh món ăn 1 cột
- Form đặt bàn nằm dưới hero
- Bản đồ có thể ẩn hoặc đặt ở cuối trang

Tablet (768px):

- Header vẫn ngang, logo + số điện thoại rõ hơn
- Hero image giảm chiều cao nhưng vẫn nổi bật
- Grid ảnh 2 cột
- Form đặt bàn xuất hiện bên dưới grid ảnh
- Bản đồ nằm dưới form hoặc cạnh form nếu đủ rộng

Desktop (1440px):

- Layout 2-3 cột
- Sidebar form đặt bàn bên phải hoặc bên trái
- Grid ảnh 3 cột
- Hero image rộng, nội dung và ảnh song song
- Bản đồ ở phải hoặc dưới form, dễ nhìn

CSS skeleton Mobile-First:

```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.container {
  padding: 16px;
}

.header,
.hero,
.gallery,
.booking-form,
.map,
.footer {
  margin-bottom: 24px;
}

.gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.booking-form,
.map {
  width: 100%;
}

@media (min-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .layout-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .layout-row {
    grid-template-columns: 2fr 1fr;
  }

  .gallery {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .map {
    height: 420px;
  }
}
```

### Câu C2 (10đ) — Thiết kế Responsive Strategy

Bạn được giao thiết kế trang **Đặt bàn nhà hàng** responsive. Trang có:

- Header với logo + điện thoại đặt bàn
- Hero image toàn trang
- Grid 6 ảnh món ăn
- Form đặt bàn (ngày, giờ, số người, ghi chú)
- Bản đồ Google Maps nhúng
- Footer

**Yêu cầu:** Vẽ wireframe (sơ đồ bố cục) cho 3 kích thước: Mobile, Tablet, Desktop.

- Mobile: Những gì bị ẩn? Form nằm đâu?
- Tablet: Grid ảnh mấy cột? Bản đồ nằm đâu?
- Desktop: Layout bao nhiêu cột? Sidebar có không?

Viết CSS skeleton (chỉ layout, không cần chi tiết) dùng Grid + Media Queries Mobile-First.

---

Bài làm:

Mobile (375px)

- Layout 1 cột
- Navigation thu gọn
- Hero full width
- Grid món ăn: 1 cột
- Form đặt bàn nằm dưới gallery
- Google Maps nằm cuối trang
- Một số text phụ có thể ẩn

---

Tablet (768px)

- Layout 2 cột nhẹ
- Grid món ăn: 2-3 cột
- Form đặt bàn nằm cạnh hoặc dưới gallery
- Google Maps đặt dưới form

---

Desktop (1440px)

- Layout nhiều cột
- Grid món ăn: 3 cột
- Form + Google Maps đặt cạnh nhau
- Header đầy đủ menu + hotline
- Không cần sidebar

---

CSS Skeleton

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.booking-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

/* Tablet */
@media (min-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }

  .booking-layout {
    grid-template-columns: 1fr 1fr;
  }
}

/* Desktop */
@media (min-width: 1200px) {
  .gallery {
    grid-template-columns: repeat(3, 1fr);
  }

  .booking-layout {
    grid-template-columns: 1fr 1fr;
  }
}
```
