import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  LayoutGrid, PawPrint, Calendar as CalendarIcon, Bookmark, Settings,
  MapPin, Clock, AlertTriangle, Syringe, Heart, FileText,
  AlertCircle, Info, Bell, Plus, Edit, DollarSign, Star
} from 'lucide-react';

export default function VetDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddClinic, setShowAddClinic] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const authData = localStorage.getItem('pawzz_user');
    let user = null;

    if (authData) {
      try {
        user = JSON.parse(authData);
      } catch (e) {
        console.error("Auth parsing error", e);
      }
    }

    if (user && user.role === 'vet') {
      // Fetch vet's clinics
      fetch(`http://localhost:5000/api/clinics/my-clinics`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('pawzz_token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          // Ensure data is an array
          const clinicsArray = Array.isArray(data) ? data : [];
          setClinics(clinicsArray);
        })
        .catch(err => {
          console.error("Clinics fetch error:", err);
          setClinics([]);
        });

      // Fetch vet's incoming appointments
      fetch(`http://localhost:5000/api/appointments/vet`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('pawzz_token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          const apptsArray = Array.isArray(data) ? data : [];
          setAppointments(apptsArray);
          setLoading(false);
        })
        .catch(err => {
          console.error("Appointments fetch error:", err);
          setAppointments([]);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleAddClinic = async (clinicData) => {
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
      const res = await fetch('http://localhost:5000/api/clinics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pawzz_token')}`
        },
        body: JSON.stringify({
          ...clinicData,
          owner: user._id,
          location: {
            type: 'Point',
            coordinates: clinicData.location.coordinates
          }
        })
      });

      if (res.ok) {
        const newClinic = await res.json();
        setClinics([...clinics, newClinic]);
        setShowAddClinic(false);
      }
    } catch (err) {
      console.error("Add clinic error:", err);
    }
  };

  const handleUpdateServicePrice = async (clinicId, serviceIndex, newPrice) => {
    try {
      const clinic = clinics.find(c => c._id === clinicId);
      const updatedServices = [...clinic.services];
      updatedServices[serviceIndex].price = newPrice;

      const res = await fetch(`http://localhost:5000/api/clinics/${clinicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pawzz_token')}`
        },
        body: JSON.stringify({
          ...clinic,
          services: updatedServices
        })
      });

      if (res.ok) {
        const updatedClinic = await res.json();
        setClinics(clinics.map(c => c._id === clinicId ? updatedClinic : c));
      }
    } catch (err) {
      console.error("Update service error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                <PawPrint className="w-5 h-5" /> My Clinics
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-lowest rounded-2xl text-on-surface/70 font-semibold hover:text-on-surface transition-colors">
                <CalendarIcon className="w-5 h-5" /> Appointments
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
                <h1 className="text-4xl font-extrabold text-on-surface mb-2 tracking-tight">Vet Dashboard</h1>
                <p className="text-on-surface/60 font-medium text-lg">Manage your clinics and provide excellent care.</p>
              </div>
              <button
                onClick={() => setShowAddClinic(true)}
                className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> Add Clinic
              </button>
            </div>

            {/* Clinics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinics.map((clinic) => (
                <div key={clinic._id} className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-ambient">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-on-surface mb-1">{clinic.name}</h3>
                      <p className="text-on-surface/60 text-sm">{clinic.address}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{clinic.rating || 0}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <h4 className="font-semibold text-on-surface">Services</h4>
                    {clinic.services && Array.isArray(clinic.services) ? clinic.services.map((service, index) => (
                      <div key={index} className="flex justify-between items-center bg-surface-container p-3 rounded-xl">
                        <div>
                          <p className="font-medium text-on-surface">{service.name}</p>
                          <p className="text-xs text-on-surface/60">{service.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">${service.price}</span>
                          <button
                            onClick={() => {
                              const newPrice = prompt('Enter new price:', service.price);
                              if (newPrice && !isNaN(newPrice)) {
                                handleUpdateServicePrice(clinic._id, index, parseFloat(newPrice));
                              }
                            }}
                            className="text-primary hover:text-primary/80"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )) : (
                      <p className="text-sm text-on-surface/60">No services available</p>
                    )}
                  </div>

                  <button className="w-full bg-primary text-white py-2 rounded-full font-bold hover:bg-primary/90 transition-colors">
                    Manage Clinic
                  </button>
                </div>
              ))}

              {clinics.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <PawPrint className="w-16 h-16 text-on-surface/20 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-on-surface/60 mb-2">No Clinics Yet</h3>
                  <p className="text-on-surface/40">Add your first clinic to get started</p>
                </div>
              )}
            </div>

            {/* Appointments Grid */}
            <div className="mt-12 border-t border-surface-container-highest/20 pt-10">
              <h2 className="text-2xl font-bold text-on-surface mb-6">Incoming Appointments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map(appt => (
                   <div key={appt._id} className="bg-surface-container-lowest p-6 rounded-3xl shadow-ambient border-l-[6px] border-secondary">
                     <div className="flex justify-between items-start mb-2">
                       <p className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-full">
                         {new Date(appt.date).toLocaleDateString()} @ {appt.timeSlot}
                       </p>
                       <span className="text-[10px] font-bold text-on-surface/60 bg-surface px-2 py-1 rounded-full">{appt.status}</span>
                     </div>
                     <h4 className="text-lg font-bold text-on-surface mb-1">{appt.pet?.name || 'Unknown Pet'} ({appt.pet?.species})</h4>
                     <p className="text-sm text-on-surface/60 mb-3">Owner: {appt.user?.name}</p>
                     
                     <div className="bg-surface-container p-3 rounded-xl mt-auto">
                       <p className="text-xs font-bold text-on-surface/50 mb-1">SERVICE REQUESTED</p>
                       <p className="text-sm font-semibold text-secondary">{appt.serviceName}</p>
                     </div>
                   </div>
                 ))}
                 {appointments.length === 0 && (
                   <div className="col-span-full text-center py-8 text-on-surface/40 border-2 border-dashed border-surface-container-highest rounded-3xl">
                     <p>No incoming appointments yet.</p>
                   </div>
                 )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />

      {/* Add Clinic Modal */}
      {showAddClinic && (
        <AddClinicModal
          onClose={() => setShowAddClinic(false)}
          onSubmit={handleAddClinic}
        />
      )}
    </div>
  );
}

function AddClinicModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    services: [{ name: '', price: '', description: '' }],
    location: { coordinates: [0, 0] }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { name: '', price: '', description: '' }]
    });
  };

  const updateService = (index, field, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index][field] = value;
    setFormData({ ...formData, services: updatedServices });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-[2rem] p-8">
        <h2 className="text-2xl font-bold text-on-surface mb-6">Add New Clinic</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Clinic Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-3 rounded-xl border border-surface-container focus:border-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Services</label>
            {formData.services.map((service, index) => (
              <div key={index} className="bg-surface-container-lowest p-4 rounded-xl mb-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Service name"
                    value={service.name}
                    onChange={(e) => updateService(index, 'name', e.target.value)}
                    className="p-2 rounded-lg border border-surface-container focus:border-primary outline-none"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={service.price}
                    onChange={(e) => updateService(index, 'price', e.target.value)}
                    className="p-2 rounded-lg border border-surface-container focus:border-primary outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={service.description}
                    onChange={(e) => updateService(index, 'description', e.target.value)}
                    className="p-2 rounded-lg border border-surface-container focus:border-primary outline-none"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addService}
              className="text-primary font-semibold hover:text-primary/80"
            >
              + Add Service
            </button>
          </div>

          <div className="flex gap-4">
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
              Add Clinic
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}