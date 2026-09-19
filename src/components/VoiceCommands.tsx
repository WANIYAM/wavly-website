import React, { useState, useEffect } from 'react';
import './VoiceCommands.css';

const commands = [
  { trigger: '"Wavly, click that"', response: 'Executing click at cursor position.' },
  { trigger: '"Wavly, scroll down"', response: 'Scrolling down 200px.' },
  { trigger: '"Wavly, take a screenshot"', response: 'Screenshot captured → ~/Desktop/' },
  { trigger: '"Wavly, open Chrome"', response: 'Launching chrome.exe...' },
  { trigger: '"Wavly, next slide"', response: 'Sending RIGHT_ARROW keystroke.' },
  { trigger: '"Wavly, zoom in"', response: 'Ctrl + = triggered.' },
  { trigger: '"Wavly, minimize"', response: 'Win + D triggered.' },
];

export const VoiceCommands: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [phase, setPhase] = useState<'idle' | 'listening' | 'processing' | 'response'>('idle');
  const [displayText, setDisplayText] = useState('');

  const runDemo = () => {
    if (phase !== 'idle') return;
    const idx = Math.floor(Math.random() * commands.length);
    setActiveIndex(idx);
    
    setPhase('listening');
    setDisplayText('▌ Listening...');
    
    setTimeout(() => {
      setPhase('processing');
      setDisplayText(`> ${commands[idx].trigger}`);
      
      setTimeout(() => {
        setPhase('response');
        setDisplayText(`  ${commands[idx].response}`);
        
        setTimeout(() => {
          setPhase('idle');
          setActiveIndex(-1);
          setDisplayText('');
        }, 2500);
      }, 1200);
    }, 1500);
  };

  // Auto-trigger demo periodically
  useEffect(() => {
    const interval = setInterval(() => {
      runDemo();
    }, 8000);
    // Initial trigger
    const timeout = setTimeout(runDemo, 2000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="section bg-elevated" id="voice">
      <div className="container">
        <div className="voice-layout">
          <div className="voice-info">
            <div className="section-label">// VOICE_PROTOCOL</div>
            <h2 className="section-title">
              Multimodal <span className="text-cyan">Input</span>
            </h2>
            <p className="section-subtitle">
              Gestures handle tracking. Voice handles intent. 20+ built-in voice commands with a Jarvis-style response system. Wake word activated.
            </p>

            <div className="command-registry">
              <div className="registry-header">
                <span>REGISTERED COMMANDS</span>
                <span className="registry-count">{commands.length}</span>
              </div>
              {commands.map((cmd, i) => (
                <div
                  key={i}
                  className={`registry-row ${i === activeIndex ? 'active' : ''}`}
                >
                  <span className="registry-trigger">{cmd.trigger}</span>
                  <span className="registry-arrow">→</span>
                  <span className="registry-response">{cmd.response}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="voice-terminal">
            <div className="terminal-chrome">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-label">wavly_voice_daemon</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line dim">$ wavly --voice --daemon</div>
              <div className="terminal-line dim">[INFO] Voice engine initialized</div>
              <div className="terminal-line dim">[INFO] Wake word: "Wavly"</div>
              <div className="terminal-line dim">[INFO] Listening on default mic...</div>
              <div className="terminal-line dim">---</div>
              
              {phase === 'idle' && (
                <div className="terminal-line">
                  <span className="terminal-cursor">▌</span> Awaiting wake word...
                </div>
              )}
              {phase === 'listening' && (
                <div className="terminal-line listening">
                  {displayText}
                </div>
              )}
              {phase === 'processing' && (
                <div className="terminal-line text-cyan">
                  {displayText}
                </div>
              )}
              {phase === 'response' && (
                <div className="terminal-line response">
                  <span className="text-green">[OK]</span> {displayText}
                </div>
              )}

              <button
                className="mic-trigger"
                onClick={runDemo}
                disabled={phase !== 'idle'}
              >
                {phase === 'idle' ? '↵ Click to simulate voice command' : '● Processing...'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
