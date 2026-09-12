/**
 * LETAN Media Cloudflare AI Gateway & Chatbot Worker
 * Hỗ trợ song song:
 * 1. Streaming Server-Sent Events (SSE) cho widget PeachChat
 * 2. Standard JSON Response cho các form / component legacy
 */

const ALLOWED_ORIGINS = [
  "https://letanmedia.me",
  "https://www.letanmedia.me",
  "https://aiconstruction.vn",
  "https://www.aiconstruction.vn",
  "https://bmtdecor.ai",
  "https://www.bmtdecor.ai",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

function buildCorsHeaders(request) {
  const origin = request.headers.get("Origin");
  const headers = {
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
    "Access-Control-Max-Age": "86400",
  };

  if (origin && (ALLOWED_ORIGINS.includes(origin) || origin.includes("localhost") || origin.includes("letanmedia"))) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  } else {
    headers["Access-Control-Allow-Origin"] = "*";
  }

  return headers;
}

const SYSTEM_PROMPT = `Bạn là Trợ lý AI tư vấn và chăm sóc khách hàng của LÊ TẤN MEDIA (LETAN Media).

VAI TRÒ & PHONG CÁCH:
- Đóng vai nhân viên tư vấn LÊ TẤN MEDIA, xưng "mình" hoặc "em", gọi khách là "bạn" hoặc "anh/chị".
- Trả lời bằng tiếng Việt tự nhiên, lịch sự, thân thiện, chuyên nghiệp, đi thẳng vào trọng tâm câu hỏi.
- KHÔNG suy nghĩ nội tâm, KHÔNG in thẻ <think>, KHÔNG viết dông dài.

THÔNG TIN DOANH NGHIỆP & LIÊN HỆ:
- Hotline/Zalo: 0765 178 999 (Link Zalo: https://zalo.me/0765178999)
- Telegram: @Tanlemedia (Link Telegram: https://t.me/Tanlemedia)
- Website chính: https://letanmedia.me
- Hệ thống hỗ trợ seeding/tương tác: https://letanmedia.site

CÁC DỊCH VỤ CHÍNH:
1. Thiết kế Website WebGL 3D & Phần mềm: Thiết kế website 3D tương tác cao cấp (Three.js, WebGL), web doanh nghiệp, landing page chuyển đổi cao, hệ thống quản lý.
2. Xử lý & Report Vi phạm bản quyền: Hỗ trợ xử lý vi phạm nội dung, gỡ nội dung giả mạo, báo cáo bản quyền trên TikTok (/tiktok-report) và YouTube (/youtube-report).
3. Tích Xanh & Định Danh MXH: Hỗ trợ hồ sơ xét duyệt tích xanh chính chủ cho Facebook, TikTok, Instagram.
4. Khôi phục & Kháng nghị tài khoản (Unlock): Kháng nghị Fanpage, nick cá nhân Facebook/TikTok bị hack, checkpoint, vô hiệu hóa, FAQ.
5. Marketing, Chạy Ads & Xây kênh: Lên chiến dịch quảng cáo đa kênh, chiến lược phát triển kênh TikTok/YouTube bền vững.
6. Booking Báo chí & Truyền thông PR: Hơn 50+ đầu báo uy tín (VnExpress, Dân Trí, Tuổi Trẻ, Thanh Niên, ZingNews, VTV...).
7. Lập trình AI / Automation Tool: Phát triển chatbot AI, mini app Zalo, tool tự động hóa tác vụ theo yêu cầu.

QUY TẮC BÁO GIÁ & HỖ TRỢ:
- Chi phí dịch vụ phụ thuộc vào tình trạng thực tế và yêu cầu cụ thể của từng dự án.
- Hãy mời khách hàng liên hệ trực tiếp qua Zalo (0765 178 999) hoặc Telegram (@Tanlemedia) để nhận báo giá chi tiết và hỗ trợ nhanh nhất.`;

function sanitizeAnswer(rawText) {
  if (!rawText || typeof rawText !== "string") return "";
  let text = rawText.trim();
  text = text.replace(/<think>[\s\S]*?<\/think>/gi, "");
  text = text.replace(/<thought>[\s\S]*?<\/thought>/gi, "");
  if (/<(?:think|thought)>/i.test(text)) {
    text = text.replace(/<(?:think|thought)>[\s\S]*$/gi, "").trim();
  }
  const tagMatch = text.match(/<final_answer>([\s\S]*?)<\/final_answer>/i) || text.match(/<answer>([\s\S]*?)<\/answer>/i);
  if (tagMatch && tagMatch[1]) {
    text = tagMatch[1].trim();
  }
  text = text.replace(/<\/?[a-zA-Z0-9_:-]+(?:\s+[^>]*)?>/gi, "").trim();
  return text;
}

function normalizeMessages(messages) {
  const normalized = (messages || [])
    .filter((m) => m && typeof m.content === "string")
    .map((m) => ({
      role: ["system", "user", "assistant"].includes(m.role) ? m.role : "user",
      content: m.content.slice(0, 4000),
    }))
    .slice(-12);

  const hasSystem = normalized.some((m) => m.role === "system");
  if (!hasSystem) {
    normalized.unshift({ role: "system", content: SYSTEM_PROMPT });
  }
  return normalized;
}

/**
 * Gọi ToolNet API (groq/qwen/qwen3.6-27b) hỗ trợ Streaming
 */
async function streamToolNet(messages, env) {
  const apiKey = env.TOOLNET_API_KEY;
  const model = env.TOOLNET_MODEL || "alims-intl.llm";

  const response = await fetch("https://api.toolnet.tech/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.6,
      max_tokens: 1200,
      stream: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ToolNet HTTP ${response.status}: ${errorText}`);
  }

  return response.body;
}

/**
 * Xử lý Stream và lọc bỏ thẻ <think> trong thời gian thực
 */
function createSseStream(upstreamBody) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  (async () => {
    const reader = upstreamBody.getReader();
    let buffer = "";
    let insideThink = false;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          const dataStr = trimmed.slice(6);
          if (dataStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(dataStr);
            const delta = parsed.choices?.[0]?.delta?.content || "";
            if (!delta) continue;

            if (delta.includes("<think>")) insideThink = true;
            if (insideThink) {
              if (delta.includes("</think>")) {
                insideThink = false;
                const afterThink = delta.split("</think>")[1];
                if (afterThink && afterThink.trim()) {
                  await writer.write(encoder.encode(`data: ${JSON.stringify({ text: afterThink })}\n\n`));
                }
              }
              continue;
            }

            // Gửi chunk sạch tới client
            await writer.write(encoder.encode(`data: ${JSON.stringify({ text: delta })}\n\n`));
          } catch {
            // bỏ qua ping heartbeat
          }
        }
      }

      await writer.write(encoder.encode("data: [DONE]\n\n"));
    } catch {
      await writer.write(
        encoder.encode(`data: ${JSON.stringify({ text: " Xin lỗi, đường truyền đang gián đoạn. Vui lòng liên hệ Hotline/Zalo: 0765 178 999." })}\n\n`)
      );
      await writer.write(encoder.encode("data: [DONE]\n\n"));
    } finally {
      await writer.close();
    }
  })();

  return readable;
}

/**
 * Fallback gọi ToolNet dạng Non-streaming (cho legacy clients)
 */
async function callToolNetNonStream(messages, env) {
  const apiKey = env.TOOLNET_API_KEY;
  const model = env.TOOLNET_MODEL || "alims-intl.llm";

  const res = await fetch("https://api.toolnet.tech/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.6,
      max_tokens: 1000,
      stream: false,
    }),
  });

  if (!res.ok) throw new Error(`ToolNet non-stream HTTP ${res.status}`);
  let text = await res.text();
  if (text.includes("data: [DONE]")) {
    text = text.replace(/data:\s*\[DONE\]\s*$/, "").trim();
  }
  const data = JSON.parse(text);
  const rawReply = data?.choices?.[0]?.message?.content || "";
  return sanitizeAnswer(rawReply);
}

/**
 * Fallback Cloudflare Workers AI
 */
async function callCloudflareAI(messages, env) {
  if (!env.AI) throw new Error("No Cloudflare AI binding");
  const model = "@cf/meta/llama-3-8b-instruct";
  const response = await env.AI.run(model, {
    messages,
    temperature: 0.6,
    max_tokens: 800,
  });
  if (response && response.response) {
    return sanitizeAnswer(response.response);
  }
  throw new Error("Cloudflare AI returned empty");
}

export default {
  async fetch(request, env) {
    const corsHeaders = buildCorsHeaders(request);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (request.method === "GET") {
      return new Response(
        JSON.stringify({
          status: "online",
          service: "LETAN Media Chatbot Worker",
          version: "2.0-peach-stream",
          time: new Date().toISOString(),
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
        }
      );
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ success: false, message: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
      });
    }

    try {
      const body = await request.json();
      const messages = normalizeMessages(body.messages || []);

      if (!messages.length) {
        return new Response(JSON.stringify({ success: false, message: "Vui lòng nhập tin nhắn." }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
        });
      }

      // Xác định client có yêu cầu streaming hay không (PeachChatWidget hoặc header SSE hoặc path /api/chat)
      const wantsStream =
        body.stream === true ||
        url.pathname.includes("/chat") ||
        url.searchParams.get("stream") === "true" ||
        request.headers.get("Accept")?.includes("text/event-stream") ||
        !body.hasOwnProperty("stream"); // Mặc định hỗ trợ stream cho widget mới

      if (wantsStream && !body.noStream) {
        try {
          const upstreamStream = await streamToolNet(messages, env);
          const sseStream = createSseStream(upstreamStream);
          return new Response(sseStream, {
            headers: {
              ...corsHeaders,
              "Content-Type": "text/event-stream; charset=utf-8",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          });
        } catch (streamErr) {
          console.error("Stream failed, falling back to non-stream reply:", streamErr);
        }
      }

      // Non-streaming response cho legacy component
      let reply = "";
      try {
        reply = await callToolNetNonStream(messages, env);
      } catch {
        try {
          reply = await callCloudflareAI(messages, env);
        } catch {
          reply =
            "Chào bạn, hệ thống AI của LÊ TẤN MEDIA hiện đang bận hoặc đang được cập nhật. Bạn vui lòng nhắn tin trực tiếp qua Zalo/Hotline: 0765 178 999 hoặc Telegram @Tanlemedia để được chuyên viên hỗ trợ tức thì nhé!";
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: reply,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
        }
      );
    } catch (err) {
      console.error("Worker error:", err);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Lỗi kết nối máy chủ AI. Vui lòng thử lại hoặc liên hệ Zalo 0765178999.",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
        }
      );
    }
  },
};
