import React, { useState, useEffect, useRef } from 'react';
import { useHdm } from '../../context/HdmContext';
import api from '../../services/api';
import { Send, X, Trash2, Sparkles, Globe, Smartphone, Briefcase, Mail, Phone } from 'lucide-react';

const AiWidget = () => {
  const { company } = useHdm();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const ai = company?.ai;

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { if (open && !messages.length) setMessages([{ role: 'ai', text: ai?.greeting || 'Hi! Ask me about our services, apps, or projects.' }]); }, [open]);

  const send = async (msg) => {
    const text = msg || input.trim();
    if (!text || loading) return;
    setMessages(p => [...p, { role: 'user', text }]);
    setInput(''); setLoading(true);
    try {
      const { data } = await api.post('/hdm/api/ai/chat', { message: text });
      setMessages(p => [...p, { role: 'ai', text: data.reply || 'Sorry, try again.' }]);
    } catch {
      setMessages(p => [...p, { role: 'ai', text: 'Sorry, something went wrong.' }]);
    } finally { setLoading(false); }
  };

  if (!ai?.enabled) return null;
  const color = ai?.appearance?.color || ai?.widgetColor || '#1e6ef0';

  const quick = [
    { icon: Globe, q: 'What services do you offer?' },
    { icon: Smartphone, q: 'What apps have you built?' },
    { icon: Briefcase, q: 'Tell me about your projects' },
    { icon: Mail, q: 'How can I contact you?' },
    { icon: Phone, q: 'What is your phone number?' },
  ];

  return (
    <>
      <button onClick={() => setOpen(!open)} style={{ backgroundColor: color }} className="fixed bottom-4 right-4 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-lg flex items-center justify-center text-white">
        {open ? <X size={20} /> : <Sparkles size={20} />}
      </button>

      {open && (
        <div className="fixed bottom-16 sm:bottom-20 right-2 sm:right-4 z-40 w-[calc(100vw-16px)] sm:w-80 bg-white rounded-xl shadow-2xl border flex flex-col" style={{ maxHeight: 'calc(100vh - 100px)', height: '400px' }}>
          <div className="flex items-center justify-between px-3 py-2 text-white rounded-t-xl text-sm shrink-0" style={{ backgroundColor: color }}>
            <span className="flex items-center gap-1.5"><Sparkles size={16} />{ai?.name || 'HDM AI'}</span>
            <div className="flex gap-0.5">
              <button onClick={() => setMessages([{ role: 'ai', text: ai?.greeting || 'Hi!' }])} className="p-1 hover:bg-white/20 rounded"><Trash2 size={13} /></button>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/20 rounded"><X size={16} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 text-sm">
            {messages.length <= 2 && (
              <div className="grid grid-cols-5 gap-1.5 mb-2">
                {quick.map((o, i) => (
                  <button key={i} onClick={() => send(o.q)} disabled={loading} className="flex flex-col items-center gap-1 p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 border disabled:opacity-50">
                    <o.icon size={16} style={{ color }} />
                    <span className="text-[9px] leading-tight text-center text-gray-600">{['Services','Apps','Projects','Contact','Phone'][i]}</span>
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-1.5 rounded-lg text-xs sm:text-sm whitespace-pre-wrap break-words ${m.role === 'user' ? 'text-white rounded-br-none' : 'bg-gray-100 rounded-bl-none'}`} style={m.role === 'user' ? { backgroundColor: color } : {}}>{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-1 px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.15s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-2 border-t flex gap-1.5 shrink-0">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask anything..." className="flex-1 border rounded-lg px-2 py-1.5 text-xs sm:text-sm outline-none" disabled={loading} />
            <button onClick={() => send()} disabled={loading} style={{ backgroundColor: color }} className="p-2 text-white rounded-lg disabled:opacity-50"><Send size={14} /></button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiWidget;