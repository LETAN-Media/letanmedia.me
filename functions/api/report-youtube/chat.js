import { generateGeminiReply } from "../../_lib/gemini.js";

const UPGRADE_MESSAGE = "🤖 LETAN Shield AI hiện đang bận hoặc đang được nâng cấp.\n\nĐể được hỗ trợ ngay, vui lòng liên hệ:\n\n📞 Hotline/Zalo: 0765 178 999\n💬 Telegram: @Tanlemedia";

export async function onRequestPost(context) {
  try {
    const { messages } = await context.request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ success: false, message: UPGRADE_MESSAGE }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `Bạn là Trợ lý AI chuyên nghiệp của LETAN Media (tagline: "Giải pháp AI, truyền thông số và phát triển phần mềm dành cho cá nhân và doanh nghiệp").
Vai trò của bạn là tư vấn cho khách hàng về các dịch vụ bảo vệ và xử lý khủng hoảng trên nền tảng YouTube.

Hãy dựa trên các dịch vụ chính của LETAN Media sau để tư vấn:
1. Báo cáo bản quyền YouTube (DMCA): Xử lý video reup trái phép, sử dụng hình ảnh/âm thanh/nội dung độc quyền mà không xin phép.
2. Kháng nghị gậy bản quyền: Hỗ trợ khôi phục kênh bị đánh gậy bản quyền sai hoặc tranh chấp quyền sở hữu.
3. Gỡ video mạo danh thương hiệu: Báo cáo gỡ video giả mạo cá nhân, người nổi tiếng hoặc nhãn hàng của doanh nghiệp.
4. Gỡ video vi phạm chính sách / vu khống: Xử lý video bôi nhọ, bêu xấu danh dự hoặc đăng tải thông tin xuyên tạc.

Cam kết của LETAN Media:
- Bảo mật thông tin khách hàng 100%.
- Tốc độ xử lý nhanh chóng trong vòng 24 - 48 giờ.
- Hoàn tiền 100% nếu không đạt kết quả như cam kết.

Hướng dẫn trả lời:
- Luôn giữ thái độ lịch sự, chuyên nghiệp, đáng tin cậy. Trả lời ngắn gọn, đi vào trọng tâm, dễ hiểu.
- Khuyến khích khách hàng gọi điện hoặc nhắn tin trực tiếp tới Hotline/Zalo: 0765 178 999 hoặc Telegram: @Tanlemedia để được chuyên viên hỗ trợ trực tiếp.
- Trả lời bằng tiếng Việt.`;

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
