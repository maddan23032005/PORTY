import { useEffect, useRef, useState } from "react";
import "./styles/Career.css";
import CareerBackground from "./CareerBackground";

/* ── Inline SVG icons (no emojis) ─────────────────────────── */
const IconBriefcase = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);
const IconTrophy = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);
const IconUsers = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconCode = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const careerItems = [
  {
    id: "intern",
    Icon: IconBriefcase,
    tag: "NOV 2024",
    role: "Web Development Intern",
    company: "Neyveli Lignite Corporation (NLC)",
    type: "Experience",
    color: "#5eead4",
    summary: "Real-time dashboard for mining bench monitoring.",
    detail: "Built a real-time dashboard to monitor and track mining bench data, improving operational visibility for engineers. Designed interactive UI components for data visualization and reporting using HTML, CSS, and JavaScript.",
  },
  {
    id: "hackathon",
    Icon: IconTrophy,
    tag: "2025",
    role: "Hackathon Winner",
    company: "Achievements",
    type: "Award",
    color: "#22d3ee",
    summary: "2× National-level 1st place winner.",
    detail: "• Ingenium 5.0 Hackathon (1st Place): Won national-level hackathon (theme: Urban Traffic System), designing an AI-powered intelligent traffic management solution.\n\n• Technical Treasure Hunt (1st Place): Secured 1st in a multi-round challenge with 5 technical rounds (image decoding via OpenCV) and 4 non-technical clue-solving rounds.",
  },
  {
    id: "club",
    Icon: IconUsers,
    tag: "2025–2027",
    role: "Club Coordinator",
    company: "Leadership & Activities",
    type: "Leadership",
    color: "#0d9488",
    summary: "BIS Club & CAMHI Club — organizing events & initiatives.",
    detail: "• BIS Club: Organizing awareness sessions on Indian standards, quality benchmarks, and standardization practices among students.\n\n• CAMHI Club: Leading initiatives and events focused on HCI research, AI-driven interfaces, and human-computer interaction projects.",
  },
  {
    id: "skills",
    Icon: IconCode,
    tag: "Skills",
    role: "Technical Skills",
    company: "Core Competencies",
    type: "Stack",
    color: "#67e8f9",
    summary: "AI/ML · Full-Stack · Computer Vision · NLP",
    detail: "AI/ML: Machine Learning, Deep Learning, Computer Vision, NLP, Generative AI (TensorFlow, PyTorch, OpenCV, YOLOv5/v8, Scikit-learn, Transformers)\n\nLanguages & DB: C, Python, JavaScript, SQL, MySQL, MongoDB\n\nWeb Dev: MERN Stack, Next.js, Flask, Django, Firebase, React.js, TailwindCSS",
  },
];

const Career = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (id: string) => setActiveCard(prev => prev === id ? null : id);

  return (
    <div
      className={`career-section section-container${inView ? " career-in-view" : ""}`}
      ref={sectionRef}
    >
      <CareerBackground />
      <div className="career-container">
        <h2 className="career-heading">Experience <span>&</span><br />More</h2>

        <div className="career-bento">
          {careerItems.map((item, i) => {
            const open = activeCard === item.id;
            return (
              <div
                key={item.id}
                className={`career-card career-card-${i + 1}${open ? " career-card-open" : ""}`}
                style={{ "--card-color": item.color } as React.CSSProperties}
                onClick={() => toggle(item.id)}
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && toggle(item.id)}
                aria-expanded={open}
              >
                <div className="career-card-corner" />

                <div className="career-card-front">
                  <div className="career-card-header">
                    <span className="career-card-icon" style={{ color: item.color }}>
                      <item.Icon />
                    </span>
                    <span className="career-card-tag">{item.tag}</span>
                  </div>
                  <div className="career-card-type">{item.type}</div>
                  <h4 className="career-card-role">{item.role}</h4>
                  <h5 className="career-card-company">{item.company}</h5>
                  <p className="career-card-summary">{item.summary}</p>
                  <div className="career-card-hint">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.4s ease" }}>
                      <path d="M2 4l4 4 4-4"/>
                    </svg>
                    <span>{open ? "collapse" : "expand"}</span>
                  </div>
                </div>

                <div className="career-card-detail">
                  {item.detail.split("\n").map((line, j) =>
                    line.startsWith("•") ? <p key={j} className="career-card-bullet">{line}</p>
                    : line.trim() === "" ? <br key={j} />
                    : <p key={j}>{line}</p>
                  )}
                </div>

                <div className="career-card-glow" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Career;
