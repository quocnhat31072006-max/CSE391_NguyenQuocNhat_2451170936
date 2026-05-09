
## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (10đ) — 5 Loại Positioning

Đọc chương 12. Điền bảng sau mà **Không** tra Google:

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | có | theo thứ tự khi tạo | Có | layout mặc định |
| `relative` | có | vị trí ban đầu của nó | Có | dịch nhẹ phần tử, làm mốc cho absolute |
| `absolute` | Không | căn theo parent gần nhất có position khác static | Có | popup, badge, icon, overlay |
| `fixed` | Không | căn theo trình duyệt | Không | navbar cố định, nút back-to-top |
| `sticky` | có | theo vị trí ban đầu và dính theo viewport  | Không | menu dính, tiêu đề dính |


**Câu hỏi thêm:** Khi nào `absolute` tham chiếu `body`? Khi nào tham chiếu parent? Giải thích khái niệm "nearest positioned ancestor".

-   `absolute` tham chiếu `body` khi không có phân tử parent nào có chứa position khác `static`.
- tham chiếu đến parent khi nó là parent gần nhất có chứa position khác `static`.
- nearest positioned ancestor nghĩa là :phần tử cha gần nhất có position khác static.

### Câu A2 (10đ) — Flexbox vs Grid

Không chạy code, dự đoán layout cho mỗi trường hợp. **Vẽ sơ đồ bố cục** (text art hoặc vẽ tay chụp ảnh).

```css
/* Trường hợp 1 */
.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục = ??? */

/* Trường hợp 2 */
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → Bố cục = (3 hàng, 2 cột?) */

/* Trường hợp 3 */
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items → Bố cục = ??? */

/* Trường hợp 4 */
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items → Bố cục = ??? */

/* Trường hợp 5 */
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
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