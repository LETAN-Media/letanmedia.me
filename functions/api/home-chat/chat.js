import { generateGeminiReply } from "../../_lib/gemini.js";

const UPGRADE_MESSAGE = "🤖 Hệ thống AI của LETAN Media hiện đang được nâng cấp.\n\nĐể nhận hỗ trợ trực tiếp và báo giá dịch vụ ngay lập tức, vui lòng liên hệ:\n\n📞 Hotline/Zalo: [Gọi/Nhắn Zalo 0765 178 999](https://zalo.me/0765178999)\n💬 Telegram: [Nhắn Telegram @Tanlemedia](https://t.me/Tanlemedia)";

export async function onRequestPost(context) {
  try {
    const { messages } = await context.request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ success: false, message: UPGRADE_MESSAGE }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `Bạn là chatbot tư vấn và chăm sóc khách hàng (CSKH) của LETAN Media (tagline: "Giải pháp AI, truyền thông số và phát triển phần mềm dành cho cá nhân và doanh nghiệp").
Nhiệm vụ chính của bạn là tư vấn ngắn gọn và ĐIỀU HƯỚNG người dùng đến đúng các trang dịch vụ của chúng tôi bằng liên kết Markdown dạng: [Tên Nút](/tên-route).

CÁC ROUTE ĐIỀU HƯỚNG BẮT BUỘC DÙNG (KHI NÓI ĐẾN DỊCH VỤ TƯƠNG ỨNG):
1. Dịch vụ Report TikTok (hoặc report kênh/video TikTok vi phạm, giả mạo, tích xanh TikTok...): chèn [Xem Chi Tiết Dịch Vụ TikTok](/tiktok-report) ở dòng cuối.
2. Dịch vụ Report YouTube (bản quyền YouTube, gỡ gậy, giả mạo YouTube...): chèn [Xem Chi Tiết Dịch Vụ YouTube](/youtube-report) ở dòng cuối.
3. Dịch vụ Chatbot AI, phần mềm, thiết kế web, CRM: chèn [Tìm Hiểu Giải Pháp Chatbot AI](/chatbot-ai) ở dòng cuối.
4. Bất kỳ dịch vụ nào khác hoặc khi khách cần báo giá tổng thể: Hãy hướng dẫn khách liên hệ qua Zalo: [Liên Hệ Qua Zalo](https://zalo.me/0765178999) hoặc Telegram: [Liên Hệ Qua Telegram](https://t.me/Tanlemedia).

QUY TẮC CHỐNG LẠM DỤNG (BẮT BUỘC):
- Trả lời ngắn gọn, cô đọng, không viết dông dài.
- Tuyệt đối không viết code, không làm thơ, không làm toán.
- Luôn luôn chèn liên kết markdown tương ứng ở dòng cuối để điều hướng người dùng.`;

    const botReply = await generateGeminiReply({ messages, systemPrompt, env: context.env });

    return new Response(JSON.stringify({ success: true, message: botReply }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini API execution failure:", error);
    return new Response(JSON.stringify({ success: false, message: UPGRADE_MESSAGE }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
