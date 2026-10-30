import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError('');
    try {
      await api.post('/admin/login', { email, password });
      navigate('/admin/dashboard');
    } catch (e: any) {
      setError(e.response?.data?.message || 'लॉगिन नहीं हो सका। कृपया जानकारी जाँचें।');
    } finally { setLoading(false); }
  }

  return <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#f4f2e9]">
    <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-emerald-100">
      <div className="mb-8 text-center"><div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-800 text-2xl text-white">ग</div>
        <p className="text-sm font-semibold uppercase tracking-[.18em] text-emerald-700">GAON SAATHI</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Admin Portal</h1><p className="mt-2 text-slate-500">सुरक्षित प्रशासक लॉगिन</p></div>
      {error && <div role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      <form className="space-y-5" onSubmit={submit}>
        <label className="block text-sm font-medium text-slate-700">ईमेल<input autoComplete="username" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" /></label>
        <label className="block text-sm font-medium text-slate-700">पासवर्ड<div className="mt-2 flex rounded-lg border border-slate-300 focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-100"><input autoComplete="current-password" type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} className="min-w-0 flex-1 rounded-lg px-4 py-3 outline-none" /><button type="button" onClick={() => setShowPassword(v => !v)} className="px-3 text-sm text-emerald-800">{showPassword ? 'छिपाएँ' : 'दिखाएँ'}</button></div></label>
        <button disabled={loading} className="w-full rounded-lg bg-emerald-800 px-4 py-3 font-semibold text-white hover:bg-emerald-900 disabled:opacity-60">{loading ? 'लॉगिन हो रहा है…' : 'सुरक्षित लॉगिन'}</button>
      </form>
      <div className="mt-5 text-center text-sm text-slate-500">पासवर्ड भूल गए? अपने platform owner से संपर्क करें।</div>
      <Link to="/" className="mt-6 block text-center text-sm font-medium text-emerald-800">← मुख्य वेबसाइट</Link>
    </section>
  </main>;
}
