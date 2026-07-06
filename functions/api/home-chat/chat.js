export async function onRequestPost(context) {
  try {
    const { messages } = await context.request.json();
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: "🤖 Hệ thống AI của LETAN Media hiện đang được nâng cấp.\n\nĐể nhận hỗ trợ trực tiếp và báo giá dịch vụ ngay lập tức, vui lòng liên hệ:\n\n📞 Hotline/Zalo: [Gọi/Nhắn Zalo 0765 178 999](https://zalo.me/0765178999)\n💬 Telegram: [Nhắn Telegram @Tanlemedia](https://t.me/Tanlemedia)"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
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

    // Format chat history for Gemini's structured contents format
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
      message: "🤖 Hệ thống AI của LETAN Media hiện đang được nâng cấp.\n\nĐể nhận hỗ trợ trực tiếp và báo giá dịch vụ ngay lập tức, vui lòng liên hệ:\n\n📞 Hotline/Zalo: [Gọi/Nhắn Zalo 0765 178 999](https://zalo.me/0765178999)\n💬 Telegram: [Nhắn Telegram @Tanlemedia](https://t.me/Tanlemedia)"
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
