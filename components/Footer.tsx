import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 text-center">
      <p className="text-slate-500 text-sm">© {new Date().getFullYear()} NextCountry. All rights reserved.</p>
      <p className="text-slate-400 text-xs mt-2">Global Relocation Strategies for the Modern Founder.</p>
    </footer>
  );
};
