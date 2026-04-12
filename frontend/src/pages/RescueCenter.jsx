import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Camera, MapPin, Search, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';

export default function RescueCenter() {
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
              <span className="bg-surface-container text-xs font-bold px-2 py-1 rounded-full text-on-surface/60 ml-auto">12 NEARBY</span>
            </div>

            {/* Request Card 1 (Delhi specific styling based on seeder) */}
            <div className="bg-surface-container-lowest p-5 rounded-3xl border-l-[6px] border-secondary shadow-sm relative overflow-hidden group hover:shadow-ambient transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                 <span className="bg-secondary/10 text-secondary text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full">URGENT</span>
                 <span className="text-xs text-on-surface/50 font-bold">2 mins ago</span>
              </div>
              <h4 className="font-bold text-on-surface text-lg mb-1 leading-tight">Injured Golden Retriever</h4>
              <p className="text-xs text-on-surface/60 font-medium flex items-center gap-1 mb-3">
                <MapPin className="w-3 h-3" /> India Gate Area, New Delhi
              </p>
              <p className="text-sm text-on-surface/70 italic font-serif leading-relaxed mb-4">
                "Limping near the fountains, looks dehydrated and scared."
              </p>
              <div className="text-xs font-bold text-on-surface hover:text-primary transition-colors flex justify-end items-center gap-1">
                 View Details <span className="text-[10px]">›</span>
              </div>
            </div>

            {/* Request Card 2 */}
            <div className="bg-surface-container-lowest p-5 rounded-3xl border-l-[6px] border-orange-400 shadow-sm relative overflow-hidden group hover:shadow-ambient transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                 <span className="bg-orange-400/10 text-orange-600 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full">STRAY ALERT</span>
                 <span className="text-xs text-on-surface/50 font-bold">15 mins ago</span>
              </div>
              <h4 className="font-bold text-on-surface text-lg mb-1 leading-tight">Abandoned Calico Kittens</h4>
              <p className="text-xs text-on-surface/60 font-medium flex items-center gap-1 mb-3">
                <MapPin className="w-3 h-3" /> Qutub Minar Complex
              </p>
              <p className="text-sm text-on-surface/70 italic font-serif leading-relaxed mb-4">
                "Box of 4 kittens left outside the closed shop."
              </p>
              <div className="text-xs font-bold text-on-surface hover:text-primary transition-colors flex justify-end items-center gap-1">
                 View Details <span className="text-[10px]">›</span>
              </div>
            </div>

            {/* Request Card 3 */}
            <div className="bg-surface-container-lowest p-5 rounded-3xl border-l-[6px] border-blue-400 shadow-sm relative overflow-hidden group hover:shadow-ambient transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                 <span className="bg-blue-400/10 text-blue-600 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full">ROUTINE</span>
                 <span className="text-xs text-on-surface/50 font-bold">1 hour ago</span>
              </div>
              <h4 className="font-bold text-on-surface text-lg mb-1 leading-tight">Senior Indie Found</h4>
              <p className="text-xs text-on-surface/60 font-medium flex items-center gap-1 mb-3">
                <MapPin className="w-3 h-3" /> Connaught Place Inner Circle
              </p>
              <div className="text-xs font-bold text-on-surface hover:text-primary transition-colors flex justify-end items-center gap-1">
                 View Details <span className="text-[10px]">›</span>
              </div>
            </div>
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
                 {/* Item 1 */}
                 <div className="relative">
                    <div className="absolute -left-[35px] top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-4 border-surface-container-lowest">
                      <Clock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[10px] font-black text-on-surface/40 uppercase tracking-widest block mb-1">RESCUE IN PROGRESS</span>
                    <h5 className="font-bold text-sm text-on-surface mb-1">Siberian Husky - Main St.</h5>
                    <p className="text-xs text-on-surface/60 font-medium">Rescuer 'Marcus' has arrived on site.</p>
                 </div>

                 {/* Item 2 */}
                 <div className="relative">
                    <div className="absolute -left-[35px] top-0 w-6 h-6 bg-secondary rounded-full flex items-center justify-center border-4 border-surface-container-lowest">
                       <Clock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[10px] font-black text-on-surface/40 uppercase tracking-widest block mb-1">EN ROUTE TO VET</span>
                    <h5 className="font-bold text-sm text-on-surface mb-1">Injured Tabby Cat</h5>
                    <p className="text-xs text-on-surface/60 font-medium">Transporting to Sanctuary Hospital.</p>
                 </div>
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
                 <label className="text-[10px] font-bold text-on-surface/60 uppercase tracking-widest mb-2 block">Description</label>
                 <textarea 
                   className="w-full organic-input font-medium text-sm text-on-surface bg-surface-container-highest min-h-[100px] resize-none" 
                   placeholder="Details about behavior or injuries..."
                 ></textarea>
               </div>

               <button className="btn-primary w-full py-3 text-sm shadow-ambient hover:-translate-y-1 transition-all">
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
