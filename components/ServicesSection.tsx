import React from 'react';
import { CheckCircle2, Briefcase, Users, Rocket } from 'lucide-react';
import { FOUNDER_SERVICES, COMPANY_SERVICES } from '../constants';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-16 text-center">Who We Serve</h2>

        <div className="grid md:grid-cols-2 gap-16 mb-24">
          {/* Founders */}
          <div className="space-y-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">1. {FOUNDER_SERVICES.title}</h3>
            <p className="text-slate-600 text-lg">For entrepreneurs ready to build from global startup hubs.</p>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <p className="font-semibold mb-4 text-slate-900">We help founders with:</p>
              <ul className="space-y-3">
                {FOUNDER_SERVICES.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={18} />
                    <span className="text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex items-center text-slate-900 font-medium">
              <span className="text-yellow-500 mr-2">✨</span> You bring the vision. We help you take it global.
            </p>
          </div>

          {/* Companies */}
          <div className="space-y-6">
             <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
              <Briefcase size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">2. {COMPANY_SERVICES.title}</h3>
            <p className="text-slate-600 text-lg">For businesses expanding or opening new market hubs.</p>
            
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <p className="font-semibold mb-4 text-slate-900">We help companies:</p>
              <ul className="space-y-3">
                {COMPANY_SERVICES.points.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="text-orange-500 mr-3 mt-1 flex-shrink-0" size={18} />
                    <span className="text-slate-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-slate-900 font-medium">
              Scale where your business gets the best chance to win.
            </p>
          </div>
        </div>

        {/* Framework */}
        <div className="border-t border-slate-200 pt-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Visas → Setup → Scale Framework</h3>
                <p className="text-lg text-slate-600">Our end-to-end expansion stack for ambitious companies:</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-slate-50 rounded-xl">
                    <div className="text-4xl font-bold text-blue-200 mb-4">01</div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Visa & Relocation Strategy</h4>
                    <p className="text-slate-600 text-sm">Identify the perfect legal pathway.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl">
                    <div className="text-4xl font-bold text-blue-200 mb-4">02</div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Local Setup</h4>
                    <p className="text-slate-600 text-sm">Company, bank, tax, compliance.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl">
                    <div className="text-4xl font-bold text-blue-200 mb-4">03</div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Scale</h4>
                    <p className="text-slate-600 text-sm">Sales, hiring, partnerships, VC access.</p>
                </div>
            </div>
            <p className="text-center mt-8 font-semibold text-slate-900">You don’t just move there. You succeed there.</p>
        </div>
      </div>
    </section>
  );
};
