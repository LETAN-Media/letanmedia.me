import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// Custom easing curves from PeachWeb
const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_IN_OUT = [0.65, 0, 0.35, 1];
const TRANSITION_SPRING = { duration: 0.6, ease: EASE_OUT };

// 3D Generative Particle Sphere (Canvas Orb)
export function ParticleOrb({
  sizeScale = 1,
  pointerForce = 1.4,
  rotationSpeed = 0.00012,
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "width:100%;height:100%;display:block;";
    container.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let particles = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let centerX = 0;
    let centerY = 0;
    let radius = 0;
    let animId = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      centerX = width / 2;
      centerY = height / 2;

      radius = 0.28 * Math.min(width, height);
      const ringCount = Math.max(40, Math.round(radius / 2.6));
      const pts = [];

      for (let ring = 0; ring < ringCount; ring++) {
        const phi = (ring / (ringCount - 1)) * Math.PI;
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);
        const ringParticleCount = Math.max(12, Math.round(sinPhi * radius * 1.45));

        for (let pt = 0; pt < ringParticleCount; pt++) {
          const theta = (pt / ringParticleCount) * Math.PI * 2 + 0.18 * ring;
          const x = Math.cos(theta) * sinPhi;
          const z = Math.sin(theta) * sinPhi;

          // Color calculation: warm glowing peach/amber/red tones
          const colorFactor = Math.max(
            0,
            Math.min(1, 0.45 + 0.55 * (1 - Math.abs(cosPhi)) + (Math.random() - 0.5) * 0.15)
          );
          const cr = Math.round(255 - 15 * colorFactor);
          const cg = Math.round(180 - 110 * colorFactor);
          const cb = Math.round(110 - 85 * colorFactor);

          const baseSize = (Math.random() < 0.94 ? 0.55 + 0.95 * Math.random() : 1.5 + 1.2 * Math.random()) * sizeScale;

          pts.push({
            bx: x,
            by: cosPhi,
            bz: z,
            x: centerX + x * radius,
            y: centerY + cosPhi * radius,
            vx: 0,
            vy: 0,
            baseSize,
            cr,
            cg,
            cb,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
      particles = pts;
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.x <= width && pointer.y >= 0 && pointer.y <= height;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      const angle = time * rotationSpeed;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let { x, y, vx, vy } = p;

        // 3D rotation & isometric tilt
        const rotX = p.bx * cosA + p.bz * sinA;
        const rotZ = -p.bx * sinA + p.bz * cosA;
        const tiltedY = 0.9004471023526769 * p.by - 0.43496553411123023 * rotZ;
        const tiltedZ = 0.43496553411123023 * p.by + 0.9004471023526769 * rotZ;

        // Perspective projection
        const perspective = 1 / (1 - 0.4 * tiltedZ);
        const targetX = centerX + rotX * radius * perspective;
        const targetY = centerY + tiltedY * radius * perspective;
        const depthFactor = (tiltedZ + 1) * 0.5;

        // Pointer repulsion and vortex twist
        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 90) {
            const force = (1 - dist / 90) * pointerForce;
            const nx = dx / dist;
            const ny = dy / dist;
            vx += nx * force - ny * force * 0.35;
            vy += ny * force + nx * force * 0.35;
          }
        }

        // Ambient fluid wobble & spring return
        vx += 0.06 * Math.sin(0.0014 * time + p.phase);
        vy += 0.06 * Math.cos(0.0011 * time + 1.3 * p.phase);
        vx += (targetX - x) * 0.035;
        vy += (targetY - y) * 0.035;
        vx *= 0.86;
        vy *= 0.86;
        x += vx;
        y += vy;
        p.x = x;
        p.y = y;
        p.vx = vx;
        p.vy = vy;

        const size = 0.6 + depthFactor;
        const alpha = 0.35 + 0.65 * depthFactor;

        ctx.fillStyle = `rgba(${p.cr},${p.cg},${p.cb},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.baseSize * size, 0, 2 * Math.PI);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    window.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      if (canvas.parentElement === container) {
        container.removeChild(canvas);
      }
    };
  }, [sizeScale, pointerForce, rotationSpeed]);

  return <div ref={containerRef} aria-hidden={true} className="pointer-events-none absolute inset-0" />;
}

// Quick suggestions when chat is active
const CHAT_SUGGESTIONS = [
  { icon: "💳", title: "What does it cost?" },
  { icon: "🧭", title: "How does PeachWeb work?" },
  { icon: "🧩", title: "Do I need to be a developer or 3D designer?" },
  { icon: "🔀", title: "How does it compare to Wix, Framer or Squarespace?" },
  { icon: "📱", title: "Does it perform across all devices?" },
];

// Initial starter chips below greeting
const STARTER_CHIPS = [
  { label: "How much does it cost?", message: "How much does PeachWeb cost?" },
  { label: "How does it work?", message: "How does PeachWeb work?" },
  { label: "Vs Wix or Framer?", message: "How does PeachWeb compare to Wix or Framer?" },
  { label: "Can I work with a Pro?", message: "Can I work with a Pro?" },
  { label: "How does it perform?", message: "How does PeachWeb perform across devices?" },
  { label: "Do I need to code?", message: "Do I need to code or know 3D design?" },
];

// 14 FAQs from PeachWeb
const FAQS_DATA = [
  {
    q: "Can I work with an expert?",
    a: "Yes — three ways, depending on how hands-off you want to be. Launch with a Pro ($999, same week) is the fastest: you chat with our onboarding agent for around 10 minutes, then a PeachWeb expert applies your copy, content, images and 3D scene colours to a template and publishes it live. Customise with a Pro ($4,999, 2–3 weeks) adds custom 3D models and scenes built specifically for your brand, with 2 rounds of revisions. Build a Custom Website (from $9,999, 4–8 weeks) is fully bespoke — storyboarding, custom models, full scene composition, the works. You keep full builder access after every Pro build, so you can iterate freely yourself afterwards.",
  },
  {
    q: "What is a 3D Website Builder and who is it for?",
    a: "PeachWeb is the first 3D website builder built for both developers and non-technical founders who want a stunning 3D website without the complicated setup. Whether you need an animation studio website, a product demo, a portfolio, or a brand site, PeachWeb helps you craft immersive visuals and interactive 3D elements quickly, without writing WebGL or JavaScript. Under the hood it runs on Three.js, the same WebGL rendering engine used by Nike, Apple, and BMW.",
  },
  {
    q: "How does PeachWeb work?",
    a: "You start by going through PeachMagic onboarding, describe your business, pick a 3D template, and the AI populates it with your copy automatically. From there you have two editors: the UI editor (works like Framer, blocks, text, images, scroll animations) and the 3D editor (point-and-click materials, lighting, HDRI environments, post-processing effects, keyframe animation). When you are ready, connect your custom domain and publish.",
  },
  {
    q: "Do I get a custom domain?",
    a: "Yes, on all paid hosting plans (Individual and above, from $29/mo). You connect it through your domain registrar, verify it in the builder settings, and it goes live at publish. The Free plan uses a Peach subdomain.",
  },
  {
    q: "Can I embed PeachWeb into my existing website?",
    a: "Yes, you can embed a PeachWeb scene or full page into any existing site via iframe. This is useful if you want to add an immersive 3D hero or product visualisation to a site already built on Webflow, WordPress, or any other platform.",
  },
  {
    q: "What does it cost?",
    a: "Building is free. Hosting is per website: Free ($0, Peach domain), Individual ($29/mo, custom domain, 3 pages), Basic ($69/mo, 20 pages), Pro ($179/mo, unlimited pages). Templates are $0–$29 one-time. Additional pages are $499 each.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit cards. For Pro service packages we also support bank transfer. Reach us at lucas@peachweb.io for enterprise or custom billing.",
  },
  {
    q: "What is your refund policy?",
    a: "Hosting can be cancelled anytime, access continues until the end of your billing period. For themes and Pro services, contact lucas@peachweb.io within 7 days if there is an issue and we will work it out.",
  },
  {
    q: "Do you offer website maintenance?",
    a: "Optional, $199/month, ad hoc, no contract. Each month includes up to 8 UI content updates, 1 3D scene fix, and copy and content changes. Only pay when you need it.",
  },
  {
    q: "Does it perform across all devices?",
    a: "Yes, desktop, tablet, and mobile. Every template is tested across device classes. Auto resolution reduction runs by default on mobile. Sites typically score 85+ on PageSpeed mobile. Target load time per scene is 2-3 seconds.",
  },
  {
    q: "How does it handle SEO?",
    a: "Sites are server-rendered HTML, not an iframe embed. Alt text on images is supported, HTML tags are configurable from the inspector, and fast load times directly improve Core Web Vitals scores.",
  },
  {
    q: "Do I need to be a developer or 3D designer?",
    a: "Not at all. The 3D editor is built for non-technical users, you are working with ready-made materials, backdrops, colour palettes, and shader effects. No modelling skills, no coding, no WebGL knowledge required.",
  },
  {
    q: "Can I edit the site myself after it is built?",
    a: "Yes, you keep full builder access after any Pro build. No locked codebase. Update copy, swap images, change colours, or adjust the 3D scene yourself anytime.",
  },
  {
    q: "How does it compare to Wix, Framer, or Squarespace?",
    a: "Wix, Framer, and Squarespace are solid tools for standard websites. PeachWeb does what none of them can, full interactive 3D scenes, scroll-driven camera animation, AI-generated shaders, immersive post-processing effects, all inside a familiar no-code editor.",
  },
];

const GREETING_TEXT = `Hey, welcome to LETAN Media 👋\n\nI'm here to answer anything you'd like !`;

const TABS = [
  { key: "chat", label: "Chat" },
  { key: "faqs", label: "FAQs" },
  { key: "contact", label: "Contact" },
];

let idCounter = 0;
const generateId = () => `pp-${++idCounter}-${Date.now()}`;

// Lightweight inline markdown formatter
function renderFormattedText(text, prefix) {
  const parts = [];
  const regex = /(\*\*([^*\n]+)\*\*)|(\*([^*\n]+)\*)|(`([^`\n]+)`)/g;
  let lastIndex = 0;
  let matchIdx = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[2] !== undefined) {
      parts.push(
        <strong key={`${prefix}-b-${matchIdx}`} className="font-semibold">
          {match[2]}
        </strong>
      );
    } else if (match[4] !== undefined) {
      parts.push(
        <em key={`${prefix}-i-${matchIdx}`} className="italic">
          {match[4]}
        </em>
      );
    } else if (match[6] !== undefined) {
      parts.push(
        <code key={`${prefix}-c-${matchIdx}`} className="rounded bg-white/10 px-1 py-0.5 text-[12.5px]">
          {match[6]}
        </code>
      );
    }
    lastIndex = match.index + match[0].length;
    matchIdx += 1;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

// Format message content with bullets, paragraphs, and inline markdown
function formatAssistantMessage(content) {
  const clean = content
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .split("\n");

  const nodes = [];
  let currentBullets = [];
  let sectionIndex = 0;

  const flushBullets = () => {
    if (!currentBullets.length) return;
    const items = currentBullets;
    currentBullets = [];
    nodes.push(
      <ul key={`ul-${sectionIndex++}`} className="my-1.5 flex flex-col gap-0.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="text-white/40">•</span>
            <span className="flex-1">{renderFormattedText(item, `li-${sectionIndex}-${idx}`)}</span>
          </li>
        ))}
      </ul>
    );
  };

  let currentParagraphs = [];
  const flushParagraphs = () => {
    if (!currentParagraphs.length) return;
    const text = currentParagraphs.join("\n");
    currentParagraphs = [];
    nodes.push(
      <p key={`p-${sectionIndex++}`} className="whitespace-pre-wrap">
        {renderFormattedText(text, `p-${sectionIndex}`)}
      </p>
    );
  };

  for (const line of clean) {
    const bulletMatch = line.match(/^\s*[*\-+]\s+(.*)$/);
    const numMatch = line.match(/^\s*\d+\.\s+(.*)$/);
    if (bulletMatch || numMatch) {
      flushParagraphs();
      currentBullets.push((bulletMatch ? bulletMatch[1] : numMatch[1]).trim());
      continue;
    }
    flushBullets();
    if (line.trim() === "") {
      flushParagraphs();
    } else {
      currentParagraphs.push(line);
    }
  }

  flushBullets();
  flushParagraphs();
  return <div className="flex flex-col gap-2">{nodes}</div>;
}

export default function PeachChatWidget({
  apiEndpoint = (typeof import.meta !== "undefined" && import.meta.env?.VITE_CHATBOT_API_URL) || "https://letan-chatbot-worker.thienbinhmedia-tv.workers.dev",
  initialOpen = false,
  agentName = "Trợ lý LETAN Media",
  email = "info@letanmedia.me",
  calendlyUrl = "https://calendly.com/peachweb/30min",
  supportLink = "zalo.me/0765178999",
}) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [activeTab, setActiveTab] = useState("chat");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hasStartedChat, setHasStartedChat] = useState(false);

  const scrollRef = useRef(null);
  const messagesRef = useRef([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // PostMessage for iframe embed environments
  useEffect(() => {
    if (typeof window === "undefined" || window.parent === window) return;
    const size = isOpen ? { w: 430, h: 690 } : { w: 168, h: 64 };
    window.parent.postMessage({ type: "peach-resize", ...size }, "*");
  }, [isOpen]);

  // Handle streaming chat responses
  const sendChatMessage = useCallback(
    async (chatHistory) => {
      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: chatHistory.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!response.ok) throw new Error("API error");

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No reader available");

        const decoder = new TextDecoder();
        const assistantMsgId = generateId();
        let streamedText = "";

        setMessages((prev) => [...prev, { id: assistantMsgId, role: "assistant", content: "" }]);
        setIsLoading(false);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const dataStr = line.slice(6);
            if (dataStr === "[DONE]") break;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                streamedText += parsed.text;
                setMessages((prev) =>
                  prev.map((msg) => (msg.id === assistantMsgId ? { ...msg, content: streamedText } : msg))
                );
              }
            } catch {
              // ignore non-json ping
            }
          }
        }
      } catch {
        setIsLoading(false);
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            role: "assistant",
            content: `I'm having trouble connecting. You can email ${email} and the team will help you directly.`,
          },
        ]);
      }
    },
    [apiEndpoint, email]
  );

  const handleUserSend = useCallback(
    (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      setShowSuggestions(false);
      setHasStartedChat(true);
      setActiveTab("chat");

      const initialGreeting = { id: generateId(), role: "assistant", content: GREETING_TEXT };
      const userMsg = { id: generateId(), role: "user", content: trimmed };
      const updated = [...(messagesRef.current.length === 0 ? [initialGreeting] : messagesRef.current), userMsg];

      setMessages(updated);
      setIsLoading(true);
      setInputValue("");
      sendChatMessage(updated);
    },
    [sendChatMessage]
  );

  // External event trigger
  useEffect(() => {
    const handleQuickAction = (e) => {
      const detail = e.detail;
      if (detail) {
        setIsOpen(true);
        handleUserSend(detail);
      }
    };
    window.addEventListener("peach-quick-action", handleQuickAction);
    return () => window.removeEventListener("peach-quick-action", handleQuickAction);
  }, [handleUserSend]);

  const popupStyle = {
    fontFamily: 'var(--font-popup), system-ui, -apple-system, sans-serif',
    fontFeatureSettings: '"ss01", "ss02", "cv11"',
    letterSpacing: "-0.011em",
  };

  return (
    <>
      {/* Floating Trigger Launcher */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="launcher"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={TRANSITION_SPRING}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsOpen(true)}
            style={popupStyle}
            className="fixed bottom-3 right-3 z-50 flex items-center gap-2.5 rounded-full bg-black/90 pl-2 pr-4 py-2 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur"
            aria-label="Open chat"
          >
            <span className="relative h-8 w-8 overflow-hidden rounded-full">
              <ParticleOrb sizeScale={0.4} pointerForce={0.15} />
            </span>
            <span className="text-[13.5px] font-medium tracking-tight">Need help?</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.94, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96, y: 12, filter: "blur(4px)" }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            style={{ ...popupStyle, transformOrigin: "bottom right" }}
            className="fixed bottom-3 right-3 z-50 flex h-[640px] max-h-[calc(100vh-40px)] w-[380px] max-w-[calc(100vw-40px)] flex-col overflow-hidden rounded-[22px] bg-[#0b0b0b] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            {/* Ambient Hero Top Graphic (Active on initial Chat tab) */}
            <AnimatePresence>
              {activeTab === "chat" && !hasStartedChat && (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.75, ease: EASE_OUT }}
                  className="pointer-events-none absolute inset-x-0 top-0 h-[68%]"
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(ellipse 95% 80% at 50% 50%, #ff8a3d 0%, #d63a14 22%, #6b0d08 55%, #1a0303 80%, #050202 100%)",
                    }}
                  />
                  <ParticleOrb pointerForce={0.7} />
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0b0b0b] to-transparent" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header: Tabs & Actions */}
            <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-2.5">
              <LayoutGroup id="popup-tabs">
                <div className="relative flex items-center gap-5 text-[13.5px]">
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className="relative pb-1 outline-none cursor-pointer"
                      >
                        <span
                          className={`transition-colors duration-300 ${
                            isActive ? "text-white font-semibold" : "text-white/40 hover:text-white/70 font-medium"
                          }`}
                        >
                          {tab.label}
                        </span>
                        {isActive && (
                          <motion.span
                            layoutId="tab-underline"
                            className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] rounded-full bg-white"
                            transition={{ duration: 0.6, ease: EASE_OUT }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>

              <div className="flex items-center gap-1.5">
                {activeTab === "chat" && hasStartedChat && (
                  <button
                    onClick={() => {
                      setMessages([]);
                      setIsLoading(false);
                      setInputValue("");
                      setShowSuggestions(true);
                      setHasStartedChat(false);
                    }}
                    className="flex h-7 items-center gap-1 rounded-full bg-white/[0.06] pl-2 pr-2.5 text-[12px] font-medium text-white/70 hover:bg-white/[0.12] hover:text-white transition-colors"
                    aria-label="Back to intro"
                  >
                    <span className="text-[14px] leading-none -mt-[1px]">‹</span>
                    <span>Back</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.06] text-white/60 hover:bg-white/[0.12] hover:text-white cursor-pointer transition-colors"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Tab Panels */}
            <div className="relative z-10 flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {/* 1. CHAT TAB */}
                {activeTab === "chat" && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.55, ease: EASE_OUT }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <div ref={scrollRef} className="relative flex-1 overflow-y-auto scrollbar-none">
                      {hasStartedChat ? (
                        <div className="flex flex-col gap-4 px-5 py-4">
                          {messages.map((msg) => (
                            <motion.div
                              key={msg.id}
                              initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              transition={{ duration: 0.7, ease: EASE_OUT }}
                              className="flex flex-col gap-1"
                            >
                              <div className="text-[11px] font-medium text-white/45">
                                {msg.role === "user" ? "You" : agentName}
                              </div>
                              <div
                                className={`text-[14.5px] font-normal leading-snug ${
                                  msg.role === "user" ? "text-white/60 whitespace-pre-wrap" : "text-white"
                                }`}
                              >
                                {msg.role === "assistant" ? formatAssistantMessage(msg.content) : msg.content}
                              </div>
                            </motion.div>
                          ))}

                          {/* Quick follow-ups */}
                          {showSuggestions && messages.length > 0 && (
                            <motion.div
                              initial="hidden"
                              animate="show"
                              variants={{
                                hidden: {},
                                show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
                              }}
                              className="flex flex-col gap-1.5 pt-1"
                            >
                              {CHAT_SUGGESTIONS.map((item) => (
                                <motion.button
                                  key={item.title}
                                  variants={{
                                    hidden: { opacity: 0, x: -8, filter: "blur(4px)" },
                                    show: { opacity: 1, x: 0, filter: "blur(0px)" },
                                  }}
                                  transition={{ duration: 0.7, ease: EASE_OUT }}
                                  whileHover={{ x: 3 }}
                                  onClick={() => handleUserSend(item.title)}
                                  className="flex items-center gap-2.5 rounded-xl bg-white/[0.05] px-3 py-2.5 text-left text-[13.5px] font-medium text-white/90 hover:bg-white/[0.09] transition-colors"
                                >
                                  <span className="text-[15px]">{item.icon}</span>
                                  <span className="flex-1 leading-snug">{item.title}</span>
                                  <span className="text-white/35">›</span>
                                </motion.button>
                              ))}
                            </motion.div>
                          )}

                          {/* Loading orb indicator */}
                          {isLoading && (
                            <div className="pt-1">
                              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                                <ParticleOrb sizeScale={0.35} pointerForce={0} rotationSpeed={0.004} />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Initial Welcome Greeting Hero */
                        <motion.div
                          initial="hidden"
                          animate="show"
                          variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.055, delayChildren: 0.18 } },
                          }}
                          className="relative flex h-full flex-col justify-end"
                        >
                          <div className="px-5 pb-4 pt-2">
                            <motion.div
                              variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                              transition={{ duration: 0.7, ease: EASE_OUT }}
                              className="text-[11px] font-medium text-white/45 mb-1.5"
                            >
                              {agentName}
                            </motion.div>
                            <motion.div
                              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.025 } } }}
                              className="text-[15px] font-normal leading-snug text-white"
                            >
                              {GREETING_TEXT.split("\n\n").map((para, pIdx, arr) => (
                                <p key={pIdx} className={pIdx < arr.length - 1 ? "mb-2" : ""}>
                                  {para.split(" ").map((word, wIdx, wArr) => (
                                    <motion.span
                                      key={`${pIdx}-${wIdx}`}
                                      variants={{
                                        hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
                                        show: { opacity: 1, y: 0, filter: "blur(0px)" },
                                      }}
                                      transition={{ duration: 0.7, ease: EASE_OUT }}
                                      className="inline-block"
                                    >
                                      {word}
                                      {wIdx < wArr.length - 1 ? "\u00A0" : ""}
                                    </motion.span>
                                  ))}
                                </p>
                              ))}
                            </motion.div>

                            {/* Starter Chips */}
                            <motion.div
                              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
                              className="mt-3.5 flex flex-wrap gap-2"
                            >
                              {STARTER_CHIPS.map((chip) => (
                                <motion.button
                                  key={chip.label}
                                  variants={{
                                    hidden: { opacity: 0, y: 6, filter: "blur(3px)" },
                                    show: { opacity: 1, y: 0, filter: "blur(0px)" },
                                  }}
                                  transition={{ duration: 0.65, ease: EASE_OUT }}
                                  whileHover={{ scale: 1.04 }}
                                  whileTap={{ scale: 0.96 }}
                                  onClick={() => handleUserSend(chip.message)}
                                  className="rounded-full bg-white/[0.08] px-3.5 py-1.5 text-[12.5px] font-medium text-white/85 hover:bg-white/[0.14] transition-colors"
                                >
                                  {chip.label}
                                </motion.button>
                              ))}
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Chat Input Bar */}
                    <div className="flex items-center gap-2.5 border-t border-white/[0.07] px-5 py-3.5">
                      <div className="relative h-6 w-6 overflow-hidden rounded-full">
                        <ParticleOrb sizeScale={0.35} pointerForce={0.15} />
                      </div>
                      <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleUserSend(inputValue);
                          }
                        }}
                        placeholder="Ask me anything…"
                        disabled={isLoading}
                        className="flex-1 bg-transparent text-[14.5px] font-normal text-white placeholder:text-white/35 outline-none disabled:opacity-50"
                      />
                    </div>
                  </motion.div>
                )}

                {/* 2. FAQS TAB */}
                {activeTab === "faqs" && (
                  <motion.div
                    key="faqs"
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.55, ease: EASE_OUT }}
                    className="absolute inset-0 overflow-y-auto px-5 pt-3 pb-5 scrollbar-none"
                  >
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.05 }}
                      className="pb-2 text-[15.5px] font-semibold text-white"
                    >
                      Frequently asked
                    </motion.p>
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.04, delayChildren: 0.12 } },
                      }}
                      className="flex flex-col"
                    >
                      {FAQS_DATA.map((faq, idx) => {
                        const isExpanded = expandedFaq === idx;
                        return (
                          <motion.div
                            key={faq.q}
                            variants={{
                              hidden: { opacity: 0, y: 6, filter: "blur(3px)" },
                              show: { opacity: 1, y: 0, filter: "blur(0px)" },
                            }}
                            transition={{ duration: 0.6, ease: EASE_OUT }}
                            className="border-b border-white/[0.07]"
                          >
                            <button
                              onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                              className="flex w-full items-center gap-3 py-3 text-left cursor-pointer"
                            >
                              <span className="flex-1 text-[13.5px] font-medium leading-snug text-white/90">
                                {faq.q}
                              </span>
                              <motion.span
                                animate={{ rotate: isExpanded ? 45 : 0 }}
                                transition={{ duration: 0.35, ease: EASE_OUT }}
                                className="flex h-5 w-5 items-center justify-center text-[18px] font-light text-white/45"
                              >
                                +
                              </motion.span>
                            </button>
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  key="content"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    height: { duration: 0.55, ease: EASE_IN_OUT },
                                    opacity: { duration: 0.5, ease: EASE_OUT },
                                  }}
                                  className="overflow-hidden"
                                >
                                  <motion.p
                                    initial={{ opacity: 0, y: 4, filter: "blur(3px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.08 }}
                                    className="pb-4 pr-6 text-[13px] font-normal leading-relaxed text-white/65"
                                  >
                                    {faq.a}
                                  </motion.p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                )}

                {/* 3. CONTACT TAB */}
                {activeTab === "contact" && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.55, ease: EASE_OUT }}
                    className="absolute inset-0 overflow-y-auto px-5 py-5 scrollbar-none"
                  >
                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
                      }}
                    >
                      <motion.p
                        variants={{ hidden: { opacity: 0, y: 8, filter: "blur(4px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }}
                        transition={{ duration: 0.7, ease: EASE_OUT }}
                        className="text-white text-[18px] font-semibold tracking-tight mb-3"
                      >
                        Get in touch
                      </motion.p>
                      <motion.p
                        variants={{ hidden: { opacity: 0, y: 8, filter: "blur(4px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }}
                        transition={{ duration: 0.7, ease: EASE_OUT }}
                        className="text-[14px] font-normal leading-relaxed text-white/75 mb-5"
                      >
                        Email us and the team will get back to you shortly.
                      </motion.p>
                      <motion.a
                        variants={{ hidden: { opacity: 0, y: 8, filter: "blur(4px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }}
                        transition={{ duration: 0.7, ease: EASE_OUT }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={`mailto:${email}`}
                        className="inline-block rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-black hover:bg-white/90 transition-colors"
                      >
                        {email}
                      </motion.a>
                      <motion.p
                        variants={{ hidden: { opacity: 0, y: 8, filter: "blur(4px)" }, show: { opacity: 1, y: 0, filter: "blur(0px)" } }}
                        transition={{ duration: 0.7, ease: EASE_OUT }}
                        className="mt-6 text-[13px] font-normal text-white/55"
                      >
                        Prefer a call? Book a 30-min slot at{" "}
                        <a
                          href={calendlyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-white/85 underline underline-offset-2 decoration-white/30 hover:decoration-white"
                        >
                          {supportLink}
                        </a>
                        .
                      </motion.p>
                    </motion.div>

                    <div className="mt-5 h-[420px] w-full overflow-hidden rounded-xl bg-white">
                      <iframe
                        src={`${calendlyUrl}?hide_gdpr_banner=1&background_color=ffffff&text_color=0b0b0b&primary_color=e8714a`}
                        title="Book a call with Peachweb"
                        className="h-full w-full border-0"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
