import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppTopBar from '../../components/common/AppTopBar';
import { useCart } from '../../store/CartContext';
import { useIsMobile } from '../../hooks/useMediaQuery';

const MOCK_PRODUCTS = [
  // Seeds
  { id: 1, name: 'Sharbati Wheat Seeds', category: 'Seeds', brand: 'KisanBeej', price: 450, unit: '5kg', rating: 4.8, verified: true, image: '/assets/marketplace/wheat_seeds.webp' },
  { id: 2, name: 'Hybrid Tomato Seeds', category: 'Seeds', brand: 'AgriPro', price: 120, unit: '50g', rating: 4.5, verified: true, image: '/assets/marketplace/tomato_seeds.webp' },
  { id: 3, name: 'Basmati Rice Seeds', category: 'Seeds', brand: 'KisanBeej', price: 800, unit: '10kg', rating: 4.9, verified: true, image: '/assets/marketplace/rice_seeds.webp' },
  { id: 4, name: 'BT Cotton Seeds', category: 'Seeds', brand: 'Nuziveedu', price: 950, unit: '450g', rating: 4.2, verified: false, image: '/assets/marketplace/cotton_seeds.webp' },
  { id: 5, name: 'Yellow Maize Seeds', category: 'Seeds', brand: 'Pioneer', price: 1200, unit: '5kg', rating: 4.6, verified: true, image: '/assets/marketplace/maize_seeds.webp' },
  // Fertilizers
  { id: 6, name: 'Premium DAP Fertilizer', category: 'Fertilizers', brand: 'IFFCO', price: 1350, unit: '50kg', rating: 4.9, verified: true, image: '/assets/marketplace/cat_fertilizer_1776883473185.webp' },
  { id: 7, name: 'Urea 46% N', category: 'Fertilizers', brand: 'KRIBHCO', price: 266, unit: '45kg', rating: 4.7, verified: true, image: '/assets/marketplace/cat_fertilizer_1776883473185.webp' },
  { id: 8, name: 'MOP - Muriate of Potash', category: 'Fertilizers', brand: 'IPL', price: 1700, unit: '50kg', rating: 4.4, verified: false, image: '/assets/marketplace/cat_fertilizer_1776883473185.webp' },
  { id: 9, name: 'Zinc Sulphate', category: 'Fertilizers', brand: 'Aries', price: 450, unit: '5kg', rating: 4.3, verified: true, image: '/assets/marketplace/cat_fertilizer_1776883473185.webp' },
  { id: 10, name: 'Organic Vermicompost', category: 'Fertilizers', brand: 'EcoFarms', price: 300, unit: '50kg', rating: 4.8, verified: true, image: '/assets/marketplace/cat_fertilizer_1776883473185.webp' },
  // Pesticides
  { id: 11, name: 'Organic Neem Oil', category: 'Pesticides', brand: 'AgriLife', price: 320, unit: '1L', rating: 4.5, verified: true, image: '/assets/marketplace/neem_oil_bottle.webp', tags: ['Organic Safe'] },
  { id: 12, name: 'Chlorpyrifos 20% EC', category: 'Pesticides', brand: 'Bayer', price: 450, unit: '1L', rating: 4.1, verified: false, image: '/assets/marketplace/pesticide_bottle_red.webp' },
  { id: 13, name: 'Imidacloprid 17.8% SL', category: 'Pesticides', brand: 'Tata Rallis', price: 850, unit: '500ml', rating: 4.6, verified: true, image: '/assets/marketplace/pesticide_bottle_red.webp' },
  { id: 14, name: 'Mancozeb 75% WP Fungicide', category: 'Pesticides', brand: 'UPL', price: 380, unit: '1kg', rating: 4.4, verified: true, image: '/assets/marketplace/fungicide_powder_packet.webp', tags: ['Recommended'] },
  { id: 15, name: 'Glyphosate 41% SL Herbicide', category: 'Pesticides', brand: 'Excel', price: 600, unit: '1L', rating: 4.3, verified: false, image: '/assets/marketplace/pesticide_bottle_red.webp' },
  // Tools
  { id: 16, name: 'Heavy Duty Shovel', category: 'Tools', brand: 'Tata Agrico', price: 450, unit: '1 pc', rating: 4.7, verified: true, image: '/assets/marketplace/cat_tools_1776883508076.webp' },
  { id: 17, name: 'Hand Sickle', category: 'Tools', brand: 'Local Forge', price: 150, unit: '1 pc', rating: 3.9, verified: false, image: '/assets/marketplace/cat_tools_1776883508076.webp' },
  { id: 18, name: 'Pruning Shears', category: 'Tools', brand: 'Falcon', price: 550, unit: '1 pc', rating: 4.8, verified: true, image: '/assets/marketplace/cat_tools_1776883508076.webp' },
  { id: 19, name: 'Watering Can 10L', category: 'Tools', brand: 'Plasto', price: 300, unit: '1 pc', rating: 4.2, verified: true, image: '/assets/marketplace/cat_tools_1776883508076.webp' },
  { id: 20, name: 'Wheelbarrow', category: 'Tools', brand: 'Tata Agrico', price: 3200, unit: '1 pc', rating: 4.6, verified: true, image: '/assets/marketplace/cat_tools_1776883508076.webp' },
  // Machinery
  { id: 21, name: 'Heavy Duty Tiller', category: 'Machinery', brand: 'Honda', price: 45000, unit: '1 unit', rating: 4.9, verified: true, image: '/assets/marketplace/cat_machinery_1776883521697.webp' },
  { id: 22, name: 'Knapsack Sprayer 16L', category: 'Machinery', brand: 'Aspee', price: 2100, unit: '1 unit', rating: 4.5, verified: true, image: '/assets/marketplace/cat_machinery_1776883521697.webp' },
  { id: 23, name: 'Battery Operated Sprayer', category: 'Machinery', brand: 'KisanKraft', price: 3500, unit: '1 unit', rating: 4.7, verified: true, image: '/assets/marketplace/cat_machinery_1776883521697.webp' },
  { id: 24, name: 'Water Pump 5HP', category: 'Machinery', brand: 'Crompton', price: 18500, unit: '1 unit', rating: 4.8, verified: true, image: '/assets/marketplace/cat_machinery_1776883521697.webp' },
  { id: 25, name: 'Chaff Cutter Machine', category: 'Machinery', brand: 'Local', price: 12000, unit: '1 unit', rating: 4.0, verified: false, image: '/assets/marketplace/cat_machinery_1776883521697.webp' },
  // Diagnosis Treatments
  { id: 101, name: 'Propiconazole 25% EC', category: 'Pesticides', brand: 'Syngenta', price: 650, unit: '500ml', rating: 4.8, verified: true, image: '/assets/marketplace/pesticide_bottle_red.webp', tags: ['Best Match', 'Fast Acting'] },
  { id: 102, name: 'Sulfur 80% WDG Fungicide', category: 'Pesticides', brand: 'UPL', price: 250, unit: '1kg', rating: 4.6, verified: true, image: '/assets/marketplace/fungicide_powder_packet.webp', tags: ['Preventative'] },
  { id: 103, name: 'Baking Soda Plant Spray', category: 'Pesticides', brand: 'EcoAgri', price: 150, unit: '500g', rating: 4.5, verified: true, image: '/assets/marketplace/organic_spray_bottle.webp', tags: ['Organic', 'Safe'] },
  { id: 104, name: 'Bio-Fungicide Trichoderma', category: 'Pesticides', brand: 'AgriLife', price: 280, unit: '1kg', rating: 4.7, verified: true, image: '/assets/marketplace/fungicide_powder_packet.webp', tags: ['Organic', 'Best Match'] }
];

const CATEGORIES = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Machinery', 'Tools'];

export default function MarketplaceScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, cartCount, cartSubtotal } = useCart();
  
  const searchParams = new URLSearchParams(location.search);
  const treatmentMode = searchParams.get('treatment');
  
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique brands for filter
  const brands = useMemo(() => {
    return [...new Set(MOCK_PRODUCTS.map(p => p.brand))].sort();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS;

    if (treatmentMode === 'chemical') {
      return result.filter(p => [101, 102, 14, 12].includes(p.id));
    } else if (treatmentMode === 'organic') {
      return result.filter(p => [11, 103, 104].includes(p.id));
    }

    // Search
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Verified
    if (verifiedOnly) {
      result = result.filter(p => p.verified);
    }

    // Brand
    if (brandFilter) {
      result = result.filter(p => p.brand === brandFilter);
    }

    // Sort
    if (sortBy === 'price_asc') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      result = result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result = result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, activeCategory, verifiedOnly, brandFilter, sortBy]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface relative">
      
      {isMobile && (
        <AppTopBar 
          title={treatmentMode ? "Treatments" : "Marketplace"} 
          showBack={true} 
          onBack={searchParams.get('from') === 'diagnosis' ? () => navigate(-1) : undefined}
          showNotification={!treatmentMode} 
          showCart={true} 
        />
      )}

      {/* ── Scrollable Content Area ─────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <main className="page-content">
          
          {/* Search Bar */}
          {!treatmentMode && (
            <div className="relative bg-surface-containerHigh rounded-2xl h-[52px] flex items-center px-4 mb-4 transition-shadow duration-200 focus-within:shadow-[0_0_0_2px_#2E7D32]">
              <span className="material-symbols-outlined text-onSurface-variant mr-3">search</span>
              <input 
                className="flex-1 bg-transparent border-none outline-none font-body text-base text-onSurface placeholder:text-[#40493d]/70" 
                placeholder="Search seeds, fertilizers, tools..." 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-transparent border-none flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-colors text-onSurface-variant hover:bg-surface-container" onClick={() => setShowFilters(!showFilters)}>
                <span className="material-symbols-outlined text-[20px]" style={{ color: showFilters ? 'var(--primary)' : 'inherit' }}>
                  tune
                </span>
              </button>
            </div>
          )}

          {/* Advanced Filters (Collapsible) */}
          {!treatmentMode && showFilters && (
            <div className="flex flex-wrap gap-2 mb-4 px-4 animate-[slideDown_0.2s_ease-out]">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-1.5 rounded-lg border border-[#bfcaba]/40 bg-surface text-onSurface font-body text-sm outline-none">
                <option value="">Sort By</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated (4★+)</option>
              </select>
              
              <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)} className="px-3 py-1.5 rounded-lg border border-[#bfcaba]/40 bg-surface text-onSurface font-body text-sm outline-none">
                <option value="">All Brands</option>
                {brands.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>

              <label className="flex items-center gap-1.5 text-sm text-onSurface cursor-pointer px-3 py-1.5 bg-surface rounded-lg border border-[#bfcaba]/40">
                <input 
                  type="checkbox" 
                  checked={verifiedOnly} 
                  onChange={(e) => setVerifiedOnly(e.target.checked)} 
                />
                <span className="material-symbols-outlined text-base text-[#1976d2]">verified</span>
                Verified Only
              </label>
            </div>
          )}

          {/* Filter Chips */}
          {!treatmentMode && (
            <div className="flex overflow-x-auto gap-3 pb-2 mb-6 px-0 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map(category => (
                <button 
                  key={category}
                  className={`flex-none snap-start whitespace-nowrap py-2 px-4 rounded-full font-label text-sm font-semibold tracking-wide cursor-pointer border transition-all duration-200 ${
                    activeCategory === category 
                      ? 'bg-primary text-white border-transparent' 
                      : 'bg-surface-containerLow text-onSurface border-[#bfcaba]/20 hover:bg-surface-container'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Treatment Banner */}
          {treatmentMode && (
            <div className="mb-6 bg-gradient-to-r from-[#d4e8d1] to-[#e5f9e2] rounded-2xl p-4 border border-[#bfcaba]/30 relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="font-headline font-bold text-[18px] text-[#0f1f11] m-0 mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">medical_services</span>
                  Recommended Treatment Products
                </h2>
                <p className="text-[13px] text-onSurface-variant m-0 font-medium">Based on your crop and disease detection</p>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <section>
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-surface-containerLowest rounded-2xl mb-[80px]">
                <span className="material-symbols-outlined text-[48px] text-onSurface-variant opacity-50 mb-4">inventory_2</span>
                <h3 className="font-headline text-xl m-0 mb-2 text-onSurface">No products found</h3>
                <p className="text-onSurface-variant text-sm m-0">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 mb-[80px] md:mb-0">
                {filteredProducts.map(product => (
                  <article key={product.id} className="bg-surface-containerLowest rounded-2xl p-3 flex flex-col gap-3 shadow-[0_4px_24px_rgba(15,31,17,0.03)] relative overflow-hidden card-hover">
                    {product.tags && product.tags.length > 0 && (
                      <div className="absolute top-2 left-2 flex flex-col gap-1 z-20 items-start">
                        {product.tags.map(tag => (
                          <span key={tag} className={`text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm tracking-wide ${tag.toLowerCase().includes('organic') ? 'bg-[#006e1c] text-white' : 'bg-[#f59e0b] text-white'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {product.verified && (
                      <div className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-10 text-[#1976d2]">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                      </div>
                    )}
                    <div className="h-32 w-full bg-surface-containerHigh rounded-xl overflow-hidden flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover opacity-90" 
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-onSurface-variant font-semibold uppercase tracking-wider">{product.brand}</span>
                        <span className="text-xs font-bold text-[#f59e0b] flex items-center gap-0.5">
                          {product.rating} <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        </span>
                      </div>
                      <h3 className="font-headline font-bold text-base leading-tight text-onSurface m-0">{product.name}</h3>
                      <p className="font-body text-sm text-onSurface-variant mt-1 mb-0">{product.unit}</p>
                      <div className="mt-auto pt-3 flex items-center justify-between">
                        <span className="font-headline font-bold text-primary text-lg">₹{product.price.toLocaleString()}</span>
                        <button className="px-3 py-1.5 rounded-full bg-primary text-white font-label font-bold text-xs whitespace-nowrap border-none shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] cursor-pointer transition-all active:scale-95 hover:opacity-90" onClick={() => addToCart(product)}>
                          Add +
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

        </main>
      </div>

      {/* Floating Elements Area */}
      
      {/* Context-Aware Sticky Checkout Bar */}
      {cartCount > 0 && (
        <div className="absolute bottom-[90px] left-0 w-full px-4 z-40">
          <div className="bg-primary-container text-[#cbffc2] rounded-2xl py-3 px-4 flex items-center justify-between shadow-[0_10px_15px_-3px_rgba(46,125,50,0.2)] backdrop-blur-md" onClick={() => navigate('/farmer/cart')}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="font-headline font-bold text-lg">₹{cartSubtotal.toLocaleString()}</span>
              <span className="text-sm opacity-80 font-body">{cartCount} item{cartCount > 1 ? 's' : ''} in cart</span>
            </div>
            <button className="bg-[#cbffc2] text-primary-container font-headline font-bold text-sm py-2 px-6 rounded-full uppercase tracking-wider flex items-center gap-2 border-none cursor-pointer transition-opacity hover:opacity-90">
              View Cart
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Bottom Nav — Mobile only ── */}
          </div>
  );
}
