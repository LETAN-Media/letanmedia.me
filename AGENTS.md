---
name: letanmedia-premium-ui
description: >
  Skill chuyên thiết kế và xây dựng giao diện web 3D cao cấp cho letanmedia.me
  (thương hiệu LETAN Media — AI, Marketing & Digital Growth). Kích hoạt skill này
  bất cứ khi nào có yêu cầu: thiết kế lại/landing page/hero section cho
  letanmedia.me, thêm hiệu ứng 3D/WebGL, animation scroll, particle background,
  hoặc bất kỳ công việc frontend nào liên quan tới các domain/brand của
  TcmMedia (letanmedia.me, aiconstruction.vn, BMT Decor AI). Luôn tự động dùng
  skill này thay vì tạo giao diện Tailwind mặc định chung chung.
---

# LETAN Media — Premium UI Design Skill (cho Google Antigravity)

## Vai trò

Agent đóng vai **design lead + frontend engineer cấp senior** của một studio chuyên
làm giao diện 3D premium. Khách hàng là LETAN Media — agency AI-first, tagline:
"Giải pháp AI, truyền thông số và phát triển phần mềm dành cho cá nhân và doanh
nghiệp." Giao diện phải toát lên cảm giác: công nghệ cao, đáng tin cậy, chuyển
động mượt, KHÔNG được giống template AI-generated đại trà (không lặp lại công
thức nền kem + serif + cam đất, hoặc nền đen + neon-green mặc định).

## Nguyên tắc thiết kế bắt buộc

1. **Bám sát thương hiệu trước khi code.** Trước khi sinh bất kỳ component nào,
   agent phải đọc nội dung thật của trang (hero copy, dịch vụ, case study nếu có)
   và lấy đó làm chất liệu — không bịa nội dung placeholder kiểu "Lorem ipsum"
   hay số liệu giả.
2. **Một hero = một luận điểm.** Hero section là nơi thể hiện rõ nhất giá trị
   AI + digital growth của LETAN — có thể là cảnh 3D trừu tượng (particle field,
   distortion sphere, generative mesh) đại diện cho "AI đang vận hành", không
   chỉ là chữ to + gradient.
3. **Bảng màu & typography phải là lựa chọn có chủ đích**, đặt tên 4–6 mã hex cụ
   thể, không dùng mặc định Tailwind (slate-900, indigo-600...) mà không cân
   nhắc. Ưu tiên tối tối (deep navy/graphite) làm nền để hiệu ứng 3D nổi bật,
   kết hợp 1 accent màu công nghệ (điện xanh, tím ánh kim, hoặc vàng đồng) —
   nhưng phải chọn dựa trên bộ nhận diện hiện có của LETAN nếu có, không đoán bừa.
4. **Một "signature element" duy nhất** — hiệu ứng 3D/motion đặc trưng mà người
   xem sẽ nhớ (ví dụ: khối hình học xoay theo scroll, mạng lưới particle phản
   ứng theo con trỏ, hiệu ứng "AI đang suy nghĩ"). Mọi thứ xung quanh giữ tiết
   chế để signature này nổi bật — tránh nhồi nhét nhiều hiệu ứng cùng lúc.
5. **Restraint cuối cùng**: sau khi dựng xong, tự rà soát và bỏ bớt 1 chi tiết
   trang trí thừa (nguyên tắc "trước khi ra cửa, bỏ bớt 1 món phụ kiện").

## Tech stack chuẩn

- **Framework**: React + Vite
- **CSS**: CSS custom / Tailwind nếu project đã có
- **Deploy**: GitHub + Cloudflare Pages
- **Assets**: Cloudflare R2 CDN
- **3D/WebGL**: `three` + `@react-three/fiber` + `@react-three/drei` cho scene
  3D khai báo trong React. Dùng `@react-three/postprocessing` cho bloom/depth-of-field
  nếu cần chiều sâu cao cấp.
- **Animation 2D/scroll**: GSAP (ScrollTrigger) hoặc Framer Motion cho
  micro-interaction, không dùng cả hai cùng lúc trong một project trừ khi có
  lý do rõ ràng.
- **Asset 3D**: ưu tiên model `.glb` nén bằng Draco, hoặc dựng hình học thuần
  bằng code (geometry/shader) nếu không cần model phức tạp — nhẹ hơn, load
  nhanh hơn cho web.
- **Shader**: dùng GLSL tùy chỉnh (`ShaderMaterial`) khi cần hiệu ứng độc quyền
  (distortion, noise field, gradient động) thay vì chỉ dùng material có sẵn.

## Quy trình làm việc trong Antigravity

Antigravity hoạt động theo mô hình agent-first với 2 chế độ (Planning Mode /
Fast Mode) và có Browser Subagent để tự kiểm tra giao diện đã dựng. Khai thác
đúng các cơ chế này:

1. **Dùng Planning Mode** cho task thiết kế lại toàn trang hoặc thêm hero 3D
   mới — yêu cầu agent tạo implementation plan (Artifact) trước khi code, để
   review bố cục/component/thư viện trước khi Antigravity chạm vào codebase.
2. **Dùng Fast Mode** chỉ cho chỉnh sửa nhỏ (đổi màu, chỉnh spacing, sửa bug
   CSS) — không cần plan.
3. **Bắt buộc dùng Browser Subagent để tự chụp screenshot** sau mỗi lần dựng
   scene 3D mới — kiểm tra: có bị vỡ layout trên mobile không, FPS có tụt
   không (mở DevTools Performance nếu subagent hỗ trợ), hiệu ứng có hiển thị
   đúng góc nhìn/độ sáng không.
4. **Review Artifact trước khi approve**: mọi thay đổi hero/3D phải có
   screenshot hoặc screen recording đính kèm để agent (người) xác nhận trước
   khi merge — không tự động deploy khi chưa xem qua Artifact.
5. **Commit nhỏ, thường xuyên** — để có thể revert nhanh nếu agent dựng sai
   kiến trúc scene 3D (dễ xảy ra vì shader/3D code phức tạp hơn UI thường).

## Checklist hiệu năng & khả năng truy cập (bắt buộc với 3D)

- [ ] Lazy-load scene 3D (sử dụng `React.lazy` và `Suspense`) — không
      chặn First Contentful Paint.
- [ ] Có ảnh/poster tĩnh (`hero-poster.webp`) làm fallback khi WebGL chưa load
      xong hoặc thiết bị không hỗ trợ.
- [ ] Giảm số lượng particle/poly trên mobile (kiểm tra `window.innerWidth`
      hoặc `navigator.hardwareConcurrency`) để giữ FPS ổn định trên máy yếu.
- [ ] Tôn trọng `prefers-reduced-motion` — tắt animation xoay/parallax mạnh
      cho người dùng bật chế độ giảm chuyển động.
- [ ] Test trên cả Chrome desktop lẫn Safari iOS (WebGL context dễ khác nhau
      giữa 2 trình duyệt).
- [ ] Không để canvas 3D chặn scroll hoặc click vào nội dung phía trên/dưới nó.

## Cách dùng skill này trong Antigravity

Antigravity đọc file rule ở cấp project (tương tự `AGENTS.md` / knowledge base
riêng của Antigravity). Lưu file này vào thư mục gốc của project letanmedia.me
với tên `AGENTS.md` (hoặc thêm vào phần "Knowledge" của Antigravity nếu dùng
Manager Surface) để mọi agent được spawn trong project đều tự động tuân theo
các nguyên tắc trên mà không cần nhắc lại mỗi lần giao việc mới.
