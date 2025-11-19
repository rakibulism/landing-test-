import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Check, Loader2 } from 'lucide-react';
import { QuizState, ChatMessage } from '../types';
import { generateRelocationAdvice } from '../services/gemini';

interface ChatQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_STATE: QuizState = {
  userType: null,
  markets: [],
  stage: '',
  funding: '',
  teamSize: '',
  citizenship: '',
  name: '',
  email: '',
  residence: '',
};

export const ChatQuiz: React.FC<ChatQuizProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [quizData, setQuizData] = useState<QuizState>(INITIAL_STATE);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Multi-select temporary state
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startQuiz();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const addBotMessage = (text: string, type: ChatMessage['type'] = 'text', options: string[] = [], inputType?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'bot',
        text,
        type,
        options,
        inputType,
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 800); // Simulate typing delay
  };

  const addUserMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const startQuiz = () => {
    addBotMessage("Hi! 👋 Let’s find the best global relocation route for your startup or company. This takes 90 seconds.", 'options', ['Yes, start', 'Not now']);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);

    // Logic flow based on current step/question
    processStep(option);
  };

  const handleMultiSelectSubmit = () => {
    if (selectedOptions.length === 0) return;
    const text = selectedOptions.join(', ');
    addUserMessage(text);
    setQuizData(prev => ({ ...prev, markets: selectedOptions }));
    setSelectedOptions([]);
    setTimeout(() => nextStep(4), 500);
  };

  const handleInputSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    addUserMessage(inputText);
    processInputStep(inputText);
    setInputText('');
  };

  const processStep = (answer: string) => {
    switch (step) {
      case 0: // Welcome
        if (answer === 'Yes, start') {
          nextStep(2);
        } else {
          addBotMessage("No problem! We'll be here when you're ready.");
          setTimeout(onClose, 2000);
        }
        break;
      case 2: // Who are you
        setQuizData(prev => ({ ...prev, userType: answer === 'Startup Founder' ? 'founder' : 'company' }));
        nextStep(3);
        break;
      case 4: // Business Stage
        setQuizData(prev => ({ ...prev, stage: answer }));
        nextStep(5);
        break;
      case 5: // Funding
        setQuizData(prev => ({ ...prev, funding: answer }));
        nextStep(6);
        break;
      case 6: // Team Size
        setQuizData(prev => ({ ...prev, teamSize: answer }));
        nextStep(7);
        break;
      case 9: // Final CTA choice
        if (answer.includes("NextBot")) {
          handleAIAnalysis();
        } else {
            addBotMessage("Great choice. A strategist will be in touch shortly via email!");
        }
        break;
      default:
        break;
    }
  };

  const processInputStep = (text: string) => {
    if (step === 7) { // Citizenship
      setQuizData(prev => ({ ...prev, citizenship: text }));
      nextStep(8);
    } else if (step === 8) { // Form data - simplified strictly for this demo to handle one by one or generic
       // In a real complex chat, we'd loop through fields. 
       // Here, let's assume step 8 collected all fields via a custom form render in the chat bubble
       // But since we are using a simple text input loop, let's assume the custom form handled it.
       // See render logic for step 8 below.
    }
  };

  const handleFormSubmit = (formData: { name: string, email: string, residence: string }) => {
    setQuizData(prev => ({ ...prev, ...formData }));
    
    // Show user what they submitted effectively
    const summary = `Name: ${formData.name}, Email: ${formData.email}, Residence: ${formData.residence}`;
    // We don't add user message to avoid clutter, just proceed.
    
    nextStep(9);
  };

  const handleAIAnalysis = async () => {
      addBotMessage("Analyzing your profile with Gemini AI...", 'loading');
      
      const advice = await generateRelocationAdvice(quizData);
      
      // Remove loading message (last one)
      setMessages(prev => prev.filter(m => m.type !== 'loading'));
      
      addBotMessage(advice);
      addBotMessage("Would you like to book a follow-up call to discuss this strategy?", 'options', ['Book Strategy Call', 'Close Chat']);
  };

  const nextStep = (nextStepIndex: number) => {
    setStep(nextStepIndex);
    setTimeout(() => {
      switch (nextStepIndex) {
        case 2:
          addBotMessage("Which one describes you best?", 'options', ['Startup Founder', 'Company / Scale-up']);
          break;
        case 3:
          addBotMessage("Which markets are you considering expanding or relocating to?", 'multi-select', ['UK 🇬🇧', 'USA 🇺🇸', 'Canada 🇨🇦', 'Europe (EU) 🇪🇺', 'Not sure yet']);
          break;
        case 4:
          addBotMessage("What stage are you at?", 'options', ['Idea / MVP', 'Early traction', 'Growing revenue', 'Scaling internationally']);
          break;
        case 5:
          addBotMessage("What best reflects your financial position?", 'options', ['Pre-funded / Bootstrapped', 'Raised under $200K', 'Raised $200K–$2M', 'Raised $2M+ or Profitable']);
          break;
        case 6:
          addBotMessage("How many team members are relocating or part of this expansion?", 'options', ['1 (Solo)', '2–5', '6–15', '16–50', '50+']);
          break;
        case 7:
          addBotMessage("Which passport do you currently hold?", 'input');
          break;
        case 8:
          addBotMessage("Where can we send your recommended relocation pathways?", 'form');
          break;
        case 9:
          addBotMessage(`Thanks ${quizData.name}! Your tailored relocation strategy is being prepared. Before you go, how would you like to continue?`, 'options', ['Book a call with strategist', 'Continue with AI (NextBot)', 'Just send my report']);
          break;
      }
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[800px] h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="font-bold text-sm">NC</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm">NextCountry Assistant</h3>
              <p className="text-xs text-slate-300">Replies instantly</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-slate-700 p-2 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
             <div className="flex justify-start">
               <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1 items-center">
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                 <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
               </div>
             </div>
          )}

          {/* Interactive Elements (Only show for the latest bot message if it matches) */}
          {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && !isTyping && (
            <div className="mt-2 animate-fade-in">
              
              {/* Options Buttons */}
              {messages[messages.length - 1].type === 'options' && (
                <div className="flex flex-wrap gap-2">
                  {messages[messages.length - 1].options?.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      className="bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-full text-sm transition shadow-sm font-medium"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

               {/* Multi-Select */}
               {messages[messages.length - 1].type === 'multi-select' && (
                <div className="flex flex-col space-y-2">
                  {messages[messages.length - 1].multiOptions?.map((opt) => (
                    <label key={opt} className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition ${selectedOptions.includes(opt) ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}>
                      <input 
                        type="checkbox" 
                        className="rounded text-blue-600 focus:ring-blue-500"
                        checked={selectedOptions.includes(opt)}
                        onChange={() => {
                          setSelectedOptions(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]);
                        }}
                      />
                      <span className="text-sm font-medium">{opt}</span>
                    </label>
                  ))}
                  <button 
                    onClick={handleMultiSelectSubmit}
                    disabled={selectedOptions.length === 0}
                    className="mt-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                  >
                    Confirm Selection
                  </button>
                </div>
              )}

              {/* Form for Contact Info */}
              {messages[messages.length - 1].type === 'form' && (
                 <ContactForm onSubmit={handleFormSubmit} />
              )}

               {/* Loading State */}
               {messages[messages.length - 1].type === 'loading' && (
                  <div className="flex items-center text-slate-500 text-sm">
                      <Loader2 className="animate-spin mr-2" size={16} />
                      Processing...
                  </div>
               )}

            </div>
          )}
        </div>

        {/* Input Area (Only for text inputs) */}
        {messages.length > 0 && messages[messages.length - 1].type === 'input' && !isTyping && (
          <form onSubmit={handleInputSubmit} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your answer..."
              className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              autoFocus
            />
            <button 
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Send size={20} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const ContactForm = ({ onSubmit }: { onSubmit: (data: { name: string, email: string, residence: string }) => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', residence: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.residence) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">Name</label>
        <input 
          required
          className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          placeholder="Your Name"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
        <input 
          required
          type="email"
          className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">Current country of residence</label>
        <input 
          required
          className="w-full border border-slate-300 rounded p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={formData.residence}
          onChange={e => setFormData({...formData, residence: e.target.value})}
          placeholder="e.g. India, Nigeria, Brazil"
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
        View Results
      </button>
    </form>
  );
}
