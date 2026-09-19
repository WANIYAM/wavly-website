import React from 'react';
import './HowItWorks.css';

const steps = [
  {
    id: '01',
    module: 'cv2.VideoCapture',
    title: 'Webcam Input',
    desc: 'Captures live RGB frames at 30fps from default camera.',
    status: 'ACTIVE',
  },
  {
    id: '02',
    module: 'mediapipe.hands',
    title: 'MediaPipe',
    desc: 'Extracts 21 3D hand landmarks per frame in real-time.',
    status: 'ACTIVE',
  },
  {
    id: '03',
    module: 'sklearn.ensemble',
    title: 'Random Forest',
    desc: 'Classifies gesture from landmark vectors. 99.66% accuracy.',
    status: 'ACTIVE',
  },
  {
    id: '04',
    module: 'pyautogui',
    title: 'System Action',
    desc: 'Maps classified gesture to OS-level input events.',
    status: 'ACTIVE',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="section bg-elevated" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <div className="section-label">// DATA_PIPELINE</div>
          <h2 className="section-title">
            Under The <span className="text-cyan">Hood</span>
          </h2>
          <p className="section-subtitle">
            Frame → Landmarks → Classification → Action. The entire pipeline runs in under 16ms.
          </p>
        </div>

        <div className="pipeline">
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className="pipeline-step">
                <div className="step-header">
                  <span className="step-id">{step.id}</span>
                  <span className="step-status text-green">● {step.status}</span>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <div className="step-module">{step.module}</div>
                <p className="step-desc">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="pipeline-arrow">
                  <div className="arrow-line" />
                  <div className="arrow-dot" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
