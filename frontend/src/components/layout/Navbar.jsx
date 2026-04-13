import { Link, useNavigate } from 'react-router-dom';
import { PawPrint, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('pawzz_token');
  
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('pawzz_user'));
  } catch(e) {}

  const handleLogout = () => {
    localStorage.removeItem('pawzz_token');
    localStorage.removeItem('pawzz_user');
    window.location.href = '/login'; // Force full unmount cycle to clear states
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-surface border-b border-surface-container-highest/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-bold font-heading text-xl tracking-tight text-on-surface">Pawzz</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {(!user || user.role === 'user') && (
              <Link to="/clinics" className="text-on-surface/60 hover:text-primary font-medium transition-colors text-sm">Find Vets</Link>
            )}
            {(!user || user.role === 'user' || user.role === 'rescuer') && (
              <Link to="/rescue" className="text-on-surface/60 hover:text-primary font-medium transition-colors text-sm">Rescue</Link>
            )}
            {user && (
              <Link to="/dashboard" className="text-on-surface/60 hover:text-primary font-medium transition-colors text-sm">My Dashboard</Link>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center border-2 border-surface">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  {user?.name?.split(' ')[0] || 'User'}
                </span>
                <button 
                  onClick={handleLogout}
                  className="bg-surface-container hover:bg-secondary/10 text-secondary px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-1"
                >
                   Logout
                   <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-surface-container hover:bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
              >
                Login/Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
