import React, { useState } from 'react';
import './ContextProfiles.css';

const profiles = {
  chrome: {
    name: 'Chrome',
    process: 'chrome.exe',
    mappings: [
      { gesture: 'TWO_FINGERS (Swipe)', action: 'Switch Tabs', keyCombo: 'Ctrl+Tab' },
      { gesture: 'L_SHAPE', action: 'Open Link in New Tab', keyCombo: 'Ctrl+Click' },
      { gesture: 'FOUR_FINGERS', action: 'Close Tab', keyCombo: 'Ctrl+W' },
    ],
  },
  vlc: {
    name: 'VLC Media Player',
    process: 'vlc.exe',
    mappings: [
      { gesture: 'FIST', action: 'Play / Pause', keyCombo: 'Space' },
      { gesture: 'THUMBS_UP / DOWN', action: 'Volume ±5', keyCombo: 'Ctrl+↑/↓' },
      { gesture: 'TWO_FINGERS (L/R)', action: 'Seek ±10s', keyCombo: 'Alt+←/→' },
    ],
  },
  powerpoint: {
    name: 'PowerPoint',
    process: 'powerpnt.exe',
    mappings: [
      { gesture: 'POINT (Swipe R)', action: 'Next Slide', keyCombo: 'Right' },
      { gesture: 'POINT (Swipe L)', action: 'Previous Slide', keyCombo: 'Left' },
      { gesture: 'TWO_FINGERS', action: 'Laser Pointer', keyCombo: 'Ctrl+L' },
    ],
  },
};

type ProfileKey = keyof typeof profiles;

export const ContextProfiles: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<ProfileKey>('chrome');
  const profile = profiles[activeProfile];

  return (
    <section className="section" id="context">
      <div className="container">
        <div className="section-header">
          <div className="section-label">// CONTEXT_PROFILES</div>
          <h2 className="section-title">
            Context-<span className="text-cyan">Aware</span> Mappings
          </h2>
          <p className="section-subtitle">
            Gestures adapt automatically based on the active foreground application.
          </p>
        </div>

        <div className="profiles-panel">
          {/* Tab bar */}
          <div className="profile-tabs">
            {(Object.keys(profiles) as ProfileKey[]).map((key) => (
              <button
                key={key}
                className={`profile-tab ${activeProfile === key ? 'active' : ''}`}
                onClick={() => setActiveProfile(key)}
              >
                <span className="tab-dot" />
                {profiles[key].name}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="profile-detail">
            <div className="profile-meta">
              <span className="meta-label">ACTIVE PROCESS:</span>
              <span className="meta-value text-cyan">{profile.process}</span>
            </div>
            <div className="profile-meta">
              <span className="meta-label">PROFILE:</span>
              <span className="meta-value">{profile.name}</span>
            </div>

            <div className="mapping-grid">
              <div className="mapping-header">
                <span>GESTURE</span>
                <span>ACTION</span>
                <span>KEY COMBO</span>
              </div>
              {profile.mappings.map((m, i) => (
                <div key={i} className="mapping-row">
                  <span className="mapping-gesture">{m.gesture}</span>
                  <span className="mapping-action">{m.action}</span>
                  <span className="mapping-key">{m.keyCombo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
