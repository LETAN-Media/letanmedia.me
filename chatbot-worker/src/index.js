/**
 * LETAN Media Cloudflare AI Gateway & Chatbot Worker
 * Hỗ trợ song song:
 * 1. Streaming Server-Sent Events (SSE) cho widget PeachChat
 * 2. Standard JSON Response cho các form / component legacy
 */

const ALLOWED_ORIGINS = [
  "https://letanmedia.me",
  "https://www.letanmedia.me",
  "https://letan-chatbot-widget.vercel.app",
  "https://aiconstruction.vn",
  "https://www.aiconstruction.vn",
  "https://bmtdecor.ai",
  "https://www.bmtdecor.ai",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

function buildCorsHeaders(request) {
  const origin = request.headers.get("Origin");
  const headers = {
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
    "Access-Control-Max-Age": "86400",
  };

  if (
    origin &&
    (ALLOWED_ORIGINS.includes(origin) ||
      origin.includes("localhost") ||
      origin.includes("letanmedia") ||
      origin.includes("vercel.app"))
  ) {
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
  const tagMatch =
    text.match(/<final_answer>([\s\S]*?)<\/final_answer>/i) ||
    text.match(/<answer>([\s\S]*?)<\/answer>/i);
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
 * Gọi ToolNet API hỗ trợ Streaming với chuỗi mô hình dự phòng (Auto-fallback)
 * 1. alims-intl.llm (theo yêu cầu người dùng, timeout 3s)
 * 2. groq/qwen/qwen3.8-27b (siêu tốc ~0.8s, không lag, streaming trực tiếp)
 * 3. groq/qwen/qwen3.6-27b (tốc độ cao ~1.5s)
 * 4. alims-intl/qwen3.6-27b (dự phòng)
 */
async function streamToolNet(messages, env) {
  const apiKey = env.TOOLNET_API_KEY;
  const preferredModel = env.TOOLNET_MODEL || "alims-intl.llm";
  const candidateModels = Array.from(
    new Set([
      preferredModel,
      "groq/qwen/qwen3.8-27b",
      "groq/qwen/qwen3.6-27b",
      "alims-intl/qwen3.6-27b",
    ].filter(Boolean))
  );

  let lastError = null;
  for (const model of candidateModels) {
    try {
      const controller = new AbortController();
      // Cho alims-intl.llm 3s, các model khác 5s
      const timeoutMs = model.includes("llm") ? 3000 : 5000;
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

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
          max_tokens: 500,
          stream: true,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok && response.body) {
        return response.body;
      }

      const errorText = await response.text().catch(() => "");
      lastError = new Error(`ToolNet [${model}] HTTP ${response.status}: ${errorText}`);
      console.warn(`[streamToolNet] Model ${model} failed (${response.status}), switching to next...`);
    } catch (err) {
      lastError = err;
      console.warn(`[streamToolNet] Fetch failed on ${model}:`, err.message);
    }
  }

  throw lastError || new Error("All candidate ToolNet models failed");
}

/**
 * Xử lý Stream SSE chuyển hóa chunk delta sạch tới client
 */
function createSseTransform() {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let buffer = "";
  let insideThink = false;
  let hasSentAnyChunk = false;

  return new TransformStream({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data: ")) continue;
        const dataStr = trimmed.slice(6);
        if (dataStr === "[DONE]") {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          continue;
        }

        try {
          const parsed = JSON.parse(dataStr);
          let delta = parsed.choices?.[0]?.delta?.content || "";
          if (!delta) continue;

          if (delta.includes("<think>")) insideThink = true;
          if (insideThink) {
            if (delta.includes("</think>")) {
              insideThink = false;
              delta = delta.split("</think>")[1] || "";
            } else {
              continue;
            }
          }

          if (delta) {
            hasSentAnyChunk = true;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: delta })}\n\n`));
          }
        } catch {
          // ignore non-json
        }
      }
    },
    flush(controller) {
      if (!hasSentAnyChunk) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              text: "Chào bạn! Mình là Trợ lý AI của LÊ TẤN MEDIA. Bạn đang cần tư vấn về thiết kế Web 3D, bản quyền mạng xã hội hay giải pháp số? Hãy liên hệ ngay Hotline/Zalo: 0765 178 999 hoặc Telegram @Tanlemedia để được hỗ trợ tức thì nhé!",
            })}\n\n`
          )
        );
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
    },
  });
}

/**
 * Tạo phản hồi SSE đơn giản cho chuỗi hoàn chỉnh (Fallback)
 */
function createSingleMessageSse(text, corsHeaders) {
  const payload = `data: ${JSON.stringify({ text })}\n\ndata: [DONE]\n\n`;
  return new Response(payload, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

/**
 * Fallback gọi ToolNet dạng Non-streaming
 */
async function callToolNetNonStream(messages, env) {
  const apiKey = env.TOOLNET_API_KEY;
  const preferredModel = env.TOOLNET_MODEL || "alims-intl.llm";
  const candidateModels = Array.from(
    new Set([
      preferredModel,
      "groq/qwen/qwen3.8-27b",
      "groq/qwen/qwen3.6-27b",
      "alims-intl/qwen3.6-27b",
    ].filter(Boolean))
  );

  for (const model of candidateModels) {
    try {
      const controller = new AbortController();
      const timeoutMs = model.includes("llm") ? 3000 : 5000;
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

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
          max_tokens: 500,
          stream: false,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) continue;
      let text = await res.text();
      if (text.includes("data: [DONE]")) {
        text = text.replace(/data:\s*\[DONE\]\s*$/, "").trim();
      }
      const data = JSON.parse(text);
      const rawReply = data?.choices?.[0]?.message?.content || "";
      if (rawReply) return sanitizeAnswer(rawReply);
    } catch {
      // try next
    }
  }

  throw new Error("All ToolNet non-stream models failed");
}

/**
 * Fallback Cloudflare Workers AI cục bộ
 */
async function callCloudflareAI(messages, env) {
  if (!env.AI) throw new Error("No Cloudflare AI binding");
  const model = "@cf/meta/llama-3-8b-instruct";
  const response = await env.AI.run(model, {
    messages,
    temperature: 0.6,
    max_tokens: 600,
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

    if (request.method === "GET") {
      return new Response(
        JSON.stringify({
          status: "online",
          service: "LETAN Media Chatbot Worker",
          version: "2.1-stream-instant",
          model: env.TOOLNET_MODEL || "alims-intl.llm",
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

      // Xử lý Non-streaming nếu client yêu cầu rõ ràng
      const isExplicitNonStream = body.stream === false || body.noStream === true;
      if (isExplicitNonStream) {
        let reply = "";
        try {
          reply = await callToolNetNonStream(messages, env);
        } catch {
          try {
            reply = await callCloudflareAI(messages, env);
          } catch {
            reply =
              "Chào bạn, hệ thống AI của LÊ TẤN MEDIA hiện đang bận. Bạn vui lòng nhắn tin trực tiếp qua Zalo/Hotline: 0765 178 999 hoặc Telegram @Tanlemedia để được chuyên viên hỗ trợ tức thì nhé!";
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
      }

      // Mặc định: Stream phản hồi theo SSE
      try {
        const upstreamStream = await streamToolNet(messages, env);
        const transformedStream = upstreamStream.pipeThrough(createSseTransform());

        return new Response(transformedStream, {
          headers: {
            ...corsHeaders,
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      } catch (streamErr) {
        console.error("Stream failed, triggering instant fallback:", streamErr);
        let fallbackReply = "";
        try {
          fallbackReply = await callCloudflareAI(messages, env);
        } catch {
          fallbackReply =
            "Chào bạn! Mình là Trợ lý AI của LÊ TẤN MEDIA. Bạn đang cần tư vấn về thiết kế Web 3D, bản quyền mạng xã hội hay giải pháp AI? Hãy liên hệ ngay Hotline/Zalo: 0765 178 999 hoặc Telegram @Tanlemedia để được hỗ trợ nhanh nhất nhé!";
        }
        return createSingleMessageSse(fallbackReply, corsHeaders);
      }
    } catch (err) {
      console.error("Worker fatal error:", err);
      return createSingleMessageSse(
        "Chào bạn, hệ thống AI đang cập nhật. Bạn vui lòng liên hệ Hotline/Zalo: 0765 178 999 để được hỗ trợ trực tiếp.",
        corsHeaders
      );
    }
  },
};
