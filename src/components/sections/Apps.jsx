import React, { useState } from 'react';
import { useHdm } from '../../context/HdmContext';
import { Star, Eye, ExternalLink } from 'lucide-react';

const Apps = () => {
  const { apps } = useHdm();
  const [filter, setFilter] = useState('All');
  if (!Array.isArray(apps) || !apps.length) return null;

  const categories = ['All', ...new Set(apps.filter(a=>a?.category).map(a => a.category))];
  const filtered = filter === 'All' ? apps : apps.filter(a => a?.category === filter);

  return (
    <section id="apps" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0a1628] text-center mb-8">Our Apps</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${filter === c ? 'bg-blue-600 text-white' : 'bg-white text-[#0a1628] border border-gray-200 hover:bg-gray-50'}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(app => (
            <div key={app._id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition group">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-2xl shrink-0">{app.icon || '📱'}</div>
                <div>
                  <h3 className="font-semibold text-[#0a1628] text-sm">{app.name}</h3>
                  <p className="text-xs text-gray-500">{app.category}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{app.description}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {Array.isArray(app.technologies) && app.technologies.slice(0,3).map(t => <span key={t} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> {app.rating||0}</span>
                <span className="flex items-center gap-1"><Eye size={12} /> {app.viewCount||0}</span>
                {app.urls?.live && <a href={app.urls.live} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1"><ExternalLink size={12} /> Live</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Apps;