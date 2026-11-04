import React, { useState } from 'react';
import { X, Phone, Mail, MessageSquare, Clock, Check, Copy, Send, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const phoneNumber = '+254 702 502360';
  const emailAddress = 'maggiemaggy6350@gmail.com';
  const whatsappUrl = 'https://wa.me/254702502360?text=Hello%20Smart%20Home%20Finds%20team%2C%20I%20have%20an%20inquiry%20regarding%20products';

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('Product Specification');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successTicket, setSuccessTicket] = useState<string | null>(null);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, topic, message })
      });
      const data = await res.json();
      if (data.success && data.inquiryId) {
        setSuccessTicket(data.inquiryId);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
          aria-label="Close contact modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Domestic Concierge</span>
            </div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-stone-900">
              Get in Touch with Smart Home Finds
            </h2>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              Have questions about our kitchen gadgets, cleaning tools, or home storage systems? Reach our concierge team directly.
            </p>
          </div>

          {/* Quick Action Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Phone Call */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="text-stone-400 hover:text-stone-700 p-1"
                  title="Copy number"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">
                  Direct Line
                </span>
                <a
                  href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                  className="text-xs font-semibold text-stone-900 hover:underline font-mono"
                >
                  {phoneNumber}
                </a>
              </div>
              <a
                href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                className="inline-block text-center text-[11px] font-medium py-1.5 px-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded transition-colors"
              >
                Call Studio
              </a>
            </div>

            {/* WhatsApp Chat */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col justify-between space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-semibold block">
                  WhatsApp Concierge
                </span>
                <span className="text-xs font-semibold text-stone-900 font-mono">
                  {phoneNumber}
                </span>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-center text-[11px] font-medium py-1.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded transition-colors"
              >
                Open WhatsApp
              </a>
            </div>

            {/* Direct Email */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col justify-between space-y-2">
              <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">
                  Studio Inquiries
                </span>
                <a
                  href={`mailto:${emailAddress}`}
                  className="text-xs font-semibold text-stone-900 hover:underline truncate block"
                >
                  {emailAddress}
                </a>
              </div>
              <a
                href={`mailto:${emailAddress}?subject=Smart%20Home%20Finds%20Inquiry`}
                className="inline-block text-center text-[11px] font-medium py-1.5 px-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded transition-colors"
              >
                Send Email
              </a>
            </div>

          </div>

          {/* Operating Hours Note */}
          <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 p-3 rounded-lg border border-stone-200">
            <Clock className="w-4 h-4 text-stone-400 shrink-0" />
            <span>Studio Hours: Monday – Saturday, 8:00 AM – 7:00 PM (EAT). WhatsApp queries monitored daily.</span>
          </div>

          {/* Direct Message Form */}
          <div className="pt-2 border-t border-stone-200">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800 mb-3">
              Send an In-App Message
            </h3>

            {successTicket ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <Check className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-xs font-semibold text-emerald-900">
                  Inquiry Ticket #{successTicket} Created
                </p>
                <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
                  Thank you! Our studio team will follow up via phone (<strong className="font-mono">{phoneNumber}</strong>) or email shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccessTicket(null)}
                  className="mt-2 text-xs text-stone-600 underline font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Phillip"
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 text-stone-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 700 000000"
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 text-stone-800 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Topic</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 text-stone-800 font-medium"
                    >
                      <option value="Product Specification">Product Specification & Materials</option>
                      <option value="Order Tracking & Delivery">Order Tracking & Delivery</option>
                      <option value="Curated Bundles / Space Planning">Curated Bundles / Space Planning</option>
                      <option value="Bulk & Wholesale Orders">Bulk & Wholesale Orders</option>
                      <option value="Other Inquiries">Other Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-stone-500 block mb-1">Message</label>
                  <textarea
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist with your home organization or gadget inquiry?"
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 text-stone-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
                >
                  {loading ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message to Studio</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
