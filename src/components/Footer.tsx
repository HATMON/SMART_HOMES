import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Phone, Mail, MessageSquare } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (category: Category | 'all') => void;
  onOpenTracker: () => void;
  onOpenContact: () => void;
  onScrollToConsultant: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenTracker,
  onOpenContact,
  onScrollToConsultant
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setEmailInput('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Manifesto (Left 5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl shadow-xs inline-block">
                <img
                  src="/assets/aistudio/Smart_Home_Finds_Logo_e816e860.png"
                  alt="Smart Home Finds - Smart Choices. Better Living."
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
            
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              <strong className="text-white font-medium">Smart Home Finds</strong> is dedicated to delivering innovative, space-saving, and ergonomic discoveries for kitchen prep, deep cleaning, and home organization. Smart choices for better living.
            </p>

            <div className="pt-1 text-xs text-stone-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Certified Quality Curation · Direct Customer Support</span>
            </div>
          </div>

          {/* Navigation Links (Cols 6-8) */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block font-semibold">
              Collections
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('kitchen')}
                  className="hover:text-white transition-colors text-stone-400 hover:underline"
                >
                  Kitchen Gadgets & Prep
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('cleaning')}
                  className="hover:text-white transition-colors text-stone-400 hover:underline"
                >
                  Sonic & Artisanal Cleaning
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('storage')}
                  className="hover:text-white transition-colors text-stone-400 hover:underline"
                >
                  Modular Pantry & Home Storage
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToConsultant}
                  className="hover:text-white transition-colors text-amber-300 hover:underline font-medium"
                >
                  AI Space Diagnostic Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Support (Cols 9-12) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block font-semibold">
              Direct Contact & Studio Concierge
            </span>

            {/* Direct Contact Links */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="text-stone-400">Phone & Call:</span>
                <a
                  href="tel:+254702502360"
                  className="font-mono font-semibold text-white hover:text-amber-200 transition-colors"
                >
                  +254 702 502360
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-stone-400">WhatsApp:</span>
                <a
                  href="https://wa.me/254702502360?text=Hello%20K%C5%8Db%C5%8D%20Living%20team%2C%20I%20have%20an%20inquiry%20regarding%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  +254 702 502360 (Chat Live)
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span className="text-stone-400">Email:</span>
                <a
                  href="mailto:maggiemaggy6350@gmail.com?subject=K%C5%8Db%C5%8D%20Living%20Inquiry"
                  className="text-white hover:text-amber-200 transition-colors truncate font-mono text-[11px]"
                >
                  maggiemaggy6350@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white border border-stone-700 transition-colors cursor-pointer"
              >
                <span>Inquiry Concierge</span>
              </button>

              <button
                onClick={onOpenTracker}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors cursor-pointer"
              >
                <span>Track Order (SHF-74921)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Seasonal release notes..."
                  className="w-full text-xs px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-stone-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-white hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  {subscribed ? <Check className="w-4 h-4 text-emerald-600" /> : 'Join'}
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-emerald-400 mt-1 block">
                  Welcome to the Smart Home Finds community.
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Smart Home Finds Inc. All domestic rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-stone-400">Smart Choices. Better Living.</span>
            <span>·</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Quality Guarantee</a>
            <span>·</span>
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy & Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
