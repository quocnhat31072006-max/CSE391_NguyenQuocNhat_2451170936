## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — 3 Cách nhúng CSS

Đọc chương 08. Liệt kê 3 cách nhúng CSS vào HTML (inline, internal, external). Mỗi cách:

- Viết 1 ví dụ code
- Ưu điểm và nhược điểm
- Khi nào nên dùng

**Câu hỏi thêm:** Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách nào "thắng"? Giải thích tại sao.

### 1. Inline CSS

- Ví dụ:
  `<p style="color: red;">Hello</p>`

- Ưu điểm:
  - Nhanh, đơn giản
  - Áp dụng trực tiếp 1 phần tử

- Nhược điểm:
  - Khó bảo trì
  - Không tái sử dụng
  - Làm rối HTML

- Khi dùng:
  - Test nhanh
  - Style tạm thời

### 2. Internal CSS

- Ví dụ:
  `<style> p { color: blue; } </style>`

- Ưu điểm:
  - Dễ quản lý trong 1 file
  - Không cần file ngoài

- Nhược điểm:
  - Chỉ dùng cho 1 trang
  - Không tái sử dụng nhiều trang

- Khi dùng:
  - Trang nhỏ
  - Demo / bài tập

### 3. External CSS

- Ví dụ:
  `<link rel="stylesheet" href="style.css">`

- Ưu điểm:
  - Tái sử dụng nhiều trang
  - Dễ bảo trì
  - Tách biệt HTML và CSS

- Nhược điểm:
  - Cần thêm file
  - Load chậm hơn chút

- Khi dùng:
  - Dự án thực tế
  - Website nhiều trang

### Câu hỏi thêm

- Nếu cùng áp dụng cả 3 cách thì:
- Inline CSS thắng
- Internal và External có cùng mức → cái nào khai báo sau sẽ thắng
  CSS áp dụng theo từng element, không áp dụng toàn bộ

- Giải thích:
  - CSS áp dụng theo từng element.
  - Inline chỉ ảnh hưởng phần tử nó gắn vào. Với các rule cùng mức (internal và external), rule khai báo sau sẽ được áp dụng.

### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

Cho HTML sau:

```html
<div id="app">
  <header class="top-bar dark">
    <h1>ShopTLU</h1>
    <nav>
      <a href="/" class="active">Home</a>
      <a href="/products">Products</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <article class="product">
      <h2>iPhone 16</h2>
      <p class="price">25.990.000đ</p>
      <p>Mô tả sản phẩm...</p>
    </article>
    <article class="product featured">
      <h2>MacBook Pro</h2>
      <p class="price">45.990.000đ</p>
      <p>Mô tả sản phẩm...</p>
    </article>
  </main>
</div>
```

**Không chạy code**, cho biết mỗi selector sau chọn được element nào? (Ghi cụ thể text content)

```css
1. h1                           → Chọn: ShopTLU
2. .price                       → Chọn: 25.990.000đ, 45.990.000đ
3. #app header                  → Chọn: Toàn bộ phần header(ShopTLU,Home,Products,About)
4. nav a:first-child             → Chọn: Home
5. .product.featured h2         → Chọn: MacBook Pro
6. article > p                  → Chọn: 25.990.000đ, Mô tả sản phẩm..., 45.990.000đ, Mô tả sản phẩm...
7. a[href="/"]                  → Chọn: Home
8. .top-bar.dark h1              → Chọn: ShopTLU
```

### Câu A3 (7đ) — Box Model — Tính toán kích thước

Đọc chương 11 (Box Model). Tính **kích thước thực tế** (chiều rộng thực tế render trên browser) cho mỗi trường hợp sau:

```css
/* Trường hợp 1: content-box (mặc định) */
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = width + 2*padding + 2*border = 400 + 2 * 20 + 2 * 5 = 450px
→ Không gian chiếm trên trang = Chiều rộng hiển thị + 2 * margin  = 450 + 2 * 10 = 470px

/* Trường hợp 2: border-box */
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế =  400 - 2*20 - 2*5 = 350px
→ Không gian chiếm trên trang = 400 + 2*10 = 420px

/* Trường hợp 3: Margin collapse */
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
→ Khoảng cách giữa box-a và box-b = 40
→ Giải thích tại sao KHÔNG PHẢI 65px
  - Vì margin dọc KHÔNG cộng và chỉ lấy giá trị lớn hơn nhất nếu:
    - 2 box đều có magrin giá trị dương
```

**Nâng cao:** Nếu `.box-a` có `margin-bottom: -10px` và `.box-b` có `margin-top: 40px`, khoảng cách = bao nhiêu?
vì có 1 giá trị âm và 1 giá trị dương nên Khoảng cách = margin-top + margin-bottom
- khoảng cách giữa chúng là: -10 + 40 = 30px

### Câu A4 (5đ) — Specificity (Độ ưu tiên)

Cho các CSS rules sau cùng target 1 element `<p class="price" id="main-price">`:

```css
p { color: black; }                    /* Rule A */
.price { color: blue; }               /* Rule B */
#main-price { color: red; }           /* Rule C */
p.price { color: green; }             /* Rule D */
```

1. Tính specificity score (a, b, c) cho mỗi rule
Rule A: p
  - (0, 0, 1)
Rule B: .price
  - (0, 1, 0)
Rule C: #main-price
  - (1, 0, 0)
Rule D: p.price
  - (0, 1, 1)
2. Element sẽ có màu gì? Giải thích
- Màu: đỏ 
  - vì #main-price (1,0,0) > tất cả các rule còn lại
3. Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element có màu gì?
- Màu: cam
- vì:
  - inline style > tất cả selector CSS thường
4. Nếu Rule A thêm `!important`, element có màu gì? Tại sao?
- Màu: black
  - vì !important > tất cả rule khác (kể cả id)

---

## PHẦN B 

### Câu B1
- các loại selector sử dụng:
  - element : body, header, table, th, td
  - class: .caption
  - id: #contact
  - descendant: nav a
  - pseudo-class: nav a:hover, tr:nth-child(even)

### Câu B2
**Phần 1:**

  Hộp 1 (content-box): chiều rộng thực tế = 350px
  Hộp 2 (border-box): chiều rộng thực tế = 300px

  Giải thích:
  - content-box: width chỉ tính phần content, nên padding và border làm tăng kích thước tổng
  → 300 + 40 + 10 = 350px

  - border-box: width đã bao gồm padding và border
  → tổng vẫn giữ nguyên 300px

**Phần 2:**

  Không dùng border-box:
  - Sidebar: 250 + 30 = 280px
  - Content: 500 + 40 = 540px
  - Ads: 250 + 30 = 280px
  → Tổng = 1100px > 1000px → layout bị tràn

  Dùng border-box:
  - Sidebar: 250px
  - Content: 500px
  - Ads: 250px
  → Tổng = 1000px → layout đúng

  Kết luận:
  - Không dùng border-box → padding làm tăng kích thước
  - Dùng border-box → giữ đúng kích thước mong muốn

---

## PHẦN C — DEBUG & SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug CSS Layout

Layout dưới đây bị vỡ. Container rộng `960px`, sidebar + content phải nằm **cạnh nhau**. Nhưng content bị đẩy xuống dòng mới.

```css
.container {
    width: 960px;
    margin: 0 auto;
}
.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

1. Tính chiều rộng **thực tế** của sidebar và content (content-box!)
  - sidebar = 300 + 2*20 + 2*1 = 342px
  - content = 660 + 2*30 + 2*1 = 722px

2. Giải thích tại sao layout bị vỡ
  - Nguyên nhân là vì kích thước cả 2 (1064px) vượt quá khung chưa container (960)

3. Đưa ra **2 cách sửa** khác nhau (1 cách dùng border-box, 1 cách không dùng)
  - Cách 1: dùng `box-sizing: border-box;`
  - Cách 2: tự chỉnh tay để giảm width của sidebar hoạc content
    VD:
    ```css
      .sidebar {
          width: 258px; /* 300 - 42 */
      }

      .content {
          width: 598px; /* 660 - 62 */
      }
    ```
### Câu C2

**Không chạy code**, trả lời:
1. "Sản phẩm A" (h2) có `font-size` = 20px và `color` = green
2. "Mô tả sản phẩm" (p trong card featured) có `color` = blue
3. "Sản phẩm B" (h2) có `font-size` = 20px và `color` = blue
4. "Mô tả sản phẩm B" (p.highlight) có `color` = green

Giải thích chi tiết quá trình cascade + inheritance cho mỗi câu.

1. "Sản phẩm A" (`h2.title.highlight` trong `#featured`)

font-size = **20px**

Ban đầu từ `body` là 16px, xuống `.container` còn 14px nên nếu chỉ kế thừa thì h2 sẽ là 14px.  
Nhưng vì có `.card .title` áp dụng trực tiếp lên h2 nên nó bị ghi đè thành 20px.

=> kết quả cuối: **20px**

color = **green**

Màu ban đầu từ `body` là #333, xuống `.card` thành blue nên h2 sẽ kế thừa blue.  
Sau đó `#featured .title` đổi thành red vì selector có id nên mạnh hơn.  
Nhưng cuối cùng h2 lại có class `.highlight` với `!important` nên nó override hết.

=> kết quả cuối: **green**

---

2. "Mô tả sản phẩm" (`p` trong `#featured`)

color = **blue**

Thẻ p nằm trong `.card` nên nhận màu blue từ `.card`.  
Rule `.card p { color: inherit }` chỉ đơn giản là lấy lại màu của cha, tức vẫn là blue.  
Không có gì ghi đè thêm.

=> kết quả cuối: **blue**

---

3. "Sản phẩm B" (`h2.title`)

font-size = **20px**

Giống logic ở trên: từ `body` → `.container` → nhưng cuối cùng `.card .title` áp dụng trực tiếp nên vẫn là 20px.

=> **20px**

color = **blue**

Thẻ này không nằm trong `#featured` và cũng không có `.highlight`,  
nên chỉ nhận màu từ `.card` là blue và không bị ghi đè.

=> **blue**

---

4. "Mô tả sản phẩm B" (`p.highlight`)

color = **green**

Ban đầu p nhận màu blue từ `.card`,  
`.card p` vẫn giữ nguyên (inherit).  
Nhưng vì có class `.highlight` với `!important` nên đổi thành green và thắng tất cả.

=> kết quả cuối: **green**
  