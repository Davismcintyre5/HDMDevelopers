import React, { useState } from 'react';
import { useHdm } from '../../context/HdmContext';
import api from '../../services/api';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const { company } = useHdm();
  const c = company || {};
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await api.post('/hdm/api/contact', form); setSent(true); }
    catch {} finally { setLoading(false); }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0a1628] text-center mb-10">Get In Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4 text-sm">
            <p className="flex items-center gap-2"><Phone size={16} className="text-blue-600"/> {c.phone||'N/A'}</p>
            <p className="flex items-center gap-2"><Mail size={16} className="text-blue-600"/> {c.email||'N/A'}</p>
            <p className="flex items-center gap-2"><MapPin size={16} className="text-blue-600"/> {c.address||'N/A'}</p>
            {c.whatsapp && <a href={`https://wa.me/${String(c.whatsapp).replace(/\D/g,'')}`} target="_blank" className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full text-sm">💬 WhatsApp</a>}
          </div>
          <form onSubmit={submit} className="space-y-3">
            <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-600" />
            <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email" placeholder="Email" required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-600" />
            <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Message" rows={4} required className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-600 resize-none" />
            <button type="submit" disabled={loading||sent} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 disabled:opacity-50"><Send size={14} /> {sent ? 'Sent!' : loading ? 'Sending...' : 'Send'}</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;