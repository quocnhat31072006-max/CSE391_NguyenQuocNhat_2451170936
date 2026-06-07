# Multi-API Dashboard

## API đã dùng

- Random User: `https://randomuser.me/api/?results=5`
- REST Countries: `https://restcountries.com/v3.1/name/vietnam?fullText=true`
- JSONPlaceholder Posts: `https://jsonplaceholder.typicode.com/posts?_limit=5`

## Cách chạy

1. Mở `index.html` bằng trình duyệt.
2. App sẽ gọi đồng thời 3 API và hiển thị dữ liệu trong 3 widget.
3. Nhấn `Refresh All` để gọi lại toàn bộ API.

## Tính năng

- Gọi song song 3 APIs bằng `Promise.allSettled()`.
- Mỗi widget có trạng thái riêng: loading / success / error.
- Hiển thị tổng thời gian tải dữ liệu.
