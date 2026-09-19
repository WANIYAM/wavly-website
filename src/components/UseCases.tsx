import React from 'react';
import './UseCases.css';

const cases = [
  {
    id: 'A1',
    title: 'Accessibility',
    description: 'Hands-free control for users with motor impairments. Complete system navigation without physical contact.',
    tag: 'CRITICAL',
  },
  {
    id: 'A2',
    title: 'Hygiene & Shared Spaces',
    description: 'Touchless operation in labs, hospitals, or public kiosks where avoiding surface contact is essential.',
    tag: 'ENTERPRISE',
  },
  {
    id: 'A3',
    title: 'Presentations',
    description: 'Gesture-driven slide navigation and laser pointing. No clicker needed — just you and your audience.',
    tag: 'PRODUCTIVITY',
  },
  {
    id: 'A4',
    title: 'Creative Tools',
    description: 'Mid-air drawing on a transparent canvas overlay. Quick annotations and brainstorming sessions.',
    tag: 'CREATIVE',
  },
];

export const UseCases: React.FC = () => {
  return (
    <section className="section" id="use-cases">
      <div className="container">
        <div className="section-header">
          <div className="section-label">// USE_CASES</div>
          <h2 className="section-title">
            Built For <span className="text-cyan">Everyone</span>
          </h2>
          <p className="section-subtitle">
            Real-world applications beyond the demo. 
          </p>
        </div>

        <div className="cases-grid">
          {cases.map((uc) => (
            <div key={uc.id} className="case-card">
              <div className="case-header">
                <span className="case-id">{uc.id}</span>
                <span className="case-tag">{uc.tag}</span>
              </div>
              <h3 className="case-title">{uc.title}</h3>
              <p className="case-desc">{uc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
