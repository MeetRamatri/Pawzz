import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { 
  LayoutGrid, PawPrint, Calendar, Bookmark, Settings, 
  MapPin, Clock, AlertTriangle, Syringe, Heart, FileText, 
  AlertCircle, Info, Bell 
} from 'lucide-react';

export default function UserDashboard() {
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
                <Calendar className="w-5 h-5" /> Booking History
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
              <h1 className="text-4xl font-extrabold text-on-surface mb-2 tracking-tight">Welcome back, Sarah</h1>
              <p className="text-on-surface/60 font-medium text-lg">Your companions are in good hands today. Here's what's happening.</p>
            </div>

            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Upcoming Appointment - Wide Card */}
              <div className="md:col-span-2 bg-[#647C66] text-white p-8 rounded-[2rem] shadow-ambient relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                <div>
                  <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">Upcoming Appointment</span>
                  <h2 className="text-3xl font-bold mb-6">Oliver's Annual Wellness Exam</h2>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 opacity-90">
                  <div className="flex items-center gap-2 font-medium text-sm">
                    <MapPin className="w-4 h-4" /> Green Valley Veterinary Clinic
                  </div>
                  <div className="flex items-center gap-2 font-medium text-sm">
                    <Clock className="w-4 h-4" /> Tomorrow, 10:30 AM
                  </div>
                </div>
                <div className="mt-8">
                  <button className="bg-white text-[#647C66] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-surface transition-colors shadow-sm">
                    View Details
                  </button>
                </div>
              </div>

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
                  <p className="text-sm opacity-80 font-medium">Report #8829 • Oak Ridge Sector</p>
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
                  
                  {/* Timeline Item 1 */}
                  <div className="relative">
                    <div className="absolute -left-[35px] top-0 w-8 h-8 bg-[#52879E] rounded-full flex items-center justify-center border-4 border-surface shadow-sm">
                      <Syringe className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-ambient transition-shadow border-none ml-2">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg text-on-surface">Vaccination Administered</h4>
                        <span className="text-xs font-semibold text-on-surface/50">2h ago</span>
                      </div>
                      <p className="text-on-surface/70 text-sm leading-relaxed mb-4">
                        Luna received her Rabies and DHPP boosters. No immediate side effects observed.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-surface-container-highest rounded-full overflow-hidden flex items-center justify-center">
                          <img src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" alt="Luna" />
                        </div>
                        <span className="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest">Patient: Luna</span>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Item 2 */}
                  <div className="relative">
                    <div className="absolute -left-[35px] top-0 w-8 h-8 bg-[#A05C33] rounded-full flex items-center justify-center border-4 border-surface shadow-sm">
                      <Heart className="w-3 h-3 text-white fill-white" />
                    </div>
                    <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-ambient transition-shadow border-none ml-2">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg text-on-surface">Adoption Anniversary</h4>
                        <span className="text-xs font-semibold text-on-surface/50">Yesterday</span>
                      </div>
                      <p className="text-on-surface/70 text-sm leading-relaxed">
                        It's been 2 years since Cooper joined the family! Check out our memory gallery.
                      </p>
                    </div>
                  </div>

                  {/* Timeline Item 3 */}
                  <div className="relative">
                    <div className="absolute -left-[35px] top-0 w-8 h-8 bg-surface-container-highest rounded-full flex items-center justify-center border-4 border-surface shadow-sm">
                      <FileText className="w-3 h-3 text-on-surface/70" />
                    </div>
                    <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm hover:shadow-ambient transition-shadow border-none ml-2">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg text-on-surface">Medical Records Updated</h4>
                        <span className="text-xs font-semibold text-on-surface/50">Oct 12</span>
                      </div>
                      <p className="text-on-surface/70 text-sm leading-relaxed">
                        Bloodwork results from Oliver's last visit have been uploaded by Dr. Aris.
                      </p>
                    </div>
                  </div>

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
                    
                    {/* Companion 1 */}
                    <div className="bg-surface-container-lowest p-3 rounded-[2rem] shadow-sm hover:shadow-ambient transition-shadow text-center">
                      <div className="aspect-square w-full rounded-2xl overflow-hidden mb-3 bg-surface-container">
                        <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300" alt="Oliver" className="w-full h-full object-cover" />
                      </div>
                      <h5 className="font-bold text-on-surface">Oliver</h5>
                      <p className="text-[9px] font-bold text-on-surface/50 uppercase tracking-widest mt-1">Labrador</p>
                    </div>

                    {/* Companion 2 */}
                    <div className="bg-surface-container-lowest p-3 rounded-[2rem] shadow-sm hover:shadow-ambient transition-shadow text-center">
                      <div className="aspect-square w-full rounded-2xl overflow-hidden mb-3 bg-surface-container">
                        <img src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=300" alt="Luna" className="w-full h-full object-cover" />
                      </div>
                      <h5 className="font-bold text-on-surface">Luna</h5>
                      <p className="text-[9px] font-bold text-on-surface/50 uppercase tracking-widest mt-1">Shorthair</p>
                    </div>

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
