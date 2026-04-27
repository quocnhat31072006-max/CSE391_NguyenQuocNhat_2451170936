## Phần A

### Câu A1 (5đ) — Input Types
1. type="email" → Ô nhập text, tự kiểm tra có @ → Dùng cho đăng ký tài khoản
2. type="password" → Ô nhập bị ẩn ký tự → Dùng cho đăng nhập
3. type="number" → Ô nhập số, có nút tăng/giảm → Nhập số lượng sản phẩm
4. type="tel" → Ô nhập số điện thoại → Nhập thông tin giao hàng
5. type="url" → Kiểm tra định dạng link → Nhập website
6. type="date" → Hiển thị chọn ngày → Chọn ngày giao hàng
7. type="file" → Upload file → Upload ảnh sản phẩm
8. type="checkbox" → Tick nhiều lựa chọn → Lọc sản phẩm
9. type="radio" → Chọn 1 → Chọn phương thức thanh toán
10. type="search" → Ô tìm kiếm → Thanh search sản phẩm

### Câu A2 (5đ) — Validation Attributes

<!-- Trường hợp 1 -->
`<input type="text" required value="">`   <!-- User để trống -->
    - không submit được vì required bắt buộc phải nhập dữ liệu

<!-- Trường hợp 2 -->
`<input type="email" value="abc">`        <!-- User gõ "abc" -->
    - Không submit được vì ko đúng định dạng email (thiếu @)

<!-- Trường hợp 3 -->
`<input type="number" min="1" max="10" value="15">` <!-- User gõ 15 -->
    - ko submit được vì vượt quá giá trị max

<!-- Trường hợp 4 -->
`<input type="text" pattern="[0-9]{10}" value="abc123">` <!-- User gõ "abc123" -->
    -Ko submid dc vì pattern phải là 10 chữ số

<!-- Trường hợp 5 -->
`<input type="password" minlength="8" value="123">`  <!-- User gõ "123" -->
    - vẫn submit dc vì không có thuộc tính required nên trường này không bắt buộc. minlength không đủ để chặn submit nếu input không required.

### Câu A3 (5đ) — Accessibility

1. Tại sao `<label for="email">` quan trọng cho người dùng screen reader?
    - Vì nó hỗ trợ cho screen reader đọc đước label này cho cái gì.
    
2. Khi nào dùng `<fieldset>` + `<legend>`? Cho ví dụ cụ thể.
    - dùng khi nhóm các thông tin liên quan với nhau trong form
    - vd: dùng để nhóm thông tin giao hàng
        ```
        <fieldset>
            <legend>Thông tin giao hàng</legend>

            <label for="name">Tên</label>
            <input id="name" type="text">

            <label for="address">Địa chỉ</label>
            <input id="address" type="text">
        </fieldset>
        ```
3. aria-label dùng khi nào? Tại sao KHÔNG nên dùng aria-label khi đã có <label>?
    - dùng aria-label khi ko dùng text hiện thị(như label) hoặc dùng khi sử dụng nút ko rõ nội dung nhứ icon,..vv
    - Khi có label rồi thì screen reader sẽ có thể đọc trùng nội dung giữa label và aria-label

### Câu A4 (5đ) — Media

1. Giải thích thuộc tính `loading="lazy"` trên thẻ `<img>`. Nó cải thiện gì? Khi nào KHÔNG nên dùng?
    - thuộc tính `loading="lazy"` làm ảnh tải khi người dùng lăn chuột tới. 
    - giúp load trang nhanh hơn, tiết kiệm băng thông cho người dùng và máy chủ.
    - Không lazy load ảnh "above the fold" (ảnh hero, logo, ảnh đầu tiên user thấy) 
    nếu không thì trang lúc mới vào sẽ bị trống . vậy nên chỉ lazy load ảnh bên dưới

2. Tại sao nên cung cấp nhiều `<source>` trong thẻ `<video>`? Liệt kê ít nhất 3 format video web phổ biến.
    - Vì không phải trình duyệt nào cũng hỗ trợ cùng một định dạng video
    - các format video web phổ biến là:
        - MP4 (.mp4)
        - WebM (.webm)
        - OGG / OGV (.ogv)

3. Thuộc tính `alt` trên `<img>` dùng để làm gì? 
    - Thuộc tính `alt` trên `<img>` dùng để mô tả ảnh nếu ko load đc,
    giúp cho screen reader đọc và SEO hiểu nội dung ảnh.


   Viết `alt` tốt cho 3 trường hợp: 
    - Ảnh sản phẩm iPhone 16 ->> `<img src = "Iphone16.jpg" alt = "Iphone 16, 256GB, màu Tintan ">`
    - Ảnh trang trí (decorative) `<img src = "background.jpg" alt = "">`
    - Ảnh biểu đồ doanh thu Q1/2026 ` <img src = "chart.png" alt = "Biểu đồ doanh thu quý 1 năm 2026">`

### Câu A5 (5đ) — So sánh `<figure>` vs `<img>`
```html
<!-- Cách 1 -->
<img src="product.jpg" alt="iPhone">

<!-- Cách 2 -->
<figure>
    <img src="product.jpg" alt="iPhone 16 Pro Max 256GB Titan">
    <figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption>
</figure>
```

- Khi nào dùng Cách 1, khi nào dùng Cách 2? Cho 2 ví dụ thực tế cho mỗi cách.
    - dùng cách 1 khi:
        - ảnh đơn giản ko cần cần chú thích riêng.
        - thông tin đã có trong text xung quanh.
        - ảnh chỉ đóng vai tro minh họa
    - vd:
        1. Ảnh thumbnail sản phẩm trong danh sách:
            `<img src="iphone.jpg" alt="iPhone 16">`
        2. Icon hoặc ảnh nhỏ trong bài viết:
            `<img src="icon-cart.png" alt="Giỏ hàng">`
    - dùng cách 2 khi:
        - ảnh là nội dung chính
        - Cần chú thích riêng biệt
        - Muốn nhóm ảnh + mô tả thành 1 khối sematic
    - vd:
        1. Trang chi tiết sản phẩm:
            ```
            <figure>
                <img src="iphone16.jpg" alt="iPhone 16 Pro Max màu Titan">
                <figcaption>iPhone 16 Pro Max — Giá 25.990.000đ</figcaption>
            </figure>
            ```
        2. Biểu đồ trong báo cáo:
            ```
            <figure>
                <img src="chart.png" alt="Biểu đồ doanh thu Q1 2026">
                <figcaption>Doanh thu tăng trưởng liên tục qua 3 tháng</figcaption>
            </figure>
            ```
## Phần B
### Câu B1
Xác nhận password: (cùng rules — giải thích trong answers.md tại sao HTML không thể validate confirm password)
   - HTML không thể tự validate “xác nhận password” vì nó chỉ kiểm tra từng input riêng lẻ, không so sánh được giá trị giữa hai input khác nhau. 

## Phần C
### Câu C1

```html
<form>
    Tên: <input type="text">
    
    <input type="email" placeholder="Email của bạn">
    
    <input type="password" placeholder="Mật khẩu">
    <input type="password" placeholder="Nhập lại mật khẩu">
    
    Phone: <input type="text" value="0901234567">
    
    <select>
        <option>Hà Nội</option>
        <option>TP.HCM</option>
    </select>
    
    <label>
        Tôi đồng ý điều khoản
    </label>
    
    <input type="submit" value="Gửi">
</form>
```

BÀI LÀM: 
``` 
Lỗi 1: Dòng 2 — Input "Tên" không có label, vi phạm accessibility
Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>

Lỗi 2: Dòng 4 — Input email không có label và thiếu name
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>

Lỗi 3: Dòng 6–7 — Hai input password không có label và không phân biệt chức năng
Sửa: <label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" required>
<label for="confirm">Nhập lại mật khẩu:</label> <input type="password" id="confirm" name="confirm" required>

Lỗi 4: Dòng 9 — Input "Phone" dùng sai type (text → tel)
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" required>

Lỗi 5: Dòng 9 — Dùng value làm dữ liệu mặc định không hợp lý
Sửa: <input type="tel" id="phone" name="phone" placeholder="0901234567">

Lỗi 6: Dòng 11 — select không có label và name
Sửa: <label for="city">Thành phố:</label> <select id="city" name="city" required> <option value="">-- Chọn thành phố --</option> <option value="hanoi">Hà Nội</option> <option value="hcm">TP.HCM</option> </select>

Lỗi 7: Dòng 15 — Label "Tôi đồng ý điều khoản" không gắn với checkbox
Sửa: <input type="checkbox" id="agree" name="agree" required> <label for="agree">Tôi đồng ý điều khoản</label>

Lỗi 8: Dòng 18 — Dùng input type="submit" chưa tối ưu accessibility
Sửa: <button type="submit" aria-label="Gửi form">Gửi</button>

```
### Câu C2

```html
<form>
    <label for="CCCD">Số căn cước công dân</label>
    <input type="text" name="CCCD" id="CCCD" pattern="[0-9]{12}" required>
    <label for="accountNumber">Số tài khoản</label>
    <input type="number" name="accountNumber" id="accountNumber" pattern="[0-9]{10,15} required>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>
    <label for="pin">Mã PIN</label>
    <input type="password" name="pin" id="pin" pattern="[0-9]{12}" required>
</form>
```
1. Viết pattern regex cho CMND/CCCD và Số tài khoản
    - CMND/CCCD (12 chữ số): pattern="[0-9]{12}"
    - Số tài khoản (10–15 chữ số): pattern="[0-9]{10,15}"

2. Giải thích: HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
- Không. HTML5 validation KHÔNG đủ an toàn cho ứng dụng ngân hàng.
- Lý do:
    - Có thể bị bypass (tắt JavaScript, sửa request bằng DevTools/Postman)
    - Chỉ kiểm tra phía client, không kiểm soát dữ liệu thật trên server
    - Không bảo vệ được dữ liệu nhạy cảm

3. Liệt kê 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript)
- Kiểm tra 2 field giống nhau (ví dụ: confirm password)
- Kiểm tra logic phức tạp (ví dụ: số tài khoản có tồn tại trong hệ thống)
- Validation theo điều kiện (ví dụ: nếu chọn A thì field B bắt buộc)

4. Nêu 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend
- Người dùng có thể gửi dữ liệu sai/độc hại trực tiếp lên server (bypass form)
Dễ bị tấn công (SQL Injection, dữ liệu giả mạo, spam)
- Người dùng có thể gửi dữ liệu sai/độc hại trực tiếp lên server (bypass form)
Dễ bị tấn công (SQL Injection, dữ liệu giả mạo, spam)