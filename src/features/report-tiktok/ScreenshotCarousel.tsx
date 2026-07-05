import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

import IMG_0434 from './image/IMG_0434.png'
import IMG_0435 from './image/IMG_0435.png'
import IMG_0436 from './image/IMG_0436.png'
import IMG_0437 from './image/IMG_0437.png'
import IMG_0438 from './image/IMG_0438.png'
import IMG_0439 from './image/IMG_0439.png'
import IMG_0440 from './image/IMG_0440.png'
import IMG_0441 from './image/IMG_0441.png'

const screenshots = [
  IMG_0434, IMG_0435, IMG_0436, IMG_0437,
  IMG_0438, IMG_0439, IMG_0440, IMG_0441,
]

export default function ScreenshotCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isPaused, setIsPaused] = useState(false)

  const allImages = [...screenshots, ...screenshots, ...screenshots, ...screenshots]

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-black py-20">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes screenshot-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .screenshot-scroll {
          animation: screenshot-scroll 35s linear infinite;
        }
        .screenshot-scroll.paused {
          animation-play-state: paused;
        }
      `}} />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/[0.03] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-4 py-1.5 text-sm font-medium text-rose-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
            </span>
            Minh bạch & rõ ràng
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Kết Quả Xử Lý <span className="text-rose-500">Thực Tế</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-lg text-neutral-400"
          >
            Hình ảnh thực tế từ các ca xử lý thành công trên nền tảng TikTok.
          </motion.p>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-black to-transparent sm:w-32 lg:w-48" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-black to-transparent sm:w-32 lg:w-48" />

        <div className={`flex w-max gap-5 px-4 screenshot-scroll ${isPaused ? 'paused' : ''}`}>
          {allImages.map((src, index) => (
            <motion.div
              key={index}
              className="group relative shrink-0"
              whileHover={{ scale: 1.04, y: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="absolute -inset-1 rounded-[2rem] bg-rose-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-neutral-900/40 shadow-2xl shadow-black/50 backdrop-blur-sm">
                <img
                  src={src}
                  alt={`Kết quả xử lý ${(index % screenshots.length) + 1}`}
                  className="h-[480px] w-[240px] object-cover sm:h-[540px] sm:w-[270px]"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-4">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent"
        />
      </div>
    </section>
  )
}
