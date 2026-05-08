import { useNavigate } from 'react-router-dom';
import AppTopBar from '../../components/common/AppTopBar';
import { useCart } from '../../store/CartContext';

export default function CartScreen() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, cartSubtotal } = useCart();

  const deliveryFee = cartSubtotal > 0 ? 50 : 0;
  const total = cartSubtotal + deliveryFee;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface-containerLowest relative">
      <AppTopBar title="My Cart" />
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-32">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 px-6 text-center">
            <span className="material-symbols-outlined text-[64px] text-onSurface-variant opacity-50 mb-6">remove_shopping_cart</span>
            <h2 className="font-headline text-[1.5rem] m-0 mb-2 text-onSurface">Your cart is empty</h2>
            <p className="text-onSurface-variant m-0 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <button className="bg-primary text-onPrimary font-label font-bold py-3 px-6 rounded-full border-none cursor-pointer" onClick={() => navigate('/farmer/marketplace')}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex flex-col gap-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex bg-white p-3 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-surface-containerHigh" />
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-headline text-base font-semibold m-0 mb-1 text-onSurface">{item.name}</h3>
                    <p className="text-[1.125rem] font-bold text-primary m-0 mb-3">₹{item.price.toLocaleString()}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3 bg-surface-containerHighest py-1 px-3 rounded-full">
                        <button className="bg-transparent border-none p-0 flex items-center cursor-pointer text-onSurface" onClick={() => updateQuantity(item.id, -1)}>
                          <span className="material-symbols-outlined text-[18px]">remove</span>
                        </button>
                        <span className="font-semibold min-w-[16px] text-center">{item.quantity}</span>
                        <button className="bg-transparent border-none p-0 flex items-center cursor-pointer text-onSurface" onClick={() => updateQuantity(item.id, 1)}>
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                      <button className="bg-transparent border-none text-error flex items-center cursor-pointer p-2" onClick={() => removeFromCart(item.id)}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <h3 className="font-headline text-[1.125rem] m-0 mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2 text-onSurface-variant text-[0.875rem]">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2 text-onSurface-variant text-[0.875rem]">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="h-px bg-[rgba(0,0,0,0.05)] my-3"></div>
              <div className="flex justify-between mb-2 text-onSurface-variant text-[0.875rem] font-bold text-onSurface text-[1.125rem] !mb-0">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {cartItems.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-50">
          <button className="w-full h-[52px] bg-primary text-onPrimary border-none rounded-full font-label font-bold text-[1.125rem] flex items-center justify-center gap-2 cursor-pointer transition-opacity duration-200 active:opacity-90" onClick={() => navigate('/farmer/checkout')}>
            Proceed to Checkout
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
}
