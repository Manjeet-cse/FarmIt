import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTopBar from '../../components/common/AppTopBar';
import { useCart } from '../../store/CartContext';
import { useIsMobile } from '../../hooks/useMediaQuery';

export default function CheckoutScreen() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const deliveryFee = cartSubtotal > 0 ? 50 : 0;
  const total = cartSubtotal + deliveryFee;

  const handlePlaceOrder = () => {
    // Generate mock order ID
    const orderId = 'OD' + Math.floor(Math.random() * 1000000000);
    
    // Save to localStorage farmit_orders
    try {
      const stored = localStorage.getItem('farmit_orders');
      const existingOrders = stored ? JSON.parse(stored) : [];
      const newOrder = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'In Transit',
        statusCode: 'active',
        statusBadgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        estimatedDelivery: 'In 3 days',
        deliveryPartner: 'Kisan Express Logistics',
        trackingNumber: 'KEL-' + Math.floor(10000000 + Math.random() * 90000000),
        agentName: 'Ramesh Meena',
        agentPhone: '+91 98261 44520',
        paymentMethod: paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit / Debit Card',
        deliveryAddress: {
          name: 'Manjeet Lodha',
          tag: 'Home Farm',
          address: 'House No. 45, Near Hanuman Temple, Village Bamori, Guna, Madhya Pradesh - 473105',
          phone: '+91 98765 43210'
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          brand: item.brand || 'FarmIt Verified',
          category: item.category || 'Supplies',
          unit: item.unit || '1 unit',
          quantity: item.quantity,
          price: item.price,
          image: item.image || '/images/marketplace/cat_fertilizer_1776883473185.webp'
        })),
        itemSubtotal: cartSubtotal,
        deliveryFee: deliveryFee,
        totalAmount: total,
        timeline: [
          { title: 'Order Placed', time: 'Just now', desc: 'Order received and confirmed', done: true, current: true },
          { title: 'Packed at Warehouse', time: 'Expected tomorrow', desc: 'Inspection & packaging', done: false },
          { title: 'In Transit', time: 'Expected in 2 days', desc: 'Dispatch to Guna Hub', done: false },
          { title: 'Out for Delivery', time: 'Expected in 3 days', desc: 'Courier agent assignment', done: false },
          { title: 'Delivered', time: 'Expected in 3 days', desc: 'Handover at doorstep', done: false }
        ]
      };
      localStorage.setItem('farmit_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    // Clear cart
    clearCart();
    // Navigate to success screen
    navigate('/farmer/order-success', { state: { orderId } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-surface-light relative">
        {isMobile && <AppTopBar title="Checkout" />}
        <main className="flex-1 overflow-y-auto overflow-x-hidden" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>No items to checkout.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface-light relative">
      {isMobile && <AppTopBar title="Checkout" />}
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-32">
        <div className="p-4 flex flex-col gap-6 max-w-3xl md:mx-auto">
          
          {/* Address Section */}
          <section>
            <div className="flex items-center gap-2 mb-3 text-primary">
              <span className="material-symbols-outlined">location_on</span>
              <h2 className="font-headline text-[1.125rem] m-0 text-onSurface">Delivery Address</h2>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline text-base m-0">Manjeet Lodha</h3>
                <span className="bg-surface-containerHigh text-onSurface-variant text-xs py-0.5 px-2 rounded-full font-semibold">Home</span>
              </div>
              <p className="text-onSurface-variant text-sm leading-[1.5] m-0 mb-2">House No. 45, Near Hanuman Temple,<br/>Village - Bamori, Guna,<br/>Madhya Pradesh - 473105</p>
              <p className="font-semibold text-onSurface !important m-0 mb-2">+91 98765 43210</p>
              <button className="bg-transparent border border-primary text-primary font-label font-semibold py-1.5 px-4 rounded-lg cursor-pointer mt-2 w-full">Edit Address</button>
            </div>
          </section>

          {/* Order Summary */}
          <section>
            <div className="flex items-center gap-2 mb-3 text-primary">
              <span className="material-symbols-outlined">receipt_long</span>
              <h2 className="font-headline text-[1.125rem] m-0 text-onSurface">Order Summary</h2>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <div className="flex flex-col gap-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm text-onSurface-variant">
                    <span>{item.quantity}x {item.name}</span>
                    <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-[rgba(0,0,0,0.05)] my-3"></div>
              <div className="flex justify-between mb-2 text-sm text-onSurface-variant">
                <span>Subtotal</span>
                <span>₹{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2 text-sm text-onSurface-variant">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="h-px bg-[rgba(0,0,0,0.05)] my-3"></div>
              <div className="flex justify-between mb-2 text-sm text-onSurface-variant font-bold text-onSurface text-[1.125rem] !mb-0">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <div className="flex items-center gap-2 mb-3 text-primary">
              <span className="material-symbols-outlined">payments</span>
              <h2 className="font-headline text-[1.125rem] m-0 text-onSurface">Payment Method</h2>
            </div>
            <div className="flex flex-col gap-3">
              <label className={`flex items-center gap-3 bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer border transition-all duration-200 ${paymentMethod === 'upi' ? 'border-primary bg-primary-container' : 'border-transparent'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="upi" 
                  checked={paymentMethod === 'upi'} 
                  onChange={() => setPaymentMethod('upi')} 
                />
                <span className="material-symbols-outlined text-primary">qr_code_scanner</span>
                <div className="flex flex-col">
                  <span className="font-semibold text-base text-onSurface">UPI (Google Pay, PhonePe)</span>
                </div>
              </label>

              <label className={`flex items-center gap-3 bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer border transition-all duration-200 ${paymentMethod === 'cod' ? 'border-primary bg-primary-container' : 'border-transparent'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={paymentMethod === 'cod'} 
                  onChange={() => setPaymentMethod('cod')} 
                />
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                <div className="flex flex-col">
                  <span className="font-semibold text-base text-onSurface">Cash on Delivery</span>
                </div>
              </label>

              <label className={`flex items-center gap-3 bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer border transition-all duration-200 ${paymentMethod === 'card' ? 'border-primary bg-primary-container' : 'border-transparent'}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="card" 
                  checked={paymentMethod === 'card'} 
                  onChange={() => setPaymentMethod('card')} 
                />
                <span className="material-symbols-outlined text-primary">credit_card</span>
                <div className="flex flex-col">
                  <span className="font-semibold text-base text-onSurface">Credit / Debit Card</span>
                </div>
              </label>
            </div>
          </section>

        </div>
      </main>

      <div className="absolute bottom-0 left-0 w-full p-4 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-50">
        <button className="w-full h-[52px] bg-primary text-onPrimary border-none rounded-full font-label font-bold text-[1.125rem] flex items-center justify-center gap-2 cursor-pointer transition-opacity duration-200 active:opacity-90" onClick={handlePlaceOrder}>
          Place Order • ₹{total.toLocaleString()}
          <span className="material-symbols-outlined">check_circle</span>
        </button>
      </div>
    </div>
  );
}
