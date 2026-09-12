(function () {
  "use strict";
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (document.getElementById("home-chat-widget-root")) return;

  var CHAT_API_URL = "/api/home-chat/chat";

  var ICON_MESSAGE =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/></svg>';
  var ICON_X =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
  var ICON_X_SMALL = ICON_X.replace(/width="24" height="24"/, 'width="18" height="18"');
  var ICON_SEND =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>';

  var SUGGESTIONS = [
    "Tư vấn Report TikTok",
    "Tư vấn Report YouTube",
    "Đăng ký Tích Xanh",
    "Thiết kế Website & AI",
  ];

  var SYSTEM_PROMPT =
    'Bạn là chatbot tư vấn và chăm sóc khách hàng (CSKH) của LETAN Media.\n' +
    'Nhiệm vụ chính là tư vấn ngắn gọn và ĐIỀU HƯỚNG người dùng đến đúng các trang dịch vụ của chúng tôi bằng liên kết Markdown dạng: [Tên Nút](/tên-route).\n\n' +
    'CÁC ROUTE ĐIỀU HƯỚNG BẮT BUỘC DÙNG (KHI NÓI ĐẾN DỊCH VỤ TƯƠNG ỨNG):\n' +
    '1. Dịch vụ Report TikTok (hoặc report kênh/video TikTok vi phạm, giả mạo, tích xanh TikTok...): chèn [Xem Chi Tiết Dịch Vụ TikTok](/tiktok-report) ở dòng cuối.\n' +
    '2. Dịch vụ Report YouTube (bản quyền YouTube, gỡ gậy, giả mạo YouTube...): chèn [Xem Chi Tiết Dịch Vụ YouTube](/youtube-report) ở dòng cuối.\n' +
    '3. Dịch vụ Chatbot AI, phần mềm, thiết kế web, CRM: chèn [Tìm Hiểu Giải Pháp Chatbot AI](/chatbot-ai) ở dòng cuối.\n' +
    '4. Bất kỳ dịch vụ nào khác hoặc khi khách cần báo giá tổng thể: Hãy hướng dẫn khách liên hệ qua Zalo: [Liên Hệ Qua Zalo](https://zalo.me/0765178999) hoặc Telegram: [Liên Hệ Qua Telegram](https://t.me/Tanlemedia).\n\n' +
    'QUY TẮC CHỐNG LẠM DỤNG (BẮT BUỘC):\n' +
    '- Trả lời ngắn gọn, cô đọng, không viết dông dài.\n' +
    '- Tuyệt đối không viết code, không làm thơ, không làm toán.\n' +
    '- Luôn luôn chèn liên kết markdown tương ứng ở dòng cuối để điều hướng người dùng.';

  var FALLBACK_MESSAGE =
    '🤖 Hệ thống AI của LETAN Media hiện đang được nâng cấp.\n\n' +
    'Để nhận hỗ trợ trực tiếp và báo giá dịch vụ ngay lập tức, vui lòng liên hệ:\n\n' +
    '📞 Hotline/Zalo: [Gọi/Nhắn Zalo 0765 178 999](https://zalo.me/0765178999)\n' +
    '💬 Telegram: [Nhắn Telegram @Tanlemedia](https://t.me/Tanlemedia)';

  var BUSY_MESSAGE =
    '⚠️ Trợ lý AI đang bận. Đã chuyển sang chế độ liên hệ khẩn cấp:\n\n' +
    '📞 Zalo: [Nhắn Zalo Ngay](https://zalo.me/0765178999)\n' +
    '💬 Telegram: [Nhắn Telegram Ngay](https://t.me/Tanlemedia)';

  var reduceMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var state = {
    isOpen: false,
    isLoading: false,
    consecutiveErrors: 0,
    messages: [
      {
        role: "assistant",
        content: "Chào bạn, tôi là trợ lý AI của LETAN Media. Tôi có thể hỗ trợ gì cho bạn?",
      },
    ],
  };

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function renderMessageContent(content) {
    var regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    var links = [];
    var cleanText = content;
    var match;
    while ((match = regex.exec(content)) !== null) {
      cleanText = cleanText.replace(match[0], "");
      links.push({ text: match[1], url: match[2] });
    }
    cleanText = cleanText.trim().replace(/\n{2,}/g, "\n\n");

    var html = '<div class="message-bubble-wrapper">';
    html += '<div style="white-space:pre-wrap">' + escapeHtml(cleanText) + "</div>";
    if (links.length) {
      html += '<div class="message-action-links">';
      links.forEach(function (link) {
        var isExternal = /^https?:\/\//.test(link.url);
        var target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
        html +=
          '<a class="chat-action-btn" href="' +
          escapeHtml(link.url) +
          '"' +
          target +
          ">" +
          escapeHtml(link.text) +
          "</a>";
      });
      html += "</div>";
    }
    html += "</div>";
    return html;
  }

  function build() {
    var root = document.createElement("div");
    root.id = "home-chat-widget-root";
    root.className = "home-chat-widget";
    root.innerHTML =
      '<button type="button" class="home-chat-trigger" id="home-chat-trigger" aria-label="Mở trợ lý LETAN" aria-expanded="false" aria-controls="home-chat-dialog">' +
      ICON_MESSAGE +
      "</button>" +
      '<div id="home-chat-dialog" class="home-chat-window" role="dialog" aria-labelledby="home-chat-title">' +
      '<div class="home-chat-header">' +
      '<div class="home-chat-header-info">' +
      '<div class="home-bot-avatar">LT</div>' +
      '<div class="home-bot-name">' +
      '<div class="home-bot-title" id="home-chat-title">LETAN Assistant</div>' +
      '<div class="home-bot-status"><span class="home-status-dot"></span><span>Trợ lý tư vấn</span></div>' +
      "</div></div>" +
      '<button type="button" class="home-chat-close" id="home-chat-close" aria-label="Đóng trợ lý LETAN">' +
      ICON_X_SMALL +
      "</button>" +
      "</div>" +
      '<div class="home-chat-messages" id="home-chat-messages" aria-live="polite" aria-busy="false"></div>' +
      '<div class="home-chat-suggestions" id="home-chat-suggestions"></div>' +
      '<div class="home-chat-input-area">' +
      '<input type="text" class="home-chat-input" id="home-chat-input" placeholder="Nhập nội dung tin nhắn..." aria-label="Tin nhắn cho trợ lý LETAN" />' +
      '<button type="button" class="home-chat-send-btn" id="home-chat-send" disabled aria-label="Gửi tin nhắn">' +
      ICON_SEND +
      "</button>" +
      "</div>" +
      "</div>";
    return root;
  }

  function mount() {
    if (!document.body) {
      setTimeout(mount, 20);
      return;
    }

    var root = build();
    document.body.appendChild(root);

    var trigger = root.querySelector("#home-chat-trigger");
    var closeBtn = root.querySelector("#home-chat-close");
    var messagesEl = root.querySelector("#home-chat-messages");
    var suggestionsEl = root.querySelector("#home-chat-suggestions");
    var input = root.querySelector("#home-chat-input");
    var sendBtn = root.querySelector("#home-chat-send");

    function renderMessages() {
      messagesEl.innerHTML = "";
      state.messages.forEach(function (msg) {
        var div = document.createElement("div");
        div.className = "home-chat-message " + msg.role;
        div.innerHTML = renderMessageContent(msg.content);
        messagesEl.appendChild(div);
      });

      if (state.isLoading) {
        var loading = document.createElement("div");
        loading.className = "home-chat-loading";
        loading.innerHTML =
          '<span class="home-chat-loading-dot"></span><span class="home-chat-loading-dot"></span><span class="home-chat-loading-dot"></span>';
        messagesEl.appendChild(loading);
      }

      messagesEl.setAttribute("aria-busy", state.isLoading ? "true" : "false");
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function renderSuggestions() {
      suggestionsEl.innerHTML = "";
      if (state.messages.length === 1 && !state.isLoading) {
        SUGGESTIONS.forEach(function (sug) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "home-chat-suggest-btn";
          btn.textContent = sug;
          btn.disabled = state.isLoading;
          btn.addEventListener("click", function () {
            handleSend(sug);
          });
          suggestionsEl.appendChild(btn);
        });
      }
    }

    function renderInput() {
      sendBtn.disabled = !input.value.trim() || state.isLoading;
      input.disabled = state.isLoading;
    }

    function render() {
      renderMessages();
      renderSuggestions();
      renderInput();
    }

    function openWidget() {
      state.isOpen = true;
      root.classList.add("is-open");
      trigger.innerHTML = ICON_X;
      trigger.setAttribute("aria-label", "Đóng trợ lý LETAN");
      trigger.setAttribute("aria-expanded", "true");
      window.requestAnimationFrame(function () {
        closeBtn.focus();
      });
    }

    function closeWidget() {
      state.isOpen = false;
      root.classList.remove("is-open");
      trigger.innerHTML = ICON_MESSAGE;
      trigger.setAttribute("aria-label", "Mở trợ lý LETAN");
      trigger.setAttribute("aria-expanded", "false");
      trigger.focus();
    }

    trigger.addEventListener("click", function () {
      if (state.isOpen) {
        closeWidget();
      } else {
        openWidget();
        if (window.dataLayer) {
          window.dataLayer.push({ event: "open_home_chatbot" });
        }
      }
    });

    closeBtn.addEventListener("click", closeWidget);

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && state.isOpen) {
        closeWidget();
      }
    });

    window.addEventListener("open-home-chatbot", function (e) {
      openWidget();
      var detail = e && e.detail;
      if (detail && detail.message) {
        setTimeout(
          function () {
            handleSend(detail.message);
          },
          reduceMotion ? 0 : 250
        );
      }
    });

    input.addEventListener("input", renderInput);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
    sendBtn.addEventListener("click", function () {
      handleSend();
    });

    function handleSend(textToSend) {
      var text = textToSend || input.value;
      if (!text || !text.trim()) return;

      if (!textToSend) {
        input.value = "";
      }

      state.messages.push({ role: "user", content: text });
      state.isLoading = true;
      render();

      var payloadMessages = [{ role: "system", content: SYSTEM_PROMPT }].concat(
        state.messages.map(function (m) {
          return { role: m.role, content: m.content };
        })
      );

      fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      })
        .then(function (response) {
          if (response.status !== 200) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then(function (data) {
          if (data && data.success && data.message) {
            state.messages.push({ role: "assistant", content: data.message });
            state.consecutiveErrors = 0;
          } else {
            state.consecutiveErrors += 1;
            var finalMessage =
              state.consecutiveErrors >= 2
                ? BUSY_MESSAGE
                : (data && data.message) || FALLBACK_MESSAGE;
            state.messages.push({ role: "assistant", content: finalMessage });
          }
        })
        .catch(function (err) {
          console.error("Home chat error:", err);
          state.consecutiveErrors += 1;
          var finalMessage = state.consecutiveErrors >= 2 ? BUSY_MESSAGE : FALLBACK_MESSAGE;
          state.messages.push({ role: "assistant", content: finalMessage });
        })
        .finally(function () {
          state.isLoading = false;
          render();
        });
    }

    render();
  }

  mount();
})();
