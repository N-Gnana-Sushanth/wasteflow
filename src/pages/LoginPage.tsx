import React, { useState } from 'react';
import {
  Trash2,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Building2,
  Cpu,
  Truck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ZONES } from '../data/mockData';

interface LoginPageProps {
  onSuccessRedirect?: (role: UserRole) => void;
  onExploreLanding?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccessRedirect, onExploreLanding }) => {
  const { login, register, switchDemoRole } = useAuth();

  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('citizen@wasteflow.gov');
  const [password, setPassword] = useState('Citizen@123');
  
  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regZone, setRegZone] = useState(ZONES[0]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const demoAccounts: { role: UserRole; title: string; email: string; pass: string; icon: any; color: string }[] = [
    {
      role: 'citizen',
      title: 'Citizen Portal',
      email: 'citizen@wasteflow.gov',
      pass: 'Citizen@123',
      icon: UserCheck,
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300 hover:bg-emerald-900/40'
    },
    {
      role: 'admin',
      title: 'Municipal Admin',
      email: 'admin@wasteflow.gov',
      pass: 'Admin@123',
      icon: Cpu,
      color: 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-900/40'
    },
    {
      role: 'driver',
      title: 'Collection Driver',
      email: 'driver@wasteflow.gov',
      pass: 'Driver@123',
      icon: Truck,
      color: 'border-amber-500/40 bg-amber-950/20 text-amber-300 hover:bg-amber-900/40'
    },
    {
      role: 'facility',
      title: 'Recycling Facility',
      email: 'facility@wasteflow.gov',
      pass: 'Facility@123',
      icon: Building2,
      color: 'border-purple-500/40 bg-purple-950/20 text-purple-300 hover:bg-purple-900/40'
    }
  ];

  const handleQuickFill = (acc: typeof demoAccounts[0]) => {
    setActiveTab('signin');
    setEmail(acc.email);
    setPassword(acc.pass);
    setErrorMsg(null);
  };

  const handleQuickLogin = async (acc: typeof demoAccounts[0]) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const ok = await switchDemoRole(acc.role);
      if (ok) {
        if (onSuccessRedirect) onSuccessRedirect(acc.role);
      } else {
        setErrorMsg('Authentication error. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      const user = await login(email, password);
      if (user) {
        if (onSuccessRedirect) onSuccessRedirect(user.role);
      } else {
        setErrorMsg('Invalid email or password. You can also use the 1-Click Demo accounts below.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      setErrorMsg('Please fill in all required registration fields.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      const user = await register({
        name: regName,
        email: regEmail,
        password: regPassword,
        role: 'citizen',
        phone: regPhone || undefined,
        address: regAddress || undefined,
        zone: regZone
      });

      if (user) {
        setSuccessMsg('Account created successfully! Redirecting...');
        setTimeout(() => {
          if (onSuccessRedirect) onSuccessRedirect('citizen');
        }, 600);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Email may already be registered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Ambient background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-4 sm:px-8 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950">
            <Trash2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white">
              Waste<span className="text-emerald-400">Flow</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-mono">
              Municipal Smart Platform
            </span>
          </div>
        </div>

        {onExploreLanding && (
          <button
            onClick={onExploreLanding}
            className="text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-750 px-3.5 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            Explore Public Portal
          </button>
        )}
      </header>

      {/* Main Authentication Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 z-10">
        <div className="w-full max-w-xl">
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl p-6 sm:p-8 backdrop-blur-sm">
            
            {/* Header / Subtitle */}
            <div className="text-center space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/50 text-[11px] font-mono font-semibold text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>SECURE MUNICIPAL ACCESS</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Sign in to WasteFlow
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Unified operations & citizen portal for smart waste logistics
              </p>
            </div>

            {/* Error / Success Notifications */}
            {errorMsg && (
              <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-500/40 bg-red-950/30 p-3 text-xs text-red-200 animate-fade-in">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-3 text-xs text-emerald-200 animate-fade-in">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Tab Switcher */}
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => { setActiveTab('signin'); setErrorMsg(null); }}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'signin'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-750'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setErrorMsg(null); }}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'register'
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-750'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Citizen Account
              </button>
            </div>

            {/* Tab 1: Sign In Form */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. citizen@wasteflow.gov"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Password
                    </label>
                    <span className="text-[11px] text-slate-500">Demo password: Citizen@123</span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 text-xs shadow-lg shadow-emerald-950 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In with Backend JWT</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Tab 2: Citizen Registration */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Radhika Sen"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="radhika@example.com"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/70 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/70 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+91 98490 12345"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950/70 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Municipal Zone
                    </label>
                    <select
                      value={regZone}
                      onChange={(e) => setRegZone(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    >
                      {ZONES.map((z) => (
                        <option key={z} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Residential Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      value={regAddress}
                      onChange={(e) => setRegAddress(e.target.value)}
                      placeholder="e.g. Flat 301, Cyber Heights, Madhapur"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/70 pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800 text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-semibold">Note:</span> Municipal Admin, Driver, and Facility Operator accounts are provisioned by the city administrator. Citizens receive 100 bonus Eco-Points upon registration.
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 text-xs shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      <span>Register Citizen Profile</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* 1-Click Quick Demo Switcher Section */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  1-Click Role Login (Hackathon Demo)
                </span>
                <span className="text-[10px] text-slate-500">Live Seeded JWTs</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {demoAccounts.map((acc) => {
                  const Icon = acc.icon;
                  return (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => handleQuickLogin(acc)}
                      disabled={loading}
                      className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${acc.color} group disabled:opacity-50`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="text-[10px] font-mono opacity-80 uppercase">{acc.role}</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-tight truncate">{acc.title}</p>
                        <p className="text-[10px] opacity-75 font-mono truncate">{acc.email.split('@')[0]}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Footer information */}
          <div className="text-center mt-6 text-[11px] text-slate-500 font-mono">
            <span>WasteFlow Municipal Operating System • REST API v1.0 • Node/Express Backend</span>
          </div>

        </div>
      </main>

      {/* Bottom Legal Bar */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-3 px-4 text-center text-xs text-slate-600 font-mono z-10">
        WasteFlow © 2026 • Real-Time Municipal Segregation, AI Vision & Circular Logistics Platform
      </footer>

    </div>
  );
};
