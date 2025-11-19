import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Trophy, Check } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-12 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        
        <div>
          <div className="flex items-center space-x-3 mb-8 text-yellow-400">
            <Trophy size={24} />
            <h3 className="font-bold tracking-wide uppercase text-sm">Success Stories</h3>
          </div>
          
          <div className="space-y-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="border-l-4 border-blue-500 pl-6">
                <div className="font-bold text-lg mb-1 text-blue-200">{t.role}</div>
                <div className="text-slate-300 text-sm mb-2">via {t.path}</div>
                <div className="text-white font-medium">→ {t.outcome}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold tracking-wide uppercase text-sm mb-8 text-blue-400">End-to-End Capabilities</h3>
          <ul className="space-y-4">
            {[
              'Visa strategy & legal application support',
              'Pitch deck, business plan, financial modeling',
              'Incorporation, banking, tax & accounting setup',
              'Hiring, payroll & employment compliance',
              'Post-landing growth & fundraising support'
            ].map((item, i) => (
              <li key={i} className="flex items-center space-x-3">
                <div className="bg-blue-600 p-1 rounded-full">
                  <Check size={12} className="text-white" />
                </div>
                <span className="text-slate-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};
