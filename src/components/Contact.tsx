import { useEffect, useRef, useState } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import ContactOrb from "./ContactOrb";

/* ── Copy-to-clipboard helper ───────────────────────────────── */
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button className={`copy-btn${copied ? " copy-btn-done" : ""}`} onClick={copy} title={`Copy ${label}`}>
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      )}
    </button>
  );
}

/* ── SVG icons ──────────────────────────────────────────────── */
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.89-1.84a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconGithub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const IconLinkedIn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconGrad = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`contact-section section-container${inView ? " contact-in-view" : ""}`}
      id="contact"
      ref={sectionRef}
    >
      {/* Aurora layers */}
      <div className="contact-aurora contact-aurora-1" aria-hidden="true" />
      <div className="contact-aurora contact-aurora-2" aria-hidden="true" />
      <div className="contact-aurora contact-aurora-3" aria-hidden="true" />

      {/* Particle grid dots */}
      <div className="contact-grid" aria-hidden="true" />

      <div className="contact-container">

        {/* ── Big CTA headline ───────────────────────────────── */}
        <div className="contact-hero">
          <p className="contact-eyebrow">Let's Connect</p>
          <h3 className="contact-title">
            Got an <span>idea</span>?<br />
            Let's build it.
          </h3>
          <a
            href="mailto:maddan23032005@gmail.com"
            className="contact-cta-btn"
            data-cursor="disable"
          >
            <span>Say Hello</span>
            <MdArrowOutward />
          </a>
        </div>

        {/* ── Info grid ─────────────────────────────────────── */}
        <div className="contact-flex">

          {/* Connect box */}
          <div className="contact-box contact-box-1">
            <h4 className="contact-box-label">Connect</h4>
            <div className="contact-row">
              <span className="contact-row-icon"><IconMail /></span>
              <div className="contact-row-body">
                <span className="contact-row-sub">Email</span>
                <a
                  href="mailto:maddan23032005@gmail.com"
                  className="contact-link"
                  data-cursor="disable"
                  onMouseEnter={() => setHoveredLink("mail")}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  maddan23032005@gmail.com
                  <span className={`contact-link-line${hoveredLink === "mail" ? " active" : ""}`} />
                </a>
              </div>
              <CopyButton text="maddan23032005@gmail.com" label="email" />
            </div>
            <div className="contact-row">
              <span className="contact-row-icon"><IconPhone /></span>
              <div className="contact-row-body">
                <span className="contact-row-sub">WhatsApp</span>
                <a
                  href="https://wa.me/919361627674"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-link"
                  data-cursor="disable"
                  onMouseEnter={() => setHoveredLink("phone")}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  +91 9361627674
                  <span className={`contact-link-line${hoveredLink === "phone" ? " active" : ""}`} />
                </a>
              </div>
              <CopyButton text="+919361627674" label="phone" />
            </div>
          </div>

          {/* Social box */}
          <div className="contact-box contact-box-2">
            <h4 className="contact-box-label">Social</h4>
            <a href="https://github.com/maddan23032005" target="_blank" rel="noreferrer" className="contact-social" data-cursor="disable">
              <span className="contact-social-icon"><IconGithub /></span>
              <span className="contact-social-text">
                <span className="contact-social-name">GitHub</span>
                <span className="contact-social-handle">@maddan23032005</span>
              </span>
              <MdArrowOutward className="contact-social-arrow" />
            </a>
            <a href="https://www.linkedin.com/in/maddan" target="_blank" rel="noreferrer" className="contact-social" data-cursor="disable">
              <span className="contact-social-icon"><IconLinkedIn /></span>
              <span className="contact-social-text">
                <span className="contact-social-name">LinkedIn</span>
                <span className="contact-social-handle">maddan</span>
              </span>
              <MdArrowOutward className="contact-social-arrow" />
            </a>
          </div>

          {/* Education box */}
          <div className="contact-box education-box contact-box-3">
            <h4 className="contact-box-label">Education</h4>
            <div className="education-item">
              <span className="education-icon"><IconGrad /></span>
              <div>
                <p className="education-degree">B.Tech — Computer &amp; Communication Engg.</p>
                <p className="education-school">Amrita School of Engineering, Chennai</p>
                <p className="education-year">2023 – 2027 &nbsp;·&nbsp; CGPA: 9.08 / 10.0</p>
              </div>
            </div>
            <div className="education-item">
              <span className="education-icon"><IconGrad /></span>
              <div>
                <p className="education-degree">Higher Secondary Education</p>
                <p className="education-school">Jawahar CBSE School, Neyveli</p>
                <p className="education-year">2021 – 2023 &nbsp;·&nbsp; Score: 87.5%</p>
              </div>
            </div>
          </div>

          {/* Credit box */}
          <div className="contact-box contact-credit contact-box-4">
            <ContactOrb />
            <h2>Designed &amp; Developed<br /> by <span>Maddan M</span></h2>
            <h5><MdCopyright /> 2026</h5>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
