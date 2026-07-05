import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, X, Menu, ArrowRight, Sun, Moon, Globe, Phone, MessageCircle, FileText, Send,
} from "lucide-react";
import { Link } from "react-router-dom";

interface NavLink {
  label: string;
  href: string;
}

interface MarketingHeaderProps {
  dark?: boolean;
  toggleTheme?: () => void;
  lang?: "vi" | "en";
  setLang?: (l: "vi" | "en") => void;
  t?: (key: string) => string;
}

const HOTLINE = "+84765178999";
const TELEGRAM_URL = "https://t.me/Tanlemedia";

const C = {
  red: "#FE2C55",
  redDark: "#E60039",
  redLight: "#FF4D6D",
  cyan: "#25F4EE",
  cyanDark: "#00D4D0",
  black: "#000000",
  blackSoft: "#0F0F0F",
  gray900: "#1F1F1F",
  gray800: "#2B2B2B",
  gray700: "#3A3A3A",
  gray600: "#555555",
  gray500: "#8A8B91",
  gray400: "#A6A7AB",
  white: "#FFFFFF",
  gray100: "#F1F1F2",
  gray200: "#E4E4E6",
  redGradient: "linear-gradient(135deg, #FE2C55 0%, #E60039 100%)",
};

export default function MarketingHeader({
  dark = true,
  toggleTheme = () => {},
  lang = "vi",
  setLang = () => {},
  t = (key: string) => {
    const fallback: Record<string, string> = {
      nav_home: "Trang chủ",
      nav_services: "Dịch vụ",
      nav_pricing: "Bảng giá",
      nav_contact: "Liên hệ",
      nav_quote: "Báo giá ngay",
      nav_contact_telegram: "Liên hệ Telegram/Zalo",
    };
    return fallback[key] ?? key;
  },
}: MarketingHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS: NavLink[] = [
    { label: t("nav_home") ?? "Trang chủ", href: "/" },
    { label: t("nav_services") ?? "Dịch vụ", href: "/#services" },
    { label: t("nav_pricing") ?? "Bảng giá", href: "/#pricing" },
    { label: t("nav_contact") ?? "Liên hệ", href: "/#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [dark]);

  const isDark = dark;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? "bg-black/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
              : "bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-shadow duration-300"
                style={{
                  background: C.redGradient,
                  boxShadow: `0 4px 20px ${C.red}40`,
                }}
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex items-baseline">
                <span className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: C.red }}>LETAN</span>
                <span className={`text-lg sm:text-xl font-bold ml-1 tracking-tight transition-colors ${isDark ? "text-white" : "text-black"}`}>MEDIA</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative text-sm font-medium tracking-wide group py-2 transition-colors duration-200 ${
                    isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"
                  }`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-300" style={{ background: C.redGradient }} />
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a href={`tel:${HOTLINE}`} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-black hover:bg-black/5"}`}>
                <Phone className="w-4 h-4" style={{ color: C.red }} />
                <span className="font-medium">{HOTLINE}</span>
              </a>
              <button onClick={() => setLang(lang === "vi" ? "en" : "vi")} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-black hover:bg-black/5"}`} aria-label="Toggle language">
                <Globe className="w-4 h-4" />
                <span className="font-bold uppercase">{lang}</span>
              </button>
              <button onClick={toggleTheme} className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${isDark ? "text-gray-400 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-black hover:bg-black/5"}`} aria-label="Toggle theme">
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <Link to="/report-tiktok/#contact" className="px-5 py-2.5 text-sm font-bold rounded-lg text-white transition-all duration-300 flex items-center gap-2 group hover:scale-105" style={{ background: C.redGradient, boxShadow: `0 4px 20px ${C.red}30` }}>
                <span>{t("nav_quote") ?? "Báo giá ngay"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button onClick={toggleTheme} className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? "bg-white/10 text-gray-300" : "bg-black/5 text-gray-600"}`}>
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
              <button onClick={() => setLang(lang === "vi" ? "en" : "vi")} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${isDark ? "bg-white/10 text-gray-300" : "bg-black/5 text-gray-600"}`}>
                {lang === "vi" ? "VI" : "EN"}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${isDark ? "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-[#FE2C55]/30" : "bg-black/5 border border-black/10 text-black hover:bg-black/10 hover:border-[#FE2C55]/30"}`} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 backdrop-blur-xl ${isDark ? "bg-black/90" : "bg-white/90"}`}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className={`absolute top-0 right-0 bottom-0 w-[300px] flex flex-col pt-24 px-6 pb-8 border-l ${isDark ? "bg-[#0a0a0a] border-white/10" : "bg-white border-black/10"}`}
            >
              <div className="flex items-center gap-3 mb-8 pb-6 border-b">
                <button onClick={() => setLang(lang === "vi" ? "en" : "vi")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${isDark ? "bg-white/5 border border-white/10 text-gray-300 hover:border-[#FE2C55]/30 hover:text-[#FE2C55]" : "bg-black/5 border border-black/10 text-gray-600 hover:border-[#FE2C55]/30 hover:text-[#FE2C55]"}`}>
                  <Globe className="w-4 h-4" />
                  <span className="uppercase">{lang === "vi" ? "Tiếng Việt" : "English"}</span>
                </button>
                <button onClick={toggleTheme} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark ? "bg-white/5 border border-white/10 text-gray-300 hover:border-[#FE2C55]/30 hover:text-[#FE2C55]" : "bg-black/5 border border-black/10 text-gray-600 hover:border-[#FE2C55]/30 hover:text-[#FE2C55]"}`}>
                  {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex-1 space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                    <Link to={link.href} onClick={() => setMobileOpen(false)} className={`block py-3 px-4 rounded-xl font-medium transition-all duration-200 ${isDark ? "text-gray-300 hover:text-white hover:bg-white/5" : "text-gray-600 hover:text-black hover:bg-black/5"}`}>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`space-y-4 pt-8 mt-4 border-t ${isDark ? "border-white/5" : "border-black/5"}`}>
                <a href={`tel:${HOTLINE}`} className={`group flex items-center p-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${isDark ? "bg-white/5 border border-white/5 hover:bg-white/10" : "bg-black/5 border border-black/5 hover:bg-black/10"}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                    <Phone className={`w-5 h-5 ${isDark ? "text-gray-300" : "text-gray-600"}`} />
                  </div>
                  <div className="ml-3">
                    <p className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>Hotline hỗ trợ 24/7</p>
                    <p className={`text-sm font-semibold tracking-wide ${isDark ? "text-white" : "text-black"}`}>0765 178 999</p>
                  </div>
                </a>
                <Link to="/report-tiktok/#contact" onClick={() => setMobileOpen(false)} className="group relative flex items-center p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center w-full">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-white text-base font-bold">{t("nav_quote") ?? "Báo giá ngay"}</p>
                      <p className="text-white/80 text-xs font-medium">Nhận báo giá trong vài phút</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className={`group flex items-center p-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${isDark ? "bg-white/5 border border-white/5 hover:bg-white/10" : "bg-black/5 border border-black/5 hover:bg-black/10"}`}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#2AABEE]/10">
                    <Send className="w-5 h-5 text-[#2AABEE]" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className={`text-sm font-bold ${isDark ? "text-white" : "text-black"}`}>{t("nav_contact_telegram") ?? "Liên hệ Telegram/Zalo"}</p>
                    <p className={`text-xs font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>Hỗ trợ nhanh qua Telegram</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDark ? "bg-white/5" : "bg-black/5"}`}>
                    <ArrowRight className={`w-4 h-4 ${isDark ? "text-gray-400" : "text-gray-500"} group-hover:translate-x-1 transition-transform`} />
                  </div>
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
