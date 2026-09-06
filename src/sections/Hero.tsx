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
      <div className="relative z-30 flex flex-1 flex-col items-center justify-center px-6 pb-14 pt-4 text-center">
        {/* Bride Name */}
        <motion.div variants={rise} initial="hidden" animate="show" custom={0.25} className="pt-2 pb-1 overflow-visible">
          <h1 className="font-script text-5xl sm:text-7xl leading-snug text-gradient-sindoor animate-shimmer px-3">
            {invite.brideFirst}
          </h1>
        </motion.div>

        {/* Weds Divider */}
        <motion.div variants={rise} initial="hidden" animate="show" custom={0.4}
          className="ornament-divider my-1">
          <span className="font-script text-3xl sm:text-4xl text-gradient-gold px-2 py-1 leading-snug">weds</span>
        </motion.div>

        {/* Groom Name */}
        <motion.div variants={rise} initial="hidden" animate="show" custom={0.55} className="pt-2 pb-1 overflow-visible">
          <h1 className="font-script text-5xl sm:text-7xl leading-snug text-gradient-sindoor animate-shimmer px-3">
            {invite.groomFirst}
          </h1>
        </motion.div>

        {/* Wedding Date */}
        <motion.p variants={rise} initial="hidden" animate="show" custom={0.75}
          className="mt-4 font-caps text-sm sm:text-lg text-[hsl(var(--foreground))] tracking-[0.35em] font-semibold">
          {invite.weddingDateFormatted}
        </motion.p>

        {/* Royal Monogram Mandala Badge (No photographs) */}
        <motion.div
          variants={rise} initial="hidden" animate="show" custom={0.95}
          className="animate-float mt-6 relative flex items-center justify-center"
        >
          <div className="relative h-36 w-36 sm:h-44 sm:w-44 rounded-full p-2 bg-gradient-to-tr from-[#f7d784] via-[#d99a2b] to-[#a86f14] shadow-[0_15px_35px_rgba(143,29,58,0.3)] flex items-center justify-center">
            <div className="h-full w-full rounded-full border-2 border-white/80 flex flex-col items-center justify-center bg-gradient-to-b from-[#8f1d3a] to-[#57102a] text-[#f7d784] p-3 shadow-inner">
              <span className="text-xs text-[#f7d784]/70 mb-0.5">✦</span>
              <span className="font-script text-3xl sm:text-4xl leading-none text-gradient-gold">
                {invite.monogram}
              </span>
              <span className="mt-1 font-caps text-[9px] text-[#f7d784]/80 tracking-widest">
                Save The Date
              </span>
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
