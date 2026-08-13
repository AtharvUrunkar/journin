import React from 'react';

export default function Navbar() {
  return (
    <header className="w-full border-b border-black/[0.06] bg-[#FBF8F1]/85 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Brand Logo — the same diamond mark used inside the product screenshot */}
        <div className="flex items-center gap-2.5 cursor-pointer">
          <svg width="30" height="30" viewBox="0 0 36 36">
            <defs>
              <linearGradient id="nav-logo-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F0C878" />
                <stop offset="100%" stopColor="#C99A44" />
              </linearGradient>
            </defs>
            <path d="M18 4 L31 18 L18 32 L5 18 Z" fill="url(#nav-logo-grad)" />
          </svg>
          <span className="font-black text-xl tracking-tight text-[#14161F] uppercase">
            DRIFT<span className="text-[#1FA983]">.</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[#3A3F4D]">
          <a href="#" className="hover:text-[#1FA983] transition-colors">Product</a>
          <a href="#" className="hover:text-[#1FA983] transition-colors">Playbooks</a>
          <a href="#" className="hover:text-[#1FA983] transition-colors">Integrations</a>
          <a href="#" className="hover:text-[#1FA983] transition-colors">Pricing</a>
          <a href="#" className="hover:text-[#1FA983] transition-colors">Docs</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-5">
          <a href="#" className="text-sm font-bold text-[#3A3F4D] hover:text-[#14161F] transition-colors">
            Sign In
          </a>
          <button className="bg-[#14161F] hover:bg-[#262B3A] text-[#FBF8F1] font-bold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95">
            Get Started
          </button>
        </div>

      </div>
    </header>
  );
}