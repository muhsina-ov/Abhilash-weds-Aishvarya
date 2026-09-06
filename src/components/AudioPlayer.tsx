import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, ExternalLink, RefreshCw } from "lucide-react";
import { invite } from "@/config";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const playerRef = useRef<any>(null);
  const checkIntervalRef = useRef<any>(null);

  const videoId = invite.youtubeTrackId || "MbLpZXIZZOg";

  useEffect(() => {
    // 1. Load YouTube Iframe API if not already present
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player("yt-bgm-iframe", {
        height: "1",
        width: "1",
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
          start: 0,
          end: 45,
          playsinline: 1,
          rel: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: any) => {
            try {
              event.target.playVideo();
              setIsPlaying(true);
            } catch (err) {
              console.log("Autoplay waiting for user gesture:", err);
            }
          },
          onStateChange: (event: any) => {
            if (window.YT && event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (window.YT && (event.data === window.YT.PlayerState.ENDED || event.data === window.YT.PlayerState.PAUSED)) {
              if (event.data === window.YT.PlayerState.ENDED) {
                // Loop back to 0s
                event.target.seekTo(0);
                event.target.playVideo();
              }
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => initPlayer();
    }

    // 2. Loop Enforcer: Check playback time every 450ms and loop at 45s
    checkIntervalRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        const currentTime = playerRef.current.getCurrentTime();
        if (currentTime >= 44.5) {
          playerRef.current.seekTo(0);
          playerRef.current.playVideo();
        }
      }
    }, 450);

    // 3. User interaction listener to start BGM on first tap/click anywhere on page
    const handleFirstUserInteraction = () => {
      if (playerRef.current && typeof playerRef.current.playVideo === "function") {
        try {
          playerRef.current.unMute();
          playerRef.current.playVideo();
          setIsPlaying(true);
        } catch (err) {
          console.warn("Interaction play error:", err);
        }
      }
    };

    window.addEventListener("click", handleFirstUserInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstUserInteraction, { once: true });
    window.addEventListener("scroll", handleFirstUserInteraction, { once: true });

    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
      window.removeEventListener("scroll", handleFirstUserInteraction);
    };
  }, [videoId]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.unMute();
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Hidden YouTube Iframe Player */}
      <div className="fixed -top-[9999px] -left-[9999px] pointer-events-none opacity-0 h-1 w-1 overflow-hidden">
        <div id="yt-bgm-iframe" />
      </div>

      {/* Floating Audio Control Button */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          className="relative group"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className={`flex h-13 w-13 items-center justify-center rounded-full shadow-2xl transition-all duration-300 border border-[#f7d784]/50 ${
              isPlaying
                ? "bg-gradient-to-r from-[#c62b4f] to-[#8f1d3a] text-white shadow-[0_0_22px_rgba(198,43,79,0.7)]"
                : "bg-[#57102a]/95 text-[#f7d784] backdrop-blur-md hover:bg-[#6d142c]"
            }`}
            aria-label={isPlaying ? "Pause wedding song" : "Play wedding song"}
          >
            {isPlaying ? (
              <span className="relative flex items-center justify-center">
                <Volume2 className="h-6 w-6 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f7d784] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f7d784]"></span>
                </span>
              </span>
            ) : (
              <Music className="h-6 w-6" />
            )}
          </motion.button>

          {/* Hover / Status Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 bottom-16 min-w-[240px] rounded-2xl bg-[#3d1020]/95 backdrop-blur-md p-3.5 text-xs text-[#f7e8d0] border border-[#f7d784]/40 shadow-2xl z-50 pointer-events-auto"
              >
                <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#f7d784]/20">
                  <span className="font-serif-body font-semibold text-[#f7d784] text-sm">
                    Wedding BGM
                  </span>
                  <span className="flex items-center gap-1 font-caps text-[9px] text-[#f7e8d0]/80">
                    <RefreshCw size={10} className="animate-spin" />
                    0-45s Loop
                  </span>
                </div>
                <p className="font-sans text-[11px] leading-snug text-[#f7e8d0]/90 mb-2.5">
                  {isPlaying ? "Playing 45s loop of YouTube Track" : "Tap to start wedding background music"}
                </p>
                <a
                  href={invite.musicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#c62b4f] px-2.5 py-1.5 text-[10px] font-medium text-white hover:bg-[#a52a44] transition-colors"
                >
                  Open in YouTube Music
                  <ExternalLink size={11} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
