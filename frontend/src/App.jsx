import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/30 blur-[120px]"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[100px]"></div>
      </div>

      <div className="z-10 text-center animate-fade-in-up">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
            <PawPrint className="w-16 h-16 text-purple-400" />
          </div>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-transparent bg-clip-text">
          Pawzz.
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 font-light px-4">
          The ultimate platform connecting pet owners, vet clinics, and rescuers in a single unified network.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Link to="/clinics" className="px-8 py-4 bg-purple-600 hover:bg-purple-500 transition-all font-semibold rounded-full shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transform hover:-translate-y-1">
            Find Vet Clinics
          </Link>
          <Link to="/rescue" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all font-semibold rounded-full transform hover:-translate-y-1">
            Emergency Rescue
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
