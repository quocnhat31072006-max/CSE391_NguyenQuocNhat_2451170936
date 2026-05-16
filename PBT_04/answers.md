## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (10đ) — 5 Loại Positioning

Đọc chương 12. Điền bảng sau mà **Không** tra Google:

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                                | Cuộn theo trang? | Use case                               |
| ---------- | ------------------------- | ------------------------------------------------ | ---------------- | -------------------------------------- |
| `static`   | có                        | theo thứ tự khi tạo                              | Có               | layout mặc định                        |
| `relative` | có                        | vị trí ban đầu của nó                            | Có               | dịch nhẹ phần tử, làm mốc cho absolute |
| `absolute` | Không                     | căn theo parent gần nhất có position khác static | Có               | popup, badge, icon, overlay            |
| `fixed`    | Không                     | căn theo trình duyệt                             | Không            | navbar cố định, nút back-to-top        |
| `sticky`   | có                        | theo vị trí ban đầu và dính theo viewport        | Không            | menu dính, tiêu đề dính                |

**Câu hỏi thêm:** Khi nào `absolute` tham chiếu `body`? Khi nào tham chiếu parent? Giải thích khái niệm "nearest positioned ancestor".

- `absolute` tham chiếu `body` khi không có phân tử parent nào có chứa position khác `static`.
- tham chiếu đến parent khi nó là parent gần nhất có chứa position khác `static`.
- nearest positioned ancestor nghĩa là :phần tử cha gần nhất có position khác static.

### Câu A2 (10đ) — Flexbox vs Grid

Không chạy code, dự đoán layout cho mỗi trường hợp. **Vẽ sơ đồ bố cục** (text art hoặc vẽ tay chụp ảnh).

```css
/* Trường hợp 1 */
.container {
  display: flex;
}
.item {
  flex: 1;
}
/* 4 items → Bố cục = ??? */

/* Trường hợp 2 */
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 45%;
  margin: 2.5%;
}
/* 6 items → Bố cục = (3 hàng, 2 cột?) */

/* Trường hợp 3 */
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 3 items → Bố cục = ??? */

/* Trường hợp 4 */
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 20px;
}
/* 3 items → Bố cục = ??? */

/* Trường hợp 5 */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
/* 7 items → Bố cục = ??? (mấy hàng? item cuối ở đâu?) */
```

**BÀI làm:**

Trường hợp 1:

```
+----+----+----+----+
| 1  | 2  | 3  | 4  |
+----+----+----+----+
```

- `.item { flex: 1; }` nên các item được chia đều.

Trường hợp 2:

```
+--------+--------+
|   1    |   2    |
+--------+--------+
|   3    |   4    |
+--------+--------+
|   5    |   6    |
+--------+--------+
```

- 3 hàng 2 cột.

Trường hợp 3:

```
|1                2                3|
```

Trường hợp 4:

```
+--------+------------------+--------+
|   1    |        2         |   3    |
+--------+------------------+--------+
```

Grid có:

- cột 1 = 200px
- cột 2 = chiếm phần còn lại (1fr)
- cột 3 = 200px

Trườn hợp 4:

```
+----+----+----+
| 1  | 2  | 3  |
+----+----+----+
| 4  | 5  | 6  |
+----+----+----+
| 7  |    |    |
+----+----+----+
```

3 hàng:

- hàng 1: 1 2 3
- hàng 2: 4 5 6
- hàng 3: item 7 nằm ở cột đầu tiên

## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

Cho 5 tình huống layout thực tế. Với mỗi tình huống, trả lời: dùng **Flexbox**, **Grid**, hay **kết hợp cả hai**? Giải thích ngắn gọn tại sao.

1. Navigation bar ngang (logo + menu + buttons)

   **→ Dùng: Flexbox**

   **Giải thích:**  
   Navbar là layout 1 chiều (theo hàng ngang), Flexbox giúp căn chỉnh và phân bố khoảng cách dễ dàng bằng:
   - `justify-content`
   - `align-items`
   - `gap`

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)

   **→ Dùng: Grid**

   **Giải thích:**  
   Đây là layout 2 chiều (hàng + cột). CSS Grid giúp tạo lưới đều nhau dễ dàng với:

   ```css
   grid-template-columns: repeat(3, 1fr);
   ```

3. Layout blog: main content + sidebar

   **→ Dùng: Grid**

   **Giải thích:**  
   Grid phù hợp cho layout tổng thể của trang với nhiều vùng rõ ràng:
   - content
   - sidebar
   - header
   - footer

   Dễ chia cột bằng:

   ```css
   grid-template-columns: 1fr 300px;
   ```

   ***

4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)

   **→ Dùng: Flexbox hoặc Grid**

   **Giải thích:**
   - Flexbox phù hợp nếu chỉ cần các cột xếp ngang đơn giản
   - Grid phù hợp nếu muốn footer responsive và đều cột hơn

   Thực tế thường dùng:

   ```css
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   ```

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)

    **→ Dùng: Flexbox**

    **Giải thích:**  
    Card là layout 1 chiều theo cột.  
    Flexbox giúp đẩy nút xuống cuối bằng:

    ```css
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ```
### Câu C2 (10đ) — Debug Flexbox

Layout sau bị lỗi. Mô tả lỗi và sửa.

---

**Lỗi 1:** Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

```css
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; }
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { padding: 10px; }
```

    Lỗi 1:

    Nguyên nhân:  
    Card có nội dung khác nhau nên chiều cao không đều, nút bị lệch.

    Sửa:

    ```css
    .card{
        width: 30%;
        margin: 1.5%;

        display: flex;
        flex-direction: column;
    }

    .card .btn{
        margin-top: auto;
    }
    ```

---

**Lỗi 2:** Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên

```css
.hero {
    height: 100vh;
    display: flex;
}
.hero-content {
    text-align: center;
}
```

    Lỗi 2:

    Nguyên nhân:  
    Container flex chưa căn giữa.

    Sửa:

    ```css
    .hero{
        height: 100vh;

        display: flex;

        justify-content: center;
        align-items: center;
    }
    ```

---

**Lỗi 3:** Sidebar bị co lại khi content quá dài

```css
.layout { display: flex; }
.sidebar { width: 250px; }
.content { flex: 1; }
```

    Lỗi 3:

    Nguyên nhân:  
    Sidebar bị co do mặc định `flex-shrink: 1`.

    Sửa:

    ```css
    .sidebar{
        width: 250px;
        flex-shrink: 0;
    }
    ```



---
