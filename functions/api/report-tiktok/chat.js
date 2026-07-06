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
Vai trò của bạn là tư vấn cho khách hàng về các dịch vụ bảo vệ và xử lý khủng hoảng trên nền tảng TikTok.

Hãy dựa trên các dịch vụ chính của LETAN Media sau để tư vấn:
1. Report Kênh Vi Phạm / Cạnh Tranh Không Lành Mạnh: Xử lý kênh giả mạo, bôi nhọ, bốc phốt, vu khống cá nhân/doanh nghiệp.
2. Gỡ Video Bôi Nhọ / Fake News: Gỡ bỏ video sai sự thật, công kích, định hướng dư luận xấu.
3. Report Bản Quyền (DMCA): Báo cáo gỡ video reup, ăn cắp âm thanh, hình ảnh, tài sản sở hữu trí tuệ mà không được phép.
4. Report Phiên Live: Can thiệp và báo cáo các livestream bán hàng giả mạo, vi phạm chính sách hoặc công kích.
5. Report Cấm Livestream: Khóa quyền livestream của tài khoản vi phạm nhiều lần hoặc lạm dụng live.
6. Report TikTok Shop: Xử lý shop giả mạo nhãn hiệu, sản phẩm vi phạm bản quyền, cạnh tranh bẩn.

Cam kết của LETAN Media:
- Bảo mật thông tin khách hàng 100%.
- Tốc độ xử lý nhanh chóng trong vòng 24 - 48 giờ.
- Hoàn tiền 100% nếu không đạt kết quả như cam kết.

Hướng dẫn trả lời:
- Luôn giữ thái độ lịch sự, chuyên nghiệp, đáng tin cậy. Trả lời ngắn gọn, đi vào trọng tâm, dễ hiểu.
- Trình bày dạng danh sách (bullet points) khi cần thiết để thông tin rõ ràng.
- Khuyến khích khách hàng để lại thông tin liên hệ (Họ tên + Số điện thoại) hoặc nhắn tin trực tiếp để được chuyên viên kỹ thuật gọi điện hỗ trợ trực tiếp nhanh nhất đối với các trường hợp khẩn cấp.
- Trả lời bằng tiếng Việt.`;

    // Supported Keys list
    const apiKeys = [
      context.env.GEMINI_API_KEY_1 || "AIzaSyBM3GrQUWe3hElV4rKLe6qekshmzXXJfiQ",
      context.env.GEMINI_API_KEY_2 || "AIzaSyBvC0k0bw2wxlkyhKMAoypxs4bJ2d_Ba-s"
    ];

    const modelName = context.env.GEMINI_MODEL || "gemini-2.5-flash";

    // Format chat history for Gemini's structured contents format
    const geminiContents = messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

    let botReply = null;
    let success = false;
    let attempts = 0;
    
    // Deterministic Alternating Selection: Choose index based on the message history length
    // As history grows (2 -> 4 -> 6 -> 8), this alternates keys (1 -> 0 -> 1 -> 0) sequentially
    let selectedIndex = Math.floor(messages.length / 2) % apiKeys.length;
    let apiKey = apiKeys[selectedIndex];

    // Attempt request, with auto failover loop to alternate keys if one is exhausted/throttled
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
        }
        
        console.warn(`Gemini API key at index ${selectedIndex} failed with status ${response.status}. Retrying with another key...`);
      } catch (innerErr) {
        console.error(`Error using Gemini key index ${selectedIndex}:`, innerErr);
      }

      // Alternate to the next key (failover)
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
    // Securely log detailed failure on the server side only
    console.error("Gemini API rotation/execution failure:", error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: "🤖 LETAN Shield AI hiện đang bận hoặc đang được nâng cấp.\n\nĐể được hỗ trợ ngay, vui lòng liên hệ:\n\n📞 Hotline/Zalo: 0765 178 999\n💬 Telegram: @Tanlemedia"
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
