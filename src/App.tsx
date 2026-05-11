/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Star, 
  ChevronRight, 
  Instagram, 
  Phone, 
  MapPin, 
  Clock,
  Cake,
  Gift,
  Heart,
  Palette,
  Truck,
  MessageSquare,
  Send
} from 'lucide-react';

// --- Types ---
interface CakeItem {
  id: number;
  name: string;
  emoji: string;
  imageUrl?: string;
  desc: string;
  price: number;
  halfKgPrice?: number;
  unit: string;
  tag: 'popular' | 'chocolate' | 'fruit' | 'custom' | 'bento' | 'snack';
  badge?: 'best' | 'new';
  oldPrice?: number;
}

// --- Data ---
const INITIAL_CAKES: CakeItem[] = [
  { id: 1, name: 'Dark Forest', emoji: '🍫', desc: 'Rich chocolate layers with cherry cream and dark cocoa — a crowd favorite.', price: 1200, halfKgPrice: 600, unit: 'kg', tag: 'popular', badge: 'best' },
  { id: 2, name: 'Red Velvet', emoji: '🌹', desc: 'Velvety red sponge with cream cheese frosting — utterly indulgent.', price: 1200, halfKgPrice: 600, unit: 'kg', tag: 'popular', badge: 'best' },
  { id: 10, name: 'White Forest', emoji: '🎂', desc: 'Snowy white chocolate shavings over light vanilla sponge and cream.', price: 1200, halfKgPrice: 600, unit: 'kg', tag: 'popular', badge: 'new' },
  { id: 3, name: 'Classic Chocolate', emoji: '🍫', desc: 'Made with premium cocoa. Timeless and irresistible for any occasion.', price: 1100, halfKgPrice: 550, unit: 'kg', tag: 'chocolate' },
  { id: 11, name: 'Mango Delight', emoji: '🥭', desc: 'Sun-ripened mango flavor with light cream for a tropical escape.', price: 950, halfKgPrice: 500, unit: 'kg', tag: 'fruit' },
  { id: 4, name: 'Strawberry Dream', emoji: '🍓', desc: 'Fresh strawberries with light cream — vibrant, fruity, and gorgeous.', price: 950, halfKgPrice: 500, unit: 'kg', tag: 'fruit' },
  { id: 5, name: 'Green Apple', emoji: '🍏', desc: 'Tangy green apple sponge with vanilla cream for a refreshing twist.', price: 950, halfKgPrice: 500, unit: 'kg', tag: 'fruit' },
  { id: 6, name: 'Kiwi Delight', emoji: '🥝', desc: 'Tropical kiwi flavor on a light sponge base. Unique and delicious.', price: 950, halfKgPrice: 500, unit: 'kg', tag: 'fruit' },
  { id: 7, name: 'Vanilla Classic', emoji: '🤍', desc: 'Pure Madagascar vanilla in a fluffy sponge with butter cream frosting.', price: 850, halfKgPrice: 450, unit: 'kg', tag: 'popular' },
  { id: 8, name: 'Vanilla Bento', emoji: '🍱', desc: 'Adorable mini vanilla cake in a signature gift box.', price: 250, unit: 'set', tag: 'bento', badge: 'new' },
  { id: 12, name: 'Fruit Bento', emoji: '🍱', desc: 'Fresh fruity mini cake in a signature gift box.', price: 260, unit: 'set', tag: 'bento' },
  { id: 13, name: 'Choco Bento', emoji: '🍱', desc: 'Rich chocolate mini cake in a signature gift box.', price: 260, unit: 'set', tag: 'bento' },
  { id: 14, name: 'Red Velvet Bento', emoji: '🍱', desc: 'Luxury red velvet mini cake in a signature gift box.', price: 280, unit: 'set', tag: 'bento' },
  { id: 15, name: 'Jar Cake', emoji: '🍯', desc: 'Delectable cake layers served in a reusable glass jar. Perfect on-the-go.', price: 50, unit: 'jar', tag: 'snack' },
  { id: 16, name: 'Cup Cake', emoji: '🧁', desc: 'Bite-sized happiness with swirls of frosting and sprinkles.', price: 30, unit: 'pc', tag: 'snack' },
  { id: 9, name: 'Combo Celebration', emoji: '🎁', desc: 'Our bestselling combo pack — mini cakes assorted by flavor.', price: 500, unit: 'combo', tag: 'popular' },
];

const CATEGORIES = [
  { name: 'Birthday Cakes', icon: <Cake className="w-6 h-6" />, desc: 'Make every birthday unforgettable', count: '12 options', filter: 'popular' },
  { name: 'Wedding Cakes', icon: <Heart className="w-6 h-6" />, desc: 'Elegant multi-tier masterpieces', count: '8 options', filter: 'custom' },
  { name: 'Bento Cakes', icon: <Gift className="w-6 h-6" />, desc: 'Handy mini cakes for gifting', count: '4 options', filter: 'bento' },
  { name: 'Jar & Cup Cakes', icon: <Gift className="w-6 h-6" />, desc: 'Quick sweets for small cravings', count: 'Varied', filter: 'snack' },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between ${
      isScrolled ? 'bg-cream/90 backdrop-blur-xl border-b border-rose/10 py-3' : 'bg-transparent'
    }`}>
      <div className="flex items-center gap-2">
        <span className="font-serif text-2xl font-black tracking-tighter text-rose-dark">
          DIA<span className="text-gold">BAKES</span>
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 uppercase font-medium text-[11px] tracking-widest text-warm-gray">
        {['Menu', 'Process', 'Gallery', 'Story'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-rose transition-colors">
            {item}
          </a>
        ))}
      </div>

      <button 
        onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-rose text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-rose-dark transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-rose/20"
      >
        Order a Cake
      </button>
    </nav>
  );
};

export default function App() {
  const [filter, setFilter] = useState<'all' | 'popular' | 'chocolate' | 'fruit' | 'custom' | 'bento' | 'snack'>('all');
  const [cakes, setCakes] = useState<CakeItem[]>(INITIAL_CAKES);
  const [cartCount, setCartCount] = useState(0);
  const [selectedCake, setSelectedCake] = useState<CakeItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<'1.0 kg' | '0.5 kg'>('1.0 kg');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    flavour: cakes[0].name,
    date: '',
    size: '1.0 kg (Classic)',
    message: '',
    notes: ''
  });

  const filteredCakes = useMemo(() => {
    if (filter === 'all') return cakes;
    return cakes.filter(c => c.tag === filter);
  }, [filter, cakes]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    if (selectedCake) {
      setFormData(prev => ({ ...prev, flavour: selectedCake.name, size: selectedSize === '1.0 kg' ? '1.0 kg (Classic)' : '0.5 kg (Miniature)' }));
      showToast(`Added ${selectedCake.emoji} ${selectedCake.name} to highlights!`);
    }
    setSelectedCake(null);
  };

  const handleImageUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setCakes(prev => prev.map(c => c.id === id ? { ...c, imageUrl: base64String } : c));
      showToast('Photo updated!');
    };
    reader.readAsDataURL(file);
  };

  const currentPrice = useMemo(() => {
    if (!selectedCake) return 0;
    if (selectedSize === '0.5 kg' && selectedCake.halfKgPrice) return selectedCake.halfKgPrice;
    return selectedCake.price;
  }, [selectedCake, selectedSize]);

  const handlePriceChange = (id: number, newPrice: string, isHalf = false) => {
    const price = parseInt(newPrice);
    if (isNaN(price)) return;
    setCakes(prev => prev.map(c => {
      if (c.id === id) {
        return isHalf ? { ...c, halfKgPrice: price } : { ...c, price };
      }
      return c;
    }));
    showToast('Price updated locally!');
  };

  const loginAdmin = () => {
    if (adminPasscode === '1234') { // Default owner passcode
      setIsAdmin(true);
      setShowAdminLogin(false);
      showToast('Welcome back, Owner! 🎂');
    } else {
      showToast('Incorrect passcode.');
    }
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Slight delay for "sexier" feel
    await new Promise(resolve => setTimeout(resolve, 800));

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '910000000000';
    const message = `🎂 *New DIABAKES Order Request!*
    
👤 *Name:* ${formData.name}
📱 *WhatsApp:* ${formData.phone}
🍰 *Flavour:* ${formData.flavour}
📏 *Size/Weight:* ${formData.size}
📅 *Preferred Date:* ${formData.date}
✉️ *Cake Message:* ${formData.message || 'None'}
📝 *Extra Notes:* ${formData.notes || 'None'}

_Sent from DIABAKES Web Store_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsSubmitting(false);
    showToast('Redirecting to WhatsApp... 🚀');
  };

  return (
    <div className="relative overflow-x-hidden pt-20">
      <Navbar />

      {/* Admin Mode Indicator */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[55] flex items-center gap-3 bg-rose text-white px-5 py-2 rounded-full shadow-2xl font-bold text-xs uppercase tracking-widest border border-white/20"
          >
            <Palette className="w-4 h-4" />
            <span>Admin Mode (Prices & Photos)</span>
            <button 
              onClick={() => { setIsAdmin(false); showToast('Logged out of Admin mode.'); }}
              className="ml-2 bg-white/20 hover:bg-white/40 px-3 py-1 rounded-full transition-colors font-black"
            >
              Exit
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="min-height-[90vh] relative flex items-center px-6 md:px-12 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 bg-gold-light text-gold px-4 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] mb-6">
              <Star className="w-3 h-3 fill-gold" />
              <span>Gourmet Handcrafted Cakes</span>
            </div>
            
            <h1 className="font-serif text-6xl md:text-8xl font-black leading-[1.05] text-charcoal mb-6">
              Every Cake<br />
              <span className="italic text-rose">Tells a Story</span>
            </h1>
            
            <p className="font-script text-2xl md:text-3xl text-warm-gray italic mb-8">
              Handcrafted with love, baked fresh daily in Manipur.
            </p>
            
            <p className="text-warm-gray leading-relaxed max-w-md mb-10">
              From intimate birthdays to grand weddings — DIABAKES creates show-stopping custom cakes that taste as beautiful as they look.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-rose text-white px-10 py-4 rounded-full font-bold shadow-2xl shadow-rose/40 hover:bg-rose-dark transition-all transform hover:-translate-y-1"
              >
                Browse Menu
              </button>
              <button 
                onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-rose text-rose px-10 py-4 rounded-full font-bold hover:bg-rose hover:text-white transition-all transform hover:-translate-y-1"
              >
                Custom Order
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-rose-light to-cream flex items-center justify-center text-[150px] md:text-[250px] shadow-[0_50px_100px_-20px_rgba(200,67,90,0.3)] relative">
              🎂
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-0 bg-white px-4 py-2 rounded-2xl shadow-xl text-xs font-bold text-rose"
              >
                🌹 Red Velvet
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-10 right-0 bg-white px-4 py-2 rounded-2xl shadow-xl text-xs font-bold text-gold"
              >
                ✨ Custom Decor
              </motion.div>
            </div>
            
            {/* Background blobs */}
            <div className="absolute -z-10 w-[120%] h-[120%] bg-radial-gradient from-rose/10 to-transparent rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-rose py-4 overflow-hidden border-y border-rose-dark/10">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 whitespace-nowrap px-12 items-center">
              <span className="font-serif italic text-white flex items-center gap-3">
                Freshly Baked Daily <Star className="w-3 h-3 fill-white" />
              </span>
              <span className="font-serif italic text-white flex items-center gap-3">
                Custom Wedding Cakes <Star className="w-3 h-3 fill-white" />
              </span>
              <span className="font-serif italic text-white flex items-center gap-3">
                Birthday Specialties <Star className="w-3 h-3 fill-white" />
              </span>
              <span className="font-serif italic text-white flex items-center gap-3">
                Bento Cake Sets <Star className="w-3 h-3 fill-white" />
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.4em] text-rose mb-4">Our Specialities</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-charcoal">
              Find Your <span className="italic text-rose">Perfect Cake</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <motion.div 
                key={cat.name}
                whileHover={{ y: -8 }}
                className="p-8 rounded-[32px] bg-cream border-2 border-transparent hover:border-rose/20 transition-all cursor-pointer group text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-6 text-rose group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h4 className="font-serif text-xl font-bold mb-2">{cat.name}</h4>
                <p className="text-warm-gray text-sm leading-relaxed mb-4">{cat.desc}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-rose-light text-rose text-[10px] font-bold uppercase tracking-wider">
                  {cat.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu & Price List */}
      <section id="menu" className="py-24 px-6 md:px-12 bg-cream/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-[10px] uppercase font-bold tracking-[0.4em] text-rose mb-4">The Price List</h2>
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
                Fresh <span className="italic text-rose">Baked Daily</span>
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['all', 'popular', 'chocolate', 'fruit', 'bento', 'snack', 'custom'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t as any)}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    filter === t ? 'bg-rose text-white shadow-lg shadow-rose/30' : 'bg-white text-warm-gray hover:bg-rose-light hover:text-rose'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredCakes.map((cake) => (
                <motion.div
                  layout
                  key={cake.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[40px] overflow-hidden border border-rose/5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] group"
                >
                  <div className="h-64 relative flex items-center justify-center text-[100px] overflow-hidden bg-cream-dark group">
                    {cake.imageUrl ? (
                      <img src={cake.imageUrl} alt={cake.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-rose/5 to-gold/5 group-hover:scale-110 transition-transform duration-700" />
                        <span className="relative z-10 drop-shadow-2xl">{cake.emoji}</span>
                      </>
                    )}
                    
                    {isAdmin && (
                      <label className="absolute inset-0 z-20 bg-charcoal/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleImageUpload(cake.id, e)} 
                        />
                        <div className="w-12 h-12 rounded-full bg-white text-rose flex items-center justify-center shadow-lg mb-2">
                          <Palette className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] uppercase font-black text-white tracking-widest">Update Photo</span>
                      </label>
                    )}

                    {cake.badge && (
                      <span className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] text-white ${
                        cake.badge === 'best' ? 'bg-gold' : 'bg-rose'
                      }`}>
                        {cake.badge === 'best' ? '⭐ Bestseller' : '✨ New'}
                      </span>
                    )}
                  </div>
                  
                  <div className="p-8">
                    <h4 className="font-serif text-2xl font-bold mb-2">{cake.name}</h4>
                    <p className="text-warm-gray text-sm leading-relaxed mb-6 h-10 overflow-hidden line-clamp-2">
                      {cake.desc}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-warm-gray/60 tracking-wider">Price from</span>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-baseline gap-2">
                            {isAdmin ? (
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1">
                                  <span className="text-[8px] uppercase font-bold text-warm-gray">1kg:</span>
                                  <input 
                                    type="number" 
                                    value={cake.price} 
                                    onChange={(e) => handlePriceChange(cake.id, e.target.value)}
                                    className="font-serif text-lg font-black text-rose w-20 bg-rose/5 border border-rose/10 rounded px-1 outline-none"
                                  />
                                </div>
                                {cake.halfKgPrice !== undefined && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-[8px] uppercase font-bold text-warm-gray">0.5kg:</span>
                                    <input 
                                      type="number" 
                                      value={cake.halfKgPrice} 
                                      onChange={(e) => handlePriceChange(cake.id, e.target.value, true)}
                                      className="font-serif text-lg font-black text-gold w-20 bg-gold/5 border border-gold/10 rounded px-1 outline-none"
                                    />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <>
                                <span className="font-serif text-2xl font-black text-rose">₹{cake.price}</span>
                                {cake.oldPrice && <span className="text-xs text-warm-gray/40 line-through">₹{cake.oldPrice}</span>}
                                <span className="text-[10px] text-warm-gray font-medium uppercase tracking-widest">/ {cake.unit}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setSelectedCake(cake)}
                        className="w-12 h-12 rounded-full bg-rose text-white flex items-center justify-center shadow-lg shadow-rose/20 hover:scale-110 transition-transform active:scale-95"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="py-24 px-6 md:px-12 bg-charcoal text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-[10px] uppercase font-bold tracking-[0.4em] text-gold mb-4">The Process</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              From Oven to <span className="italic text-rose">Doorstep</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { id: '01', title: 'Place Order', icon: <ChevronRight />, desc: 'Choose your flavor and design through our visual order form.' },
              { id: '02', title: 'We Confirm', icon: <Phone />, desc: 'Our team reach out via WhatsApp to finalize the custom details.' },
              { id: '03', title: 'Freshly Baked', icon: <Cake />, desc: 'Your cake is crafted by hand using only premium, fresh ingredients.' },
              { id: '04', title: 'Gift Delivered', icon: <Truck />, desc: 'Beautifully gift-boxed and delivered ready for your celebration.' },
            ].map((step, idx) => (
              <div key={step.id} className="relative">
                <div className="text-gold font-serif text-5xl font-black opacity-20 mb-4">{step.id}</div>
                <h4 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                  {step.title}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                {idx < 3 && <div className="hidden lg:block absolute top-6 -right-6 text-gold/30"><ChevronRight className="w-8 h-8" /></div>}
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
      </section>

      {/* Order Form */}
      <section id="order" className="py-24 px-6 md:px-12 bg-gradient-to-br from-cream to-rose-light/20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-[10px] uppercase font-bold tracking-[0.4em] text-rose mb-4">Experience Perfection</h2>
            <h3 className="font-serif text-5xl md:text-6xl font-bold text-charcoal mb-8 leading-tight">
              Order Your <span className="italic text-rose font-script text-6xl">Dream Cake</span> Today
            </h3>
            <p className="text-warm-gray text-lg leading-relaxed mb-10 max-w-md">
              Every celebration is unique. Tell us your vision, and we'll bake it to perfection. Pre-orders are recommended 24–48 hours in advance.
            </p>
            
            <div className="space-y-8">
              {[
                { title: 'Fresh Ingredients', desc: 'Sourced daily for the most vibrant taste.', icon: <Heart className="w-5 h-5" /> },
                { title: 'Artisan Decorating', desc: 'Every petal and swirl is crafted by hand.', icon: <Palette className="w-5 h-5" /> },
                { title: 'Careful Delivery', desc: 'Securely packaged for a perfect reveal.', icon: <Truck className="w-5 h-5" /> },
              ].map(feat => (
                <div key={feat.title} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-[18px] bg-white shadow-sm flex items-center justify-center text-rose flex-shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1">{feat.title}</h4>
                    <p className="text-warm-gray text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-14 rounded-[48px] shadow-[0_40px_100px_-20px_rgba(200,67,90,0.15)] border border-rose/5"
          >
            <form className="space-y-6" onSubmit={handleOrderSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-black text-warm-gray mb-2.5 tracking-widest pl-1">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Elena Gilbert" 
                    className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-2 border-transparent focus:border-rose/20 transition-all outline-none text-sm font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black text-warm-gray mb-2.5 tracking-widest pl-1">WhatsApp No.</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX" 
                    className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-2 border-transparent focus:border-rose/20 transition-all outline-none text-sm font-medium" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] uppercase font-black text-warm-gray mb-2.5 tracking-widest pl-1">Selected Flavour</label>
                <select 
                  value={formData.flavour}
                  onChange={(e) => setFormData({ ...formData, flavour: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-2 border-transparent focus:border-rose/20 transition-all outline-none text-sm font-medium appearance-none"
                >
                  {cakes.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  <option>Custom Vision</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase font-black text-warm-gray mb-2.5 tracking-widest pl-1">Preferred Date</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-2 border-transparent focus:border-rose/20 transition-all outline-none text-sm font-medium" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black text-warm-gray mb-2.5 tracking-widest pl-1">Weight / Size</label>
                  <select 
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-2 border-transparent focus:border-rose/20 transition-all outline-none text-sm font-medium appearance-none"
                  >
                    <option>0.5 kg (Miniature)</option>
                    <option>1.0 kg (Classic)</option>
                    <option>1.5 kg (Large)</option>
                    <option>2.0+ kg (Party)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-black text-warm-gray mb-2.5 tracking-widest pl-1">Message on Cake</label>
                <input 
                  type="text"
                  placeholder="e.g. Happy Birthday Roshni!" 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-2 border-transparent focus:border-rose/20 transition-all outline-none text-sm font-medium" 
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-black text-warm-gray mb-2.5 tracking-widest pl-1">Special Notes</label>
                <textarea 
                  placeholder="Design preferences, allergies, or custom instructions..." 
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-cream/50 border-2 border-transparent focus:border-rose/20 transition-all outline-none text-sm font-medium min-h-[100px]" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-charcoal text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl shadow-black/10 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <MessageSquare className="w-5 h-5 text-gold" />
                    <span>Send Order via WhatsApp</span>
                  </>
                )}
              </button>
              
              <p className="text-center text-[11px] text-warm-gray/60 font-medium">
                We'll confirm via WhatsApp within 2 hours. Pre-orders only.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white/50 pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <span className="font-serif text-2xl font-black tracking-tighter text-white mb-6 block">
              DIA<span className="text-gold">BAKES</span>
            </span>
            <p className="text-sm leading-relaxed mb-8 max-w-xs">
              Handcrafted gourmet cakes baked with love and premium ingredients in the heart of Manipur. Let us make your sweet moments extra special.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose hover:text-white transition-all"><MapPin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-[10px]">Shop Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#menu" className="hover:text-gold transition-colors">Cake Menu</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Bento Sets</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Wedding Gallery</a></li>
              <li><a href="#order" className="hover:text-gold transition-colors">Place Order</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-[10px]">Help & Info</h4>
            <ul className="space-y-4 text-sm">
              <li>
                {isAdmin ? (
                  <button onClick={() => { setIsAdmin(false); showToast('Logged out of Admin mode.'); }} className="text-rose font-bold hover:text-gold transition-colors flex items-center gap-2">
                    <X className="w-4 h-4" /> Log Out (Admin)
                  </button>
                ) : (
                  <button onClick={() => setShowAdminLogin(true)} className="hover:text-gold transition-colors">Owner Admin Panel</button>
                )}
              </li>
              <li><a href="#" className="hover:text-gold transition-colors">Storage Tips</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Allergy Info</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-[10px]">Reach Out</h4>
            <div className="space-y-6 text-sm">
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                <span>Pangantabi, Thoubal<br />Manipur, India</span>
              </div>
              <div className="flex gap-4 items-start">
                <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                <span>Pre-orders: 24/7<br />Pickup: 10AM – 6PM</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
          <span>© 2026 DIABAKES. All Rights Reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[70] bg-charcoal text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-rose animate-pulse" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminLogin(false)}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[40px] p-10 shadow-2xl overflow-hidden"
            >
              <h3 className="font-serif text-3xl font-bold mb-2">Owner Login</h3>
              <p className="text-warm-gray text-xs mb-8 uppercase tracking-widest font-bold">Price Management Portal</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase font-black text-warm-gray mb-2.5 tracking-widest">Enter Passcode</label>
                  <input 
                    type="password" 
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                    placeholder="••••"
                    className="w-full bg-cream rounded-2xl px-6 py-4 text-center text-2xl tracking-[0.5em] font-black focus:bg-rose-light/20 transition-all outline-none"
                  />
                </div>
                <button 
                  onClick={loginAdmin}
                  className="w-full bg-charcoal text-white py-5 rounded-2xl font-bold hover:bg-black transition-all"
                >
                  Unlock Edit Mode
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
            className="fixed bottom-10 right-10 z-[60] bg-rose text-white px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Order Highlights</span>
            <span className="w-6 h-6 rounded-full bg-white text-rose flex items-center justify-center text-[10px] font-bold">
              {cartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modal - Quick View */}
      <AnimatePresence>
        {selectedCake && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCake(null)}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-[40px] p-10 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedCake(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-cream flex items-center justify-center hover:bg-rose-light hover:text-rose transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  {selectedCake.imageUrl ? (
                    <img src={selectedCake.imageUrl} alt={selectedCake.name} className="w-32 h-32 rounded-3xl object-cover shadow-2xl" />
                  ) : (
                    <span className="text-7xl block drop-shadow-lg">{selectedCake.emoji}</span>
                  )}
                </div>
                <h3 className="font-serif text-3xl font-bold mb-2">{selectedCake.name}</h3>
                <p className="text-warm-gray text-sm mb-8 leading-relaxed">
                  {selectedCake.desc}
                </p>
                
                <div className="flex flex-col items-center mb-8">
                  <span className="text-[10px] uppercase font-black text-warm-gray tracking-[0.2em] mb-1">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-black text-rose">₹{currentPrice}</span>
                    <span className="text-[10px] font-bold uppercase text-warm-gray/60 tracking-widest">
                      / {selectedCake.unit === 'kg' ? selectedSize : selectedCake.unit}
                    </span>
                  </div>
                </div>

                {selectedCake.halfKgPrice && (
                  <div className="flex justify-center gap-3 mb-8">
                    {['1.0 kg', '0.5 kg'].map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size as any)}
                        className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedSize === size ? 'bg-rose text-white shadow-md' : 'bg-cream text-warm-gray hover:bg-rose-light/30'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedCake(null)}
                    className="flex-1 px-8 py-4 rounded-2xl bg-cream text-charcoal font-bold hover:bg-rose-light hover:text-rose transition-all"
                  >
                    Keep Browsing
                  </button>
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 px-8 py-4 rounded-2xl bg-rose text-white font-bold hover:bg-rose-dark shadow-lg shadow-rose/20 transition-all"
                  >
                    Add to Request
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
