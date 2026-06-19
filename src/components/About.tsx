import { useEffect, useRef, useState, lazy, Suspense } from "react";
import "./styles/About.css";

const FloatingAstronaut = lazy(() => import("./FloatingAstronaut"));

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`about-section${inView ? " about-in-view" : ""}`}
      id="about"
      ref={sectionRef}
    >
      {/* 3-D floating orb character */}
      <div className="about-3d-wrap">
        <Suspense fallback={null}>
          <FloatingAstronaut />
        </Suspense>
        {/* decorative label */}
        <div className="about-3d-label">
          <span className="about-3d-pulse" />
          AI / ML Explorer
        </div>
      </div>

      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am a Full-Stack Developer and AI/ML enthusiast with experience in
          computer vision, NLP, and generative AI. Passionate about building
          scalable web apps and deploying deep learning models.
          Currently exploring autonomous vehicle systems.
        </p>
        {/* animated skill chips */}
        <div className="about-chips">
          {[
            "Computer Vision",
            "NLP",
            "Generative AI",
            "MERN Stack",
            "Deep Learning",
            "Autonomous Systems",
          ].map((chip, i) => (
            <span
              key={chip}
              className="about-chip"
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
