import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {
  LayoutGrid, PawPrint, Calendar as CalendarIcon, Bookmark, Settings,
  MapPin, Clock, AlertTriangle, Syringe, Heart, FileText,
  AlertCircle, Info, Bell, Check, X, Navigation, Power, Star
} from 'lucide-react';

export default function RescuerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rescueRequests, setRescueRequests] = useState([]);
  const [rescuerProfile, setRescuerProfile] = useState(null);

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

    if (user && user.role === 'rescuer') {
      // Fetch rescuer profile
      fetch(`http://localhost:5000/api/rescuers/user/${user._id}`)
        .then(res => res.json())
        .then(data => {
          setRescuerProfile(data);
        })
        .catch(err => console.error("Rescuer profile fetch error:", err));

      // Fetch rescue requests (Using public endpoint to gather all pending/accepted pool)
      fetch('http://localhost:5000/api/rescue-requests/public')
        .then(res => res.json())
        .then(data => {
          // Ensure data is an array
          const requestsArray = Array.isArray(data) ? data : [];
          setRescueRequests(requestsArray);
          setLoading(false);
        })
        .catch(err => {
          console.error("Rescue requests fetch error:", err);
          setRescueRequests([]);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleAvailabilityToggle = async () => {
    if (!rescuerProfile) return;

    try {
      const res = await fetch('http://localhost:5000/api/rescuers/me/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pawzz_token')}`
        },
        body: JSON.stringify({
          availability: !rescuerProfile.availability
        })
      });

      if (res.ok) {
        const updated = await res.json();
        setRescuerProfile(updated);
      }
    } catch (err) {
      console.error("Update availability error:", err);
    }
  };

  const handleLocationUpdate = async () => {
    if (!rescuerProfile) return;

    // In a real app, you'd get location from GPS or user input
    const newLocation = prompt('Enter new location coordinates (longitude,latitude):', '0,0');
    if (!newLocation) return;

    const [lng, lat] = newLocation.split(',').map(coord => parseFloat(coord.trim()));
    if (isNaN(lng) || isNaN(lat)) {
      alert('Invalid coordinates format');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/rescuers/me/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pawzz_token')}`
        },
        body: JSON.stringify({
          location: {
            type: 'Point',
            coordinates: [lng, lat]
          }
        })
      });

      if (res.ok) {
        const updated = await res.json();
        setRescuerProfile(updated);
      }
    } catch (err) {
      console.error("Update location error:", err);
    }
  };

  const handleRequestAction = async (requestId, action) => {
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

    const endpoint = action === 'accepted' ? 'accept' : 'decline';

    try {
      const res = await fetch(`http://localhost:5000/api/rescue-requests/${requestId}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('pawzz_token')}`
        },
        body: JSON.stringify(action === 'accepted' ? { assignedRescuer: user._id } : {})
      });

      if (res.ok) {
        const updated = await res.json();
        setRescueRequests(rescueRequests.map(req =>
          req._id === requestId ? updated : req
        ));
      }
    } catch (err) {
      console.error("Request action error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const pendingRequests = rescueRequests.filter(req => req.status === 'pending');
  const myRequests = rescueRequests.filter(req => req.assignedRescuer === rescuerProfile?.user);

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
                <AlertTriangle className="w-5 h-5" /> Rescue Requests
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-lowest rounded-2xl text-on-surface/70 font-semibold hover:text-on-surface transition-colors">
                <PawPrint className="w-5 h-5" /> My Missions
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
                <h1 className="text-4xl font-extrabold text-on-surface mb-2 tracking-tight">Rescuer Dashboard</h1>
                <p className="text-on-surface/60 font-medium text-lg">Help save lives and make a difference.</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleAvailabilityToggle}
                  className={`px-6 py-3 rounded-full font-bold transition-colors flex items-center gap-2 ${
                    rescuerProfile?.availability
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-500 text-white hover:bg-gray-600'
                  }`}
                >
                  <Power className="w-5 h-5" />
                  {rescuerProfile?.availability ? 'Available' : 'Unavailable'}
                </button>
                <button
                  onClick={handleLocationUpdate}
                  className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Navigation className="w-5 h-5" /> Update Location
                </button>
              </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-ambient">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Pending
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-1">{pendingRequests.length}</h3>
                <p className="text-on-surface/60 text-sm">Rescue requests waiting</p>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-ambient">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Active
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-1">{myRequests.length}</h3>
                <p className="text-on-surface/60 text-sm">Missions in progress</p>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-ambient">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-500" />
                  </div>
                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Rating
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-1">{rescuerProfile?.rating || 0}</h3>
                <p className="text-on-surface/60 text-sm">Average rating</p>
              </div>
            </div>

            {/* Rescue Requests */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-on-surface">Pending Rescue Requests</h2>

              {pendingRequests.length === 0 ? (
                <div className="text-center py-12">
                  <AlertTriangle className="w-16 h-16 text-on-surface/20 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-on-surface/60 mb-2">No Pending Requests</h3>
                  <p className="text-on-surface/40">All caught up! Check back later for new rescue missions.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingRequests.map((request) => (
                    <div key={request._id} className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-ambient">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-on-surface mb-1">{request.title || 'Rescue Request'}</h3>
                          <p className="text-on-surface/60 text-sm">{request.animalType || 'Unknown animal'}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                          request.priority === 'urgent' ? 'bg-red-500 text-white' :
                          request.priority === 'stray_alert' ? 'bg-orange-500 text-white' :
                          'bg-yellow-500 text-white'
                        }`}>
                          {request.priority}
                        </span>
                      </div>

                      <p className="text-on-surface/70 mb-4">{request.description}</p>

                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4 text-on-surface/60" />
                        <span className="text-sm text-on-surface/60">Location coordinates available</span>
                      </div>

                      {request.photo && (
                        <img
                          src={request.photo}
                          alt="Rescue situation"
                          className="w-full h-32 object-cover rounded-xl mb-4"
                        />
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleRequestAction(request._id, 'accepted')}
                          className="flex-1 bg-green-500 text-white py-2 rounded-full font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" /> Accept
                        </button>
                        <button
                          onClick={() => handleRequestAction(request._id, 'completed')}
                          className="flex-1 bg-red-500 text-white py-2 rounded-full font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <X className="w-4 h-4" /> Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Active Missions */}
            {myRequests.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-on-surface">My Active Missions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myRequests.map((request) => (
                    <div key={request._id} className="bg-green-50 border border-green-200 p-6 rounded-[2rem]">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-green-800 mb-1">{request.title || 'Rescue Mission'}</h3>
                          <p className="text-green-600 text-sm">{request.animalType || 'Unknown animal'}</p>
                        </div>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                          Active
                        </span>
                      </div>

                      <p className="text-green-700 mb-4">{request.description}</p>

                      <button
                        onClick={() => handleRequestAction(request._id, 'completed')}
                        className="w-full bg-green-500 text-white py-2 rounded-full font-bold hover:bg-green-600 transition-colors"
                      >
                        Mark as Completed
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}