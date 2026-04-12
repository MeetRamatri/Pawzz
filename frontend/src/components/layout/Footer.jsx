import { PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface-container-low pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-surface-container-highest/20 pt-10">
          <div>
            <h4 className="font-bold text-on-surface text-lg">Pawzz</h4>
            <p className="text-sm text-on-surface/50 mt-1">© 2026 Pawzz Inc. All rights reserved.</p>
          </div>
          <div className="flex border-t-0 p-0 m-0">
             <ul className="flex flex-wrap items-center gap-6 text-sm text-on-surface/60 font-medium">
               <li><a href="#" className="hover:text-primary transition-colors">Emergency: 1-800-PET-HELP</a></li>
               <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
               <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
               <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
             </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
