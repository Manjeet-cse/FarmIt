import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTopBar from '../../components/common/AppTopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useCart } from '../../store/CartContext';
import { 
  ShoppingBag, Package, Truck, CheckCircle2, Clock, 
  ChevronRight, Download, RefreshCw, Search, ArrowRight, 
  ShieldCheck, MapPin, Phone, FileText, X, AlertCircle,
  HelpCircle, RotateCcw
} from 'lucide-react';

const INITIAL_DEMO_ORDERS = [
  {
    id: 'OD784912045',
    date: '26 Sep 2026, 11:30 AM',
    status: 'Out for Delivery',
    statusCode: 'active',
    statusBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    estimatedDelivery: 'Today by 5:00 PM',
    deliveryPartner: 'Kisan Express Logistics',
    trackingNumber: 'KEL-84920194',
    agentName: 'Ramesh Meena',
    agentPhone: '+91 98261 44520',
    paymentMethod: 'UPI (PhonePe)',
    deliveryAddress: {
      name: 'Manjeet Lodha',
      tag: 'Home Farm',
      address: 'House No. 45, Near Hanuman Temple, Village Bamori, Guna, Madhya Pradesh - 473105',
      phone: '+91 98765 43210'
    },
    items: [
      {
        id: 6,
        name: 'Premium DAP Fertilizer',
        brand: 'IFFCO',
        category: 'Fertilizers',
        unit: '50kg',
        quantity: 1,
        price: 1350,
        image: '/images/marketplace/cat_fertilizer_1776883473185.webp'
      },
      {
        id: 11,
        name: 'Organic Neem Oil',
        brand: 'AgriLife',
        category: 'Pesticides',
        unit: '1L',
        quantity: 2,
        price: 320,
        image: '/images/marketplace/neem_oil_bottle.webp'
      }
    ],
    itemSubtotal: 1990,
    deliveryFee: 50,
    totalAmount: 2040,
    timeline: [
      { title: 'Order Placed', time: '26 Sep, 11:30 AM', desc: 'Order received and verified', done: true },
      { title: 'Packed at Warehouse', time: '26 Sep, 04:15 PM', desc: 'Quality inspected & securely packed', done: true },
      { title: 'In Transit', time: '27 Sep, 08:30 AM', desc: 'Dispatched from Bhopal Rural Hub', done: true },
      { title: 'Out for Delivery', time: 'Today, 09:15 AM', desc: 'With delivery agent in Guna district', done: true, current: true },
      { title: 'Delivered', time: 'Expected by 5:00 PM', desc: 'Pending recipient handover', done: false }
    ]
  },
  {
    id: 'OD639201844',
    date: '16 Sep 2026, 03:45 PM',
    status: 'Delivered',
    statusCode: 'delivered',
    statusBadgeColor: 'bg-[#e5f9e2] text-[#006e1c] border-[#006e1c]/20',
    deliveredDate: '19 Sep 2026, 02:15 PM',
    deliveryPartner: 'Ekart Logistics',
    trackingNumber: 'EKT-77391048',
    paymentMethod: 'Cash on Delivery (Paid)',
    deliveryAddress: {
      name: 'Manjeet Lodha',
      tag: 'Home Farm',
      address: 'House No. 45, Near Hanuman Temple, Village Bamori, Guna, Madhya Pradesh - 473105',
      phone: '+91 98765 43210'
    },
    items: [
      {
        id: 1,
        name: 'Sharbati Wheat Seeds',
        brand: 'KisanBeej',
        category: 'Seeds',
        unit: '5kg',
        quantity: 2,
        price: 450,
        image: '/images/marketplace/wheat_seeds.webp'
      },
      {
        id: 16,
        name: 'Heavy Duty Shovel',
        brand: 'Tata Agrico',
        category: 'Tools',
        unit: '1 pc',
        quantity: 1,
        price: 450,
        image: '/images/marketplace/cat_tools_1776883508076.webp'
      }
    ],
    itemSubtotal: 1350,
    deliveryFee: 50,
    totalAmount: 1400,
    timeline: [
      { title: 'Order Placed', time: '16 Sep, 03:45 PM', desc: 'Order verified', done: true },
      { title: 'Packed at Warehouse', time: '17 Sep, 10:00 AM', desc: 'Sealed & tagged', done: true },
      { title: 'In Transit', time: '17 Sep, 06:20 PM', desc: 'Dispatched from Indore Hub', done: true },
      { title: 'Out for Delivery', time: '19 Sep, 08:30 AM', desc: 'Agent on route', done: true },
      { title: 'Delivered', time: '19 Sep, 02:15 PM', desc: 'Handed over to Manjeet Lodha', done: true }
    ]
  },
  {
    id: 'OD512938102',
    date: '28 Aug 2026, 09:15 AM',
    status: 'Delivered',
    statusCode: 'delivered',
    statusBadgeColor: 'bg-[#e5f9e2] text-[#006e1c] border-[#006e1c]/20',
    deliveredDate: '31 Aug 2026, 11:40 AM',
    deliveryPartner: 'Delhivery Rural',
    trackingNumber: 'DEL-55910284',
    paymentMethod: 'UPI (Google Pay)',
    deliveryAddress: {
      name: 'Manjeet Lodha',
      tag: 'Home Farm',
      address: 'House No. 45, Near Hanuman Temple, Village Bamori, Guna, Madhya Pradesh - 473105',
      phone: '+91 98765 43210'
    },
    items: [
      {
        id: 23,
        name: 'Battery Operated Sprayer 16L',
        brand: 'KisanKraft',
        category: 'Machinery',
        unit: '1 unit',
        quantity: 1,
        price: 3500,
        image: '/images/marketplace/cat_machinery_1776883521697.webp'
      },
      {
        id: 14,
        name: 'Mancozeb 75% WP Fungicide',
        brand: 'UPL',
        category: 'Pesticides',
        unit: '1kg',
        quantity: 1,
        price: 380,
        image: '/images/marketplace/fungicide_powder_packet.webp'
      }
    ],
    itemSubtotal: 3880,
    deliveryFee: 50,
    totalAmount: 3930,
    timeline: [
      { title: 'Order Placed', time: '28 Aug, 09:15 AM', desc: 'Order confirmed', done: true },
      { title: 'Packed at Warehouse', time: '28 Aug, 05:00 PM', desc: 'Secured in heavy-duty crate', done: true },
      { title: 'In Transit', time: '29 Aug, 07:00 AM', desc: 'Dispatched from Gwalior Hub', done: true },
      { title: 'Out for Delivery', time: '31 Aug, 08:00 AM', desc: 'Reached Guna Delivery Center', done: true },
      { title: 'Delivered', time: '31 Aug, 11:40 AM', desc: 'Package safely delivered', done: true }
    ]
  },
  {
    id: 'OD409128371',
    date: '15 Jul 2026, 04:20 PM',
    status: 'Delivered',
    statusCode: 'delivered',
    statusBadgeColor: 'bg-[#e5f9e2] text-[#006e1c] border-[#006e1c]/20',
    deliveredDate: '18 Jul 2026, 01:10 PM',
    deliveryPartner: 'Speed Post India',
    trackingNumber: 'SP-99120485IN',
    paymentMethod: 'UPI (Paytm)',
    deliveryAddress: {
      name: 'Manjeet Lodha',
      tag: 'Home Farm',
      address: 'House No. 45, Near Hanuman Temple, Village Bamori, Guna, Madhya Pradesh - 473105',
      phone: '+91 98765 43210'
    },
    items: [
      {
        id: 7,
        name: 'Urea 46% N (Subsidized)',
        brand: 'KRIBHCO',
        category: 'Fertilizers',
        unit: '45kg',
        quantity: 3,
        price: 266,
        image: '/images/marketplace/cat_fertilizer_1776883473185.webp'
      },
      {
        id: 18,
        name: 'Pruning Shears High Carbon',
        brand: 'Falcon',
        category: 'Tools',
        unit: '1 pc',
        quantity: 1,
        price: 550,
        image: '/images/marketplace/cat_tools_1776883508076.webp'
      }
    ],
    itemSubtotal: 1348,
    deliveryFee: 50,
    totalAmount: 1398,
    timeline: [
      { title: 'Order Placed', time: '15 Jul, 04:20 PM', desc: 'Verified under subsidy allotment', done: true },
      { title: 'Packed at Warehouse', time: '16 Jul, 11:30 AM', desc: 'Sealed fertilizer sacks', done: true },
      { title: 'In Transit', time: '16 Jul, 08:00 PM', desc: 'Dispatched via state rail courier', done: true },
      { title: 'Out for Delivery', time: '18 Jul, 09:00 AM', desc: 'Local delivery in progress', done: true },
      { title: 'Delivered', time: '18 Jul, 01:10 PM', desc: 'Successfully collected', done: true }
    ]
  }
];

export default function OrdersScreen() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { addToCart } = useCart() || {};

  // Load from localStorage or initialize with demo orders
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('farmit_orders');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse orders from localStorage', e);
    }
    // Set demo orders into localStorage on first load
    localStorage.setItem('farmit_orders', JSON.stringify(INITIAL_DEMO_ORDERS));
    return INITIAL_DEMO_ORDERS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'active' | 'delivered'
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);
  const [reorderNotification, setReorderNotification] = useState('');

  // Counts for tabs
  const activeCount = useMemo(() => orders.filter(o => o.statusCode === 'active').length, [orders]);
  const deliveredCount = useMemo(() => orders.filter(o => o.statusCode === 'delivered').length, [orders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Tab filter
      if (activeFilter === 'active' && order.statusCode !== 'active') return false;
      if (activeFilter === 'delivered' && order.statusCode !== 'delivered') return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = order.id.toLowerCase().includes(q);
        const matchesItems = order.items.some(
          i => i.name.toLowerCase().includes(q) || i.brand.toLowerCase().includes(q)
        );
        return matchesId || matchesItems;
      }
      return true;
    });
  }, [orders, activeFilter, searchQuery]);

  // Re-order handler: adds items back into cart
  const handleReorder = (order) => {
    if (addToCart) {
      order.items.forEach(item => {
        addToCart(item, item.quantity);
      });
      setReorderNotification(`Added ${order.items.length} items to your cart!`);
      setTimeout(() => {
        setReorderNotification('');
        navigate('/farmer/cart');
      }, 900);
    } else {
      navigate('/farmer/marketplace');
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface-light text-onSurface font-body">
      {/* Mobile Top App Bar */}
      {isMobile && <AppTopBar title="My Orders" showBack={false} showNotification={true} />}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="page-content flex flex-col gap-6 max-w-[1100px] mx-auto py-5 px-4 md:px-8">

          {/* Page Title & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-onSurface tracking-tight m-0">
                  My Orders
                </h1>
                <span className="text-xs font-headline font-bold px-2.5 py-0.5 rounded-full bg-[#e5f9e2] text-[#006e1c] border border-[#006e1c]/20">
                  {orders.length} Total
                </span>
              </div>
              <p className="text-onSurface-variant text-xs md:text-sm m-0 mt-1 font-medium">
                Track delivery status, view invoices, and manage past farm supply purchases
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-onSurface-variant/70" />
              <input
                type="text"
                placeholder="Search by order ID, item..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-4 bg-white border border-[#dce8dc] rounded-xl font-body text-xs text-onSurface placeholder:text-onSurface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-onSurface-variant/60 hover:text-onSurface border-none bg-transparent cursor-pointer p-0"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Re-order Toast notification */}
          {reorderNotification && (
            <div className="bg-primary text-white text-xs font-headline font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center justify-between animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>{reorderNotification}</span>
              </div>
              <span className="text-[11px] font-normal underline cursor-pointer" onClick={() => navigate('/farmer/cart')}>
                View Cart →
              </span>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 border-b border-[#e2ece0] pb-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All Orders', count: orders.length },
              { id: 'active', label: 'In Transit / Active', count: activeCount },
              { id: 'delivered', label: 'Delivered', count: deliveredCount },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-headline text-xs font-bold transition-all cursor-pointer border-none shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white text-onSurface-variant hover:text-onSurface border border-[#dce8dc]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeFilter === tab.id ? 'bg-white/25 text-white' : 'bg-[#edf3ec] text-onSurface-variant'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-[#e2ede1] flex flex-col items-center justify-center text-center shadow-2xs my-4">
              <div className="w-16 h-16 rounded-full bg-[#f4f9f4] text-primary flex items-center justify-center mb-3">
                <ShoppingBag size={28} />
              </div>
              <h3 className="font-headline font-bold text-lg text-onSurface m-0 mb-1">
                No orders found
              </h3>
              <p className="text-onSurface-variant text-xs max-w-sm m-0 mb-5 font-medium leading-relaxed">
                {searchQuery ? `No orders match "${searchQuery}". Try searching for another item or clear your search.` : 'You have no orders in this category.'}
              </p>
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-primary text-white font-headline font-bold text-xs rounded-xl border-none cursor-pointer hover:bg-[#005a16]"
                >
                  Clear Search
                </button>
              ) : (
                <button
                  onClick={() => navigate('/farmer/marketplace')}
                  className="px-5 py-2.5 bg-primary text-white font-headline font-bold text-xs rounded-xl border-none cursor-pointer hover:bg-[#005a16]"
                >
                  Browse Agri Marketplace
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredOrders.map(order => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl md:rounded-3xl border border-[#e0ece0] shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col"
                >
                  {/* Card Header: Order ID, Date, Status */}
                  <div className="bg-[#f9fbf8] px-4 md:px-6 py-3.5 border-b border-[#edf3ec] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5 text-xs">
                      <span className="font-headline font-bold text-onSurface">
                        Order #{order.id}
                      </span>
                      <span className="text-onSurface-variant/40">•</span>
                      <span className="text-onSurface-variant font-medium">
                        {order.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-headline font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border ${order.statusBadgeColor} flex items-center gap-1.5`}>
                        {order.statusCode === 'active' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
                        )}
                        {order.statusCode === 'delivered' && (
                          <CheckCircle2 size={12} className="text-[#006e1c]" />
                        )}
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Body: Items list & Details */}
                  <div className="p-4 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Products thumbnails and names */}
                    <div className="flex flex-col gap-3.5 flex-1 min-w-0">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3.5">
                          <div className="w-14 h-14 rounded-xl bg-[#f0f4f0] border border-[#dce8dc] overflow-hidden shrink-0 flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/marketplace/cat_fertilizer_1776883473185.webp';
                              }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-headline font-bold text-sm text-onSurface m-0 truncate">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-onSurface-variant mt-0.5">
                              <span className="font-medium">{item.brand}</span>
                              <span>•</span>
                              <span>Qty: {item.quantity} ({item.unit})</span>
                            </div>
                            <span className="font-headline font-extrabold text-xs text-primary mt-1 block">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* Delivery Status Note */}
                      <div className="mt-1 pt-3 border-t border-[#f4f7f4] flex items-center gap-2 text-xs text-onSurface-variant">
                        <Truck size={14} className="text-primary shrink-0" />
                        {order.statusCode === 'active' ? (
                          <span>Estimated Arrival: <strong className="text-onSurface font-bold">{order.estimatedDelivery}</strong> via {order.deliveryPartner}</span>
                        ) : (
                          <span>Delivered on <strong className="text-onSurface font-bold">{order.deliveredDate}</strong></span>
                        )}
                      </div>
                    </div>

                    {/* Total & Action Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#edf3ec] shrink-0 min-w-[200px]">
                      <div>
                        <span className="text-[11px] uppercase font-bold text-onSurface-variant block">Total Amount</span>
                        <span className="font-headline font-black text-xl md:text-2xl text-onSurface tracking-tight">
                          ₹{order.totalAmount.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-onSurface-variant font-medium block">
                          Paid via {order.paymentMethod}
                        </span>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => setTrackingOrder(order)}
                          className="flex-1 sm:flex-none px-3.5 py-2 bg-primary hover:bg-[#005a16] text-white font-headline font-bold text-xs rounded-xl border-none cursor-pointer active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1.5"
                        >
                          <Truck size={13} />
                          <span>Track Order</span>
                        </button>

                        <button
                          onClick={() => setInvoiceOrder(order)}
                          className="px-3 py-2 bg-white hover:bg-[#f2f8f1] text-primary border border-primary/30 font-headline font-bold text-xs rounded-xl cursor-pointer active:scale-95 transition-all shadow-2xs flex items-center justify-center gap-1"
                          title="View Invoice"
                        >
                          <FileText size={13} />
                          <span className="hidden sm:inline">Invoice</span>
                        </button>

                        <button
                          onClick={() => handleReorder(order)}
                          className="px-3 py-2 bg-white hover:bg-black/5 text-onSurface border border-[#dce8dc] font-headline font-semibold text-xs rounded-xl cursor-pointer active:scale-95 transition-all shadow-2xs flex items-center justify-center gap-1"
                          title="Buy again"
                        >
                          <RotateCcw size={13} />
                          <span className="hidden sm:inline">Buy Again</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* ══════════════════════════════════════════════════════════════
          LIVE TRACKING MODAL
          ══════════════════════════════════════════════════════════════ */}
      {trackingOrder && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setTrackingOrder(null)}
        >
          <div 
            className="bg-white rounded-3xl p-6 md:p-7 max-w-lg w-full border border-[#dce8dc] shadow-xl flex flex-col gap-4 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-headline font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  {trackingOrder.status}
                </span>
                <h3 className="font-headline font-bold text-lg text-onSurface m-0 mt-1">
                  Track Order #{trackingOrder.id}
                </h3>
                <p className="text-xs text-onSurface-variant m-0 mt-0.5">
                  Courier: <strong>{trackingOrder.deliveryPartner}</strong> (AWB: {trackingOrder.trackingNumber})
                </p>
              </div>
              <button
                onClick={() => setTrackingOrder(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-onSurface-variant border-none cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Delivery Agent Card (if out for delivery) */}
            {trackingOrder.agentName && (
              <div className="bg-[#f2f8f1] p-3.5 rounded-2xl border border-primary/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {trackingOrder.agentName.charAt(0)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-primary block">Delivery Agent</span>
                    <span className="font-headline font-bold text-xs text-onSurface block">{trackingOrder.agentName}</span>
                    <span className="text-[11px] text-onSurface-variant">{trackingOrder.agentPhone}</span>
                  </div>
                </div>
                <a
                  href={`tel:${trackingOrder.agentPhone}`}
                  className="px-3 py-1.5 bg-primary text-white font-headline font-bold text-xs rounded-xl flex items-center gap-1.5 no-underline shadow-xs hover:bg-[#005a16]"
                >
                  <Phone size={12} />
                  <span>Call</span>
                </a>
              </div>
            )}

            {/* Stepper Timeline */}
            <div className="py-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-onSurface-variant mb-3 m-0">
                Shipment Progress
              </h4>
              <div className="relative pl-6 flex flex-col gap-5 border-l-2 border-[#dce8dc] ml-3">
                {trackingOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative flex flex-col">
                    {/* Step Icon */}
                    <div className={`absolute -left-[31px] top-0 w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                      step.done
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white border-[#dce8dc] text-transparent'
                    }`}>
                      {step.done && <CheckCircle2 size={12} />}
                    </div>

                    <div className="flex items-baseline justify-between gap-2">
                      <span className={`text-xs font-headline font-bold ${
                        step.current ? 'text-blue-700' : step.done ? 'text-onSurface' : 'text-onSurface-variant/60'
                      }`}>
                        {step.title}
                        {step.current && (
                          <span className="ml-2 text-[10px] font-extrabold px-1.5 py-0.2 bg-blue-100 text-blue-700 rounded-sm">Current</span>
                        )}
                      </span>
                      <span className="text-[11px] text-onSurface-variant/70 font-medium whitespace-nowrap">
                        {step.time}
                      </span>
                    </div>
                    <span className="text-[11px] text-onSurface-variant mt-0.5">
                      {step.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address Details */}
            <div className="bg-[#f9fbf8] p-3.5 rounded-2xl border border-[#e4ede3] text-xs">
              <div className="flex items-center gap-1.5 font-headline font-bold text-onSurface mb-1">
                <MapPin size={14} className="text-primary" />
                <span>Delivery Address</span>
              </div>
              <p className="text-onSurface-variant m-0 leading-relaxed font-medium">
                <strong>{trackingOrder.deliveryAddress.name}</strong> • {trackingOrder.deliveryAddress.phone}<br/>
                {trackingOrder.deliveryAddress.address}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setTrackingOrder(null)}
              className="w-full py-2.5 bg-primary text-white font-headline font-bold text-xs rounded-xl border-none cursor-pointer hover:bg-[#005a16]"
            >
              Close Tracking
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          INVOICE MODAL
          ══════════════════════════════════════════════════════════════ */}
      {invoiceOrder && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setInvoiceOrder(null)}
        >
          <div 
            className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border border-[#dce8dc] shadow-xl flex flex-col gap-4 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Invoice Header */}
            <div className="flex items-start justify-between border-b border-[#edf3ec] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-headline font-black text-xl text-primary tracking-tight">FarmIT</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#e5f9e2] text-[#006e1c]">GST Tax Invoice</span>
                </div>
                <p className="text-xs text-onSurface-variant m-0 mt-1">Invoice #{invoiceOrder.id.replace('OD', 'INV-')}</p>
                <p className="text-[11px] text-onSurface-variant/70 m-0">Date: {invoiceOrder.date}</p>
              </div>
              <button
                onClick={() => setInvoiceOrder(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-onSurface-variant border-none cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Billed To */}
            <div className="text-xs bg-[#f9fbf8] p-3 rounded-xl border border-[#e4ece3]">
              <span className="text-[10px] font-bold uppercase text-onSurface-variant block mb-1">Billed To (Farmer):</span>
              <p className="font-bold text-onSurface m-0">{invoiceOrder.deliveryAddress.name}</p>
              <p className="text-onSurface-variant m-0 leading-relaxed text-[11px]">{invoiceOrder.deliveryAddress.address}</p>
              <p className="text-onSurface-variant m-0 text-[11px]">Phone: {invoiceOrder.deliveryAddress.phone}</p>
            </div>

            {/* Items Table */}
            <div className="text-xs flex flex-col gap-2">
              <div className="flex justify-between font-bold text-onSurface-variant border-b border-[#edf3ec] pb-1.5 text-[11px] uppercase">
                <span>Item</span>
                <span>Amount</span>
              </div>
              {invoiceOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-onSurface py-1 border-b border-[#f4f7f4]">
                  <div>
                    <span className="font-bold block">{it.name}</span>
                    <span className="text-[11px] text-onSurface-variant">{it.brand} • {it.quantity} x ₹{it.price}</span>
                  </div>
                  <span className="font-bold">₹{(it.price * it.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between text-onSurface-variant pt-2">
                <span>Subtotal</span>
                <span>₹{invoiceOrder.itemSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-onSurface-variant">
                <span>Standard Delivery (Rural MP)</span>
                <span>₹{invoiceOrder.deliveryFee}</span>
              </div>
              <div className="flex justify-between text-onSurface-variant">
                <span>GST (Included @ 5%)</span>
                <span>₹{Math.round(invoiceOrder.itemSubtotal * 0.05)}</span>
              </div>
              <div className="flex justify-between font-headline font-black text-base text-onSurface pt-2 border-t border-[#edf3ec]">
                <span>Total Paid</span>
                <span className="text-primary">₹{invoiceOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Print / Download Button */}
            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 bg-primary text-white font-headline font-bold text-xs rounded-xl border-none cursor-pointer hover:bg-[#005a16] flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Download size={14} />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={() => setInvoiceOrder(null)}
                className="px-4 py-2.5 bg-white text-onSurface border border-[#dce8dc] font-headline font-bold text-xs rounded-xl cursor-pointer hover:bg-black/5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
