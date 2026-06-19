# Pages & Co. - Book Store Website

Website bán sách HTML, CSS và JavaScript thuần. 
Dữ liệu sách được lấy từ file JSON, có giả lập đăng nhập và giỏ hàng bằng Web Storage.

## Các trang chính

- `index.html`: Trang chủ, hiển thị sách nổi bật, best seller, sách mới và các thể loại.
- `pages/books.html`: Trang danh sách sách, có lọc theo thể loại và sắp xếp.
- `pages/detail.html`: Trang chi tiết sách, có nút `Add to bag`, wishlist và modal đăng nhập.
- `pages/checkout.html`: Trang giỏ hàng, lấy sản phẩm đã thêm trong session hiện tại.

## Cấu trúc dự án

```text
book-store-website/
├── index.html
├── README.md
├── data/
│   └── data.json
├── pages/
│   ├── books.html
│   ├── detail.html
│   └── checkout.html
├── css/
│   ├── base/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   └── global.css
│   ├── components/
│   │   ├── navbar.css
│   │   ├── footer.css
│   │   ├── modal.css
│   │   ├── book-card.css
│   │   └── breadcrum.css
│   └── pages/
│       ├── home.css
│       ├── books.css
│       ├── detail.css
│       └── checkout.css
└── js/
    ├── main.js
    ├── books.js
    ├── detail.js
    ├── checkout.js
    ├── cart.js
    ├── navbar.js
    └── components/
        ├── hero.js
        └── modal.js
```

chayj local server để `fetch()` đọc được file `data/data.json`.


## test chức năng

1. Vào trang chi tiết sách
2. Bấm `Add to bag`.
3. Form đăng nhập sẽ hiện lên.
4. Nhập:

```text
Email: 1234
Password: 1234
```

5. Sau khi đăng nhập thành công:

- Trạng thái login được lưu trong `localStorage`.
- Sản phẩm được thêm vào giỏ hàng trong `sessionStorage`.
- Số lượng `Bag` trên navbar tăng lên.
- Vào `pages/checkout.html` sẽ thấy sản phẩm vừa thêm.

## 

- `localStorage` dùng để giả lập trạng thái đã đăng nhập.
- `sessionStorage` dùng để lưu giỏ hàng trong phiên hiện tại.
