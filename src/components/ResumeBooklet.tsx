import React, { useRef, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import HTMLFlipBook from 'react-pageflip';
import './styles/ResumeBooklet.css';

interface ResumeBookletProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

const BookletPage = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div className={`page ${props.className || ''}`} ref={ref}>
      {props.children}
    </div>
  );
});

const ResumeBooklet = ({ isOpen, onClose }: ResumeBookletProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return createPortal(
    <div className="booklet-modal-overlay" onClick={onClose} ref={containerRef}>
      <div className="booklet-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="flipbook-container">
          {/* @ts-ignore - react-pageflip types might be problematic in TS */}
          <HTMLFlipBook
            width={450}
            height={636}
            size="stretch"
            minWidth={315}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            className="demo-book"
          >
            {/* Page 1: Cover Photo */}
            <BookletPage className="cover-page">
              <img src="/images/MADDAN.jpeg" alt="Cover" />
            </BookletPage>

            {/* Page 2: Resume Image */}
            <BookletPage className="resume-img-page">
              <img src="/images/Resume.png" alt="Resume" />
            </BookletPage>
            
            {/* Page 3: Blank/Back Cover to make pages even */}
            <BookletPage className="cover-page back-cover">
              <div className="back-cover-content">Thanks for reviewing!</div>
            </BookletPage>

            {/* Page 4: Back Cover */}
            <BookletPage className="cover-page back-cover">
              <div className="back-cover-content">Thanks for reviewing!</div>
            </BookletPage>
          </HTMLFlipBook>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ResumeBooklet;
