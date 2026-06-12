import React from 'react';
import { useHdm } from '../../context/HdmContext';
import { ExternalLink } from 'lucide-react';

const Projects = () => {
  const { projects } = useHdm();
  if (!Array.isArray(projects) || !projects.length) return null;

  const featured = projects.filter(p => p?.featured);
  const rest = projects.filter(p => !p?.featured);

  return (
    <section id="projects" className="py-16 bg-[#0f2240] text-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Projects</h2>
        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {featured.map(p => (
              <div key={p._id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-400/50 transition">
                <h3 className="font-semibold mb-2">⭐ {p.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(p.technologies) && p.technologies.map(t => <span key={t} className="text-[10px] bg-blue-600/20 text-white px-2 py-0.5 rounded-full">{t}</span>)}
                </div>
                {p.link && <a href={p.link} target="_blank" className="inline-flex items-center gap-1 text-blue-400 text-xs mt-3 hover:underline"><ExternalLink size={12} /> View</a>}
              </div>
            ))}
          </div>
        )}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {rest.map(p => (
              <div key={p._id} className="border border-white/10 rounded-lg p-4 hover:border-white/30 transition">
                <h4 className="font-medium text-sm mb-1">{p.name}</h4>
                <p className="text-xs text-gray-400 line-clamp-2">{p.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;