import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const destinations = [
  { terms: ['बाज़ार', 'बाजार', 'market', 'सामान'], path: '/marketplace', label: 'गाँव बाज़ार' },
  { terms: ['शिकायत', 'मदद', 'help', 'पानी', 'सड़क'], path: '/help-desk', label: 'हेल्प डेस्क' },
  { terms: ['पढ़ाई', 'शिक्षा', 'education', 'किताब'], path: '/education', label: 'शिक्षा साथी' },
  { terms: ['नौकरी', 'काम', 'job', 'सेवा'], path: '/jobs', label: 'नौकरी और सेवाएँ' },
  { terms: ['डैशबोर्ड', 'प्रोफाइल', 'dashboard'], path: '/dashboard', label: 'मेरा डैशबोर्ड' },
];

export default function VoiceAssistant() {
  const recognition = useRef<any>(null);
  const [listening, setListening] = useState(false);
  const [text, setText] = useState('');
  const [message, setMessage] = useState('बोलें या नीचे लिखकर बताएं कि आपको क्या चाहिए।');
  const [target, setTarget] = useState<(typeof destinations)[number] | null>(null);

  const respond = (value: string) => {
    setText(value); setTarget(null);
    const normalized = value.toLocaleLowerCase('hi-IN');
    const match = destinations.find(item => item.terms.some(term => normalized.includes(term)));
    if (match) {
      setTarget(match); setMessage(`${match.label} खोलने के लिए नीचे दिए लिंक को चुनें।`);
      if ('speechSynthesis' in window) { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${match.label} खोलने के लिए लिंक दबाएं`)); }
    } else setMessage('मैं इसे सीधे नहीं समझ पाया। बाज़ार, शिकायत, पढ़ाई, नौकरी या डैशबोर्ड कहकर देखें।');
  };

  const start = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) { setMessage('इस ब्राउज़र में आवाज़ पहचान उपलब्ध नहीं है। नीचे लिखने का विकल्प इस्तेमाल करें।'); return; }
    const instance = new SpeechRecognition();
    instance.lang = 'hi-IN'; instance.interimResults = false; instance.maxAlternatives = 1;
    instance.onstart = () => setListening(true);
    instance.onend = () => setListening(false);
    instance.onerror = () => { setListening(false); setMessage('माइक्रोफोन नहीं चल सका। अनुमति जाँचें या लिखने का विकल्प इस्तेमाल करें।'); };
    instance.onresult = (event: any) => respond(event.results[0][0].transcript);
    recognition.current = instance; instance.start();
  };

  return <main className="mx-auto max-w-3xl px-4 py-10">
    <h1 className="text-center text-3xl font-bold text-primary-800">आवाज़ सहायक</h1>
    <section className="card mt-7 text-center">
      <div className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full ${listening ? 'animate-pulse bg-red-100 text-red-700' : 'bg-primary-100 text-primary-700'}`} aria-hidden="true"><svg className="h-12 w-12" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a3 3 0 003-3V5a3 3 0 00-6 0v4a3 3 0 003 3zm5-3a1 1 0 10-2 0 3 3 0 01-6 0 1 1 0 10-2 0 5 5 0 004 4.9V17H7a1 1 0 100 2h6a1 1 0 100-2h-2v-3.1A5 5 0 0015 9z" /></svg></div>
      <p aria-live="polite" className="text-lg text-slate-700">{message}</p>
      <button onClick={start} disabled={listening} className="btn-primary mt-6">{listening ? 'सुन रहा हूँ…' : 'माइक्रोफोन शुरू करें'}</button>
      {target && <p className="mt-5"><Link className="font-semibold text-primary-700 underline" to={target.path}>{target.label} पर जाएँ »</Link></p>}
      <form className="mt-8 border-t border-slate-200 pt-6" onSubmit={e => { e.preventDefault(); if (text.trim()) respond(text.trim()); }}><label htmlFor="voice-text" className="mb-2 block text-left font-medium text-slate-700">या यहाँ लिखें</label><div className="flex gap-2"><input id="voice-text" value={text} onChange={e => setText(e.target.value)} placeholder="जैसे: मुझे नौकरी दिखाएँ" className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3"/><button className="btn-primary !px-4 !py-2">खोजें</button></div></form>
      <p className="mt-4 text-sm text-slate-500">हिंदी speech recognition आपके ब्राउज़र और माइक्रोफोन की अनुमति पर निर्भर है।</p>
    </section>
  </main>;
}
