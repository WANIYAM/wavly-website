import React from 'react';
import { HandSkeleton } from './HandSkeleton';
import './Hero.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero section" id="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <div className="hero-status">
            <span className="status-dot" />
            <span className="status-text">SYSTEM ONLINE — TRACKING ACTIVE</span>
          </div>
          <h1 className="hero-title">
            Control Your<br />
            Computer<br />
            <span className="text-cyan text-glow-cyan">Without Touching It<span className="cursor-blink-inline" /></span>
          </h1>
          <p className="hero-subtitle">
            Wavly uses your webcam to track 21 hand landmarks and understand 10 distinct gestures with 99.66% accuracy. Paired with voice commands, it's a complete touchless control system.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value text-cyan">21</span>
              <span className="stat-label">LANDMARKS</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value text-cyan">10</span>
              <span className="stat-label">GESTURES</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value text-cyan">99.66%</span>
              <span className="stat-label">ACCURACY</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-value text-cyan">20+</span>
              <span className="stat-label">VOICE CMDS</span>
            </div>
          </div>
          <div className="hero-actions">
            <a href="#demo" className="btn btn-primary">See It In Action ↓</a>
            <a href="https://github.com/WANIYAM/wavly2.0.git" className="btn btn-secondary">
              View Source →
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <HandSkeleton />
        </div>
      </div>
    </section>
  );
};
