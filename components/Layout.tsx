
import React from 'react';
import { Page } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="min-h-screen purple-gradient flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-bold text-white flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate(Page.HOME)}
        >
          <span className="text-[#ffd700]">Lyrics</span>4U
        </div>
        <div className="hidden md:flex gap-8 items-center font-medium text-sm">
          <button onClick={() => onNavigate(Page.HOME)} className={`hover:text-[#ffd700] transition ${currentPage === Page.HOME ? 'text-[#ffd700]' : ''}`}>Home</button>
          <button onClick={() => onNavigate(Page.ABOUT)} className={`hover:text-[#ffd700] transition ${currentPage === Page.ABOUT ? 'text-[#ffd700]' : ''}`}>About Us</button>
          <button onClick={() => onNavigate(Page.REQUEST)} className={`hover:text-[#ffd700] transition ${currentPage === Page.REQUEST ? 'text-[#ffd700]' : ''}`}>Request Lyrics</button>
          <button onClick={() => onNavigate(Page.MY_LIBRARY)} className={`hover:text-[#ffd700] transition ${currentPage === Page.MY_LIBRARY ? 'text-[#ffd700]' : ''}`}>My Library</button>
          <button onClick={() => onNavigate(Page.PREMIUM)} className={`hover:text-[#ffd700] transition ${currentPage === Page.PREMIUM ? 'text-[#ffd700]' : ''}`}>Premium</button>
          <button 
            onClick={() => onNavigate(Page.ADMIN_LOGIN)} 
            className="px-4 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition"
          >
            Admin
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-12 px-6 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4"><span className="text-[#ffd700]">Lyrics</span>4U</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Professional lyric services for artists worldwide. We bring your melodies to life with words that resonate.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#ffd700]">Resources</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><button onClick={() => onNavigate(Page.ABOUT)} className="hover:text-white">Our Story</button></li>
              <li><button onClick={() => onNavigate(Page.MY_LIBRARY)} className="hover:text-white">Access Your Library</button></li>
              <li><button onClick={() => onNavigate(Page.REQUEST)} className="hover:text-white">Start New Song</button></li>
              <li><button onClick={() => onNavigate(Page.PREMIUM)} className="hover:text-white">Lifetime Access</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-[#ffd700]">Contact</h4>
            <p className="text-sm text-white/60">Email: support@lyrics4u.com</p>
            <p className="text-sm text-white/60">WhatsApp: +91 000 000 0000</p>
          </div>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-white/5 text-xs text-white/40">
          © {new Date().getFullYear()} Lyrics4U. Professional Studio Access.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
