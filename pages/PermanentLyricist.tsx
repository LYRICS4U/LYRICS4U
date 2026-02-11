
import React, { useState } from 'react';

const PermanentLyricist: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Placeholder for Razorpay integration
    console.log("Initializing Razorpay for ₹100 INR...");
    
    // Simulate payment success and redirect
    setTimeout(() => {
      alert("Payment Successful! Redirecting to VIP Consultation...");
      // Replace with actual WhatsApp link/number
      window.location.href = "https://wa.me/yournumberhere?text=I%20have%20purchased%20the%20Permanent%20Lyricist%20Lifetime%20Access";
    }, 2000);
  };

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto flex flex-col items-center min-h-[80vh]">
      {/* VIP Header */}
      <div className="text-center mb-16 space-y-6 animate-in fade-in slide-in-from-top-10 duration-700">
        <div className="inline-flex items-center justify-center p-4 bg-[#ffd700]/10 rounded-full border border-[#ffd700]/30 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#ffd700]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Hire a <span className="text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">Permanent Lyricist</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-light">
          Unlock <span className="text-[#ffd700] font-semibold">VIP Access</span> & Live Consultation with CEO Muzamil.
        </p>
      </div>

      {/* Main Pricing Card */}
      <div className="w-full max-w-2xl glass rounded-[3rem] overflow-hidden border-2 border-[#ffd700]/40 shadow-[0_0_80px_rgba(255,215,0,0.15)] relative transform hover:scale-[1.01] transition-all duration-500">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ffd700] opacity-10 blur-[80px] rounded-full"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 opacity-20 blur-[80px] rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-5 h-full">
          {/* Left side info */}
          <div className="md:col-span-3 p-10 md:p-14 space-y-8">
            <h3 className="text-2xl font-bold border-b border-white/10 pb-4">Membership Benefits</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">Live Consultation</h4>
                  <p className="text-sm text-white/50">Direct one-on-one session with CEO Muzamil.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">Priority Writing</h4>
                  <p className="text-sm text-white/50">Your songs move to the front of our studio queue.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">24/7 VIP Support</h4>
                  <p className="text-sm text-white/50">Private WhatsApp/Chat line for instant updates.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right side CTA */}
          <div className="md:col-span-2 bg-[#ffd700] p-10 md:p-14 flex flex-col justify-center items-center text-center space-y-6">
            <div className="space-y-1">
              <p className="text-purple-950/60 font-black uppercase tracking-widest text-xs">Lifetime Access</p>
              <div className="text-6xl font-black text-purple-950">₹100</div>
              <p className="text-purple-950 font-bold">INR / Only</p>
            </div>
            
            <div className="w-full space-y-4">
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 bg-purple-950 text-[#ffd700] rounded-2xl font-black text-lg hover:bg-purple-900 transition-colors shadow-xl disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-[#ffd700] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Pay Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </>
                )}
              </button>
              <p className="text-[10px] text-purple-950/60 font-medium">Secure Payment via Razorpay</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        <span className="font-bold text-lg">RAZORPAY SECURE</span>
        <span className="font-bold text-lg">SSL ENCRYPTED</span>
        <span className="font-bold text-lg">G-PAY SUPPORTED</span>
      </div>
    </div>
  );
};

export default PermanentLyricist;
