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

## Phần B

### Câu B3
```
Lỗi 1: Dòng 1 - Thiếu khai báo chuẩn HTML5 - "<!DOCTYPE html>"
Lỗi 2: Dòng 2 - Thiếu thuộc tính ngôn ngữ - <html lang = "vi">
Lỗi 3: Dòng 4 - Thiếu thẻ đóng của thẻ title - bổ sung </title> 
lỗi 4: Dòng 5 - nhập sai encoding "utf8" - <meta charset = "UTF-8>
lỗi 5: Dong 8 - nhập sai thẻ đóng thẻ h1 - </h1>
lỗi 6: Dòng 12 - Nhập sai thẻ đóng thẻ a - </a>
lỗi 7: Dòng 20 - Thiếu "" và alt - <img src = "iphone.jpg", alt = "iphone">
lỗi 8: Dòng 22 - Đong thẻ p và b sai thứ tự - <p>...<b>...</b></p>
lỗi 9: Dòng 27 - <table> không có <thead> và <tbody> - <thead>...</thead> <tbody>...</tbody>
lỗi 10: Dòng 40 - 2 dùng thêm 1 thẻ main - dùng <aside>
lỗi 11: Dòng 45 - ko đóng thẻ p - </p>
lỗi 12: Dòng 48 - ko đóng thẻ html - </html>
```
### Câu B4

2.
Trang web không sử dụng thẻ `<table>` để hiển thị dữ liệu mà thay vào đó sử dụng `<div>` kết hợp CSS (Flexbox/Grid).
3.
Form không khai báo thuộc tính action và method, cho thấy dữ liệu được xử lý bằng JavaScript. Trong form sử dụng input type="text" để nhập nội dung và button type="button" để thực hiện tìm kiếm.

## Phần C
### Câu C1
```
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Chi tiết sản phẩm</title>
</head>
<body>

<!-- Header: chứa logo và menu chính -->
<header>
    <!-- Navigation: điều hướng chính của website -->
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
        <a href="/contact">Liên hệ</a>
    </nav>
</header>

<!-- Main: nội dung chính của trang -->
<main>

    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb"> <!-- nav vì đây là điều hướng -->
        <ol> <!-- ol vì có thứ tự cấp bậc -->
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/phones">Điện thoại</a></li>
            <li>iPhone 16</li>
        </ol>
    </nav>

    <!-- Section: khu vực chi tiết sản phẩm -->
    <section>
        
        <!-- Article: 1 sản phẩm độc lập -->
        <article>

            <!-- Khu ảnh sản phẩm -->
            <section>
                <h2>Hình ảnh sản phẩm</h2> <!-- heading cho section -->
                
                <!-- Figure: nhóm ảnh minh họa -->
                <figure>
                    <img src="img1.jpg" alt="Ảnh 1">
                </figure>
                <figure>
                    <img src="img2.jpg" alt="Ảnh 2">
                </figure>
                <figure>
                    <img src="img3.jpg" alt="Ảnh 3">
                </figure>
                <figure>
                    <img src="img4.jpg" alt="Ảnh 4">
                </figure>
                <figure>
                    <img src="img5.jpg" alt="Ảnh 5">
                </figure>
            </section>

            <!-- Thông tin sản phẩm -->
            <section>
                <h1>Tên sản phẩm</h1> <!-- h1 vì là tiêu đề chính -->
                <p>Giá: ...</p> <!-- p cho nội dung text -->
                <p>Đánh giá: ⭐⭐⭐⭐☆</p>
                <p>Mô tả: ...</p>
            </section>

            <!-- Bảng thông số kỹ thuật -->
            <section>
                <h2>Thông số kỹ thuật</h2>
                <table> <!-- table vì dữ liệu dạng bảng -->
                    <thead>
                        <tr>
                            <th>Thuộc tính</th>
                            <th>Giá trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RAM</td>
                            <td>...</td>
                        </tr>
                        <tr>
                            <td>Bộ nhớ</td>
                            <td>...</td>
                        </tr>
                    </tbody>
                </table>
            </section>

        </article>
    </section>

    <!-- Section: đánh giá/bình luận -->
    <section>
        <h2>Đánh giá</h2>
        
        <!-- Article: mỗi bình luận là 1 nội dung độc lập -->
        <article>
            <p>Người dùng A: Sản phẩm tốt</p>
        </article>

        <article>
            <p>Người dùng B: Rất đáng mua</p>
        </article>
    </section>

    <!-- Aside: nội dung phụ -->
    <aside>
        <h2>Sản phẩm tương tự</h2>
        
        <!-- Article: mỗi sản phẩm tương tự -->
        <article>
            <p>Sản phẩm 1</p>
        </article>
        <article>
            <p>Sản phẩm 2</p>
        </article>
    </aside>

</main>

<!-- Footer: thông tin cuối trang -->
<footer>
    <p>&copy; 2026 Shop</p>
</footer>

</body>
</html>
```
### Câu C2

Bài làm:
```
Việc Nói “cứ dùng <div> cho mọi thứ là đủ” thì đúng là nhanh thật, nhưng về lâu dài lại khá hại. Thứ nhất là SEO: công cụ tìm kiếm không chỉ đọc chữ mà còn nhìn vào cấu trúc HTML để hiểu trang web. Nếu bạn dùng toàn <div>, nó khó phân biệt đâu là nội dung chính, đâu là menu, đâu là tiêu đề, trong khi các thẻ như <header>, <main>, <article> giúp nó hiểu rõ hơn và xếp hạng tốt hơn. Thứ hai là accessibility: những người dùng screen reader sẽ dựa vào các thẻ semantic để điều hướng nhanh giữa các phần của trang; nếu toàn <div> thì gần như “mù đường”. Ví dụ đơn giản, một trang blog dùng <article> cho từng bài viết thì screen reader có thể báo “bài viết mới”, còn nếu chỉ là <div> thì mất hết ý nghĩa đó. Tuy nhiên, không phải lúc nào <div> cũng sai — nó vẫn rất hợp lý khi bạn chỉ cần một khối để chia layout hoặc style (ví dụ dùng flex/grid để căn chỉnh). Tóm lại, semantic HTML không chỉ là “học cho có”, mà giúp code rõ ràng hơn, thân thiện với máy tìm kiếm và cả người dùng thực tế.
```