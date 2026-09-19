import { Hero } from './components/Hero';
import { DemoSection } from './components/DemoSection';
import { GestureLibrary } from './components/GestureLibrary';
import { VoiceCommands } from './components/VoiceCommands';
import { ContextProfiles } from './components/ContextProfiles';
import { HowItWorks } from './components/HowItWorks';
import { UseCases } from './components/UseCases';
import { TechStack } from './components/TechStack';
import { Footer } from './components/Footer';
import { Code, MessageCircle, Briefcase } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <div className="bg-grid"></div>
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="nav-brand font-mono text-cyan text-glow-cyan">Wavly_</div>
          <div className="nav-links">
            <a href="#gestures">Gestures</a>
            <a href="#voice">Voice</a>
            <a href="#context">Profiles</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#use-cases">Use Cases</a>
            <a href="#tech-stack">Tech</a>
          </div>
          <div className="social-links">
            <a href="https://github.com/WANIYAM/wavly2.0.git"><Code size={20} /></a>
            <a href="#"><MessageCircle size={20} /></a>
            <a href="#"><Briefcase size={20} /></a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <DemoSection />
        <GestureLibrary />
        <VoiceCommands />
        <ContextProfiles />
        <HowItWorks />
        <UseCases />
        <TechStack />

        {/* Final CTA */}
        <section className="section bg-elevated border-t text-center">
          <div className="container">
            <h2 className="section-title text-cyan text-glow-cyan">Ready to go touchless?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
              Experience the future of computer interaction today.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#tech-stack" className="btn btn-primary">
                pip install wavly
              </a>
              <a href="https://github.com/WANIYAM/wavly2.0.git" className="btn btn-secondary">
                Read the Docs
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
