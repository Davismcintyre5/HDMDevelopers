import React from 'react';
import { useHdm } from '../../context/HdmContext';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const { company } = useHdm();
  const c = company || {};

  return (
    <footer className="bg-primary text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">{c.name || 'HDM Developers'}</h3>
          <p>{c.tagline || 'Building Digital Solutions'}</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="flex items-center gap-2 mb-1"><Phone size={14}/> {c.phone || 'N/A'}</p>
          <p className="flex items-center gap-2 mb-1"><Mail size={14}/> {c.email || 'N/A'}</p>
          <p className="flex items-center gap-2"><MapPin size={14}/> {c.address || 'N/A'}</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Links</h3>
          <div className="flex flex-wrap gap-4">
            {c.social?.github && <a href={c.social.github} target="_blank" className="hover:text-white">GitHub</a>}
            {c.social?.linkedin && <a href={c.social.linkedin} target="_blank" className="hover:text-white">LinkedIn</a>}
            {c.social?.twitter && <a href={c.social.twitter} target="_blank" className="hover:text-white">Twitter</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} {c.name || 'HDM Developers'}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;