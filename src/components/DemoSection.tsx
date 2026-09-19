import React from 'react';

export const DemoSection: React.FC = () => {
  return (
    <section className="section bg-elevated border-t" id="demo">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">The Real <span className="text-cyan text-glow-cyan">Overlay</span></h2>
          <p className="section-subtitle">
            This isn't a mockup. See the actual PyQt6 cyberpunk HUD and transparent background running in real-time.
          </p>
        </div>
        
        <div className="demo-video-container" style={{
          position: 'relative',
          maxWidth: '840px',
          margin: '0 auto',
          aspectRatio: '16/9',
          background: '#040507',
          border: '1px solid rgba(0, 255, 204, 0.15)',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 255, 204, 0.05)',
          overflow: 'hidden'
        }}>
          <div className="scanline-overlay" style={{ position: 'absolute', zIndex: 1 }}></div>
          
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(0, 255, 204, 0.05)',
            border: '2px solid var(--color-cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            opacity: 0.7,
            zIndex: 2
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-cyan)" style={{ marginLeft: '4px' }}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <p className="font-mono text-cyan" style={{ letterSpacing: '0.15em', fontSize: '0.85rem', opacity: 0.8, zIndex: 2 }}>DEMO FOOTAGE COMING SOON</p>
        </div>
      </div>
    </section>
  );
};
