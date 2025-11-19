import React from 'react';
import { ArrowRight, MessageSquareText } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
  return (
    <section className="relative pt-20 pb-32 px-6 md:px-12 max-w-7xl mx-auto text-center md:text-left">
      <div className="md:w-2/3 lg:w-1/2 space-y-6">
        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
          <span>New</span>
          <span className="w-1 h-1 bg-blue-700 rounded-full"></span>
          <span>AI-Powered Assessment</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
          For founders who refuse to be limited by borders.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
          We help founders and companies move to the UK, USA & Europe through legal-grade relocation strategies.
        </p>

        <div className="pt-4">
          <div 
            onClick={onStartQuiz}
            className="inline-flex items-center bg-yellow-300 hover:bg-yellow-400 text-slate-900 px-6 py-4 rounded-lg font-semibold text-lg cursor-pointer transition transform hover:-translate-y-1 shadow-lg group"
          >
            <MessageSquareText className="mr-3" size={24} />
            <span>chat style which leads to a short form</span>
            <span className="mx-3 text-slate-400">|</span>
            <span className="group-hover:underline decoration-2 underline-offset-2">Find your best global relocation route.</span>
            <ArrowRight className="ml-2" size={20} />
          </div>
        </div>
      </div>
      
      {/* Decorative elements representing connection/map */}
      <div className="hidden lg:block absolute top-20 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#2563EB" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.4,70.6,32.2C59,43,47.1,51.8,34.8,58.3C22.5,64.8,9.8,69,-2.4,73.2C-14.6,77.4,-26.3,81.6,-36.9,74.8C-47.5,68,-57,50.2,-63.3,33.1C-69.6,16,-72.7,-0.4,-70.6,-15.6C-68.5,-30.8,-61.2,-44.8,-50.2,-52.9C-39.2,-61,-24.5,-63.2,-10.8,-63.2C2.9,-63.2,16.8,-61,30.5,-83.6" transform="translate(100 100)" />
          </svg>
      </div>
    </section>
  );
};
