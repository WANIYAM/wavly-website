import React, { useState } from 'react';
import './GestureLibrary.css';

const gesturesData = [
  { id: 'fist', name: 'FIST', action: 'Freeze cursor', keypoints: 'All curled' },
  { id: 'open_hand', name: 'OPEN_HAND', action: 'Normal tracking', keypoints: 'All extended' },
  { id: 'point', name: 'POINT', action: 'Precision tracking', keypoints: 'Index extended' },
  { id: 'two_fingers', name: 'TWO_FINGERS', action: 'Scroll / Draw', keypoints: 'Index + Middle' },
  { id: 'three_fingers', name: 'THREE_FINGERS', action: 'On-screen keyboard', keypoints: 'Idx + Mid + Ring' },
  { id: 'four_fingers', name: 'FOUR_FINGERS', action: 'Take screenshot', keypoints: 'All but thumb' },
  { id: 'thumbs_up', name: 'THUMBS_UP', action: 'Volume up', keypoints: 'Thumb extended ↑' },
  { id: 'thumbs_down', name: 'THUMBS_DOWN', action: 'Volume down', keypoints: 'Thumb extended ↓' },
  { id: 'l_shape', name: 'L_SHAPE', action: 'Right-click', keypoints: 'Thumb + Index 90°' },
  { id: 'pinch', name: 'PINCH', action: 'Left-click', keypoints: 'Tip 4 → Tip 8' },
];

export const GestureLibrary: React.FC = () => {
  const [activeGesture, setActiveGesture] = useState<string | null>(null);

  return (
    <section className="section" id="gestures">
      <div className="container">
        <div className="section-header">
          <div className="section-label">// GESTURE_LIBRARY</div>
          <h2 className="section-title">
            10 Distinct <span className="text-cyan">Gestures</span>
          </h2>
          <p className="section-subtitle">
            Each gesture maps to a specific system action. Hover to inspect the mapping.
          </p>
        </div>

        <div className="gesture-table-container">
          <div className="table-header">
            <span className="col-id">ID</span>
            <span className="col-name">GESTURE</span>
            <span className="col-keypoints">KEYPOINTS</span>
            <span className="col-action">ACTION</span>
            <span className="col-status">STATUS</span>
          </div>
          {gesturesData.map((gesture) => {
            const isActive = activeGesture === gesture.id;
            return (
              <div
                key={gesture.id}
                className={`table-row ${isActive ? 'active' : ''}`}
                onMouseEnter={() => setActiveGesture(gesture.id)}
                onMouseLeave={() => setActiveGesture(null)}
              >
                <span className="col-id text-muted">{gesture.id}</span>
                <span className="col-name text-cyan">{gesture.name}</span>
                <span className="col-keypoints">{gesture.keypoints}</span>
                <span className="col-action">{gesture.action}</span>
                <span className="col-status">
                  <span className={`status-indicator ${isActive ? 'active' : ''}`}>
                    {isActive ? '● ACTIVE' : '○ IDLE'}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
