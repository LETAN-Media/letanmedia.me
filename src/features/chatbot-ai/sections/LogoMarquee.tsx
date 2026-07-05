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
    <section className="py-8 overflow-hidden bg-gray-50/50">
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            },
          }}
          className="flex"
        >
          {[...logos, ...logos, ...logos, ...logos].map((item, index) => (
        <div
          key={index}
          className="mx-3 flex h-[56px] min-w-[160px] items-center gap-5 rounded-3xl border border-zinc-200 bg-white px-7 shadow-sm transition-all duration-300 hover:shadow-lg"
        >
          <img
            src={item.logo}
            alt={item.name}
            className="h-8 w-8 rounded-lg object-contain"
          />
          <span className="text-sm font-semibold text-zinc-700">
           {item.name}
          </span>
         </div>
         ))}
        </motion.div>
      </div>
    </section>
  );
}
