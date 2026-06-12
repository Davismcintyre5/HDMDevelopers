import React from 'react';
import { useHdm } from '../../context/HdmContext';
import { ArrowDown, Phone, Code, Globe, Smartphone, Server } from 'lucide-react';

const Particles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 20 + 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div key={p.id} className="absolute rounded-full bg-white" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, opacity: p.opacity, animation: `float ${p.speed}s infinite linear`, animationDelay: `-${Math.random() * p.speed}s` }} />
      ))}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
        {particles.slice(0, 15).map((p, i) => {
          const next = particles[i + 15] || particles[0];
          return <line key={i} x1={`${p.x}%`} y1={`${p.y}%`} x2={`${next.x}%`} y2={`${next.y}%`} stroke="white" strokeWidth="0.5" />;
        })}
      </svg>
    </div>
  );
};

const Typewriter = ({ words = [], speed = 80, pause = 2000 }) => {
  const [text, setText] = React.useState('');
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);
  const wordsArr = Array.isArray(words) && words.length > 0 ? words : ['Digital Solutions'];

  React.useEffect(() => {
    const current = wordsArr[wordIndex];
    const timer = setTimeout(() => {
      if (deleting) {
        setText(current.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
        if (charIndex === 1) { setDeleting(false); setWordIndex((wordIndex + 1) % wordsArr.length); }
      } else {
        setText(current.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
        if (charIndex === current.length) setTimeout(() => setDeleting(true), pause);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [charIndex, deleting, wordIndex, wordsArr, speed, pause]);

  return <span>{text}<span className="animate-pulse text-blue-400">|</span></span>;
};

const Stats = () => {
  const { services, apps, projects } = useHdm();
  const stats = [
    { label: 'Services', value: Array.isArray(services) ? services.length : 0, icon: Server },
    { label: 'Apps', value: Array.isArray(apps) ? apps.length : 0, icon: Smartphone },
    { label: 'Projects', value: Array.isArray(projects) ? projects.length : 0, icon: Code },
    { label: 'Satisfaction', value: '100%', icon: Globe },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
      {stats.map((s, i) => (
        <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-3 text-center">
          <s.icon className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <div className="text-xl sm:text-2xl font-bold text-white">{s.value}</div>
          <div className="text-[10px] text-gray-400">{s.label}</div>
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  const { company } = useHdm();
  const c = company || {};

  const words = ['Web Applications', 'Mobile Apps', 'AI Solutions', 'POS Systems', 'Your Digital Partner'];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e1a] via-[#0f1b3d] to-[#0a1628] text-white pt-14 overflow-hidden">
      <Particles />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center animate-slide-up">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs mb-6 backdrop-blur">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for new projects
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          {c.hero?.title || c.name || 'HDM Developers'}
        </h1>

        <div className="text-xl sm:text-2xl md:text-3xl font-light text-gray-300 mb-6 h-10">
          We build <Typewriter words={words} />
        </div>

        <p className="text-sm sm:text-base text-gray-400 max-w-lg mx-auto mb-8">
          {c.hero?.subtitle || c.tagline || 'Building Digital Solutions for Africa'}
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <a href="#services" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition shadow-lg shadow-blue-600/25">Explore Services</a>
          <a href="#contact" className="border border-white/20 hover:bg-white/5 text-white px-6 py-2.5 rounded-full text-sm transition backdrop-blur flex items-center gap-1.5"><ArrowDown size={16} /> Get in Touch</a>
        </div>

        <Stats />

        {c.phone && <a href={`tel:${c.phone}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-xs mt-8"><Phone size={12} /> {c.phone}</a>}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce"><ArrowDown size={16} className="text-gray-500" /></div>

      <style>{`@keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-30px) scale(1.5); } }`}</style>
    </section>
  );
};

export default Hero;