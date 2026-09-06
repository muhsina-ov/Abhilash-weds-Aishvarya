/**
 * ═══════════════════════════════════════════════════════════════
 *  CLIENT CONFIG — Abhilash Vivek & Aishvarya Wedding
 * ═══════════════════════════════════════════════════════════════
 */

export interface WeddingEvent {
  id: string;
  label: string;      // small caps label
  title: string;      // script title
  dateLine: string;   // human readable date
  timeLine: string;   // human readable time
  startISO: string;   // ISO 8601 with +05:30 offset (IST)
  endISO: string;
  note?: string;
}

export const invite = {
  // ── Couple ──────────────────────────────────────────────
  brideFirst: "Aishvarya",
  groomFirst: "Abhilash Vivek",
  brideShort: "Aishvarya",
  groomShort: "Abhilash",
  monogram: "A · A",
  hashtag: "#AbhilashWedsAishvarya",
  greetingTelugu: "శుభ వివాహం",
  greetingEnglish: "Shubha Vivaham",
  weddingDateFormatted: "01 · 11 · 2026",

  // ── Families ────────────────────────────────────────────
  brideParents: "Daughter of Family & Loved Ones",
  groomParents: "Son of Family & Loved Ones",
  inviteMessage:
    "With the blessings of our elders and the warmth of loved ones, we joyfully invite you to celebrate our union as we embark on this beautiful journey of togetherness.",

  // ── Event (IST, +05:30) ─────────────────────────────────
  countdownTargetISO: "2026-11-01T08:00:00+05:30",
  countdownLabel: "Until the Sacred Muhurtham",
  events: [
    {
      id: "muhurtham",
      label: "Wedding Ceremony",
      title: "Muhurtham",
      dateLine: "Sunday, 1 November 2026",
      timeLine: "8:00 AM - 10:00 AM",
      startISO: "2026-11-01T08:00:00+05:30",
      endISO: "2026-11-01T10:00:00+05:30",
      note: "Sacred Knot Ceremony & Auspicious Blessing",
    },
    {
      id: "reception",
      label: "Celebration Feast",
      title: "Reception",
      dateLine: "Sunday, 1 November 2026",
      timeLine: "11:00 AM - 2:30 PM",
      startISO: "2026-11-01T11:00:00+05:30",
      endISO: "2026-11-01T14:30:00+05:30",
      note: "Delicious Lunch & Warm Wishes",
    },
  ] as WeddingEvent[],

  // ── Venue ───────────────────────────────────────────────
  venueName: "Ramada by Wyndham, Mahape",
  venueAddress: "156, Millennium Business Park, MIDC Industrial Area, Mahape, Navi Mumbai, Maharashtra 400710",
  mapsQuery: "Ramada by Wyndham Navi Mumbai, Mahape, Navi Mumbai",
  directMapsUrl: "https://maps.app.goo.gl/apPcG9F5dryqnKBJ7?g_st=ac",

  // ── Audio & Media ────────────────────────────────────────
  musicUrl: "https://music.youtube.com/watch?v=MbLpZXIZZOg&si=vPkgLqWAv_vDlxbB",
  youtubeTrackId: "MbLpZXIZZOg",

  // ── RSVP ────────────────────────────────────────────────
  whatsappPhone: "919876543210",

  // ── Photos ──────────────────────────────────────────────
  couplePhotos: [
    "/assets/abhilash-aishvarya-1.jpg",
    "/assets/abhilash-aishvarya-2.jpg",
  ],

  // ── Footer ──────────────────────────────────────────────
  footerBlessing: "Two hearts, two souls, one eternal journey of love",
  creditLine: "Crafted with ♥ by InviteStory · @invitestory.in",
};

// ── Derived helpers ───────────────────────────────────────
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  invite.mapsQuery
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export const mapsDirectionsUrl = invite.directMapsUrl;
