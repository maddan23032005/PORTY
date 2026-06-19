import { useEffect, useRef, useState } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ── SVG icons ─────────────────────────────────────────────── */
const IconBrain = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);
const IconRocket = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

type ServiceItem = {
  id: string;
  Icon: React.FC;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

const services: ServiceItem[] = [
  {
    id: "ai",
    Icon: IconBrain,
    title: "AI & AUTOMATION",
    subtitle: "Workflow Intelligence for Organizations",
    description: "I build AI-powered solutions by integrating Artificial Intelligence into web applications and vehicle technologies, creating smarter, more efficient, and user-centric digital experiences.",
    tags: ["LLMs & agents", "Workflow design", "RAG & retrieval", "Evals & guardrails", "Integrations", "Product strategy"],
  },
  {
    id: "build",
    Icon: IconRocket,
    title: "BUILD & SCALE",
    subtitle: "Shipping AI in Production",
    description: "I create full-stack web applications using the MERN stack and actively study scalable architecture, system design, and performance optimization to develop robust and maintainable solutions.",
    tags: ["Node.js", "Python", "REST & real-time APIs", "MySQL", "MongoDB", "React"],
  },
];

const WhatIDo = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = (el: HTMLDivElement | null, index: number) => { containerRef.current[index] = el; };

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || ScrollTrigger.isTouch === 1;
    containerRef.current.forEach(c => { if (c && isTouch) c.classList.remove("what-noTouch"); });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (id: string) => setActiveId(id);
  const handleMouseLeave = () => setActiveId(null);
  const handleClick = (id: string) => setActiveId(prev => prev === id ? null : id);

  return (
    <div className={`whatIDO${inView ? " whatIDO-inView" : ""}`} ref={sectionRef}>
      {/* Left heading */}
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>I<span className="do-h2"> DO</span></div>
        </h2>
      </div>

      {/* Right panels */}
      <div className="what-box">
        <div className="what-box-in">
          {services.map((service, i) => {
            const isActive = activeId === service.id;
            return (
              <div
                key={service.id}
                ref={el => setRef(el, i)}
                className={`what-panel what-noTouch${isActive ? " what-panel-active" : ""}`}
                onMouseEnter={() => handleMouseEnter(service.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(service.id)}
                style={{ "--panel-delay": `${i * 0.18}s` } as React.CSSProperties}
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && handleClick(service.id)}
              >
                <span className="what-corner-tl" />
                <span className="what-corner-tr" />
                <span className="what-corner-bl" />
                <span className="what-corner-br" />
                <div className="what-scan" />

                <div className="what-panel-in">
                  <div className="what-panel-header">
                    <span className="what-panel-icon" style={{ color: "var(--accentColor)" }}>
                      <service.Icon />
                    </span>
                    <div>
                      <h3>{service.title}</h3>
                      <h4>{service.subtitle}</h4>
                    </div>
                  </div>
                  <p className="what-panel-desc">{service.description}</p>
                  <div className={`what-panel-tags${isActive ? " what-panel-tags-visible" : ""}`}>
                    <h5>Skillset &amp; tools</h5>
                    <div className="what-content-flex">
                      {service.tags.map(tag => <span key={tag} className="what-tags">{tag}</span>)}
                    </div>
                  </div>
                </div>

                <div className={`what-arrow-new${isActive ? " what-arrow-up" : ""}`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M7 2v10M2 7l5 5 5-5"/>
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
