const ALLOWED_ORIGINS = [
  "https://letanmedia.me",
  "https://www.letanmedia.me",
  "https://aiconstruction.vn",
  "https://www.aiconstruction.vn",
  "https://bmtdecor.ai",
  "https://www.bmtdecor.ai",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
];

function buildCorsHeaders(request) {
  const origin = request.headers.get("Origin");
  const headers = {};
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
  headers["Access-Control-Allow-Headers"] = "Content-Type";
  headers["Access-Control-Max-Age"] = "86400";
  return headers;
}

function jsonResponse(data, status = 200, corsHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

function normalizeMessages(messages) {
  return messages
    .filter((m) => m && typeof m.content === "string")
    .map((m) => ({
      role: ["system", "user", "assistant"].includes(m.role) ? m.role : "user",
      content: m.content.slice(0, 4000)
    }))
    .slice(-16);
}

async function callGemini(messages, env, requestedModel) {
  const keys = [
    env.GEMINI_API_KEY_1,
    env.GEMINI_API_KEY_2
  ].filter(Boolean);
  if (!keys.length) {
    throw new Error("Missing Gemini API key");
  }
  const model = requestedModel || env.GEMINI_MODEL || "gemini-2.5-flash";
  const systemMessages = messages.filter((m) => m.role === "system");
  const chatMessages = messages.filter((m) => m.role !== "system");
  const systemText = systemMessages.map((m) => m.content).join("\n\n");
  
  let filtered = [...chatMessages];
  if (filtered[0]?.role === "assistant") {
    filtered.shift();
  }
  const contents = filtered.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));
  
  for (const key of keys) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const body = {
        contents,
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 900
        }
      };
      if (systemText) {
        body.systemInstruction = {
          parts: [{ text: systemText }]
        };
      }
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        continue;
      }
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) {
        return reply.trim();
      }
    } catch (err) {
      console.error("Gemini provider failed");
    }
  }
  throw new Error("All Gemini keys failed");
}

async function callHuggingFace(messages, env, requestedModel) {
  const keys = [
    env.HF_API_KEY,
    env.HF_API_KEY_1,
    env.HF_API_KEY_2
  ].filter(Boolean);
  if (!keys.length) {
    throw new Error("Missing Hugging Face API key");
  }
  const model = requestedModel || env.HF_MODEL || "mistralai/Mistral-7B-Instruct-v0.3";
  
  for (const key of keys) {
    try {
      const res = await fetch("https://api-inference.huggingface.co/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.6,
          max_tokens: 900
        })
      });
      if (!res.ok) {
        continue;
      }
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) {
        return reply.trim();
      }
    } catch (err) {
      console.error("Hugging Face provider failed");
    }
  }
  throw new Error("All Hugging Face keys failed");
}
async function callNvidia(messages, env, requestedModel) {
  const keys = [
    env.NVIDIA_API_KEY_1,
    env.NVIDIA_API_KEY_2,
    env.NVIDIA_API_KEY,
    env.NVIDIA_KEY
  ].filter(Boolean);
  if (!keys.length) {
    throw new Error("Missing Nvidia API key");
  }
  const model = requestedModel || env.NVIDIA_MODEL || "meta/llama-3.1-70b-instruct";
  
  for (const key of keys) {
    try {
      const res = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.6,
          max_tokens: 900
        })
      });
      if (!res.ok) {
        continue;
      }
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content;
      if (reply) {
        return reply.trim();
      }
    } catch (err) {
      console.error("Nvidia provider failed");
    }
  }
  throw new Error("All Nvidia keys failed");
}

async function callCloudflareAI(messages, env, requestedModel) {
  if (!env.AI) {
    throw new Error("Missing Cloudflare AI binding");
  }
  const model = requestedModel || env.CF_MODEL || "@cf/meta/llama-3-8b-instruct";
  
  try {
    const response = await env.AI.run(model, {
      messages: messages,
      temperature: 0.6,
      max_tokens: 900
    });
    if (response && response.response) {
      return response.response.trim();
    }
  } catch (err) {
    console.error("Cloudflare AI provider failed", err);
  }
  throw new Error("Cloudflare AI failed");
}

async function callAI(messages, env, requestedProvider, requestedModel) {
  const providers = {
    cloudflare: () => callCloudflareAI(messages, env, requestedModel),
    huggingface: () => callHuggingFace(messages, env, requestedModel),
    gemini: () => callGemini(messages, env, requestedModel),
    nvidia: () => callNvidia(messages, env, requestedModel)
  };
  
  const desiredOrder = ["cloudflare", "huggingface", "gemini", "nvidia"];
  let provider = (requestedProvider || env.AI_PROVIDER || "cloudflare").toLowerCase();
  if (!providers[provider]) provider = "cloudflare";
  
  // Put the selected provider first, then the rest in desiredOrder
  const order = [provider, ...desiredOrder.filter(p => p !== provider)];
  
  for (const p of order) {
    try {
      if (providers[p]) {
        return await providers[p]();
      }
    } catch (err) {
      console.error(`${p} failed. Trying next.`);
    }
  }
  
  throw new Error("All providers failed.");
}

export default {
  async fetch(request, env) {
    const corsHeaders = buildCorsHeaders(request);
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }
    if (request.method !== "POST") {
      return jsonResponse(
        {
          success: false,
          message: "Method not allowed"
        },
        405,
        corsHeaders
      );
    }
    try {
      const body = await request.json();
      const messages = normalizeMessages(body.messages || []);
      if (!messages.length) {
        return jsonResponse(
          {
            success: false,
            message: "Vui lòng nhập nội dung cần tư vấn."
          },
          400,
          corsHeaders
        );
      }
      const reply = await callAI(messages, env, body.provider, body.model);
      return jsonResponse(
        {
          success: true,
          message: reply
        },
        200,
        corsHeaders
      );
    } catch (err) {
      console.error("Worker execution failed");
      return jsonResponse(
        {
          success: false,
          message:
            "AI hiện đang bận hoặc đang được nâng cấp. Vui lòng thử lại sau ít phút."
        },
        200,
        corsHeaders
      );
    }
  }
};
