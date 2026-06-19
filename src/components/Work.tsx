import { useState, useCallback, useEffect, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";

const projects = [
  {
    title: "Unified Lightweight ADAS Architecture",
    category: "Autonomous Systems",
    tools: "YOLOv8, Computer Vision, Deep Learning",
    image: "/images/ADAS.png",
    link: "https://github.com/maddan23032005/unified-bimodal-fusion",
  },
  {
    title: "Automated ADHD Detection",
    category: "Medical AI",
    tools: "EEG, Transformers, Cross-Channel Attention",
    image: "/images/ADHD.png",
    link: "https://github.com/maddan23032005/ADHD-Detection",
  },
  {
    title: "Beginner-Friendly Programming Chatbot",
    category: "Generative AI",
    tools: "MERN Stack, Gemini API, Real-time UI",
    image: "/images/CHATBOT.png",
    link: "https://github.com/maddan23032005/MPT-CHATBOT",
  },
  {
    title: "Waste Segregator Using OpenCV",
    category: "Computer Vision",
    tools: "OpenCV, YOLOv5, Edge Deployment",
    image: "/images/WASTE SEGREGATOR.png",
    link: "https://github.com/maddan23032005/Waste-Segregator",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  return (
    <div
      className={`work-section${inView ? " work-in-view" : ""}`}
      id="work"
      ref={sectionRef}
    >
      {/* Neon scan-line sweep */}
      <div className="work-scanline" aria-hidden="true" />

      {/* Floating geometric shapes */}
      <div className="work-geo work-geo-1" aria-hidden="true" />
      <div className="work-geo work-geo-2" aria-hidden="true" />
      <div className="work-geo work-geo-3" aria-hidden="true" />

      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">{project.category}</p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools &amp; Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot${index === currentIndex ? " carousel-dot-active" : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
