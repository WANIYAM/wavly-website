import React, { useState, useEffect, useCallback, useRef } from 'react';
import './HandSkeleton.css';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MediaPipe 21-point hand landmark topology (Corrected)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CONNECTIONS: [number, number][] = [
  // Thumb
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Index
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Middle (DO NOT connect to wrist 0)
  [5, 9], [9, 10], [10, 11], [11, 12],
  // Ring
  [9, 13], [13, 14], [14, 15], [15, 16],
  // Pinky
  [13, 17], [17, 18], [18, 19], [19, 20],
  // Palm base loop
  [17, 0]
];

const FINGERTIPS = new Set([4, 8, 12, 16, 20]);

type Point = [number, number];
type Pose = Point[];

const gestures = [
  { name: 'OPEN_HAND', action: 'Normal cursor tracking', id: 'open_hand', confidence: '99.8%' },
  { name: 'FIST', action: 'Freeze cursor', id: 'fist', confidence: '99.7%' },
  { name: 'POINT', action: 'Precision cursor mode', id: 'point', confidence: '99.9%' },
  { name: 'TWO_FINGERS', action: 'Scroll / Draw Mode', id: 'two_fingers', confidence: '99.6%' },
  { name: 'THREE_FINGERS', action: 'On-screen keyboard', id: 'three_fingers', confidence: '99.5%' },
  { name: 'FOUR_FINGERS', action: 'Take screenshot', id: 'four_fingers', confidence: '99.4%' },
  { name: 'THUMBS_DOWN', action: 'Volume down', id: 'thumbs_up', confidence: '99.7%' },
  { name: 'THUMBS_UP', action: 'Volume up', id: 'thumbs_down', confidence: '99.6%' },
  { name: 'L_SHAPE', action: 'Right-click', id: 'l_shape', confidence: '99.5%' },
  { name: 'PINCH', action: 'Left-click', id: 'pinch', confidence: '99.8%' },
];

const BASE_POSE: Pose = [
  [150, 370], // 0 wrist
  [110, 330], // 1 thumb_cmc
  [80, 290],  // 2 thumb_mcp
  [60, 250],  // 3 thumb_ip
  [45, 215],  // 4 thumb_tip
  [115, 230], // 5 index_mcp
  [110, 160], // 6 index_pip
  [107, 110], // 7 index_dip
  [105, 70],  // 8 index_tip
  [150, 220], // 9 middle_mcp
  [148, 140], // 10 middle_pip
  [147, 85],  // 11 middle_dip
  [146, 40],  // 12 middle_tip
  [185, 225], // 13 ring_mcp
  [188, 150], // 14 ring_pip
  [190, 100], // 15 ring_dip
  [192, 60],  // 16 ring_tip
  [218, 240], // 17 pinky_mcp
  [222, 175], // 18 pinky_pip
  [225, 135], // 19 pinky_dip
  [227, 105], // 20 pinky_tip
];

const makePose = (id: string): Pose => {
  const points = [...BASE_POSE] as Pose;

  const curlThumb = () => {
    points[2] = [100, 290];
    points[3] = [108, 255];
    points[4] = [112, 235];
  };

  const curlIndex = () => {
    points[6] = [120, 215];
    points[7] = [125, 225];
    points[8] = [130, 232];
  };

  const curlMiddle = () => {
    points[10] = [155, 210];
    points[11] = [155, 220];
    points[12] = [155, 225];
  };

  const curlRing = () => {
    points[14] = [185, 210];
    points[15] = [182, 220];
    points[16] = [178, 228];
  };

  const curlPinky = () => {
    points[18] = [215, 225];
    points[19] = [210, 230];
    points[20] = [205, 235];
  };

  let rotateAngle = 0;

  switch (id) {
    case 'open_hand':
      break;
    case 'fist':
      curlThumb(); curlIndex(); curlMiddle(); curlRing(); curlPinky();
      break;
    case 'point':
      curlThumb(); curlMiddle(); curlRing(); curlPinky();
      break;
    case 'two_fingers':
      curlThumb(); curlRing(); curlPinky();
      break;
    case 'three_fingers':
      curlThumb(); curlPinky();
      break;
    case 'four_fingers':
      curlThumb();
      break;
    case 'thumbs_up':
      curlIndex(); curlMiddle(); curlRing(); curlPinky();
      rotateAngle = -Math.PI / 2; // Point thumb UP
      break;
    case 'thumbs_down':
      curlIndex(); curlMiddle(); curlRing(); curlPinky();
      rotateAngle = Math.PI / 2; // Point thumb DOWN
      break;
    case 'l_shape':
      curlMiddle(); curlRing(); curlPinky();
      // distinct outward/downward path for thumb
      points[1] = [110, 330];
      points[2] = [70, 320];
      points[3] = [35, 300];
      points[4] = [10, 285];
      break;
    case 'pinch':
      curlMiddle(); curlRing(); curlPinky();
      // converge thumb and index
      points[1] = [110, 330];
      points[2] = [85, 290];
      points[3] = [95, 220];
      points[4] = [108, 150];
      
      points[5] = [115, 230];
      points[6] = [112, 190];
      points[7] = [110, 160];
      points[8] = [108, 150];
      break;
  }

  // Apply full-hand rotation if needed
  if (rotateAngle !== 0) {
    const cx = 150;
    const cy = 250;
    const cos = Math.cos(rotateAngle);
    const sin = Math.sin(rotateAngle);
    for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i];
      const dx = x - cx;
      const dy = y - cy;
      points[i] = [cx + dx * cos - dy * sin, cy + dx * sin + dy * cos];
    }
  }

  return points;
};

const POSES: Record<string, Pose> = {};
gestures.forEach(g => { POSES[g.id] = makePose(g.id); });

export const HandSkeleton: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatedPoints, setAnimatedPoints] = useState<Pose>(POSES[gestures[0].id]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [locked, setLocked] = useState(true);
  const animRef = useRef<number>(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = gestures[currentIndex];
  const targetPose = POSES[current.id];

  const animateTo = useCallback((target: Pose) => {
    setIsTransitioning(true);
    const start = performance.now();
    const duration = 350;
    const startPoints = [...animatedPoints];

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);

      const interpolated: Pose = startPoints.map((sp, i) => [
        sp[0] + (target[i][0] - sp[0]) * ease,
        sp[1] + (target[i][1] - sp[1]) * ease,
      ]);

      setAnimatedPoints(interpolated);

      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setIsTransitioning(false);
        setLocked(true);
        setTimeout(() => setLocked(true), 100);
      }
    };

    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(tick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedPoints]);

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % gestures.length);
    }, 3500);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  useEffect(() => {
    animateTo(targetPose);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleDotClick = (idx: number) => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentIndex(idx);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % gestures.length);
    }, 3500);
  };

  const [scanY, setScanY] = useState(0);
  useEffect(() => {
    let frame: number;
    const startTime = performance.now();
    const scanDuration = 3000;
    const animate = (now: number) => {
      const elapsed = (now - startTime) % scanDuration;
      setScanY((elapsed / scanDuration) * 400); // match new viewbox height
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="skeleton-container">
      <div className="viewfinder-bracket top-left" />
      <div className="viewfinder-bracket top-right" />
      <div className="viewfinder-bracket bottom-left" />
      <div className="viewfinder-bracket bottom-right" />

      <div className="hud-readout top-left-hud">
        <span className="hud-label">LANDMARKS</span>
        <span className="hud-value">21</span>
      </div>
      <div className="hud-readout top-right-hud">
        <span className="hud-label">CONF</span>
        <span className="hud-value text-green">{current.confidence}</span>
      </div>
      <div className="hud-readout bottom-left-hud">
        <span className="hud-label">MODEL</span>
        <span className="hud-value">MediaPipe v2</span>
      </div>
      <div className="hud-readout bottom-right-hud">
        <span className="hud-label">FPS</span>
        <span className="hud-value">60</span>
      </div>

      <svg viewBox="0 0 300 400" className="skeleton-svg">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line
          x1="0"
          y1={scanY}
          x2="300"
          y2={scanY}
          stroke="rgba(0,255,204,0.15)"
          strokeWidth="1"
        />

        {CONNECTIONS.map(([a, b], i) => (
          <line
            key={`conn-${i}`}
            x1={animatedPoints[a][0]}
            y1={animatedPoints[a][1]}
            x2={animatedPoints[b][0]}
            y2={animatedPoints[b][1]}
            className={`skeleton-line ${isTransitioning ? 'transitioning' : ''} ${locked ? 'locked' : ''}`}
            filter="url(#glow)"
          />
        ))}

        {animatedPoints.map(([x, y], i) => (
          <g key={`joint-${i}`}>
            {FINGERTIPS.has(i) && (
              <circle
                cx={x}
                cy={y}
                r={8}
                className="fingertip-glow"
              />
            )}
            <circle
              cx={x}
              cy={y}
              r={FINGERTIPS.has(i) ? 5 : i === 0 ? 6 : 3.5}
              className={`skeleton-joint ${FINGERTIPS.has(i) ? 'fingertip' : ''} ${i === 0 ? 'wrist-joint' : ''}`}
              filter={FINGERTIPS.has(i) ? "url(#glow-strong)" : "url(#glow)"}
            />
            {(i === 0 || FINGERTIPS.has(i)) && (
              <text
                x={x + (FINGERTIPS.has(i) ? 10 : -15)}
                y={y + (i === 0 ? 15 : -10)}
                className="joint-label"
              >
                {i}
              </text>
            )}
          </g>
        ))}
      </svg>

      <div className="gesture-readout">
        <div className="readout-row">
          <span className="readout-label">GESTURE:</span>
          <span className={`readout-value ${isTransitioning ? 'flash' : ''}`}>
            {current.name}
          </span>
        </div>
        <div className="readout-row">
          <span className="readout-label">ACTION:</span>
          <span className="readout-action">{current.action}</span>
        </div>
        <div className={`detection-badge ${!isTransitioning ? 'confirmed' : ''}`}>
          {isTransitioning ? '● DETECTING...' : '● LOCKED'}
        </div>
      </div>

      <div className="gesture-dots">
        {gestures.map((g, i) => (
          <button
            key={g.id}
            className={`dot ${i === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(i)}
            aria-label={`Switch to ${g.name} gesture`}
            title={g.name}
          />
        ))}
      </div>
    </div>
  );
};
