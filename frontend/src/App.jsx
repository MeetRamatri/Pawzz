import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FindVets from './pages/FindVets';
import ClinicProfile from './pages/ClinicProfile';
import RescueCenter from './pages/RescueCenter';
import UserDashboard from './pages/UserDashboard';
import Auth from './pages/Auth';
import { Search, AlertCircle, ArrowRight, UserCircle, BriefcaseMedical, ShieldCheck, MapPin, Star } from 'lucide-react';

function Home() {
  const [featuredClinics, setFeaturedClinics] = useState([]);

  useEffect(() => {
    // Fetch only a few clinics for the homepage
    fetch('http://localhost:5000/api/clinics')
      .then(res => res.json())
      .then(data => {
        setFeaturedClinics(data.slice(0, 3)); // Only feature 3 on the homepage
      })
      .catch(err => console.error("Failed to fetch featured clinics:", err));
  }, []);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-white">
      <Navbar />

      {/* 
        HERO SECTION 
        Soft gradient background blending, asymmetrical padding, no borders. 
      */}
      <section className="relative px-6 pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden mx-auto max-w-7xl">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-surface-container rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute top-40 left-0 w-[30vw] h-[30vw] bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-x-1/2"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 label-md">
              Local Care Network
            </div>
            {/* Display Typography */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface mb-6 leading-[1.1]">
              Your Pet's Best Friend in <span className="text-gradient">Every Neighborhood.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface/70 font-sans mb-10 max-w-lg leading-relaxed">
              A compassionate digital sanctuary connecting pet owners with elite veterinary care and local rescue heroes. Because every paw deserves a plan.
            </p>
            
            {/* Search Bar - No Borders, Soft Shadows */}
            <div className="flex bg-surface-variant p-2 rounded-2xl max-w-lg shadow-ambient">
              <div className="flex bg-surface-container-lowest w-full rounded-xl overflow-hidden focus-within:shadow-[0_0_0_1px_var(--color-primary)] transition-all">
                <div className="flex items-center pl-4">
                  <Search className="w-5 h-5 text-on-surface/40" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search vets, clinics, or rescuers..." 
                  className="w-full py-4 px-3 bg-transparent border-none outline-none font-sans text-on-surface placeholder:text-on-surface/40"
                />
              </div>
              <Link to="/clinics" className="btn-primary ml-2 shrink-0 flex items-center">
                Find Care
              </Link>
            </div>
          </div>
          
          {/* Asymmetrical Image Layout */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-tl-[80px] rounded-br-[80px] rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-ambient">
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200" 
                alt="Happy Golden Retriever and tabby cat" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 
        URGENCY BANNER 
      */}
      <section className="max-w-6xl mx-auto px-6 mb-32 -mt-10 relative z-20">
        <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-ambient flex flex-col md:flex-row items-center justify-between gap-8 border-none ring-1 ring-surface-container-highest/15">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 shrink-0 bg-secondary-container rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-on-surface to-on-surface/80">Spotted an animal in need?</h2>
              <p className="text-on-surface/60 font-sans mt-1">Our rapid response network is active 24/7. Report lost, injured, or stray animals to alert nearby volunteer rescuers directly.</p>
            </div>
          </div>
          <Link to="/rescue" className="btn-secondary shrink-0 whitespace-nowrap">
            Report a Rescue Now
          </Link>
        </div>
      </section>

      {/* 
        ELITE VETERINARY CARE 
      */}
      <section className="bg-surface-container py-32 border-none">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-on-surface mb-4">Elite Veterinary Care</h2>
              <p className="text-on-surface/70 text-lg">Discover top-rated clinics with specialized expertise and compassionate staff near you.</p>
            </div>
            <Link to="/clinics" className="flex items-center gap-2 text-primary font-semibold hover:text-primary-container transition-colors pb-1 border-b-2 border-transparent hover:border-primary-container">
              View all clinics <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredClinics.map((clinic, index) => (
              <div key={clinic._id || index} className="organic-card overflow-hidden group hover:-translate-y-2 border-none">
                <div className="h-64 overflow-hidden rounded-t-[1.5rem] bg-surface-container-highest relative">
                  <img 
                    src={clinic.image || "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=800"} 
                    alt={clinic.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 bg-surface-container-low px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-ambient">
                    <Star className="w-4 h-4 text-secondary fill-secondary" /> {clinic.rating || 'New'}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-on-surface mb-2">{clinic.name}</h3>
                  <p className="text-on-surface/60 text-sm mb-4 flex items-start gap-1">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                      {clinic.address}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {clinic.services?.slice(0, 2).map((service, idx) => (
                      <span key={idx} className="bg-surface-container-highest px-3 py-1 rounded-full text-xs font-semibold text-on-surface/80">
                        {service}
                      </span>
                    ))}
                    {clinic.services?.length > 2 && (
                      <span className="text-xs text-on-surface/50 self-center">+{clinic.services.length - 2} more</span>
                    )}
                  </div>
                  <Link to={`/clinics/${clinic._id}`} className="block text-center w-full py-3 bg-surface-container-low hover:bg-primary border-none hover:text-white transition-colors rounded-xl font-semibold text-on-surface">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Fallback layout incase DB is completely empty */}
            {featuredClinics.length === 0 && (
               <div className="col-span-3 text-center py-10 text-on-surface/50">
                  <p>No clinics available at the moment. Run the seeder script!</p>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* 
        ACTIVE VOLUNTEER NETWORKS 
      */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Active Volunteer Networks</h2>
            <p className="text-lg text-on-surface/70 mb-12">
              Join or support local rescue groups making a difference every day. From fostering to logistics, there's a place for everyone in the sanctuary.
            </p>

            <div className="space-y-4">
              {[
                { name: "Delhi Rescue Collective", stats: "24 active missions this week" },
                { name: "The Feline Guardians", stats: "12 fosters currently available" },
                { name: "Rapid Transport Wings", stats: "Emergency animal transport" }
              ].map((group, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-surface-container-low rounded-2xl hover:bg-surface-container transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <HeartIcon />
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface">{group.name}</h4>
                      <p className="text-sm text-on-surface/60">{group.stats}</p>
                    </div>
                  </div>
                  <button className="text-primary font-semibold">Join</button>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[600px] w-full hidden md:block">
            {/* Scrapbook Style Photos */}
            <img src="https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=600" className="absolute top-0 right-0 w-[60%] rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl shadow-ambient z-10" alt="Rescued dog" />
            <img src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400" className="absolute bottom-20 right-10 w-[45%] rounded-3xl shadow-ambient z-20 border-4 border-surface" alt="Cat in basket" />
            <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=500" className="absolute top-1/2 left-0 -translate-y-1/2 w-[55%] rounded-[2rem] shadow-ambient z-30 border-4 border-surface" alt="Feeding puppy" />
          </div>
        </div>
      </section>

      {/* 
        A NETWORK BUILT FOR CARE 
      */}
      <section className="bg-surface-container py-32 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">A Network Built for Care</h2>
          <p className="text-lg text-on-surface/60 mb-20">Three roles, one mission: the well-being of every pet.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-surface-container-lowest rounded-3xl flex items-center justify-center mb-6 shadow-ambient">
                <UserCircle className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Pet Owners</h3>
              <p className="text-on-surface/70 leading-relaxed">Manage your pet's health records, find verified care, and contribute to local rescue efforts effortlessly.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-surface-container-lowest rounded-3xl flex items-center justify-center mb-6 shadow-ambient">
                <BriefcaseMedical className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Veterinarians</h3>
              <p className="text-on-surface/70 leading-relaxed">Expand your practice visibility, streamline bookings, and collaborate with rescue networks for urgent cases.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-surface-container-lowest rounded-3xl flex items-center justify-center mb-6 shadow-ambient">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">For Rescuers</h3>
              <p className="text-on-surface/70 leading-relaxed">Receive instant local alerts, manage intake efficiency, and connect with potential adopters and medical partners.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Simple internal icon for demo
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
)

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clinics" element={<FindVets />} />
        <Route path="/clinics/:id" element={<ClinicProfile />} />
        <Route path="/rescue" element={<RescueCenter />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </Router>
  );
}
