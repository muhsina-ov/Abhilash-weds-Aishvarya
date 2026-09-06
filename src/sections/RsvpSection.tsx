import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, CheckCircle2, User, Users, HeartHandshake, Sparkles } from "lucide-react";
import { invite } from "@/config";

export default function RsvpSection() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("Both (Muhurtham & Reception)");
  const [guestCount, setGuestCount] = useState("2");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const rsvpText = `*Wedding RSVP — Abhilash Weds Aishvarya* 💍✨\n` +
      `----------------------------------------\n` +
      `👤 *Guest Name:* ${name.trim()}\n` +
      `🎉 *Attendance:* ${attending}\n` +
      `👥 *Number of Guests:* ${guestCount}\n` +
      (message.trim() ? `💌 *Blessings:* ${message.trim()}\n` : "") +
      `----------------------------------------\n` +
      `Looking forward to celebrating with you! ❤️`;

    const encoded = encodeURIComponent(rsvpText);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="relative overflow-hidden py-20 sm:py-28 px-6">
      <img
        src="https://media.invitestory.in/shubha-vivaham/assets/bg-texture.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      {/* Warm glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(246,185,59,0.18) 0%, rgba(224,71,106,0.08) 50%, transparent 75%)",
        }}
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
            RSVP
          </p>
          <div className="pt-2 pb-1 overflow-visible">
            <h2 className="font-script text-5xl sm:text-6xl text-gradient-gold leading-snug px-3">
              Are You Coming?
            </h2>
          </div>
          <p className="mt-2 font-serif-body text-base sm:text-lg text-[hsl(var(--foreground)/0.8)] max-w-md mx-auto">
            Please let us know if you will be joining our wedding celebrations on Sunday, November 1, 2026.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="card-frame mt-8 rounded-3xl p-6 sm:p-8 text-left shadow-xl"
        >
          {submitted ? (
            <div className="py-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4"
              >
                <CheckCircle2 size={36} />
              </motion.div>
              <h3 className="font-serif-body font-semibold text-2xl text-[hsl(var(--sindoor))]">
                Thank You, {name}!
              </h3>
              <p className="mt-2 font-serif-body text-base text-[hsl(var(--foreground)/0.8)]">
                Your RSVP details have been prepared for WhatsApp. If WhatsApp didn't open automatically, click below:
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold))] px-6 py-2 font-caps text-xs text-[hsl(var(--sindoor))] hover:bg-[hsl(var(--gold)/0.1)] transition-colors"
              >
                Edit / Resend RSVP
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block font-caps text-xs font-semibold text-[hsl(var(--sindoor))] mb-1.5 flex items-center gap-1.5">
                  <User size={14} />
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[hsl(var(--gold)/0.4)] bg-[#FFF9EF]/80 px-4 py-3 font-serif-body text-base text-[hsl(var(--foreground))] shadow-inner focus:border-[#c62b4f] focus:outline-none focus:ring-2 focus:ring-[#c62b4f]/20 transition-all"
                />
              </div>

              {/* Attending Status */}
              <div>
                <label className="block font-caps text-xs font-semibold text-[hsl(var(--sindoor))] mb-2 flex items-center gap-1.5">
                  <HeartHandshake size={14} />
                  Will you be attending? *
                </label>
                <div className="grid gap-2">
                  {[
                    "Both (Muhurtham & Reception)",
                    "Muhurtham Only (8:00 AM - 10:00 AM)",
                    "Reception Only (11:00 AM - 2:30 PM)",
                    "Sending Blessings (Regretfully Cannot Attend)",
                  ].map((option) => (
                    <label
                      key={option}
                      onClick={() => setAttending(option)}
                      className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                        attending === option
                          ? "border-[#c62b4f] bg-[#8f1d3a]/10 font-semibold text-[#8f1d3a]"
                          : "border-[hsl(var(--gold)/0.3)] bg-white/50 text-[hsl(var(--foreground)/0.8)] hover:bg-[#FFF9EF]"
                      }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        checked={attending === option}
                        onChange={() => setAttending(option)}
                        className="accent-[#c62b4f]"
                      />
                      <span className="font-serif-body text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block font-caps text-xs font-semibold text-[hsl(var(--sindoor))] mb-1.5 flex items-center gap-1.5">
                  <Users size={14} />
                  Total Number of Guests
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full rounded-xl border border-[hsl(var(--gold)/0.4)] bg-[#FFF9EF]/80 px-4 py-3 font-serif-body text-base text-[hsl(var(--foreground))] shadow-inner focus:border-[#c62b4f] focus:outline-none focus:ring-2 focus:ring-[#c62b4f]/20 transition-all"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                  <option value="5+">5+ Family Members</option>
                </select>
              </div>

              {/* Wishes */}
              <div>
                <label className="block font-caps text-xs font-semibold text-[hsl(var(--sindoor))] mb-1.5 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  Wishes &amp; Message for Abhilash &amp; Aishvarya
                </label>
                <textarea
                  rows={3}
                  placeholder="Share your warm wishes or congratulations..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-[hsl(var(--gold)/0.4)] bg-[#FFF9EF]/80 px-4 py-2.5 font-serif-body text-base text-[hsl(var(--foreground))] shadow-inner focus:border-[#c62b4f] focus:outline-none focus:ring-2 focus:ring-[#c62b4f]/20 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="mt-4 flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-3.5 font-caps text-xs text-white font-semibold shadow-[0_10px_25px_rgba(37,211,102,0.35)] transition-all hover:shadow-[0_14px_30px_rgba(37,211,102,0.5)]"
              >
                <MessageSquare size={18} />
                Send RSVP via WhatsApp
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
