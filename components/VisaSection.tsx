import React from 'react';
import { VISAS } from '../constants';

export const VisaSection: React.FC = () => {
  return (
    <section id="visas" className="py-20 px-6 md:px-12 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">✈ Startup & Business Visas We Work With</h2>
          <p className="text-lg text-slate-600 max-w-3xl">
            We specialise in the <span className="font-semibold text-slate-900 italic">most powerful relocation pathways</span> for serious founders and companies:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {VISAS.map((visa) => (
            <div key={visa.title} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border border-slate-100">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{visa.flag}</span>
                <h3 className="text-xl font-bold text-slate-900">{visa.title}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">{visa.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
