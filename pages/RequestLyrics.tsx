
import React, { useState } from 'react';
import { firebaseService } from '../services/firebase';
import { Language } from '../types';

const RequestLyrics: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    songName: '',
    artistName: '',
    language: 'English' as Language,
    email: '',
    specialRequests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await firebaseService.submitRequest(formData);
      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit request. Please try again.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 animate-in fade-in zoom-in">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold mb-4">Request Submitted!</h2>
        <p className="text-white/60 max-w-md mx-auto mb-8">
          Thank you for choosing Lyrics4U. Our team will review your request and publish the lyrics to your <span className="text-[#ffd700] font-semibold">Library</span> within 24-48 hours.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 glass hover:bg-white/10 transition rounded-full font-bold text-[#ffd700]"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Request Your <span className="text-[#ffd700]">Lyrics</span></h2>
        <p className="text-white/60">Fill out the form below and we'll start crafting your masterpiece.</p>
      </div>

      <div className="glass p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd700] opacity-10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 opacity-10 rounded-full -ml-24 -mb-24 blur-3xl"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/70 ml-1">Song Name</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Moonlight Sonata"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#ffd700]/50 transition"
                value={formData.songName}
                onChange={(e) => setFormData({...formData, songName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/70 ml-1">Artist Name</label>
              <input 
                required
                type="text" 
                placeholder="Your name or Stage name"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#ffd700]/50 transition"
                value={formData.artistName}
                onChange={(e) => setFormData({...formData, artistName: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/70 ml-1">Language</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#ffd700]/50 transition appearance-none"
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value as Language})}
              >
                <option value="Urdu" className="bg-[#2e0249]">Urdu</option>
                <option value="Hindi" className="bg-[#2e0249]">Hindi</option>
                <option value="Punjabi" className="bg-[#2e0249]">Punjabi</option>
                <option value="English" className="bg-[#2e0249]">English</option>
                <option value="Gojri" className="bg-[#2e0249]">Gojri</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/70 ml-1">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="hello@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#ffd700]/50 transition"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/70 ml-1">Special Requests</label>
            <textarea 
              rows={4}
              placeholder="Tell us about the mood, theme, or any specific words you want included..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#ffd700]/50 transition resize-none"
              value={formData.specialRequests}
              onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full py-5 bg-[#ffd700] text-purple-950 rounded-2xl font-bold text-lg hover:scale-[1.02] gold-glow transition shadow-xl disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-purple-950 border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : 'Submit Lyric Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestLyrics;
