import React, { useState } from 'react';
import { useHdm } from '../../context/HdmContext';
import { Menu, X, Phone } from 'lucide-react';

const Header = () => {
  const { company } = useHdm();
  const [open, setOpen] = useState(false);

  const nav = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Apps', href: '#apps' },
    { label: 'Projects', href: '#projects' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 text-white font-bold text-lg">
          <span>🛠️</span>
          <span className="hidden sm:inline">{company?.name || 'HDM'}</span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map(n => (
            <a key={n.label} href={n.href} className="text-sm text-gray-300 hover:text-white transition">{n.label}</a>
          ))}
          <a href={`tel:${company?.phone||''}`} className="flex items-center gap-1.5 bg-success text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-green-600 transition">
            <Phone size={14} /> Contact
          </a>
        </nav>

        <button onClick={() => setOpen(true)} className="md:hidden text-white"><Menu size={22} /></button>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/60 z-50 md:hidden" onClick={() => setOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-60 bg-primary-light z-50 p-5 md:hidden animate-slide-in-left">
            <button onClick={() => setOpen(false)} className="text-white mb-6"><X size={22} /></button>
            <nav className="flex flex-col gap-3">
              {nav.map(n => <a key={n.label} href={n.href} onClick={() => setOpen(false)} className="text-gray-300 hover:text-white text-sm py-1">{n.label}</a>)}
              <a href={`tel:${company?.phone||''}`} className="bg-success text-white text-center px-4 py-2 rounded-full text-sm mt-3">📞 Call</a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;