import { motion } from "framer-motion";
const logos = [
  {
    name: 'Zalo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg',
  },
  {
    name: 'Telegram',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
  },
  {
    name: 'WhatsApp',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
  },
  {
    name: 'Messenger',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg',
  },
  {
    name: 'Shopee',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg',
  },
  {
    name: 'Lazada',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Lazada_%282019%29.svg',
  },
]
function LogoItem({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center gap-2 px-6 py-3 mx-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
        style={{ backgroundColor: color }}
      >
        {name[0]}
      </div>
      <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}
export function LogoMarquee() {
  return (
    <section className="py-10 overflow-hidden relative">
      <div className="text-center mb-6">
        <p className="text-xs sm:text-sm font-medium uppercase tracking-widest text-gray-400">
          Tích hợp sẵn sàng với mọi nền tảng nhắn tin phổ biến
        </p>
      </div>
      <div className="relative">
        {/* Dark Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#070A12] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#070A12] to-transparent z-10 pointer-events-none" />
        
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            },
          }}
          className="flex gap-4"
        >
          {[...logos, ...logos, ...logos, ...logos].map((item, index) => (
            <div
              key={index}
              className="flex h-[52px] min-w-[170px] items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-6 shadow-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/[0.06]"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-7 w-7 rounded-lg object-contain filter drop-shadow"
                loading="lazy"
              />
              <span className="text-sm font-semibold text-gray-200">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
