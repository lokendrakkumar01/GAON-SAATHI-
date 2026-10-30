import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

type Stats = Record<string, number>;
const labels: Record<string, string> = { users: 'पंजीकृत उपयोगकर्ता', farmers: 'किसान', students: 'विद्यार्थी', sellers: 'दुकानदार', products: 'बाज़ार सूची', complaints: 'कुल शिकायतें', pendingComplaints: 'लंबित शिकायतें', resolvedComplaints: 'निस्तारित शिकायतें', jobs: 'कुल नौकरी सूची', activeJobs: 'सक्रिय नौकरी सूची' };

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    api.get('/admin/me').then(() => api.get('/admin/dashboard')).then(r => setStats(r.data.stats)).catch(e => {
      if (e.response?.status === 401) navigate('/admin/login', { replace: true });
      else setError(e.response?.data?.message || 'डेटा लोड नहीं हुआ');
    }).finally(() => setLoading(false));
  }, [navigate]);
  const logout = async () => { try { await api.post('/admin/logout'); } finally { navigate('/admin/login'); } };
  return <main className="min-h-screen bg-slate-100">
    <header className="flex items-center justify-between bg-emerald-950 px-5 py-4 text-white md:px-10"><div><p className="text-xs uppercase tracking-[.2em] text-emerald-200">GAON SAATHI</p><h1 className="text-xl font-bold">प्रशासन डैशबोर्ड</h1></div><button onClick={logout} className="rounded-lg border border-white/30 px-4 py-2 text-sm hover:bg-white/10">लॉग आउट</button></header>
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8"><h2 className="text-2xl font-bold text-slate-900">प्लेटफ़ॉर्म अवलोकन</h2><p className="mt-1 text-slate-600">आँकड़े मौजूदा MongoDB रिकॉर्ड से लिए गए हैं।</p>
      {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}
      {loading ? <p className="mt-8 text-slate-600">लोड हो रहा है…</p> : stats && <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Object.entries(labels).map(([key, label]) => <article key={key} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold text-emerald-900">{stats[key] ?? 0}</p></article>)}</div>}
      <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950"><strong>प्रारंभिक रिलीज़:</strong> यह पृष्ठ केवल overview उपलब्ध कराता है। उपयोगकर्ता सूची और अन्य प्रबंधन स्क्रीन API foundation के बाद अलग से जोड़ी जाएँगी।</section>
    </div>
  </main>;
}
