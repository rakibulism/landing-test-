import React from 'react';

const FEATURES = [
  {
    title: 'Built by founders + legal experts',
    benefit: 'Real, investor-ready expansion strategy'
  },
  {
    title: 'Multi-country comparison',
    benefit: 'Choose the best jurisdiction, not the only one you know'
  },
  {
    title: 'Tech-enabled relocation system',
    benefit: 'Faster processing, fewer mistakes, higher compliance'
  },
  {
    title: 'Launch & growth support',
    benefit: 'Not just visas — actual business enablement'
  }
];

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">Why Startups & Companies Choose Us</h2>

        <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-1/2">Advantage</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Benefit to You</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {FEATURES.map((feature, index) => (
                <tr key={index} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-5 whitespace-normal text-sm font-bold text-slate-900">
                    {feature.title}
                  </td>
                  <td className="px-6 py-5 whitespace-normal text-sm text-slate-600">
                    {feature.benefit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
