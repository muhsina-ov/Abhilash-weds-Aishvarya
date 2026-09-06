import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Aurora from "@/components/Aurora";
import PetalRain from "@/components/PetalRain";
import { invite } from "@/config";

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden flex flex-col">
      {/* Layer 1 — aurora glow */}
      <div className="absolute inset-0 opacity-40">
        <Aurora colorStops={["#F6B93B", "#E0476A", "#E8751A"]} amplitude={1.15} blend={0.6} speed={0.55} />
      </div>
      {/* Layer 2 — ivory paper texture above aurora */}
      <img
        src="https://media.invitestory.in/shubha-vivaham/assets/bg-texture.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-75"
      />
      {/* Layer 3 — falling petals */}
      <PetalRain count={14} />

      {/* Marigold toran */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative z-20 w-full"
      >
        <img src="https://media.invitestory.in/shubha-vivaham/assets/toran-top.png" alt="" className="animate-sway block w-full" />
      </motion.div>

      {/* Banana leaves framing the bottom corners */}
      <img
        src="https://media.invitestory.in/shubha-vivaham/assets/banana-leaves.png"
        alt=""
        className="pointer-events-none absolute -bottom-3 -left-4 w-48 sm:w-72 z-10 opacity-90"
      />
      <img
        src="https://media.invitestory.in/shubha-vivaham/assets/banana-leaves.png"
        alt=""
        className="pointer-events-none absolute -bottom-3 -right-4 w-48 sm:w-72 -scale-x-100 z-10 opacity-90"
      />

      {/* Centre content */}
      <div className="relative z-30 flex flex-1 flex-col items-center justify-center px-6 pb-14 pt-2 text-center">
        <motion.p variants={rise} initial="hidden" animate="show" custom={0.15}
          className="font-caps text-[11px] sm:text-sm text-[hsl(var(--sindoor))] tracking-widest font-semibold">
          {invite.greetingTelugu} · {invite.greetingEnglish}
        </motion.p>

        <motion.div variants={rise} initial="hidden" animate="show" custom={0.35} className="mt-2 pt-3 pb-1 overflow-visible">
          <h1 className="font-script text-6xl sm:text-8xl leading-snug text-gradient-sindoor animate-shimmer px-3">
            {invite.brideFirst}
          </h1>
        </motion.div>

        <motion.div variants={rise} initial="hidden" animate="show" custom={0.5}
          className="ornament-divider my-1">
          <span className="font-script text-3xl sm:text-4xl text-gradient-gold px-2 py-1 leading-snug">weds</span>
        </motion.div>

        <motion.div variants={rise} initial="hidden" animate="show" custom={0.65} className="pt-2 pb-1 overflow-visible">
          <h1 className="font-script text-5xl sm:text-7xl leading-snug text-gradient-sindoor animate-shimmer px-3">
            {invite.groomFirst}
          </h1>
        </motion.div>

        <motion.p variants={rise} initial="hidden" animate="show" custom={0.85}
          className="mt-4 font-caps text-sm sm:text-lg text-[hsl(var(--foreground))] tracking-[0.35em] font-semibold">
          {invite.weddingDateFormatted}
        </motion.p>

        {/* Hero Artwork / Caricature / Couple Frame */}
        <motion.div
          variants={rise} initial="hidden" animate="show" custom={1.05}
          className="animate-float mt-5 relative flex items-center justify-center"
        >
          <div className="relative h-44 w-44 sm:h-52 sm:w-52 rounded-full p-2 bg-gradient-to-tr from-[#f7d784] via-[#d99a2b] to-[#a86f14] shadow-[0_15px_35px_rgba(143,29,58,0.3)]">
            <div className="h-full w-full rounded-full overflow-hidden border-2 border-white/80">
              <img
                src={invite.couplePhotos[0]}
                alt={`${invite.brideFirst} & ${invite.groomFirst}`}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-2 inset-x-0 mx-auto w-max rounded-full bg-[#8f1d3a] px-4 py-1 text-[10px] font-caps text-[#f7d784] border border-[#f7d784]/40 shadow-md">
              Save The Date
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 text-[hsl(var(--gold))]"
      >
        <ChevronDown className="animate-scroll-hint" size={26} />
      </motion.div>
    </section>
  );
}
