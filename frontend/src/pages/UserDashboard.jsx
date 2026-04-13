import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { 
  LayoutGrid, PawPrint, Calendar as CalendarIcon, Bookmark, Settings, 
  MapPin, Clock, AlertTriangle, Syringe, Heart, FileText, 
  AlertCircle, Info, Bell 
} from 'lucide-react';

export default function UserDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Resolve dynamic user from auth context, fallback to prototype user if not logged in
    const authData = localStorage.getItem('pawzz_user');
    let targetEmail = 'sarah@example.com';
    
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed.email) targetEmail = parsed.email;
      } catch (e) {
        console.error("Auth parsing error", e);
      }
    }

    fetch(`http://localhost:5000/api/dashboard/${targetEmail}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { user, pets, appointments, careTimeline } = data;
  const nextAppt = appointments && appointments.length > 0 ? appointments[0] : null;

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-white flex flex-col pt-32">
      <Navbar />

      <main className="flex-grow pb-24 px-6 max-w-[1400px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-2 hidden lg:block sticky top-32">
            <h6 className="text-[10px] font-black text-on-surface/40 uppercase tracking-widest mb-6 px-4">Navigation</h6>
            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-2xl text-primary font-bold transition-colors">
                <LayoutGrid className="w-5 h-5" /> Overview
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-lowest rounded-2xl text-on-surface/70 font-semibold hover:text-on-surface transition-colors">
                <PawPrint className="w-5 h-5" /> My Pets
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-lowest rounded-2xl text-on-surface/70 font-semibold hover:text-on-surface transition-colors">
                <CalendarIcon className="w-5 h-5" /> Booking History
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-lowest rounded-2xl text-on-surface/70 font-semibold hover:text-on-surface transition-colors">
                <Bookmark className="w-5 h-5" /> Saved Clinics
              </a>
              <div className="pt-4 mt-4 border-t border-surface-container/50">
                <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-lowest rounded-2xl text-on-surface/70 font-semibold hover:text-on-surface transition-colors">
                  <Settings className="w-5 h-5" /> Profile Settings
                </a>
              </div>
            </nav>
          </aside>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-10 w-full space-y-10">
            
            {/* Header */}
            <div>
              <h1 className="text-4xl font-extrabold text-on-surface mb-2 tracking-tight">Welcome back, {user.name.split(' ')[0]}</h1>
              <p className="text-on-surface/60 font-medium text-lg">Your companions are in good hands today. Here's what's happening.</p>
            </div>

            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Upcoming Appointment - Wide Card */}
              {nextAppt ? (
                <div className="md:col-span-2 bg-[#647C66] text-white p-8 rounded-[2rem] shadow-ambient relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                  <div>
                    <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Upcoming Appointment</span>
                    <h2 className="text-3xl font-bold mb-6">Oliver's {nextAppt.serviceName}</h2>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 opacity-90">
                    <div className="flex items-center gap-2 font-medium text-sm">
                      <MapPin className="w-4 h-4" /> {nextAppt.clinic?.name || 'Veterinary Clinic'}
                    </div>
                    <div className="flex items-center gap-2 font-medium text-sm">
                      <Clock className="w-4 h-4" /> {new Date(nextAppt.date).toLocaleDateString()}, {nextAppt.timeSlot}
                    </div>
                  </div>
                  <div className="mt-8">
                    <button className="bg-white text-[#647C66] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-surface transition-colors shadow-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ) : (
                <div className="md:col-span-2 bg-surface-container-low text-on-surface/60 p-8 rounded-[2rem] shadow-ambient flex flex-col items-center justify-center min-h-[220px]">
                  <p className="font-bold">No upcoming appointments.</p>
                </div>
              )}

              {/* Active Report Card */}
              <div className="md:col-span-1 bg-[#F69C7E] text-[#4A2012] p-8 rounded-[2rem] shadow-ambient flex flex-col justify-between min-h-[220px]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-8 h-8 bg-[#4A2012]/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-[#4A2012]" />
                  </div>
                  <span className="bg-[#4A2012] text-white px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Active Report</span>
                </div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-1">Stray Golden Retriever</h3>
                  <p className="text-sm opacity-80 font-medium">Report #8829</p>
                </div>
                <div>
                  <div className="w-full bg-[#4A2012]/20 h-1.5 rounded-full mb-2 overflow-hidden">
                    <div className="bg-[#4A2012] w-[65%] h-full rounded-full"></div>
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-80">Status: Rescue Team Dispatched</p>
                </div>
              </div>
            </div>

            {/* Bottom Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              
              {/* Care Timeline */}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-on-surface mb-6">Care Timeline</h3>
                
                <div className="relative pl-6 border-l-2 border-surface-container-highest space-y-10">
                  
                  {careTimeline.length === 0 && <p className="text-sm text-on-surface/60 italic">No care records logged yet.</p>}

                  {careTimeline.map((record, idx) => {
                    let Icon = FileText;
                    let bgCol = "bg-surface-container-highest";
                    let iconCol = "text-on-surface/70";
                    let borderCol = "border-surface";

                    if (record.eventType === 'vaccination') {
                      Icon = Syringe; bgCol = "bg-[#52879E]"; iconCol = "text-white"; 
                    } else if (record.eventType === 'anniversary') {
                      Icon = Heart; bgCol = "bg-[#A05C33]"; iconCol = "text-white fill-white";
                    }

                    return (
                      <div key={record._id || idx} className="relative">
                        <div className={`absolute -left-[35px] top-0 w-8 h-8 ${bgCol} rounded-full flex items-center justify-center border-4 ${borderCol} shadow-sm`}>
                          <Icon className={`w-3 h-3 ${iconCol}`} />
                        </div>
                        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-ambient transition-shadow border-none ml-2">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-on-surface">{record.title}</h4>
                            <span className="text-xs font-semibold text-on-surface/50">
                              {new Date(record.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-on-surface/70 text-sm leading-relaxed mb-4">
                            {record.description}
                          </p>
                          {record.pet && (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-surface-container-highest rounded-full overflow-hidden flex items-center justify-center">
                                <img src={record.pet.image} className="w-full h-full object-cover" alt={record.pet.name} />
                              </div>
                              <span className="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest">Patient: {record.pet.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reminders & Companions Sidebar */}
              <div className="md:col-span-1 space-y-10">
                
                {/* Reminders Area */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-on-surface">Reminders</h3>
                    <span className="bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-full">2 New</span>
                  </div>
                  
                  <div className="bg-surface-container-lowest p-5 rounded-[2rem] shadow-ambient mb-4 flex gap-4">
                    <div className="pt-1"><AlertCircle className="w-5 h-5 text-secondary" /></div>
                    <div>
                      <h5 className="font-bold text-sm text-on-surface mb-1">Medication Due</h5>
                      <p className="text-xs text-on-surface/60 font-medium leading-relaxed">Oliver: Heartworm preventative due today.</p>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest p-5 rounded-[2rem] shadow-ambient flex gap-4">
                    <div className="pt-1"><Info className="w-5 h-5 text-primary" /></div>
                    <div>
                      <h5 className="font-bold text-sm text-on-surface mb-1">Review Appointment</h5>
                      <p className="text-xs text-on-surface/60 font-medium leading-relaxed">Please confirm your visit for tomorrow.</p>
                    </div>
                  </div>
                </div>

                {/* My Companions */}
                <div>
                  <h3 className="text-xl font-bold text-on-surface mb-6">My Companions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {pets.length === 0 && <p className="text-sm col-span-2 text-on-surface/60 italic">No companions registered.</p>}
                    
                    {pets.map((pet, idx) => (
                      <div key={pet._id || idx} className="bg-surface-container-lowest p-3 rounded-[2rem] shadow-sm hover:shadow-ambient transition-shadow text-center">
                        <div className="aspect-square w-full rounded-2xl overflow-hidden mb-3 bg-surface-container">
                          <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                        </div>
                        <h5 className="font-bold text-on-surface">{pet.name}</h5>
                        <p className="text-[9px] font-bold text-on-surface/50 uppercase tracking-widest mt-1">{pet.breed || pet.species}</p>
                      </div>
                    ))}

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
