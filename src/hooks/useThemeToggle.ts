import { useEffect, useRef } from "react";

/** Listens for the keyboard sequence T-U-R-N and toggles the site theme
 *  between the default blue/teal palette and a red/rose palette.
 *  Activates a ripple burst + toast notification on each toggle. */
export function useThemeToggle() {
  const bufferRef = useRef("");

  useEffect(() => {
    const SEQUENCE = "TURN";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip when user is typing in a form field
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      bufferRef.current = (bufferRef.current + e.key.toUpperCase()).slice(-4);

      if (bufferRef.current !== SEQUENCE) return;
      bufferRef.current = "";

      /* ── determine next theme ──────────────────────────────────── */
      const html = document.documentElement;
      const isCurrentlyRed = html.getAttribute("data-theme") === "red";

      if (isCurrentlyRed) {
        html.removeAttribute("data-theme");
      } else {
        html.setAttribute("data-theme", "red");
      }

      const newThemeName = isCurrentlyRed ? "BLUE" : "RED";
      const newThemeColor = isCurrentlyRed ? "#5eead4" : "#fb7185";

      /* ── ripple burst ──────────────────────────────────────────── */
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: fixed;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        width: 0;
        height: 0;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, ${newThemeColor}55 0%, transparent 70%);
        z-index: 999999;
        pointer-events: none;
        animation: themeRipple 1.1s cubic-bezier(0.22,1,0.36,1) forwards;
      `;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1200);

      /* ── toast notification ─────────────────────────────────────── */
      const toast = document.createElement("div");
      toast.textContent = `◉  ${newThemeName} MODE`;
      toast.style.cssText = `
        position: fixed;
        bottom: 36px;
        left: 50%;
        transform: translateX(-50%) translateY(24px);
        background: rgba(10, 14, 23, 0.92);
        border: 1px solid ${newThemeColor};
        color: ${newThemeColor};
        padding: 10px 28px;
        border-radius: 40px;
        font-family: "Times New Roman", Times, serif;
        font-size: 12px;
        letter-spacing: 4px;
        text-transform: uppercase;
        z-index: 999998;
        pointer-events: none;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        box-shadow: 0 0 24px ${newThemeColor}55, 0 4px 20px rgba(0,0,0,0.5);
        animation: themeToast 2.6s ease-out forwards;
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2700);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
