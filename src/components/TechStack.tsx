import React from 'react';
import './TechStack.css';

const techLogos = [
  'Python 3.12', 'MediaPipe', 'OpenCV', 'NumPy', 'Pandas', 'scikit-learn', 'PyQt6', 'PyAutoGUI', 'SpeechRecognition', 'pyttsx3'
];

export const TechStack: React.FC = () => {
  return (
    <section className="section" id="tech-stack">
      <div className="container">
        <div className="stack-content">
          <div className="stack-info">
            <h2 className="section-title">Built On Solid <br/><span className="text-cyan">Foundations</span></h2>
            <p className="section-subtitle">
              Powered by industry-standard machine learning and computer vision libraries.
            </p>
            <div className="tags-container">
              {techLogos.map((tech, i) => (
                <span key={i} className="tech-tag font-mono">{tech}</span>
              ))}
            </div>

            <div className="sys-req-container" style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'rgba(0, 255, 204, 0.03)', borderLeft: '2px solid var(--color-cyan)', borderRadius: '0 4px 4px 0' }}>
              <h3 className="font-mono text-cyan" style={{ fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Requirements</h3>
              <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0, padding: 0 }}>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <span className="text-cyan">OS:</span> 
                  <span>Windows 10/11 <span style={{ opacity: 0.6, fontSize: '0.75rem' }}>(macOS/Linux planned)</span></span>
                </li>
                <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <span className="text-cyan">Hardware:</span> 
                  <span>Webcam & Microphone</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="text-cyan">Runtime:</span> 
                  <span>Python 3.12+</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="quick-start">
            <div className="terminal-header">
              <div className="mac-dots"><span></span><span></span><span></span></div>
              <span className="terminal-title font-mono">Quick Start</span>
            </div>
            <div className="terminal-body font-mono text-cyan text-glow-cyan">
              <div className="cmd-line"><span className="prompt">$</span> git clone https://github.com/WANIYAM/wavly2.0.git</div>
              <div className="cmd-line"><span className="prompt">$</span> cd wavly</div>
              <div className="cmd-line"><span className="prompt">$</span> python -m venv venv</div>
              <div className="cmd-line"><span className="prompt">$</span> source venv/bin/activate</div>
              <div className="cmd-line"><span className="prompt">$</span> pip install -r requirements.txt</div>
              <div className="cmd-line"><span className="prompt">$</span> python main.py</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
