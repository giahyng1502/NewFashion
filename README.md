# 👗 New Fashion App

**New Fashion App** là ứng dụng di động giúp người dùng mua sắm các sản phẩm thời trang trực tuyến dễ dàng và nhanh chóng. Ứng dụng hỗ trợ người dùng duyệt sản phẩm, thêm vào giỏ hàng, đặt hàng và quản lý đơn hàng tiện lợi.

---

## 📱 Tính năng chính

- 🛒 Tìm kiếm sản phẩm theo tên và danh mục

- 🛍️ Thêm sản phẩm vào giỏ hàng và đặt hàng

- 📦 Quản lý lịch sử đơn hàng

- 👤 Đăng ký, đăng nhập và chỉnh sửa thông tin cá nhân

- 📸 Quản lý và upload hình ảnh sản phẩm (cho admin)

- 📊 Thống kê số lượng đơn hàng và sản phẩm bán chạy

- 💬 Nhắn tin với chủ cửa hàng

- 📧 Gửi mail về cho khách hàng khi thanh toán thành công

- 💳 Thanh toán bằng hình thức trả trước momo

- 💎 Tích điểm khi mua hàng

- 🔔 Nhận thông báo khi có đơn hàng mới hoặc khuyến mãi

---

## ⚙️ Công nghệ sử dụng

- **Frontend:** React Native,
- **Backend:** Node.js, Express, MongoDB,
- **Authentication:** JSON Web Token (JWT), bcrypt, nodemailer
- **Cloud:** Firebase Authentication, Firebase Storage, Firebase Cloud Messaging,Socket
- **UI Design:** Figma
- **Deploy:** Google Cloud Run, Dockerhub (giahyng/backend_newfashion)

---

## 📂 Cấu trúc thư mục

```
NewFashionApp/
├── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   ├── redux/
│   ├── services/
│   └── utils/
├── assets/
├── App.js
└── package.json
```

---

## 🚀 Cài đặt & chạy dự án

### Backend:

```bash
npm install
npm run dev
```

### Frontend:

```bash
npm install
npx react-native run-android
```

---

### 📲 Đăng nhập

<div align="center" style="display: flex; justify-content: space-between; width: 100%;">
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/login.png" alt="Demo 1" width="30%"  />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/login2.png" alt="Demo 2" width="30%" style="margin: 0 10px;" />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/login3.png" alt="Demo 3" width="30%"  />
</div>
<br>

### 📲 Trang chủ, thể loại sản phẩm

<div align="center" style="display: flex; justify-content: space-between; width: 100%;">
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/home.png" alt="Demo 4" width="30%"  />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/productderai.png" alt="Demo 5" width="30%" style="margin: 0 10px;" />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/Screenshot_1746857868.png" alt="Demo 6" width="30%"  />
</div>
<br>

### 📲 Giỏ hàng, thanh toán

<div align="center" style="display: flex; justify-content: space-between; width: 100%;">
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/carr.png" alt="Demo 7" width="30%"  />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/checkout.png" alt="Demo 8" width="30%" style="margin: 0 10px;" />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/orderdone.png" alt="Demo 9" width="30%"  />
</div>
<br>

### 📲 Đặt hàng

<div align="center" style="display: flex; justify-content: space-between; width: 100%;">
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/orderScreen.png" alt="Demo 10" width="30%"  />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/orderSucsec.png" alt="Demo 11" width="30%" style="margin: 0 10px;" />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/orderdetail.png" alt="Demo 12" width="30%"  />
</div>
<br>

### 📲 Nhắn tin, thông báo, khuyến mãi

<div align="center" style="display: flex; justify-content: space-between; width: 100%;">
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/char.png" alt="Demo 13" width="30%"  />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/information.png" alt="Demo 14" width="30%" style="margin: 0 10px;"  />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/coupon.png" alt="Demo 15" width="30%"  />
</div>
<br>

### 📲 Bài viết, Bình luận

<div align="center" style="display: flex; justify-content: space-between; width: 100%;">
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/post.png" alt="Demo 16" width="30%"  />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/comment.png" alt="Demo 17" width="30%" style="margin: 0 10px;"  />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/comment.png" alt="Demo 18" width="30%"  />
</div>
<br>

### 📲 Ngoài ra

<div align="center" style="display: flex; justify-content: space-between; width: 100%;">
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/address.png" alt="Demo 19" width="30%"  />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/noti.png" alt="Demo 20" width="30%" style="margin: 0 10px;" />
  <img src="https://pub-0f02951565a14603816f4ca468c73608.r2.dev/image/selectCamera.png" alt="Demo 21" width="30%"  />
</div>
<br>

## 📺 Backend

Bạn có thể tham khảo backend ở đây:  
[👉 Tham khảo backend](https://github.com/giahyng1502/backend_newfashion)

---

## 📺 Web quản trị

Bạn có thể tham khảo web quản trị ở đây:  
[👉 Tham khảo web quản trị](https://github.com/giahyng1502/web-admin-newfashion)

---

## 📺 Video demo

Bạn có thể xem video demo ứng dụng tại đây:  
[👉 Xem video demo](https://youtu.be/A2xO4Iza9H0)

---

## 📦 Tải file APK

Tải và cài đặt ứng dụng Android (.apk) tại link bên dưới:  
[👉 Tải APK](https://drive.google.com/drive/folders/1oYUa_T6I55nAW_PqrTPRp0QdsLj4HoAR)
