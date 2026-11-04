import React, { useState } from 'react';
import { X, Check, Truck, ShieldCheck, ArrowRight, CreditCard, Banknote, PackageCheck } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountCode: string;
  discountAmount: number;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountCode,
  discountAmount,
  onOrderCompleted
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('Alexander Reed');
  const [email, setEmail] = useState('alex.reed@example.com');
  const [street, setStreet] = useState('452 Kōbō Studio Way, Apt 3B');
  const [city, setCity] = useState('Seattle');
  const [state, setState] = useState('WA');
  const [postalCode, setPostalCode] = useState('98101');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [loading, setLoading] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const subtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0);
  const shippingFee = (subtotal >= 65 || discountCode.toUpperCase() === 'FREESHIP') ? 0 : 8.50;
  const taxable = Math.max(0, subtotal - discountAmount);
  const tax = parseFloat((taxable * 0.0825).toFixed(2));
  const total = parseFloat((taxable + shippingFee + tax).toFixed(2));

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        customerName,
        email,
        shippingAddress: {
          street,
          city,
          state,
          postalCode,
          country: 'United States'
        },
        items: cartItems.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        })),
        discountCode,
        paymentMethod: paymentMethod === 'card' ? 'Credit Card (Visa ···· 8821)' : 'Cash on Delivery (COD)'
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success && data.order) {
        setConfirmedOrder(data.order);
        onOrderCompleted(data.order);
      }
    } catch (err) {
      console.error('Failed to submit order:', err);
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
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedOrder ? (
          /* Checkout Input Form */
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block mb-1">
                Step 1 of 1 · Final Dispatch
              </span>
              <h2 className="font-display text-2xl font-medium tracking-tight text-stone-900">
                Delivery & Order Confirmation
              </h2>
            </div>

            {/* Customer Contact */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                Recipient Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-stone-500 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 text-stone-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-500 block mb-1">Email Address for Tracking</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 text-stone-800"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Destination */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                Shipping Destination
              </h3>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 text-stone-800"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-stone-500 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 text-stone-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-500 block mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 text-stone-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-stone-500 block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 text-stone-800"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                Payment Option
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-50 text-stone-900 font-medium'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-0.5 accent-stone-900"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                      <CreditCard className="w-4 h-4 text-stone-700" />
                      <span>Credit Card / Digital Wallet</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">Encrypted 256-bit instant verification</p>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    paymentMethod === 'cod'
                      ? 'border-stone-900 bg-stone-50 text-stone-900 font-medium'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 accent-stone-900"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                      <Banknote className="w-4 h-4 text-stone-700" />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">Pay upon personal package receipt</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Summary Snapshot */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal ({cartItems.length} distinct objects)</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Savings Applied ({discountCode.toUpperCase()})</span>
                  <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Freight Shipping</span>
                <span className="font-mono tabular-nums">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Estimated Tax (8.25%)</span>
                <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-semibold text-stone-900">
                <span>Total Due</span>
                <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
              <span>Need help or special delivery?</span>
              <a
                href="tel:+254702502360"
                className="font-mono font-semibold text-stone-900 hover:underline"
              >
                Call: +254 702 502360
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
            >
              {loading ? (
                <span>Confirming Order with Warehouse...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Authorize Order & Dispatch — ${total.toFixed(2)}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Order Confirmation View */
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <Check className="w-7 h-7 stroke-2" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded">
                Order Confirmed — Preparing Shipment
              </span>
              <h2 className="font-display text-3xl font-medium tracking-tight text-stone-900 mt-3">
                Thank you for your order, {confirmedOrder.customerName}.
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                A confirmation has been sent to <strong className="text-stone-800">{confirmedOrder.email}</strong>.
              </p>
            </div>

            {/* Tracking Reference Badge */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-left space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Order Reference:</span>
                <span className="font-mono font-bold text-stone-900 text-sm">{confirmedOrder.id}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Estimated Delivery:</span>
                <span className="font-medium text-stone-900">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Destination:</span>
                <span className="text-stone-700 font-mono text-[11px]">
                  {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} {confirmedOrder.shippingAddress.postalCode}
                </span>
              </div>
            </div>

            {/* Shipment Progress Pipeline */}
            <div className="text-left space-y-2 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">
                Warehouse Fulfillment Pipeline
              </span>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className="p-2 rounded bg-stone-900 text-white font-medium">1. Confirmed</div>
                <div className="p-2 rounded bg-stone-200 text-stone-800 font-medium">2. Hand-Checked</div>
                <div className="p-2 rounded bg-stone-100 text-stone-500">3. Eco-Packed</div>
                <div className="p-2 rounded bg-stone-100 text-stone-500">4. In Transit</div>
              </div>
            </div>

            {/* Itemized Order Recap */}
            <div className="text-left border-t border-stone-200 pt-4">
              <span className="text-xs font-semibold text-stone-800 block mb-2">
                Purchased Objects ({confirmedOrder.items.length})
              </span>
              <div className="divide-y divide-stone-100 text-xs">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex justify-between">
                    <span className="text-stone-700">
                      {item.quantity}× {item.title}
                    </span>
                    <span className="font-mono text-stone-900 tabular-nums">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-950">
                <span>Total Paid</span>
                <span className="font-mono tabular-nums">${confirmedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Continue Exploring Smart Home Finds
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
