import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Star, MapPin, Share2, Heart, CheckCircle2, Stethoscope, ShieldPlus } from 'lucide-react';

export default function ClinicProfile() {
  const { id } = useParams();
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the specific clinic data dynamically based on the URL ID parameter
  useEffect(() => {
    fetch(`http://localhost:5000/api/clinics/${id}`)
      .then(res => res.json())
      .then(data => {
        setClinic(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch clinic:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Clinic not found</h2>
      </div>
    );
  }

  // Map through dynamic services natively resolving to DB objects or fallback to string parser
  const servicesList = clinic.services && clinic.services.length > 0 
    ? clinic.services.map(s => {
        if (typeof s === 'string') {
          return {
            title: s.split(' (')[0].trim(),
            price: s.includes('(') ? s.split('(')[1].replace(')', '') : 'Price varies',
            description: 'High quality veterinary procedures utilizing modern sanitary technology.'
          };
        } else {
          return {
            title: s.name,
            price: `₹${s.price}`,
            description: s.description || 'High quality veterinary procedure.'
          };
        }
      })
    : [];

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-white flex flex-col pt-32">
      <Navbar />

      <main className="flex-grow pb-24 px-6 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Superior Header Layout - Safe Constraints */}
        <div className="mb-10 w-full block">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-tertiary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  VETERINARY CLINIC
                </span>
                <div className="flex items-center text-sm font-semibold text-on-surface">
                  <Star className="w-4 h-4 text-secondary fill-secondary mr-1" />
                  {clinic.rating || '4.8'} <span className="text-on-surface/50 ml-1 font-normal">(124 Reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface mb-3 tracking-tight">
                {clinic.name || "Veterinary Clinic"}
              </h1>
              <p className="text-on-surface/60 font-medium text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 shrink-0" />
                {clinic.address || "Location Unavailable"}
              </p>
            </div>
            
            <div className="flex gap-3 shrink-0 pt-2">
              <button className="bg-surface-container px-6 py-3 rounded-full font-semibold text-on-surface hover:bg-surface-container-highest transition-colors flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-container transition-colors flex items-center gap-2 shadow-ambient">
                <Heart className="w-4 h-4 fill-white" /> Save to My Sanctuary
              </button>
            </div>
          </div>
        </div>

        {/* Safe Aspect Ratio Grid for Images (Fixing Overflow/Overlap Bugs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20 relative">
          
          <div className="md:col-span-2 aspect-[4/3] md:aspect-[16/10] rounded-[2rem] overflow-hidden shadow-ambient relative z-0">
            <img 
              src={clinic.image || "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1200"} 
              alt="Lobby" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="hidden md:flex flex-col gap-6">
             <div className="aspect-square w-full rounded-[2rem] overflow-hidden shadow-ambient">
                {/* Fixed the 404 image causing layout breaks */}
                <img src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=600" alt="Room" className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 w-full rounded-[2rem] overflow-hidden flex gap-6">
                <div className="w-1/2 h-full rounded-[1.5rem] overflow-hidden shadow-ambient">
                   <img src="https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&q=80&w=400" alt="Exam" className="w-full h-full object-cover" />
                </div>
                <div className="w-1/2 h-full rounded-[1.5rem] overflow-hidden shadow-ambient">
                   <img src="https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=400" alt="Recovery" className="w-full h-full object-cover" />
                </div>
             </div>
          </div>
          
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative w-full items-start">
          
          {/* Main Info Column (2/3 width equivalent) */}
          <div className="lg:col-span-2 w-full space-y-16">
            
            {/* Soft Service Cards Grid */}
            <section className="w-full relative z-10">
              <h2 className="text-3xl font-bold text-on-surface mb-8">Specialized Care Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {servicesList.map((service, idx) => (
                  <div key={idx} className="bg-surface-container-low p-6 rounded-3xl hover:bg-surface-container transition-colors relative z-10">
                    <div className="w-10 h-10 bg-surface-container-highest rounded-xl flex items-center justify-center mb-6 text-primary">
                       <Stethoscope className="w-5 h-5 opacity-70" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-on-surface/60 mb-6 line-clamp-2">{service.description}</p>
                    <p className="font-bold text-lg text-primary">{service.price}</p>
                    
                    <button className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-surface-container-lowest rounded-full hover:bg-surface shadow-sm text-on-surface/40 hover:text-primary transition-colors">
                      +
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Voice of the Community */}
            <section className="w-full">
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-bold text-on-surface">Voice of the Community</h2>
                <button className="text-primary font-semibold flex items-center gap-1 hover:text-primary-container">
                  Write a Review ✎
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Review 1 */}
                <div className="bg-surface-container-lowest p-8 rounded-3xl border-none shadow-ambient">
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-primary px-1 pt-1">
                           <img src="https://i.pravatar.cc/150?img=47" className="w-full h-full object-cover rounded-full" alt="Reviewer" />
                        </div>
                        <div>
                          <h4 className="font-bold">Sarah Jenkins</h4>
                          <div className="flex text-secondary text-sm">★★★★★</div>
                        </div>
                     </div>
                     <span className="text-xs text-on-surface/50 font-semibold tracking-wide">2 days ago</span>
                  </div>
                  <p className="text-on-surface/70 leading-relaxed text-sm">
                    The level of care here is unparalleled. They treated my senior cat with such gentleness. The environment is so calming, it really makes a difference for anxious pets.
                  </p>
                </div>

                {/* Review 2 */}
                <div className="bg-surface-container-lowest p-8 rounded-3xl border-none shadow-ambient opacity-80">
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-primary px-1 pt-1">
                           <img src="https://i.pravatar.cc/150?img=11" className="w-full h-full object-cover rounded-full" alt="Reviewer" />
                        </div>
                        <div>
                          <h4 className="font-bold">Marcus Thorne</h4>
                          <div className="flex text-secondary text-sm">★★★★★</div>
                        </div>
                     </div>
                     <span className="text-xs text-on-surface/50 font-semibold tracking-wide">1 week ago</span>
                  </div>
                  <p className="text-on-surface/70 leading-relaxed text-sm">
                    Transparent pricing and very knowledgeable vets. I appreciated the organic treatment options for my pup's allergies.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Right Floating Sidebar - Booking Engine */}
          <div className="lg:col-span-1 w-full flex flex-col sticky top-24 z-20 shadow-ambient bg-surface-container-lowest rounded-[2.5rem] border border-surface-container-highest/20 overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-on-surface mb-8">Schedule Visit</h3>
              
              {/* Date Selection */}
              <div className="mb-8">
                <label className="text-xs font-bold text-on-surface/60 uppercase tracking-widest mb-4 block">Select Date</label>
                <div className="flex justify-between gap-3">
                  <div className="bg-surface-container py-3 px-2 rounded-2xl flex-1 text-center font-bold cursor-pointer text-on-surface/50 hover:bg-surface-container-highest transition-colors">MON<br/>14</div>
                  <div className="bg-primary text-white py-3 px-2 rounded-2xl flex-1 text-center font-bold cursor-pointer shadow-ambient transition-all transform hover:-translate-y-1">TUE<br/>15</div>
                  <div className="bg-surface-container py-3 px-2 rounded-2xl flex-1 text-center font-bold cursor-pointer text-on-surface/50 hover:bg-surface-container-highest transition-colors">WED<br/>16</div>
                  <div className="bg-surface-container py-3 px-2 rounded-2xl flex-1 text-center font-bold cursor-pointer text-on-surface/50 hover:bg-surface-container-highest transition-colors">THU<br/>17</div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-8">
                 <label className="text-xs font-bold text-on-surface/60 uppercase tracking-widest mb-4 block">Available Slots</label>
                 <div className="grid grid-cols-2 gap-3">
                   <div className="outline outline-2 outline-surface-container-highest rounded-full py-3 text-center text-sm font-semibold cursor-pointer text-on-surface/60 hover:bg-surface-variant transition-colors">09:00 AM</div>
                   <div className="outline outline-2 outline-surface-container-highest rounded-full py-3 text-center text-sm font-semibold cursor-pointer text-on-surface/60 hover:bg-surface-variant transition-colors">10:30 AM</div>
                   <div className="bg-primary/10 rounded-full py-3 text-center text-sm font-bold cursor-pointer text-primary transition-all">12:00 PM</div>
                   <div className="outline outline-2 outline-surface-container-highest rounded-full py-3 text-center text-sm font-semibold cursor-pointer text-on-surface/60 hover:bg-surface-variant transition-colors">02:15 PM</div>
                   <div className="outline outline-2 outline-surface-container-highest rounded-full py-3 text-center text-sm font-semibold cursor-pointer text-on-surface/60 hover:bg-surface-variant transition-colors">03:45 PM</div>
                   <div className="outline outline-2 outline-surface-container-highest rounded-full py-3 text-center text-sm font-semibold cursor-pointer text-on-surface/30 opacity-50">05:00 PM</div>
                 </div>
              </div>

              {/* Service Dropdown */}
              <div className="mb-10">
                 <label className="text-xs font-bold text-on-surface/60 uppercase tracking-widest mb-4 block">Service Type</label>
                 <div className="relative">
                   <select className="w-full organic-input font-semibold text-on-surface bg-surface-container-highest appearance-none cursor-pointer">
                     <option>Initial Consultation</option>
                     {servicesList.map((service, idx) => (
                        <option key={idx} value={service.title}>{service.title}</option>
                     ))}
                   </select>
                   <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-on-surface/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                   </div>
                 </div>
              </div>

              {/* Action */}
              <button className="btn-primary w-full py-4 text-lg shadow-ambient mb-4 hover:-translate-y-1 transition-all">
                Confirm Appointment
              </button>
              <p className="text-center text-xs font-medium text-on-surface/50 mb-4">No payment required until the time of visit.</p>

              {/* Trust Badge */}
              <div className="flex gap-4 items-start border-t border-surface-container-highest/50 pt-6 mt-2">
                <ShieldPlus className="w-5 h-5 text-secondary shrink-0" />
                <div>
                  <h5 className="font-bold text-sm text-on-surface">Sanctuary Guarantee</h5>
                  <p className="text-xs text-on-surface/60 mt-1 leading-relaxed">Cancel for free up to 24 hours before your booking. Your pet's well-being is our priority.</p>
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
