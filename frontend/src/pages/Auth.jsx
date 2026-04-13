import React, { useState } from 'react';
import { PawPrint, Mail, Lock, User, Shield, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    // Pick only needed fields for login
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Store token (standard practice)
      if (data.token) {
        localStorage.setItem('pawzz_token', data.token);
        localStorage.setItem('pawzz_user', JSON.stringify(data));
      }

      // Navigate to dashboard
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 selection:bg-primary-container selection:text-white">
      
      {/* Decorative Organic Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#647C66]/10 rounded-[100%] blur-[100px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#F69C7E]/10 rounded-[100%] blur-[100px]"></div>
      </div>

      <div className="w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-[3rem] shadow-ambient overflow-hidden">
        
        {/* Left Side: Brand Imagery */}
        <div className="hidden md:flex flex-col justify-between bg-[#647C66] text-white p-12 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Soft tint over stock image */}
            <div className="absolute inset-0 bg-[#647C66]/80 mix-blend-multiply z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover"
              alt="Companion"
            />
          </div>
          
          <div className="relative z-20">
            <div className="flex items-center gap-2 mb-16">
              <span className="font-heading font-bold text-2xl tracking-tight text-white">Pawzz</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight mb-4">
              Enter The <br/><span className="text-[#F69C7E]">Sanctuary</span>
            </h1>
            <p className="text-white/80 font-medium text-lg max-w-sm">
              Your central hub for dedicated pet care, medical tracing, and emergency rescue coordination.
            </p>
          </div>

          <div className="relative z-20 flex items-center gap-3">
             <div className="flex -space-x-4">
               <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" className="w-10 h-10 rounded-full border-2 border-[#647C66] object-cover" alt="User" />
               <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" className="w-10 h-10 rounded-full border-2 border-[#647C66] object-cover" alt="User" />
             </div>
             <p className="text-xs font-bold text-white/80">Join 10k+ advocates</p>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-surface-container-lowest">
          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-on-surface mb-2 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-on-surface/60 font-medium">
              {isLogin 
                ? 'Sign in to access your dashboard and companions.' 
                : 'Join the sanctuary and start coordinating care.'}
            </p>
          </div>

          {error && (
            <div className="bg-[#4A2012]/10 text-[#4A2012] p-4 rounded-2xl mb-6 text-sm font-bold flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="text-[10px] font-black text-on-surface/50 uppercase tracking-widest mb-1 pl-4 block">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-on-surface/40" />
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-surface-container hover:bg-surface-container-highest focus:bg-surface-container-highest transition-colors rounded-[2rem] border-none outline-none font-semibold text-on-surface text-sm placeholder:text-on-surface/40 focus:ring-2 focus:ring-primary/20"
                    placeholder="Sarah Miller"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[10px] font-black text-on-surface/50 uppercase tracking-widest mb-1 pl-4 block">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-on-surface/40" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container hover:bg-surface-container-highest focus:bg-surface-container-highest transition-colors rounded-[2rem] border-none outline-none font-semibold text-on-surface text-sm placeholder:text-on-surface/40 focus:ring-2 focus:ring-primary/20"
                  placeholder="sarah@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-on-surface/50 uppercase tracking-widest mb-1 pl-4 block">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-on-surface/40" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container hover:bg-surface-container-highest focus:bg-surface-container-highest transition-colors rounded-[2rem] border-none outline-none font-semibold text-on-surface text-sm placeholder:text-on-surface/40 focus:ring-2 focus:ring-primary/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="text-[10px] font-black text-on-surface/50 uppercase tracking-widest mb-2 pl-4 block">I am a...</label>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    type="button"
                    onClick={() => handleRoleSelect('user')}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all border-2 ${formData.role === 'user' ? 'border-[#647C66] bg-[#647C66]/10 text-[#647C66]' : 'border-transparent bg-surface-container text-on-surface/50 hover:bg-surface-container-highest'}`}
                  >
                    User
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleRoleSelect('vet')}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all border-2 ${formData.role === 'vet' ? 'border-[#52879E] bg-[#52879E]/10 text-[#52879E]' : 'border-transparent bg-surface-container text-on-surface/50 hover:bg-surface-container-highest'}`}
                  >
                    Vet
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleRoleSelect('rescuer')}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all border-2 ${formData.role === 'rescuer' ? 'border-[#A05C33] bg-[#A05C33]/10 text-[#A05C33]' : 'border-transparent bg-surface-container text-on-surface/50 hover:bg-surface-container-highest'}`}
                  >
                    Rescuer
                  </button>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-6 bg-primary text-white py-4 rounded-[2rem] font-bold text-sm shadow-ambient hover:bg-primary-container transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }} 
              className="text-on-surface/60 font-semibold text-sm hover:text-primary transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>

          {/* Simple Back button */}
          <div className="mt-6 text-center">
             <button onClick={() => navigate('/')} className="text-[10px] font-black uppercase text-on-surface/40 hover:text-on-surface/80 tracking-widest transition-colors">
               ← Back to Home
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}
