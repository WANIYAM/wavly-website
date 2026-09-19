import React from 'react';
import { Code, MessageCircle, Briefcase } from 'lucide-react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo font-mono text-cyan text-glow-cyan">Wavly_</h3>
            <p className="footer-desc text-secondary">
              The AI-powered touchless computer control system.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="link-column">
              <h4 className="column-title font-mono">Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">Gesture Guide</a>
              <a href="#">API Reference</a>
            </div>
            <div className="link-column">
              <h4 className="column-title font-mono">Credits</h4>
              <a href="#">MediaPipe</a>
              <a href="#">PyQt6</a>
              <a href="#">PyAutoGUI</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright text-secondary">
            &copy; {new Date().getFullYear()} Wavly. Open Source under MIT License.
          </p>
          <div className="social-links">
            <a href="https://github.com/WANIYAM/wavly2.0.git"><Code size={20} /></a>
            <a href="#"><MessageCircle size={20} /></a>
            <a href="#"><Briefcase size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
