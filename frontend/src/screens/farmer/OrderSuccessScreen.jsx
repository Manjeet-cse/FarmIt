import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderSuccessScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId || 'OD987654321';

  // Calculate delivery date (3 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDate = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="bg-surface-light flex flex-col justify-between p-6 h-full">
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="flex-1 flex flex-col items-center justify-center text-center animate-[fadeIn_0.5s_ease-out]">
        <div className="mb-8">
          <div className="w-24 h-24 bg-[#4caf50] rounded-full flex items-center justify-center shadow-[0_0_0_16px_rgba(76,175,80,0.2)] animate-[popIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)]">
            <span className="material-symbols-outlined text-[48px] text-white font-bold">check</span>
          </div>
        </div>
        
        <h1 className="font-headline text-[1.75rem] text-onSurface m-0 mb-3">Order Placed Successfully!</h1>
        <p className="font-body text-base text-onSurface-variant m-0 mb-8 leading-[1.5]">Thank you for your purchase. Your order has been received and is being processed.</p>
        
        <div className="bg-surface-containerLow p-5 rounded-2xl w-full max-w-[320px]">
          <div className="flex justify-between items-center">
            <span className="text-onSurface-variant text-[0.875rem]">Order ID</span>
            <span className="font-semibold text-onSurface text-[0.875rem]">{orderId}</span>
          </div>
          <div className="h-px bg-[rgba(0,0,0,0.05)] my-4"></div>
          <div className="flex justify-between items-center">
            <span className="text-onSurface-variant text-[0.875rem]">Estimated Delivery</span>
            <span className="font-semibold text-primary text-base">{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-6">
        <button className="bg-primary text-onPrimary border-none p-4 rounded-full font-label font-bold text-[1.125rem] cursor-pointer transition-opacity duration-200 hover:opacity-90">
          Track Order
        </button>
        <button className="bg-transparent text-primary border border-primary p-4 rounded-full font-label font-bold text-[1.125rem] cursor-pointer transition-colors duration-200 hover:bg-[rgba(46,125,50,0.05)]" onClick={() => navigate('/farmer/home')}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
