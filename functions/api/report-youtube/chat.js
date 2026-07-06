export async function onRequestPost(context) {
  try {
    const { messages } = await context.request.json();
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "🤖 LETAN Shield AI hiện đang bận hoặc đang được nâng cấp.\n\nĐể được hỗ trợ ngay, vui lòng liên hệ:\n\n📞 Hotline/Zalo: 0765 178 999\n💬 Telegram: @Tanlemedia"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
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

    // Supported Keys list
    const apiKeys = [
      context.env.GEMINI_API_KEY_1 || "AIzaSyBM3GrQUWe3hElV4rKLe6qekshmzXXJfiQ",
      context.env.GEMINI_API_KEY_2 || "AIzaSyBvC0k0bw2wxlkyhKMAoypxs4bJ2d_Ba-s"
    ];

    const modelName = context.env.GEMINI_MODEL || "gemini-2.5-flash";

    // Filter out the initial welcome message if it starts with the assistant/model role
    let filteredMessages = [...messages];
    if (filteredMessages.length > 0 && filteredMessages[0].role === 'assistant') {
      filteredMessages.shift();
    }

    // Format chat history for Gemini's contents format
    const geminiContents = filteredMessages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

    let botReply = null;
    let success = false;
    let attempts = 0;
    
    let selectedIndex = Math.floor(messages.length / 2) % apiKeys.length;
    let apiKey = apiKeys[selectedIndex];

    // Attempt request, with auto failover loop
    while (attempts < apiKeys.length && !success) {
      try {
        if (!apiKey) {
          throw new Error(`API key at index ${selectedIndex} is empty`);
        }

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

        const response = await fetch(geminiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: geminiContents,
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (botReply) {
            success = true;
            break;
          }
        } else {
          const responseErr = await response.text();
          console.warn(`Gemini API key at index ${selectedIndex} failed with status ${response.status}: ${responseErr}`);
        }
      } catch (innerErr) {
        console.error(`Error using Gemini key index ${selectedIndex}:`, innerErr);
      }

      attempts++;
      selectedIndex = (selectedIndex + 1) % apiKeys.length;
      apiKey = apiKeys[selectedIndex];
    }

    if (!success || !botReply) {
      throw new Error("All configured Gemini API keys failed to return a valid response.");
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: botReply 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Gemini API execution failure:", error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: "🤖 LETAN Shield AI hiện đang bận hoặc đang được nâng cấp.\n\nĐể được hỗ trợ ngay, vui lòng liên hệ:\n\n📞 Hotline/Zalo: 0765 178 999\n💬 Telegram: @Tanlemedia"
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
