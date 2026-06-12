import React, { useState } from 'react';
import { useHdm } from '../../context/HdmContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const { photos } = useHdm();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  
  if (!Array.isArray(photos) || !photos.length) return null;

  const baseURL = import.meta.env.VITE_API_URL || '';
  
  const categories = ['All', ...new Set(photos.map(p => p.category || 'General'))];
  const filtered = filter === 'All' ? photos : photos.filter(p => (p.category || 'General') === filter);
  
  const current = filtered.findIndex(p => p?._id === selected?._id);
  const prev = () => setSelected(filtered[current > 0 ? current - 1 : filtered.length - 1]);
  const next = () => setSelected(filtered[current < filtered.length - 1 ? current + 1 : 0]);

  return (
    <section id="gallery" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0a1628] text-center mb-6">Gallery</h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                filter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map(p => (
            <div key={p._id} className="group">
              <p className="text-xs font-semibold text-[#0a1628] mb-1.5 truncate">{p.title || 'Untitled'}</p>
              <div
                onClick={() => setSelected(p)}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer bg-gray-100 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={`${baseURL}${p.path}`}
                  alt={p.title || 'Photo'}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No photos in this category.</p>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white hover:text-gray-300"><X size={28} /></button>
          <button onClick={e => { e.stopPropagation(); prev(); }} className="absolute left-2 sm:left-4 text-white hover:text-gray-300"><ChevronLeft size={40} /></button>
          <div className="text-center max-w-4xl" onClick={e => e.stopPropagation()}>
            <p className="text-white text-base font-semibold mb-3">{selected.title || 'Untitled'}</p>
            <img src={`${baseURL}${selected.path}`} alt={selected.title || 'Photo'} className="max-w-full max-h-[65vh] rounded-xl object-contain" />
          </div>
          <button onClick={e => { e.stopPropagation(); next(); }} className="absolute right-2 sm:right-4 text-white hover:text-gray-300"><ChevronRight size={40} /></button>
        </div>
      )}
    </section>
  );
};

export default Gallery;