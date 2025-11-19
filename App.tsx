import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VisaSection } from './components/VisaSection';
import { ServicesSection } from './components/ServicesSection';
import { Testimonials } from './components/Testimonials';
import { WhyUs } from './components/WhyUs';
import { Footer } from './components/Footer';
import { ChatQuiz } from './components/ChatQuiz';

function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero onStartQuiz={() => setIsQuizOpen(true)} />
        <VisaSection />
        <ServicesSection />
        <Testimonials />
        <WhyUs />
      </main>
      <Footer />
      
      <ChatQuiz 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
      />
    </div>
  );
}

export default App;
