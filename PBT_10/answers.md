# PBT_10 Answers

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 (5đ) — Sync vs Async

Output dự đoán:

1. `1 - Start`
2. `4 - End`
3. `3 - Promise`
4. `6 - Promise 2`
5. `2 - Timeout 0ms`
6. `5 - Timeout 100ms`
7. `7 - Nested timeout`

Giải thích:

- JavaScript chạy synchronous code trước. `console.log("1 - Start")` và `console.log("4 - End")` in ra ngay.
- `Promise.resolve().then(...)` tạo một microtask, và microtasks được xử lý ngay sau khi stack hiện tại trống, trước các macrotasks như `setTimeout`.
- `setTimeout(..., 0)` và `setTimeout(..., 100)` là macrotasks. `Timeout 0ms` vẫn chờ đến lượt trong task queue sau khi microtasks hoàn thành.
- Trong promise thứ hai, `console.log("6 - Promise 2")` chạy trong microtask, rồi `setTimeout(..., 0)` tạo một macrotask mới, nên `7 - Nested timeout` xuất hiện sau các microtask hiện tại.

### Câu A2 (5đ) — Fetch API

1. `await fetch(...)` — `fetch` trả về một Promise chứa đối tượng `Response` khi request hoàn thành. `await` cần để chờ request hoàn tất và lấy `Response`;
   nếu không dùng `await`, biến `response` sẽ là Promise thay vì kết quả trả về.
2. `response.ok` — false khi response status nằm trong khoảng 400–599.
   Ví dụ:
   - `404` → Not Found
   - `500` → Internal Server Error
   - `429` → Too Many Requests
3. `response.json()` — phương thức này cũng trả về một Promise vì quá trình đọc body và parse JSON là bất đồng bộ, nên cần `await` thêm lần nữa.
4. `try...catch` — catch xử lý:
   - lỗi network (mất mạng, DNS không tìm thấy)
   - lỗi khi parse JSON (`response.json()` ném lỗi nếu body không hợp lệ)
   - lỗi tường minh từ `throw new Error(...)` khi `response.ok` là false.

### Câu A3 (5đ) — Promise States

Sơ đồ:

- `Pending` → `Fulfilled` khi Promise hoàn tất thành công
- `Pending` → `Rejected` khi Promise bị lỗi

Giải thích:

Callback Hell xảy ra khi ta lồng nhiều callback vào nhau, dẫn đến code khó đọc, khó debug và khó maintain.

Ví dụ callback hell 4 cấp:

```javascript
loginUser(credentials, function (user) {
  fetchProfile(user.id, function (profile) {
    fetchSettings(profile.id, function (settings) {
      updateUI(settings, function () {
        console.log("Done");
      });
    });
  });
});
```

Refactor thành async/await:

```javascript
async function loadUserData(credentials) {
  try {
    const user = await loginUser(credentials);
    const profile = await fetchProfile(user.id);
    const settings = await fetchSettings(profile.id);
    await updateUI(settings);
    console.log("Done");
  } catch (error) {
    console.error(error);
  }
}
```

---

## PHẦN C — PHÂN TÍCH

### Câu C1 (10đ) — Error Handling Strategy

1. Network errors

- Hiện thông báo rõ: "Không thể kết nối mạng" hoặc "Kiểm tra lại internet".
- Có thể tự động thử lại 1-2 lần hoặc yêu cầu người dùng nhấn nút "Thử lại".
- Với các request quan trọng, dùng `fetchWithRetry`.

2. API errors

- `404`: hiển thị "Không tìm thấy dữ liệu".
- `500`: thông báo "Lỗi máy chủ, vui lòng thử lại sau".
- `429`: thông báo "Quá nhiều yêu cầu, vui lòng đợi" và thực hiện backoff hoặc disable nút gửi.

3. Timeout (> 10s)

- Dùng `AbortController` để hủy request sau 10 giây.
- Hiển thị trạng thái timeout và cho phép retry.

4. Retry logic

- Chỉ thử lại khi lỗi network, không thử lại khi lỗi 4xx/5xx cố định.
- Giữ khoảng delay tăng dần giữa các lần thử.

```javascript
function fetchWithTimeout(url, ms = 10000, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timeoutId),
  );
}

async function fetchWithRetry(url, maxRetries = 3, options = {}) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      const response = await fetchWithTimeout(url, 10000, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response;
    } catch (error) {
      lastError = error;
      if (error.name === "AbortError") {
        // timeout
      }
      if (error instanceof TypeError || error.name === "AbortError") {
        const wait = 500 * attempt;
        await new Promise((resolve) => setTimeout(resolve, wait));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}
```

### Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race

| Method          | Khi nào resolve?                                           | Khi nào reject?                              | Use case                                                             |
| --------------- | ---------------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------- |
| `.all()`        | Khi tất cả promise đều fulfilled                           | Ngay khi một promise reject                  | Khi các request đều bắt buộc thành công cùng lúc                     |
| `.allSettled()` | Khi tất cả promise đã hoàn thành (fulfilled hoặc rejected) | Không reject vì lỗi riêng lẻ                 | Khi cần nhận kết quả của từng promise dù có lỗi                      |
| `.race()`       | Khi promise đầu tiên fulfilled hoặc rejected               | Khi promise đầu tiên fulfilled hoặc rejected | Khi cần kết quả nhanh nhất, ví dụ timeout hoặc race giữa nhiều nguồn |
| `.any()`        | Khi có ít nhất một promise fulfilled                       | Khi tất cả promise reject                    | Khi chấp nhận một trong số các kết quả thành công                    |

Ví dụ thực tế:

- `.all()`: tải dữ liệu profile, settings và permissions để render trang cá nhân khi tất cả đều cần có.
- `.allSettled()`: gọi nhiều widget độc lập trong dashboard, mỗi widget có thể success/error riêng.
- `.race()`: lấy dữ liệu từ cache hoặc network; dùng kết quả nhanh nhất.
- `.any()`: tìm dữ liệu từ nhiều server mirror, chấp nhận server trả kết quả thành công đầu tiên.

```javascript
// Example all
async function loadUserPage() {
  const [profile, settings, permissions] = await Promise.all([
    fetch("/api/profile").then((res) => res.json()),
    fetch("/api/settings").then((res) => res.json()),
    fetch("/api/permissions").then((res) => res.json()),
  ]);
  renderPage(profile, settings, permissions);
}

// Example allSettled
async function loadWidgets() {
  const results = await Promise.allSettled([
    fetch("/api/weather").then((r) => r.json()),
    fetch("/api/news").then((r) => r.json()),
    fetch("/api/stats").then((r) => r.json()),
  ]);
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      renderWidget(index, result.value);
    } else {
      renderWidgetError(index, result.reason.message);
    }
  });
}

// Example race
async function loadFastestUserData() {
  const first = await Promise.race([
    fetch("/api/cache-user").then((r) => r.json()),
    fetch("/api/user").then((r) => r.json()),
  ]);
  showUser(first);
}

// Example any
async function loadAnyMirror() {
  const data = await Promise.any([
    fetch("https://mirror1.example.com/data").then((r) => r.json()),
    fetch("https://mirror2.example.com/data").then((r) => r.json()),
    fetch("https://mirror3.example.com/data").then((r) => r.json()),
  ]);
  renderData(data);
}
```
