
import React, { useState, useEffect, useRef } from 'react';

interface AboutProps {
  isAdmin?: boolean;
}

const About: React.FC<AboutProps> = ({ isAdmin = false }) => {
  const [faheemPhoto, setFaheemPhoto] = useState<string>("https://api.aistudio.google.com/v1/media/input_file_0.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved photo from localStorage on mount
  useEffect(() => {
    const savedPhoto = localStorage.getItem('l4u_faheem_custom_photo');
    if (savedPhoto) {
      setFaheemPhoto(savedPhoto);
    }
  }, []);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFaheemPhoto(base64String);
        localStorage.setItem('l4u_faheem_custom_photo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    if (isAdmin) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hidden File Input (Admin Only) */}
      {isAdmin && (
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handlePhotoUpload} 
        />
      )}

      {/* Header Section */}
      <section className="py-20 px-6 text-center animate-in fade-in slide-in-from-top-10 duration-700">
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          The Story Behind <span className="text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">Lyrics4U</span>
        </h1>
        <p className="text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
          Founded on the pillars of creative genius and operational excellence, we are your artistic partners in every rhyme and rhythm.
        </p>
      </section>

      {/* Founders Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto w-full mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* THE FAHEEM Card */}
          <div className="glass rounded-[3rem] p-8 md:p-12 border-2 border-[#ffd700]/20 hover:border-[#ffd700]/50 transition-all duration-500 group animate-in fade-in slide-in-from-left-10 duration-1000 relative">
            <div 
              className={`relative mb-8 overflow-hidden rounded-[2rem] aspect-[4/5] gold-glow shadow-2xl group/img ${isAdmin ? 'cursor-pointer' : ''}`} 
              onClick={triggerUpload}
            >
              <img 
                src={faheemPhoto} 
                alt="THE FAHEEM" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
              />
              
              {/* Edit Overlay (Admin Only) */}
              {isAdmin && (
                <div className="absolute inset-0 bg-purple-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-[#ffd700] p-4 rounded-full text-purple-950 shadow-xl transform scale-75 group-hover/img:scale-100 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent opacity-40"></div>
              <div className="absolute bottom-6 left-6">
                <span className="bg-[#ffd700] text-purple-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">The Visionary Hero</span>
              </div>
            </div>

            <div className="flex justify-between items-start mb-2">
              <h2 className="text-4xl font-bold">THE <span className="text-[#ffd700]">FAHEEM</span></h2>
              {isAdmin && (
                <button 
                  onClick={triggerUpload}
                  className="text-[10px] text-[#ffd700] border border-[#ffd700]/30 px-2 py-1 rounded hover:bg-[#ffd700]/10 transition"
                >
                  Change Photo
                </button>
              )}
            </div>
            
            <p className="text-[#ffd700]/60 font-black text-sm uppercase tracking-[0.2em] mb-6">Owner & Creative Spirit</p>
            <p className="text-white/70 leading-relaxed text-lg italic border-l-2 border-[#ffd700]/30 pl-6">
              "The main hero concept of our story. Faheem is the creative soul behind every word we write. As the owner, he ensures that the heart of every melody finds its perfect poetic counterpart, bringing life to the unspoken emotions of every artist."
            </p>
          </div>

          {/* MUZAMIL KHAN Card */}
          <div className="glass rounded-[3rem] p-8 md:p-12 border border-white/10 hover:border-[#ffd700]/30 transition-all duration-500 group animate-in fade-in slide-in-from-right-10 duration-1000">
            <div className="relative mb-8 overflow-hidden rounded-[2rem] aspect-[4/5] bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/[0.08] transition-colors">
              <div className="text-center p-12">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 group-hover:border-[#ffd700]/30 group-hover:text-[#ffd700] transition-all">
                   <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                   </svg>
                </div>
                <p className="text-white/20 text-xs italic tracking-widest uppercase">Executive Management</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="bg-white/10 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">The Managing Wing</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-2">MUZAMIL <span className="text-[#ffd700]">KHAN</span></h2>
            <p className="text-white/40 font-black text-sm uppercase tracking-[0.2em] mb-6">Managing Director</p>
            <p className="text-white/70 leading-relaxed text-lg">
              "Muzamil is the engine that keeps Lyrics4U flying. As the managing wing, he coordinates the intricate dance between artists and our writing studio, ensuring every project is delivered with professional precision, speed, and uncompromising quality."
            </p>
          </div>

        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-[#ffd700]/5 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ffd700] opacity-[0.02] blur-[150px] rounded-full"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <h3 className="text-3xl font-bold uppercase tracking-widest text-[#ffd700]">Our Legacy</h3>
          <p className="text-2xl font-light text-white/80 italic leading-relaxed">
            "We believe that every artist has a story that deserves to be told in its purest form. By combining creative genius with structured management, we help your music speak to the world."
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#ffd700]"></div>
            <div className="w-2 h-2 rounded-full bg-[#ffd700]/50"></div>
            <div className="w-2 h-2 rounded-full bg-[#ffd700]/20"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
