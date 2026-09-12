/**
 * Server-Sent Events (SSE) Chat API Endpoint
 * Tương thích với PeachChatWidget và helpaipeach.vercel.app/api/chat
 * 
 * Cách chạy test:
 *   node clone/peach-chatbot/mock-api.js
 */

import http from "http";

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/api/chat" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const { messages } = JSON.parse(body || "{}");
        const lastUserMessage = messages?.filter((m) => m.role === "user").pop()?.content || "";

        // Header SSE chuẩn
        res.writeHead(200, {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        });

        // Câu trả lời mẫu hoặc kết nối AI (Gemini / OpenAI)
        const replyChunks = [
          "Chào bạn! ",
          "Tôi là trợ lý AI mô phỏng theo chatbot của PeachWeb. ",
          `Bạn vừa hỏi: "${lastUserMessage}". `,
          "Hệ thống hỗ trợ stream câu trả lời theo thời gian thực (Server-Sent Events) ",
          "với giao diện hạt 3D Generative Canvas Orb cực kỳ mượt mà!",
        ];

        for (const chunk of replyChunks) {
          res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
          await new Promise((resolve) => setTimeout(resolve, 80));
        }

        res.write("data: [DONE]\n\n");
        res.end();
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(PORT, () => {
  console.log(`> Chat API Server đang chạy tại http://localhost:${PORT}/api/chat`);
});
