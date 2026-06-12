import React from 'react';
import { useHdm } from '../../context/HdmContext';
import { Globe, Smartphone, Brain, Store, Shield, Wrench } from 'lucide-react';

const icons = [Globe, Smartphone, Brain, Store, Shield, Wrench];

const Services = () => {
  const { services } = useHdm();
  if (!Array.isArray(services) || !services.length) return null;

  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0a1628] text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={s._id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-300 transition group">
                <Icon className="w-10 h-10 text-blue-600 mb-3 group-hover:scale-110 transition" />
                <h3 className="font-semibold text-[#0a1628] mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;