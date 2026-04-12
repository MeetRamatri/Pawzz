import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 glass-surface border-b border-surface-container-highest/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-bold font-heading text-xl tracking-tight text-on-surface">Pawzz</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <Link to="/clinics" className="text-on-surface/60 hover:text-primary font-medium transition-colors text-sm">Find Vets</Link>
            <Link to="/rescue" className="text-on-surface/60 hover:text-primary font-medium transition-colors text-sm">Rescue</Link>
            <Link to="/dashboard" className="text-on-surface/60 hover:text-primary font-medium transition-colors text-sm">My Dashboard</Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="bg-surface-container hover:bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
            >
              Login/Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
