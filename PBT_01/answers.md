## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — HTTP & Browser

1. Khi nhập https://shopee.vn rồi nhấn Enter:

B1: Máy tính tra cứu địa chỉ IP (DNS Lookup)
B2: Máy tính kết nối tới Server của shopee
B3: Gửi yêu cầu lấy trang web
B4: Server gửi dữ liệu về
B5: Trình duyệt hiện thị trang Web



**Nguồn tham chiếu**
   - 01_introduction_html_universe.md 
      + VD ở đầu chương: "Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương"
      + Mục 1.1. "Kiến trúc Client-Server — "Nhà hàng Online""

2. Tab Network cho thấy thông tin gì?
- Danh sách các Request/Response: Tab này ghi lại mọi yêu cầu mà trình duyệt gửi đi (như lấy file HTML, ảnh, CSS, JavaScript, dữ liệu API...) và phản hồi trả về từ server.
- Trạng thái phản hồi (Status Code): Hiển thị các mã HTTP để biết request thành công hay thất bại (ví dụ: 200 OK là thành công, 404 Not Found là không tìm thấy file).
- Hiệu suất tải trang: Giúp xác định file nào nặng nhất hoặc khiến website tải chậm.
- Loại file (Type): Phân loại các tài nguyên được tải về như document (HTML), stylesheet (CSS), script (JS), png/jpeg (ảnh)...

**Nguồn tham chiếu**
   - 01_introduction_html_universe.md 
      + Mục 4.3. "Developer Tools (F12) — "Kính hiển vi" cho website"
      



      
### Câu A2 (5đ) — Semantic HTML

-Trang này bị SEO thấp vì lạm dụng quá nhiều thẻ div nên google khó hiểu cấu trúc nội dung html(không có semantic)

**những lỗi semantic trong code:**

    1. <div class="header"> sửa lại thành <header>
    2. <div class="menu"> sửa lại thành <nav>
    3. <div><a href="/"> <a href = "/">
    4. <div><a href="/products"> sửa thành <a href = "/products">
    5. <div class="main"> sửa thành <main>
    6. <div class="product"> sửa thành <article>
    7. <div class="image"><img src="iphone.jpg"> sửa thành <img src="iphone.jpg">
    8. <div class="footer">sửa thành <footer>
    9. <div class="price"> sửa thành <p>

**code hoàn chỉnh:**
```
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>
<main>
    <article>
        <h1>iPhone 16 Pro</div>
        <p class="price">25.990.000đ</p>
        <img src="iphone.jpg" alt="iPhone 16 Pro">
    </article>
</main>
<footer>© 2026 ShopTLU</footer>
```
### Câu A3 (5đ) — Block vs Inline
```
┌───────────────┐
│Hộp 1          │
│Text A Text B  │
│Hộp 2          │
│Text C Text D  │
│Hộp 3          │
└───────────────┘
```
**Giải thích:**

Vì thẻ  `<div>` là Blox nên các các Hộp 1,Hộp 2 và Hộp 3 sẽ đứng riêng một dòng. và ngược lại
thẻ `<span>` va `<strong>` đều là inline nên chúng sẽ Hiện thị nội dung trên cùng một dòng nếu ko có ngăn cách bởi các thẻ là Blox

**Nguồn tham chiếu**
   - 04_visible_part_html.md:
        + Block vs Inline — Hai loại element cơ bản

### Câu A4 (5đ) — Table

Đọc chương 05. Giải thích sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`. Tại sao KHÔNG NÊN dùng table để tạo layout trang web? (Ghi rõ ít nhất 3 lý do)

Bài làm:
1. Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`
    - `<thead>` (Table Head):
        + Chức năng: Nhóm các nội dung tiêu đề của bảng (thường là hàng đầu tiên).
        + Đặc điểm: Thường chứa thẻ `<th>` (table header) để định dạng chữ in đậm và căn giữa theo mặc định.
    - `<tbody>` (Table Body):
        + Chức năng: Nhóm nội dung chính, dữ liệu chi tiết của bảng.
        + Đặc điểm: Có thể sử dụng nhiều thẻ `<tbody>` trong một bảng để chia các nhóm dữ liệu khác nhau (ví dụ: chia theo tháng)
    - `<tfoot>` (Table Foot):
        + Chức năng: Nhóm nội dung tổng kết hoặc thông tin cuối bảng (ví dụ: tổng cộng, trung bình).
        + Đặc điểm: Thường được hiển thị ở dưới cùng của bảng, ngay cả khi nó được đặt trước thẻ `<tbody>` trong mã nguồn

2. Lý KHÔNG NÊN dùng table để tạo layout trang web.
    - Tốc độ tải trang: Trình duyệt mất nhiều thời gian hơn để hiển thị bảng so với các thẻ `<div>`.
    - Khó bảo trì: Mã nguồn trở nên phức tạp và lồng ghép quá sâu.
    - Khả năng truy cập: Các thiết bị hỗ trợ người khiếm thị gặp khó khăn khi đọc cấu trúc bảng dàn trang.

