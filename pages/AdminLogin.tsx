
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock auth for demo
    if (email === 'admin@lyrics4u.com' && password === 'admin123') {
      onLogin();
    } else {
      // Security fix: Do not display the entered credentials in the error message.
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Admin Login</h2>
          <p className="text-white/40 text-sm">Secure access for Manager Muzamil</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-[#ffd700]/50 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">Password</label>
            <input 
              required
              type="password" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-[#ffd700]/50 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-white text-purple-950 rounded-xl font-bold hover:bg-[#ffd700] hover:scale-[1.02] transition shadow-xl"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
