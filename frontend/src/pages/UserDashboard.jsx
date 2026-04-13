import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { 
  LayoutGrid, PawPrint, Calendar as CalendarIcon, Bookmark, Settings, 
  MapPin, Clock, AlertTriangle, Syringe, Heart, FileText, 
  AlertCircle, Info, Bell, Plus, Edit, Star, AlertOctagon
} from 'lucide-react';

export default function UserDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddPet, setShowAddPet] = useState(false);
  const [showRescueRequest, setShowRescueRequest] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [showBookAppointment, setShowBookAppointment] = useState(false);

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

    // Fetch clinics for booking appointments
    fetch('http://localhost:5000/api/clinics')
      .then(res => res.json())
      .then(data => {
        // Ensure data is an array
        const clinicsArray = Array.isArray(data) ? data : [];
        setClinics(clinicsArray);
      })
      .catch(err => console.error("Clinics fetch error:", err));
  }, []);

  const handleAddPet = async (petData) => {
    const authData = localStorage.getItem('pawzz_user');
    let user = null;

    if (authData) {
      try {
        user = JSON.parse(authData);
      } catch (e) {
        console.error("Auth parsing error", e);
      }
    }

    if (!user) return;

    try {
      const res = await fetch('http://localhost:5000/api/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pawzz_token')}`
        },
        body: JSON.stringify({
          ...petData,
          owner: user._id
        })
      });

      if (res.ok) {
        // Refresh dashboard data
        window.location.reload();
        setShowAddPet(false);
      }
    } catch (err) {
      console.error("Add pet error:", err);
    }
  };

  const handleBookAppointment = async (appointmentData) => {
    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pawzz_token')}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (res.ok) {
        // Refresh dashboard data
        window.location.reload();
        setShowBookAppointment(false);
      }
    } catch (err) {
      console.error("Book appointment error:", err);
    }
  };

  const handleRescueRequest = async (requestData) => {
    const authData = localStorage.getItem('pawzz_user');
    let user = null;

    if (authData) {
      try {
        user = JSON.parse(authData);
      } catch (e) {
        console.error("Auth parsing error", e);
      }
    }

    if (!user) return;

    try {
      const res = await fetch('http://localhost:5000/api/rescue-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pawzz_token')}`
        },
        body: JSON.stringify({
          ...requestData,
          user: user._id
        })
      });

      if (res.ok) {
        alert('Rescue request submitted successfully!');
        setShowRescueRequest(false);
      }
    } catch (err) {
      console.error("Rescue request error:", err);
    }
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { user, pets, appointments, careTimeline } = data;
  const nextAppt = Array.isArray(appointments) && appointments.length > 0 ? appointments[0] : null;

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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-extrabold text-on-surface mb-2 tracking-tight">Welcome back, {user.name.split(' ')[0]}</h1>
                <p className="text-on-surface/60 font-medium text-lg">Your companions are in good hands today. Here's what's happening.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddPet(true)}
                  className="bg-primary text-white px-4 py-2 rounded-full font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Pet
                </button>
                <button
                  onClick={() => setShowBookAppointment(true)}
                  className="bg-secondary text-white px-4 py-2 rounded-full font-bold hover:bg-secondary/90 transition-colors flex items-center gap-2"
                >
                  <CalendarIcon className="w-4 h-4" /> Book Appointment
                </button>
                <button
                  onClick={() => setShowRescueRequest(true)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full font-bold hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <AlertOctagon className="w-4 h-4" /> Rescue Request
                </button>
              </div>
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
                  
                  {(!Array.isArray(careTimeline) || careTimeline.length === 0) && <p className="text-sm text-on-surface/60 italic">No care records logged yet.</p>}

                  {Array.isArray(careTimeline) && careTimeline.map((record, idx) => {
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
                    {(!Array.isArray(pets) || pets.length === 0) && <p className="text-sm col-span-2 text-on-surface/60 italic">No companions registered.</p>}
                    
                    {Array.isArray(pets) && pets.map((pet, idx) => (
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

      {/* Modals */}
      {showAddPet && (
        <AddPetModal
          onClose={() => setShowAddPet(false)}
          onSubmit={handleAddPet}
        />
      )}

      {showBookAppointment && (
        <BookAppointmentModal
          onClose={() => setShowBookAppointment(false)}
          onSubmit={handleBookAppointment}
          clinics={clinics}
          pets={pets}
        />
      )}

      {showRescueRequest && (
        <RescueRequestModal
          onClose={() => setShowRescueRequest(false)}
          onSubmit={handleRescueRequest}
        />
      )}
    </div>
  );
}

function AddPetModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface max-w-md w-full rounded-[2rem] p-8">
        <h2 className="text-2xl font-bold text-on-surface mb-6">Add New Pet</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Pet Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Species</label>
            <input
              type="text"
              value={formData.species}
              onChange={(e) => setFormData({ ...formData, species: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Breed</label>
            <input
              type="text"
              value={formData.breed}
              onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-surface-container text-on-surface font-semibold hover:bg-surface-container-lowest transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-white py-3 rounded-full font-bold hover:bg-primary/90 transition-colors"
            >
              Add Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function BookAppointmentModal({ onClose, onSubmit, clinics, pets }) {
  const [formData, setFormData] = useState({
    pet: '',
    clinic: '',
    serviceName: '',
    date: '',
    timeSlot: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface max-w-md w-full rounded-[2rem] p-8">
        <h2 className="text-2xl font-bold text-on-surface mb-6">Book Appointment</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Select Pet</label>
            <select
              value={formData.pet}
              onChange={(e) => setFormData({ ...formData, pet: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
              required
            >
              <option value="">Choose a pet</option>
              {pets.map((pet) => (
                <option key={pet._id} value={pet._id}>{pet.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Select Clinic</label>
            <select
              value={formData.clinic}
              onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
              required
            >
              <option value="">Choose a clinic</option>
              {Array.isArray(clinics) && clinics.map((clinic) => (
                <option key={clinic._id} value={clinic._id}>{clinic.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Service</label>
            <input
              type="text"
              value={formData.serviceName}
              onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
              placeholder="e.g., Check-up, Vaccination"
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Time Slot</label>
            <select
              value={formData.timeSlot}
              onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
              required
            >
              <option value="">Choose time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-surface-container text-on-surface font-semibold hover:bg-surface-container-lowest transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-secondary text-white py-3 rounded-full font-bold hover:bg-secondary/90 transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function RescueRequestModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    animalType: '',
    priority: 'routine',
    location: { coordinates: [0, 0] },
    photo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface max-w-md w-full rounded-[2rem] p-8">
        <h2 className="text-2xl font-bold text-on-surface mb-6">Raise Rescue Request</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Brief title for the rescue"
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the situation and animal condition"
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none h-24 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Animal Type</label>
            <select
              value={formData.animalType}
              onChange={(e) => setFormData({ ...formData, animalType: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
              required
            >
              <option value="">Select animal type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
            >
              <option value="routine">Routine</option>
              <option value="stray_alert">Stray Alert</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Photo URL (optional)</label>
            <input
              type="url"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              placeholder="URL to photo of the animal"
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-full border border-surface-container text-on-surface font-semibold hover:bg-surface-container-lowest transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-red-500 text-white py-3 rounded-full font-bold hover:bg-red-600 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
