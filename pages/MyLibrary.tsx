
import React, { useState, useEffect } from 'react';
import { firebaseService } from '../services/firebase';
import { UserLyric } from '../types';

const MyLibrary: React.FC = () => {
  const [lyrics, setLyrics] = useState<UserLyric[]>([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isAccessing, setIsAccessing] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('l4u_user_email');
    if (savedEmail) {
      setUserEmail(savedEmail.toLowerCase());
      setIsAccessing(true);
    }
  }, []);

  useEffect(() => {
    if (isAccessing && userEmail) {
      setLoading(true);
      const unsubscribe = firebaseService.listenToLibrary(userEmail, (data) => {
        setLyrics(data);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [isAccessing, userEmail]);

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = userEmail.trim().toLowerCase();
    localStorage.setItem('l4u_user_email', cleanEmail);
    setUserEmail(cleanEmail);
    setIsAccessing(true);
  };

  if (!isAccessing) {
    return (
      <div className="py-24 px-6 max-w-md mx-auto flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-[#ffd700]/10 rounded-full flex items-center justify-center mb-8 border border-[#ffd700]/20">
          <svg className="w-10 h-10 text-[#ffd700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4">Access Your <span className="text-[#ffd700]">Library</span></h2>
        <p className="text-white/60 mb-8">Enter the email you used for your requests to see your custom lyrics across any device.</p>
        <form onSubmit={handleAccess} className="w-full space-y-4">
          <input 
            required
            type="email" 
            placeholder="your@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#ffd700]/50 transition"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <button type="submit" className="w-full py-4 bg-[#ffd700] text-purple-950 rounded-2xl font-bold hover:scale-[1.02] transition">
            View My Lyrics
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold">My <span className="text-[#ffd700]">Lyrics Library</span></h2>
          <p className="text-white/40">Real-time Cloud Access for {userEmail}</p>
        </div>
        <button 
          onClick={() => { localStorage.removeItem('l4u_user_email'); setUserEmail(''); setIsAccessing(false); }}
          className="text-xs text-white/30 hover:text-white underline"
        >
          Logout / Switch Account
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-[#ffd700] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : lyrics.length === 0 ? (
        <div className="glass p-20 rounded-[3rem] text-center space-y-6">
          <div className="text-5xl mb-4 opacity-20">📭</div>
          <p className="text-xl text-white/40">Your library is currently empty.</p>
          <p className="text-sm text-white/30">If you've already submitted a request, please wait for Manager Muzamil to publish your lyrics.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lyrics.map((item) => (
            <div 
              key={item.id}
              className={`glass rounded-3xl border-2 transition-all duration-500 overflow-hidden flex flex-col ${
                expandedId === item.id ? 'border-[#ffd700] scale-[1.02] col-span-full' : 'border-white/5 hover:border-[#ffd700]/30'
              }`}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-[#ffd700]/10 text-[#ffd700] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-[#ffd700]/20">
                    {item.language}
                  </span>
                  <span className="text-xs text-white/30">{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{item.songName}</h3>
                <p className="text-[#ffd700]/70 text-sm font-medium mb-6">by {item.artistName}</p>
                
                <div className={`transition-all duration-500 overflow-hidden ${expandedId === item.id ? 'max-h-[2000px] opacity-100' : 'max-h-24 opacity-50'}`}>
                  <p className="whitespace-pre-line leading-loose italic text-white/80 font-serif text-lg">
                    {item.lyrics}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full py-4 bg-white/5 border-t border-white/10 text-xs font-bold hover:bg-[#ffd700]/10 hover:text-[#ffd700] transition"
              >
                {expandedId === item.id ? 'CLOSE LYRICS' : 'READ FULL SONG'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLibrary;
