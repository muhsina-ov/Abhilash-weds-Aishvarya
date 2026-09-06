import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { invite } from "@/config";

export default function CoupleSpotlight() {
  const [activeIdx, setActiveIdx] = useState(0);
  const photos = invite.couplePhotos;

  const nextPhoto = () => setActiveIdx((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setActiveIdx((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 px-6 bg-gradient-to-b from-transparent via-[hsl(var(--gold)/0.04)] to-transparent">
      {/* Background texture */}
      <img
        src="https://media.invitestory.in/shubha-vivaham/assets/bg-texture.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />

      <div className="relative mx-auto max-w-xl text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="ornament-divider text-xl">❁</div>
          <p className="font-caps text-xs text-[hsl(var(--sindoor))] tracking-[0.3em] mb-1">
            Groom &amp; Bride
          </p>
          <div className="pt-2 pb-1 overflow-visible">
            <h2 className="font-script text-5xl sm:text-6xl text-gradient-gold leading-snug px-3">
              The Happy Couple
            </h2>
          </div>
          <p className="mt-3 font-serif-body italic text-base sm:text-lg text-[hsl(var(--foreground)/0.8)]">
            "Two souls with but a single thought, two hearts that beat as one."
          </p>
        </motion.div>

        {/* Photo Display Card with Golden Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-10 relative"
        >
          <div className="card-frame relative rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(143,29,58,0.25)] overflow-hidden">
            {/* Ornate Gold Corners */}
            <div className="absolute top-2 left-2 text-[hsl(var(--gold))] text-lg z-20">✦</div>
            <div className="absolute top-2 right-2 text-[hsl(var(--gold))] text-lg z-20">✦</div>
            <div className="absolute bottom-2 left-2 text-[hsl(var(--gold))] text-lg z-20">✦</div>
            <div className="absolute bottom-2 right-2 text-[hsl(var(--gold))] text-lg z-20">✦</div>

            <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden rounded-2xl bg-[#57102a]/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  src={photos[activeIdx]}
                  alt={`Abhilash & Aishvarya photo ${activeIdx + 1}`}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6 }}
                  className="h-full w-full object-cover object-center"
                />
              </AnimatePresence>

              {/* Gradient Vignette at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#57102a]/80 via-[#57102a]/30 to-transparent flex items-end justify-between p-4 z-10">
                <div className="text-left text-white">
                  <p className="font-script text-2xl text-[#f7d784] leading-snug px-1">
                    {invite.brideShort} &amp; {invite.groomShort}
                  </p>
                  <p className="font-serif-body text-xs text-white/80">
                    November 1, 2026 · Ramada Mahape
                  </p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-[#8f1d3a]/80 px-3 py-1 text-[10px] font-caps text-[#f7d784] border border-[#f7d784]/30 backdrop-blur-md">
                  <Sparkles size={12} />
                  {activeIdx + 1} of {photos.length}
                </span>
              </div>

              {/* Navigation Controls */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-[#8f1d3a] hover:scale-110 active:scale-95"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-[#8f1d3a] hover:scale-110 active:scale-95"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail pagination */}
            {photos.length > 1 && (
              <div className="mt-4 flex justify-center gap-3">
                {photos.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-12 w-16 overflow-hidden rounded-lg border-2 transition-all ${
                      activeIdx === idx
                        ? "border-[#c62b4f] scale-105 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
