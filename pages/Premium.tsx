
import React from 'react';

const Premium: React.FC = () => {
  return (
    <div className="py-24 px-6 max-w-6xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold">Become a <span className="text-[#ffd700]">Permanent Lyricist</span></h2>
        <p className="text-white/60 text-lg max-w-2xl">
          Get elite access to our studio team and prioritize your projects over everyone else.
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="glass rounded-[3rem] overflow-hidden border border-[#ffd700]/30 shadow-[0_0_50px_rgba(255,215,0,0.1)] relative">
          <div className="absolute top-0 right-0 p-6">
            <span className="bg-[#ffd700] text-purple-950 text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-lg">LIFETIME</span>
          </div>

          <div className="p-12 space-y-8 text-center">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">Exclusive Chat Access</h3>
              <div className="text-5xl font-black text-[#ffd700]">₹100</div>
              <p className="text-white/40 text-sm">One-time payment • No monthly fees</p>
            </div>

            <hr className="border-white/10" />

            <ul className="space-y-4 text-left">
              <PremiumFeature text="Direct Line to Manager Muzamil" />
              <PremiumFeature text="Priority Handling for All Requests" />
              <PremiumFeature text="Real-time Responses & Updates" />
              <PremiumFeature text="Custom Discounts on Song Packages" />
              <PremiumFeature text="Early Access to New Writers" />
            </ul>

            <button 
              className="w-full py-5 bg-[#ffd700] text-purple-950 rounded-2xl font-bold text-xl hover:scale-105 gold-glow transition shadow-xl mt-4"
              onClick={() => alert("Redirecting to Razorpay secure payment gateway...")}
            >
              Pay via Razorpay
            </button>
            
            <p className="text-[10px] text-white/30 px-4 leading-tight">
              By joining, you agree to our Terms of Service. Instant activation upon successful payment confirmation.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 text-[#ffd700]">
            ⚡
          </div>
          <h4 className="font-bold mb-2">Instant Setup</h4>
          <p className="text-xs text-white/40">Automatic activation after payment is processed.</p>
        </div>
        <div className="p-6">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 text-[#ffd700]">
            🔒
          </div>
          <h4 className="font-bold mb-2">Secure Payments</h4>
          <p className="text-xs text-white/40">Powered by Razorpay. Your data is 100% safe.</p>
        </div>
        <div className="p-6">
          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 text-[#ffd700]">
            💎
          </div>
          <h4 className="font-bold mb-2">Elite Community</h4>
          <p className="text-xs text-white/40">Join 500+ artists already using our premium services.</p>
        </div>
      </div>
    </div>
  );
};

const PremiumFeature = ({ text }: { text: string }) => (
  <li className="flex gap-3 items-center">
    <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center text-[10px] text-white">
      ✓
    </div>
    <span className="text-sm font-medium">{text}</span>
  </li>
);

export default Premium;
