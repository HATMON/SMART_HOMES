import React, { useState } from 'react';
import { X, Search, PackageCheck, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultOrderId?: string;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  defaultOrderId = 'SHF-74921'
}) => {
  if (!isOpen) return null;

  const [orderIdInput, setOrderIdInput] = useState(defaultOrderId);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchOrder = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/orders/${id.trim()}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setOrder(null);
        setErrorMsg('No order found with this reference. Try SHF-74921');
      }
    } catch (err: any) {
      setErrorMsg('Failed to query order database');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(orderIdInput);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative bg-white rounded-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              <PackageCheck className="w-4 h-4 text-stone-700" />
              <span>Real-Time Warehouse Tracker</span>
            </div>
            <h2 className="font-display text-2xl font-medium tracking-tight text-stone-900">
              Track Your Domestic Order
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Enter your order reference code (e.g. <span className="font-mono text-stone-900 font-semibold">SHF-74921</span>).
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                placeholder="Enter SHF-XXXXX"
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 uppercase font-mono text-stone-900 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Order Results */}
          {order && (
            <div className="space-y-6 pt-4 border-t border-stone-200 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">
                    Status
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold text-stone-900 text-sm capitalize">
                      {order.status === 'confirmed' ? 'Confirmed & In Inspection' : order.status}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">
                    Estimated Delivery
                  </span>
                  <span className="text-xs font-semibold text-stone-900">
                    {order.estimatedDelivery}
                  </span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="relative pl-6 space-y-4 border-l-2 border-stone-200 ml-2">
                <div className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" />
                  <h4 className="text-xs font-semibold text-stone-900">Order Placed & Verified</h4>
                  <p className="text-[11px] text-stone-500">
                    Payment confirmed via {order.paymentMethod}
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-stone-900 border-2 border-white" />
                  <h4 className="text-xs font-semibold text-stone-900">Precision Quality Check</h4>
                  <p className="text-[11px] text-stone-500">
                    Inspecting blade alignment, seals, and timber finishes
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-stone-300 border-2 border-white" />
                  <h4 className="text-xs font-medium text-stone-500">Eco-Packaging & Transit Dispatch</h4>
                  <p className="text-[11px] text-stone-400">
                    Zero-plastic packaging with biodegradable padding
                  </p>
                </div>
              </div>

              {/* Recipient & Destination Details */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">Recipient:</span>
                  <span className="font-medium text-stone-800">{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Address:</span>
                  <span className="text-stone-700 font-mono text-[11px]">
                    {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-stone-200">
                  <span className="text-stone-500">Total Order Value:</span>
                  <span className="font-mono font-bold text-stone-900">${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">
                  Package Contents ({order.items.length})
                </span>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs py-1">
                    <span className="text-stone-700">{item.quantity}× {item.title}</span>
                    <span className="font-mono text-stone-900">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!order && !loading && !errorMsg && (
            <div className="text-center py-6 text-stone-400 text-xs">
              Click "Track" to inspect seeded demo order <strong className="text-stone-700">SHF-74921</strong>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
