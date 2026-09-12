# PeachWeb Chatbot Clone (Đầy đủ 100% nguyên bản)

Thư mục này chứa toàn bộ tài nguyên, source code và component tái cấu trúc chuẩn React của chatbot trên [peachweb.io](https://peachweb.io).

## Cấu trúc thư mục

```
clone/peach-chatbot/
├── PeachChatWidget.jsx      # Component React hoàn chỉnh, sạch sẽ, không lỗi (Framer Motion + Canvas 3D)
├── preview.html             # Trang demo HTML nhúng widget nguyên bản để test trực tiếp trên trình duyệt
├── mock-api.js              # Server mock SSE (/api/chat) stream câu trả lời theo thời gian thực
├── widget.js                # Script iframe embed nguyên bản (dùng để nhúng vào bất kỳ trang web nào)
├── widget.html              # Shell HTML nguyên bản từ helpaipeach.vercel.app
├── widget.css               # Toàn bộ CSS Tailwind và styles nguyên bản
├── favicon.ico              # Icon gốc của widget
└── README.md                # Tài liệu hướng dẫn sử dụng
```

## Tính năng nổi bật đã được clone

1. **3D Generative Canvas Orb (`ParticleOrb`):**
   - Quả cầu hạt 3D tự sinh bằng toán học thuần (spherical coordinates, cosine/sine projection).
   - Hiệu ứng vật lý tương tác chuột (mouse repulsion & vortex twist).
   - Tông màu chuyển sắc ấm áp (cam - hổ phách - đỏ mờ) sang trọng.
   - Được dùng cả ở nút bấm nhỏ góc màn hình và phần Hero đỉnh popup.

2. **3 Tab chức năng chính:**
   - **Chat (Trợ lý AI Lucas):**
     - Đón chào với lời giới thiệu kèm animation từng chữ / câu.
     - 6 nút gợi ý khởi đầu (Starter chips).
     - Hỗ trợ Server-Sent Events (SSE) streaming câu trả lời mượt mà.
     - Hỗ trợ format bullet, numbering, code, bold, italic.
     - 5 câu hỏi gợi ý nhanh sau mỗi lượt chat (Follow-up suggestions).
   - **FAQs (14 câu hỏi & câu trả lời thực tế):**
     - Accordion animation xoay icon `+` thành `×` khi mở.
     - Đầy đủ thông tin về giá, tính năng 3D, SEO, bảo trì, so sánh Wix/Framer...
   - **Contact (Kênh kết nối trực tiếp):**
     - Nút email trực tiếp tới `lucas@peachweb.io`.
     - Tích hợp khung đặt lịch gọi 30 phút qua Calendly iframe.

3. **Animation & UX/UI cao cấp:**
   - Sử dụng **Framer Motion** với đường cong bezier `[0.16, 1, 0.3, 1]` chuẩn xác.
   - Hiệu ứng mờ dần `filter: blur(4px)` sang rõ nét `blur(0px)`.
   - Chuyển tab có underline chạy theo vị trí tab hoạt động (`layoutId="tab-underline"`).
   - Nút `Back` quay lại màn hình intro khi đang ở cuộc trò chuyện.

## Cách sử dụng

### Cách 1: Sử dụng Component React (`PeachChatWidget.jsx`)
Trong project React / Vite của bạn:

```jsx
import PeachChatWidget from './clone/peach-chatbot/PeachChatWidget';

function App() {
  return (
    <div>
      {/* Các nội dung khác */}
      <PeachChatWidget
        agentName="Lucas"
        email="contact@yourbrand.com"
        calendlyUrl="https://calendly.com/your-calendly-link"
        apiEndpoint="/api/chat" // hoặc endpoint LLM streaming
      />
    </div>
  );
}
```

### Cách 2: Nhúng nhanh qua Script Iframe (như PeachWeb)
Thêm vào file HTML:
```html
<script src="https://helpaipeach.vercel.app/widget.js" defer></script>
```

### Cách 3: Chạy Test Mock API Streaming
```bash
node clone/peach-chatbot/mock-api.js
```
Endpoint `/api/chat` sẽ hoạt động tại `http://localhost:3001/api/chat`.
