import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Home, Compass, Lightbulb, RefreshCw } from 'lucide-react';
import { AIConsultResult, Product } from '../types';

interface AiSpaceConsultantProps {
  onAddProductsToCart: (products: Product[]) => void;
  allProducts: Product[];
}

export const AiSpaceConsultant: React.FC<AiSpaceConsultantProps> = ({
  onAddProductsToCart,
  allProducts
}) => {
  const [selectedRoom, setSelectedRoom] = useState('Walk-In Pantry & Dry Storage');
  const [problemText, setProblemText] = useState('Deep cluttered shelves, half-open flour and pasta bags, lost spices in dark corners');
  const [selectedPriority, setSelectedPriority] = useState('Maximum Visual Calm & Space Efficiency');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIConsultResult | null>(null);
  const [addedSystem, setAddedSystem] = useState(false);

  const roomOptions = [
    'Walk-In Pantry & Dry Storage',
    'Kitchen Prep & Cooktop Zone',
    'Cleaning Station & Under-Sink',
    'Utensil Drawers & Cabinets'
  ];

  const presets = [
    {
      label: 'Deep dark pantry shelves with lost bags',
      room: 'Walk-In Pantry & Dry Storage',
      text: 'Deep cluttered shelves, half-open flour and pasta bags, lost spices in dark corners'
    },
    {
      label: 'Burnt grease on stove & dull bathroom grout',
      room: 'Cleaning Station & Under-Sink',
      text: 'Sticky stove grease and tough grout discoloration that takes excessive manual scrubbing'
    },
    {
      label: 'Chaotic prep drawers with tangled tools',
      room: 'Kitchen Prep & Cooktop Zone',
      text: 'Kitchen drawers are a jumbled mess; slicing is slow, and measuring takes too long'
    }
  ];

  const handleRunConsultation = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/ai/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: selectedRoom,
          problemDescription: problemText,
          priority: selectedPriority
        })
      });

      const data = await res.json();
      if (data.success && data.consultation) {
        setResult(data.consultation);
      }
    } catch (err) {
      console.error('Failed to run AI consultation:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecommended = () => {
    if (!result?.recommendedProducts || result.recommendedProducts.length === 0) return;
    onAddProductsToCart(result.recommendedProducts);
    setAddedSystem(true);
    setTimeout(() => setAddedSystem(false), 2200);
  };

  return (
    <section id="space-consultant" className="py-16 bg-[#FBFBFA] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
            <Compass className="w-4 h-4" />
            <span>Smart Home Finds Diagnostics</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-stone-900">
            Intelligent Home Space Consultant
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Describe your dwelling’s current pressure points. Our diagnostic engine evaluates vertical clearance, friction points, and prescribes a precise 3-pillar solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Consultation Input Form (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            
            {/* Quick Scenario Presets */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block mb-2">
                Quick Sample Dilemmas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedRoom(preset.room);
                      setProblemText(preset.text);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors text-left"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleRunConsultation} className="space-y-4">
              {/* Room Selection */}
              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1.5">
                  1. Target Zone
                </label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-stone-800 focus:outline-none focus:border-stone-900 font-medium"
                >
                  {roomOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Challenge Description */}
              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1.5">
                  2. Current Challenge & Frustration
                </label>
                <textarea
                  rows={3}
                  required
                  value={problemText}
                  onChange={(e) => setProblemText(e.target.value)}
                  placeholder="e.g. Too many loose spice bottles, grease splatters take forever to scrub..."
                  className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 text-stone-800"
                />
              </div>

              {/* Priority Objective */}
              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1.5">
                  3. Primary Objective
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    'Maximum Visual Calm & Space Efficiency',
                    'Cooking Speed, Ergonomics & Prep Precision',
                    'Effortless Sanitization & Deep Surface Clean'
                  ].map((prio) => (
                    <label
                      key={prio}
                      className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        selectedPriority === prio
                          ? 'border-stone-900 bg-stone-50 font-medium text-stone-900'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        checked={selectedPriority === prio}
                        onChange={() => setSelectedPriority(prio)}
                        className="accent-stone-900"
                      />
                      <span>{prio}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Architectural Space...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Generate Spatial Action Plan</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Diagnostic Output (Right 7 Cols) */}
          <div className="lg:col-span-7">
            {result ? (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6 animate-fade-in">
                
                {/* Architectural Diagnosis */}
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-stone-400 mb-1">
                    Architectural Assessment
                  </div>
                  <h3 className="font-display text-xl font-medium text-stone-900 leading-snug">
                    {result.diagnosis}
                  </h3>
                </div>

                {/* 3 Core Rules */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
                  <span className="text-xs font-semibold text-stone-900 block">
                    Three Space Principles:
                  </span>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {result.coreAdvice.map((advice, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="font-mono text-[11px] text-stone-400 font-semibold shrink-0 mt-0.5">
                          0{idx + 1}.
                        </span>
                        <span className="leading-relaxed">{advice}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Designer Habit Tip */}
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-amber-50/60 border border-amber-200/80 text-xs text-amber-950">
                  <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Habit for Lasting Order:</span>
                    <p className="leading-relaxed opacity-90">{result.organizationTip}</p>
                  </div>
                </div>

                {/* Recommended Products Grid */}
                {result.recommendedProducts && result.recommendedProducts.length > 0 && (
                  <div className="pt-4 border-t border-stone-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-900">
                        Prescribed Diagnostic Toolkit ({result.recommendedProducts.length} Objects)
                      </span>
                      <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                        20% Diagnostic Bundle Discount
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {result.recommendedProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="flex items-center gap-3 p-2.5 rounded-lg border border-stone-200 bg-stone-50/50"
                        >
                          <img
                            src={prod.image}
                            alt={prod.title}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover rounded bg-stone-100 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-semibold text-stone-900 truncate">
                              {prod.title}
                            </h4>
                            <p className="text-[11px] text-stone-500 truncate">{prod.categoryLabel}</p>
                            <span className="text-xs font-mono font-medium text-stone-800">
                              ${prod.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 1-Click Bundle Add Bar */}
                    <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-100/70 p-4 rounded-xl border border-stone-200">
                      <div>
                        <div className="text-[11px] text-stone-500 uppercase tracking-wider font-mono">
                          Prescription Total
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-2xl font-bold text-stone-950 tabular-nums">
                            ${result.bundleOffer?.combinedPrice || 142}
                          </span>
                          <span className="text-xs text-stone-400 line-through tabular-nums">
                            ${result.recommendedProducts.reduce((s, p) => s + p.price, 0)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handleAddRecommended}
                        className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                          addedSystem
                            ? 'bg-stone-800 text-white'
                            : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-95'
                        }`}
                      >
                        {addedSystem ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>System Added to Bag!</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Add Prescribed System to Bag</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                )}

              </div>
            ) : (
              /* Empty state before first run */
              <div className="h-full min-h-[380px] bg-stone-50 rounded-2xl border border-dashed border-stone-300 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-stone-200/80 flex items-center justify-center text-stone-600 mb-3">
                  <Home className="w-6 h-6" />
                </div>
                <h4 className="font-display text-lg font-medium text-stone-800">
                  Awaiting Space Specifications
                </h4>
                <p className="text-xs text-stone-500 max-w-sm mt-1 leading-relaxed">
                  Select your zone and problem on the left, then click "Generate Spatial Action Plan" to receive a tailored 3-pillar prescription.
                </p>
                <button
                  onClick={() => handleRunConsultation()}
                  className="mt-4 px-4 py-2 bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-medium rounded-lg transition-colors"
                >
                  Run Sample Pantry Consultation
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
