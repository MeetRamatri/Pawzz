import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Search, MapPin, Star, ArrowRight } from 'lucide-react';

export default function FindVets() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch clinics from backend
    fetch('http://localhost:5000/api/clinics')
      .then((res) => res.json())
      .then((data) => {
        setClinics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching clinics:', err);
        setLoading(false);
      });
  }, []);

  const filteredClinics = clinics.filter(clinic => {
    const clinicNameMatch = clinic.name.toLowerCase().includes(searchQuery.toLowerCase());
    const serviceMatch = clinic.services.some(s => {
      const serviceStr = typeof s === 'string' ? s : s.name;
      return serviceStr?.toLowerCase().includes(searchQuery.toLowerCase());
    });
    return clinicNameMatch || serviceMatch;
  });

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-12 relative z-10">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 label-md">
            Verified Partners
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-[1.1]">
            Find <span className="text-gradient">Elite Care</span> Near You
          </h1>
          <p className="text-lg text-on-surface/70 font-sans max-w-2xl">
            Book appointments with top-rated veterinary clinics in our sanctuary network. Filter by specialization to find the perfect match for your pet.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-surface-container-low p-4 rounded-3xl mb-12 shadow-ambient flex flex-col md:flex-row gap-4 relative z-10">
          <div className="flex bg-surface-variant w-full rounded-2xl overflow-hidden focus-within:shadow-[0_0_0_1px_var(--color-primary)] transition-all">
            <div className="flex items-center pl-4">
              <Search className="w-5 h-5 text-on-surface/40" />
            </div>
            <input 
              type="text" 
              placeholder="Search by clinic name or service..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-4 px-3 bg-transparent border-none outline-none font-sans text-on-surface placeholder:text-on-surface/40"
            />
          </div>
          <div className="flex bg-surface-variant w-full md:w-64 rounded-2xl overflow-hidden focus-within:shadow-[0_0_0_1px_var(--color-primary)] transition-all">
             <div className="flex items-center pl-4">
              <MapPin className="w-5 h-5 text-on-surface/40" />
            </div>
            <input 
              type="text" 
              placeholder="Zip or City (Coming Soon)" 
              disabled
              className="w-full py-4 px-3 bg-transparent border-none outline-none font-sans text-on-surface placeholder:text-on-surface/40 opacity-50 cursor-not-allowed"
            />
          </div>
          <button className="btn-primary shrink-0 whitespace-nowrap">
            Search Clinics
          </button>
        </div>

        {/* Clinic Grid */}
        {loading ? (
          <div className="flex justify-center py-20 relative z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {filteredClinics.length > 0 ? (
              filteredClinics.map((clinic) => (
                <div key={clinic._id} className="organic-card overflow-hidden group hover:-translate-y-2">
                  <div className="h-56 overflow-hidden rounded-t-[1.5rem] bg-surface-container relative">
                    <img 
                      src={clinic.image || "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?auto=format&fit=crop&q=80&w=800"} 
                      alt={clinic.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 right-4 bg-surface-container px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-ambient">
                      <Star className="w-4 h-4 text-secondary fill-secondary" /> {clinic.rating || 'New'}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-on-surface mb-2">{clinic.name}</h3>
                    <p className="text-on-surface/60 text-sm mb-6 flex items-start gap-1">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                      {clinic.address}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {clinic.services?.slice(0, 3).map((service, idx) => (
                        <span key={idx} className="bg-surface-container-highest px-3 py-1 rounded-full text-xs font-semibold text-on-surface/80">
                          {typeof service === 'string' ? service : service.name}
                        </span>
                      ))}
                      {clinic.services?.length > 3 && (
                        <span className="text-xs text-on-surface/50 self-center">+{clinic.services.length - 3} more</span>
                      )}
                    </div>
                  <Link to={`/clinics/${clinic._id}`} className="block text-center w-full py-3 bg-surface-container-low hover:bg-primary border-none hover:text-white transition-colors rounded-xl font-semibold text-on-surface">
                    View Details
                  </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-surface-container-low rounded-3xl">
                <p className="text-lg text-on-surface/60 font-medium">No clinics found matching your search.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Background Decorative Blob */}
        <div className="fixed top-1/3 left-0 w-[40vw] h-[40vw] bg-primary-container rounded-full mix-blend-multiply filter blur-[120px] opacity-10 -translate-x-1/2 pointer-events-none z-0"></div>
      </main>

      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  );
}
