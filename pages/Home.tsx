
import React from 'react';
import { Page, Language } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const languages = [
    { name: 'Urdu', flag: '🇵🇰', label: 'PK' },
    { name: 'Hindi', flag: '🇮🇳', label: 'IN' },
    { name: 'Punjabi', flag: '🎵', label: 'PB' },
    { name: 'English', flag: '🇬🇧', label: 'GB' },
    { name: 'Gojri', flag: '🎶', label: 'GJ' }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1514525253361-bee8a48740d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")' }}
        >
          <div className="absolute inset-0 bg-purple-950/85 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#2e0249] via-transparent to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="inline-block px-4 py-1.5 glass rounded-full text-[#ffd700] text-sm font-semibold mb-2">
            ✨ Professional Lyricists at your service
          </div>
          <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tight">
            Your <span className="text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">Lyrics</span>,<br /> Your Language
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            Crafting soulful poetry and professional lyrics in Urdu, Hindi, Punjabi, English & Gojri.
          </p>
          
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center pt-8">
            <button 
              onClick={() => onNavigate(Page.REQUEST)}
              className="px-8 md:px-10 py-4 bg-[#ffd700] text-purple-950 rounded-full font-bold text-lg hover:scale-105 gold-glow transition shadow-xl"
            >
              Request Lyrics
            </button>
            
            <button 
              onClick={() => onNavigate(Page.ABOUT)}
              className="px-8 md:px-10 py-4 glass border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About Us
            </button>

            <button 
              onClick={() => onNavigate(Page.MY_LIBRARY)}
              className="px-8 md:px-10 py-4 glass border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              My Library
            </button>

            <button 
              onClick={() => onNavigate(Page.PREMIUM)}
              className="px-8 md:px-10 py-4 glass border border-[#ffd700]/40 text-[#ffd700] rounded-full font-bold text-lg hover:bg-[#ffd700]/10 hover:scale-105 transition shadow-[0_0_20px_rgba(255,215,0,0.1)] flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Go Premium
            </button>
          </div>
        </div>
      </section>

      {/* Language Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Multi-Language Expertise</h2>
            <p className="text-white/60">We bridge cultural gaps through the power of words.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {languages.map((lang) => (
              <div 
                key={lang.name}
                className="glass p-8 rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-[#ffd700]/50 hover:-translate-y-2 transition group"
              >
                <div className="text-5xl group-hover:scale-110 transition duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                  {lang.flag}
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg">{lang.name}</h3>
                  <span className="text-xs text-white/40 font-mono tracking-widest">{lang.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">Why Choose <br /><span className="text-[#ffd700]">Lyrics4U?</span></h2>
            <div className="space-y-4">
              <FeatureItem 
                title="Professional Lyricists" 
                desc="Experienced writers across 5 languages ensuring deep emotional resonance." 
              />
              <FeatureItem 
                title="Rapid Turnaround" 
                desc="Get your professional lyrics in as little as 48 hours for standard requests." 
              />
              <FeatureItem 
                title="Direct Manager Contact" 
                desc="Talk directly to Muzamil for custom deals and long-term partnerships." 
              />
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-[#ffd700] rounded-full blur-[100px] opacity-20 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Music Studio" 
              className="w-full h-full object-cover rounded-3xl border border-white/10 shadow-2xl relative z-10"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureItem = ({ title, desc }: { title: string; desc: string }) => (
  <div className="flex gap-4">
    <div className="mt-1 w-6 h-6 rounded-full bg-[#ffd700] flex-shrink-0 flex items-center justify-center">
      <svg className="w-4 h-4 text-purple-950" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </div>
    <div>
      <h4 className="font-bold text-lg text-[#ffd700]">{title}</h4>
      <p className="text-white/60 text-sm">{desc}</p>
    </div>
  </div>
);

export default Home;
