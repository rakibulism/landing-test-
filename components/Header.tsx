import React from 'react';
import { Globe } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <nav className="w-full py-4 px-6 md:px-12 flex justify-between items-center bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="flex items-center space-x-2">
        <Globe className="text-blue-600" size={24} />
        <span className="font-bold text-xl tracking-tight text-slate-900">NextCountry</span>
      </div>
      <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
        <a href="#visas" className="hover:text-blue-600 transition">Visas</a>
        <a href="#services" className="hover:text-blue-600 transition">Services</a>
        <a href="#why-us" className="hover:text-blue-600 transition">Why Us</a>
      </div>
      <button onClick={() => window.location.href='#quiz'} className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition">
        Get Strategy
      </button>
    </nav>
  );
};
