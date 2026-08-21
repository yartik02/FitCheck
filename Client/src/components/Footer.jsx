import { useEffect, useRef, useState } from "react";
import Logo from "../assets/FitCheckLogoNew.svg";
import { githubIcon, linkedinIcon } from "../utils/Icons";

export default function Footer() {
  const footerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;

      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const rawProgress = 1 - rect.top / windowHeight;
      const clamped = Math.min(1, Math.max(0, rawProgress));
      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map progress to visual properties
  const wordmarkOpacity = Math.min(1, progress * 2.5);
  const wordmarkY = (1 - Math.min(1, progress * 2)) * 80;
  const wordmarkScale = 0.9 + Math.min(1, progress * 2) * 0.1;
  const wordmarkBlur = Math.max(0, (1 - progress * 3) * 12);

  const taglineOpacity = Math.min(1, Math.max(0, (progress - 0.3) * 3));
  const taglineY = Math.max(0, (1 - Math.max(0, (progress - 0.3) * 3)) * 30);

  const bottomY = Math.max(0, (1 - Math.max(0, (progress - 0.5) * 3)) * 20);

  return (
    <footer
      ref={footerRef}
      className="relative bg-surface border-t border-border overflow-hidden"
    >
      <div className="w-full pt-20 sm:pt-28 lg:pt-36 pb-6">
        <div
          className="footer-wordmark w-full overflow-hidden px-2 sm:px-4 pb-4"
          style={{
            opacity: wordmarkOpacity,
            transform: `translateY(${wordmarkY}px) scale(${wordmarkScale})`,
            filter: `blur(${wordmarkBlur}px)`,
            willChange: "transform, opacity, filter",
          }}
        >
          <p
            className="font-black tracking-tight leading-[0.85] select-none m-0 text-center whitespace-nowrap w-full"
            style={{ fontSize: "23vw" }}
          >
            <span className="text-text-main">Fit</span>
            <span className="text-primary">Check</span>
          </p>
        </div>

        {/* Tagline */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            willChange: "transform, opacity",
          }}
        >
          <p className="text-text-muted text-sm sm:text-base text-center font-light mt-1 mb-12 sm:mb-16">
            Land more interviews with AI-powered resume analysis.
          </p>
        </div>

        {/* Bottom bar */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            transform: `translateY(${bottomY}px)`,
            willChange: "transform",
          }}
        >
          <div className="border-t border-border pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left — logo + copyright */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 shrink-0">
                <img src={Logo} alt="FitCheck Logo" className="w-full h-full" />
              </div>
              <p className="text-text-muted text-xs sm:text-sm">
                © {new Date().getFullYear()} FitCheck. Built by{" "}
                <span className="text-text-main font-medium">Yartik</span>.
              </p>
            </div>

            {/* Right — social icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/yartik02"
                className="group w-9 h-9 rounded-lg bg-main border border-border flex items-center justify-center text-text-muted hover:text-text-main hover:border-text-main/20 transition-all"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="transition-transform group-hover:scale-110"
                >
                  {githubIcon}
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/yartik-kamboj02/"
                className="group w-9 h-9 rounded-lg bg-main border border-border flex items-center justify-center text-text-muted hover:text-text-main hover:border-text-main/20 transition-all"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="transition-transform group-hover:scale-110"
                >
                  {linkedinIcon}
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
