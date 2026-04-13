import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Camera, MapPin, Search, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

export default function RescueCenter() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRescueForm, setShowRescueForm] = useState(false);
  const [rescueFormData, setRescueFormData] = useState({
    title: '',
    description: '',
    animalType: '',
    priority: 'routine',
    photo: '',
    location: { coordinates: [0, 0] }
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/rescue-requests/public')
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load rescues:", err);
        setLoading(false);
      });
  }, []);

  const handleRescueSubmit = async (e) => {
    e.preventDefault();
    
    if (!rescueFormData.title || !rescueFormData.description || !rescueFormData.animalType) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/rescue-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pawzz_token')}`
        },
        body: JSON.stringify({
          ...rescueFormData,
          location: {
            type: 'Point',
            coordinates: rescueFormData.location.coordinates
          }
        })
      });

      if (res.ok) {
        alert('Rescue request submitted successfully!');
        setRescueFormData({
          title: '',
          description: '',
          animalType: '',
          priority: 'routine',
          photo: '',
          location: { coordinates: [0, 0] }
        });
        setShowRescueForm(false);
        // Refresh requests
        fetch('http://localhost:5000/api/rescue-requests/public')
          .then(res => res.json())
          .then(data => setRequests(data));
      } else {
        const error = await res.json();
        alert(`Submission failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Rescue submission error:", err);
      alert('Submission failed. Please try again.');
    }
  };

  const activeRequests = requests.filter(r => r.status === 'pending');
  const ongoingRescues = requests.filter(r => r.status === 'accepted' || r.status === 'completed');

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-white flex flex-col pt-24">
      <Navbar />

      <main className="flex-grow pb-24 px-6 max-w-screen-2xl mx-auto w-full relative z-10">
        
        {/* Superior Header Layout */}
        <div className="mb-8 w-full block">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-2 tracking-tight">
                Rescue Command Center
              </h1>
              <p className="text-on-surface/60 font-medium text-lg">
                Real-time coordination for pets in need of sanctuary.
              </p>
            </div>
            
            <div className="flex gap-3 shrink-0 pt-2">
              <button className="bg-secondary text-white px-6 py-3 rounded-full font-bold hover:bg-secondary/90 transition-colors flex items-center gap-2 shadow-ambient">
                <AlertTriangle className="w-5 h-5 fill-white" /> Report New Rescue
              </button>
              <button className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary-container transition-colors flex items-center gap-2 shadow-ambient">
                <ShieldCheck className="w-5 h-5 fill-white" /> I can help
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full items-start">
          
          {/* Left Column: Active Requests */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-surface-container-highest p-2 rounded-xl">
                 <ShieldCheck className="w-5 h-5 text-on-surface" />
              </div>
              <h3 className="font-bold text-lg text-on-surface">Active Requests</h3>
              <span className="bg-surface-container text-xs font-bold px-2 py-1 rounded-full text-on-surface/60 ml-auto">{activeRequests.length} NEARBY</span>
            </div>

            {/* Dynamic Map of Active Requests */}
            {activeRequests.map((req, idx) => {
              
              // Dynamic coloring based on priority
              const priorityColors = {
                urgent: { border: 'border-secondary', bg: 'bg-secondary/10', text: 'text-secondary', label: 'URGENT' },
                stray_alert: { border: 'border-orange-400', bg: 'bg-orange-400/10', text: 'text-orange-600', label: 'STRAY ALERT' },
                routine: { border: 'border-blue-400', bg: 'bg-blue-400/10', text: 'text-blue-600', label: 'ROUTINE' }
              };
              
              const style = priorityColors[req.priority] || priorityColors.routine;

              return (
                <div key={req._id || idx} className={`bg-surface-container-lowest p-5 rounded-3xl border-l-[6px] ${style.border} shadow-sm relative overflow-hidden group hover:shadow-ambient transition-all cursor-pointer`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`${style.bg} ${style.text} text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full`}>{style.label}</span>
                    <span className="text-xs text-on-surface/50 font-bold">New</span>
                  </div>
                  <h4 className="font-bold text-on-surface text-lg mb-1 leading-tight">{req.title || req.animalType}</h4>
                  <p className="text-xs text-on-surface/60 font-medium flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3" /> User Reported Location
                  </p>
                  <p className="text-sm text-on-surface/70 italic font-serif leading-relaxed mb-4">
                    "{req.description}"
                  </p>
                  <div className="text-xs font-bold text-on-surface hover:text-primary transition-colors flex justify-end items-center gap-1">
                    View Details <span className="text-[10px]">›</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Middle Column: Interactive OpenStreetMap (Delhi Focus) */}
          <div className="lg:col-span-2 h-[750px] relative rounded-[2.5rem] overflow-hidden shadow-ambient bg-surface-container">
             {/* OpenStreetMap Iframe for New Delhi */}
             <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.10%2C28.50%2C77.30%2C28.70&amp;layer=mapnik" 
                style={{ filter: "saturation(1.2) contrast(1.1)" }}
             ></iframe>
             
             {/* Floating Search Bar */}
             <div className="absolute top-6 left-6 w-3/4 max-w-sm bg-surface-container-lowest rounded-2xl shadow-ambient overflow-hidden flex items-center focus-within:shadow-[0_0_0_1px_var(--color-primary)] transition-shadow">
               <div className="pl-4">
                 <Search className="w-5 h-5 text-on-surface/40" />
               </div>
               <input 
                 type="text" 
                 placeholder="Search area in Delhi..." 
                 className="w-full py-4 px-3 bg-transparent border-none outline-none font-sans font-semibold text-on-surface text-sm placeholder:text-on-surface/40"
               />
             </div>
             
             {/* Mock Map Markers (Normally populated by Leaflet or Mapbox overlay) */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-ambient flex items-center justify-center animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full"></div>
             </div>
          </div>

          {/* Right Column: Tracking & Quick Reports */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Ongoing Rescues */}
            <div className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-sm border border-surface-container-highest/20">
               <h3 className="font-bold text-xl text-on-surface mb-6">Ongoing Rescues</h3>
               
               <div className="relative border-l-2 border-surface-container-highest ml-3 pl-6 pb-6 space-y-6">
                 {ongoingRescues.length === 0 && <p className="text-sm text-on-surface/60 italic">No ongoing rescues at the moment.</p>}
                 {ongoingRescues.map((rescue, idx) => (
                   <div key={idx} className="relative">
                      <div className="absolute -left-[35px] top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-4 border-surface-container-lowest">
                        <Clock className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[10px] font-black text-on-surface/40 uppercase tracking-widest block mb-1">RESCUE IN PROGRESS</span>
                      <h5 className="font-bold text-sm text-on-surface mb-1">{rescue.title || rescue.animalType}</h5>
                      <p className="text-xs text-on-surface/60 font-medium">Rescuer has been dispatched to site.</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* Quick Report Panel */}
            <div className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-ambient border border-surface-container-highest/20">
               <h3 className="font-bold text-xl text-on-surface mb-6">Quick Report</h3>
               
               <div className="mb-5">
                 <label className="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest mb-2 block">Animal Type</label>
                 <select className="w-full organic-input font-semibold text-sm text-on-surface bg-surface-container-highest appearance-none cursor-pointer">
                   <option>Dog</option>
                   <option>Cat</option>
                   <option>Bird / Wildlife</option>
                   <option>Other</option>
                 </select>
               </div>

               <div className="mb-5">
                 <label className="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest mb-2 block">Photo Upload</label>
                 <div className="border-2 border-dashed border-surface-container-highest rounded-2xl p-6 text-center hover:bg-surface-container transition-colors cursor-pointer group">
                   <Camera className="w-6 h-6 mx-auto mb-2 text-on-surface/30 group-hover:text-primary transition-colors" />
                   <span className="text-[10px] font-bold text-on-surface/50 group-hover:text-primary transition-colors">Click to upload or drag photo</span>
                 </div>
               </div>

               <div className="mb-6">
                 <label className="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest mb-2 block">Title</label>
                 <input 
                   type="text"
                   value={rescueFormData.title}
                   onChange={(e) => setRescueFormData({...rescueFormData, title: e.target.value})}
                   className="w-full organic-input font-medium text-sm text-on-surface bg-surface-container-highest" 
                   placeholder="Brief title for the rescue"
                   required
                 />
               </div>

               <div className="mb-6">
                 <label className="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest mb-2 block">Animal Type</label>
                 <select 
                   value={rescueFormData.animalType}
                   onChange={(e) => setRescueFormData({...rescueFormData, animalType: e.target.value})}
                   className="w-full organic-input font-medium text-sm text-on-surface bg-surface-container-highest"
                   required
                 >
                   <option value="">Select animal type</option>
                   <option value="Dog">Dog</option>
                   <option value="Cat">Cat</option>
                   <option value="Bird">Bird</option>
                   <option value="Other">Other</option>
                 </select>
               </div>

               <div className="mb-6">
                 <label className="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest mb-2 block">Priority</label>
                 <select 
                   value={rescueFormData.priority}
                   onChange={(e) => setRescueFormData({...rescueFormData, priority: e.target.value})}
                   className="w-full organic-input font-medium text-sm text-on-surface bg-surface-container-highest"
                 >
                   <option value="routine">Routine</option>
                   <option value="stray_alert">Stray Alert</option>
                   <option value="urgent">Urgent</option>
                 </select>
               </div>

               <div className="mb-6">
                 <label className="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest mb-2 block">Photo URL (optional)</label>
                 <input 
                   type="url"
                   value={rescueFormData.photo}
                   onChange={(e) => setRescueFormData({...rescueFormData, photo: e.target.value})}
                   className="w-full organic-input font-medium text-sm text-on-surface bg-surface-container-highest" 
                   placeholder="URL to photo of the animal"
                 />
               </div>

               <div className="mb-6">
                 <label className="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest mb-2 block">Description</label>
                 <textarea 
                   value={rescueFormData.description}
                   onChange={(e) => setRescueFormData({...rescueFormData, description: e.target.value})}
                   className="w-full organic-input font-medium text-sm text-on-surface bg-surface-container-highest min-h-[100px] resize-none" 
                   placeholder="Details about behavior or injuries..."
                   required
                 ></textarea>
               </div>

               <button 
                 onClick={handleRescueSubmit}
                 className="btn-primary w-full py-3 text-sm shadow-ambient hover:-translate-y-1 transition-all"
               >
                 Submit Emergency Alert
               </button>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
