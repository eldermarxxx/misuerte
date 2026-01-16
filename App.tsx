import React, { useState, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { ShoppingCart, Ticket, Home as HomeIcon, User, Search, Menu, X, ChevronRight, Trash2, Plus, Minus, ArrowLeft, Globe, Phone } from 'lucide-react';
import { Raffle, CartItem, UserTicket, PromoPack } from './types';
import { RaffleCard } from './components/RaffleCard';
import { LuckyDreamer } from './components/LuckyDreamer';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Mock Data
const MOCK_RAFFLES: Raffle[] = [
  {
    id: '1',
    title: 'BMW X6 Competition',
    description: 'A chance de ter uma máquina de luxo na sua garagem. Completa, teto solar e interior em couro caramelo.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    pricePerNumber: 15.00,
    totalNumbers: 1000,
    soldNumbers: 843,
    endDate: '2023-12-25',
    status: 'active'
  },
  {
    id: '2',
    title: 'iPhone 15 Pro Max + MacBook',
    description: 'O kit Apple dos sonhos para renovar seus equipamentos e produtividade.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    pricePerNumber: 2.50,
    totalNumbers: 5000,
    soldNumbers: 1200,
    endDate: '2023-11-30',
    status: 'active'
  },
  {
    id: '3',
    title: 'R$ 50.000,00 no PIX',
    description: 'Dinheiro na conta para gastar como quiser! A forma mais rápida de mudar de vida.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    pricePerNumber: 0.99,
    totalNumbers: 100000,
    soldNumbers: 45000,
    endDate: '2023-12-15',
    status: 'active'
  },
  {
    id: '4',
    title: 'Honda CB 1000R',
    description: 'Adrenalina pura em duas rodas. Design Neo Sports Café e motor de 4 cilindros.',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    pricePerNumber: 10.00,
    totalNumbers: 2000,
    soldNumbers: 150,
    endDate: '2024-01-10',
    status: 'active'
  }
];

const PROMO_PACKS: PromoPack[] = [
  { quantity: 10, discount: 0.05, label: 'Bronze' },
  { quantity: 30, discount: 0.15, label: 'Prata' },
  { quantity: 50, discount: 0.25, label: 'Ouro' },
];

// --- Components defined within App to share state easily for this demo ---

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
      <Globe className="w-4 h-4" />
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value as any)}
        className="bg-transparent border-none focus:ring-0 cursor-pointer outline-none"
      >
        <option value="pt">PT</option>
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode, cartCount: number }> = ({ children, cartCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path ? 'text-emerald-500 font-bold' : 'text-slate-600';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-1">
              Mi<span className="text-emerald-500">Suerte</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 mb-2 animate-pulse"></div>
            </Link>
            
            <div className="hidden md:block">
               <LanguageSelector />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className={`hover:text-emerald-600 transition-colors ${isActive('/')}`}>{t('nav.raffles')}</Link>
            <Link to="/my-raffles" className={`hover:text-emerald-600 transition-colors ${isActive('/my-raffles')}`}>{t('nav.myTickets')}</Link>
            <Link to="/cart" className="relative p-2 text-slate-700 hover:text-emerald-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSelector />
            <Link to="/cart" className="relative p-1 text-slate-700">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4 shadow-lg animate-fade-in-down">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-4 bg-slate-50 rounded-lg font-medium text-slate-800">
             {t('nav.raffles')}
          </Link>
          <Link to="/my-raffles" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-4 bg-slate-50 rounded-lg font-medium text-slate-800">
             {t('nav.myTickets')}
          </Link>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">{t('footer.aboutTitle')}</h3>
              <p className="text-sm leading-relaxed">
                {t('footer.aboutText')}
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">{t('footer.linksTitle')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-400">{t('footer.terms')}</a></li>
                <li><a href="#" className="hover:text-emerald-400">{t('footer.privacy')}</a></li>
                <li><a href="#" className="hover:text-emerald-400">{t('footer.regulation')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">{t('footer.supportTitle')}</h4>
              <p className="text-sm">suporte@misuerte.com</p>
              <p className="text-sm">Seg - Sex, 9h - 18h</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-xs">
            {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Pages ---

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
             {t('home.heroTitle')}
          </h1>
          <p className="text-emerald-100 text-lg mb-6">
             {t('home.heroSubtitle')}
          </p>
          <button className="bg-white text-emerald-600 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-50 transition-colors flex items-center gap-2">
             {t('home.cta')} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://picsum.photos/800/800?grayscale&blur=2')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-emerald-500" />
            {t('home.activeRaffles')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {MOCK_RAFFLES.map(raffle => (
            <RaffleCard 
              key={raffle.id} 
              raffle={raffle} 
              onClick={(id) => navigate(`/raffle/${id}`)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const RaffleDetails: React.FC<{ 
  addToCart: (item: CartItem) => void 
}> = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const raffle = MOCK_RAFFLES.find(r => r.id === id);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  
  if (!raffle) return <div>{t('raffle.notFound')}</div>;

  const handleSelectNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const handleAddPack = (quantity: number) => {
    const newNumbers = new Set(selectedNumbers);
    while (newNumbers.size < selectedNumbers.length + quantity) {
      const n = Math.floor(Math.random() * raffle.totalNumbers) + 1;
      newNumbers.add(n);
    }
    setSelectedNumbers(Array.from(newNumbers));
  };

  const handleAddToCart = () => {
    addToCart({
      raffleId: raffle.id,
      raffleTitle: raffle.title,
      numbers: selectedNumbers,
      price: calculateTotal(),
    });
    setSelectedNumbers([]);
    navigate('/cart');
  };

  const calculateTotal = () => {
    let total = selectedNumbers.length * raffle.pricePerNumber;
    const pack = PROMO_PACKS.find(p => p.quantity === selectedNumbers.length);
    if (pack) {
      total = total * (1 - pack.discount);
    }
    return total;
  };

  const currentTotal = calculateTotal();

  const handleAiNumbers = (numbers: number[]) => {
    const newSet = new Set([...selectedNumbers, ...numbers]);
    setSelectedNumbers(Array.from(newSet));
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> {t('raffle.back')}
      </button>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">
        <img 
          src={raffle.imageUrl} 
          alt={raffle.title} 
          className="w-full md:w-1/3 h-64 object-cover rounded-xl"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">{raffle.title}</h1>
          <p className="text-slate-600">{raffle.description}</p>
          
          <div className="bg-slate-50 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-bold">{t('raffle.priceLabel')}</p>
              <p className="text-2xl font-black text-emerald-600">R$ {raffle.pricePerNumber.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wide font-bold">{t('raffle.drawLabel')}</p>
              <p className="text-slate-800 font-medium">{new Date(raffle.endDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-800 text-sm">{t('raffle.promoPacks')}</h3>
            <div className="flex gap-2 flex-wrap">
              {PROMO_PACKS.map(pack => (
                <button
                  key={pack.quantity}
                  onClick={() => handleAddPack(pack.quantity)}
                  className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  +{pack.quantity} {t('raffle.numbers')} (-{pack.discount * 100}% {t('raffle.off')})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <LuckyDreamer onNumbersGenerated={handleAiNumbers} maxNumber={raffle.totalNumbers} />

      {/* Manual Selection Grid Area */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">{t('raffle.yourNumbers')} ({selectedNumbers.length})</h2>
          <div className="text-right">
            <span className="text-sm text-slate-500">{t('raffle.total')} </span>
            <span className="text-xl font-bold text-emerald-600">R$ {currentTotal.toFixed(2)}</span>
          </div>
        </div>

        {selectedNumbers.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 mb-6">
            <Ticket className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">{t('raffle.selectPrompt')}</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mb-6 max-h-48 overflow-y-auto p-2 border rounded-lg bg-slate-50">
            {selectedNumbers.map(num => (
              <div key={num} className="bg-slate-800 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm relative group cursor-pointer hover:bg-red-500" onClick={() => handleSelectNumber(num)}>
                {num}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          disabled={selectedNumbers.length === 0}
          onClick={handleAddToCart}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          {t('raffle.addToCart')}
        </button>
      </div>
    </div>
  );
};

const CartPage: React.FC<{
  cart: CartItem[];
  removeFromCart: (raffleId: string) => void;
  checkout: (userData: { name: string; phone: string }) => void;
}> = ({ cart, removeFromCart, checkout }) => {
  const { t } = useLanguage();
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleCheckoutClick = () => {
    if (!name.trim() || !phone.trim()) {
      alert(t('cart.fillAlert'));
      return;
    }
    checkout({ name, phone });
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingCart className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('cart.emptyTitle')}</h2>
        <p className="text-slate-500 mb-8">{t('cart.emptyText')}</p>
        <Link to="/" className="inline-block bg-emerald-500 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-600 transition-colors">
          {t('cart.seeRaffles')}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">{t('cart.title')}</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.raffleId} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4 items-center">
               <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Ticket className="w-6 h-6 text-slate-400" />
               </div>
               <div className="flex-grow">
                 <h3 className="font-bold text-slate-800">{item.raffleTitle}</h3>
                 <p className="text-sm text-slate-500">{item.numbers.length} {t('cart.selectedNumbers')}</p>
                 <div className="flex gap-1 mt-1 overflow-hidden h-5">
                   {item.numbers.slice(0, 5).map(n => <span key={n} className="text-xs bg-slate-100 px-1 rounded text-slate-600">{n}</span>)}
                   {item.numbers.length > 5 && <span className="text-xs text-slate-400">...</span>}
                 </div>
               </div>
               <div className="text-right">
                 <p className="font-bold text-slate-800">R$ {item.price.toFixed(2)}</p>
                 <button 
                  onClick={() => removeFromCart(item.raffleId)}
                  className="text-red-500 text-xs mt-2 hover:underline flex items-center justify-end gap-1"
                 >
                   <Trash2 className="w-3 h-3" /> {t('cart.remove')}
                 </button>
               </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-slate-800">{t('cart.summary')}</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>{t('cart.subtotal')}</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>{t('cart.discounts')}</span>
                <span>R$ 0.00</span>
              </div>
              <div className="h-px bg-slate-100 my-2"></div>
              <div className="flex justify-between font-bold text-xl text-slate-900">
                <span>{t('cart.total')}</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg mb-4 border border-slate-100">
               <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                 <User className="w-4 h-4 text-emerald-500" /> {t('cart.customerDetails')}
               </h4>
               <div className="space-y-3">
                 <div>
                   <label className="text-xs text-slate-500 font-medium mb-1 block">{t('cart.nameLabel')}</label>
                   <div className="relative">
                     <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('cart.nameLabel')}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                     />
                   </div>
                 </div>
                 <div>
                   <label className="text-xs text-slate-500 font-medium mb-1 block">{t('cart.phoneLabel')}</label>
                   <div className="relative">
                     <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(00) 00000-0000"
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
                     />
                   </div>
                 </div>
               </div>
            </div>
            
            <button 
              onClick={handleCheckoutClick}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-emerald-200 transition-all"
            >
              {t('cart.checkout')}
            </button>
            <p className="text-xs text-center text-slate-400 mt-4">
              {t('cart.secure')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyRafflesPage: React.FC<{ tickets: UserTicket[] }> = ({ tickets }) => {
  const { t } = useLanguage();

  if (tickets.length === 0) {
    return (
      <div className="text-center py-20">
         <User className="w-16 h-16 text-slate-200 mx-auto mb-4" />
         <h2 className="text-xl font-bold text-slate-700">{t('myRaffles.emptyTitle')}</h2>
         <p className="text-slate-500 mb-6">{t('myRaffles.emptyText')}</p>
         <Link to="/" className="text-emerald-500 font-bold hover:underline">{t('myRaffles.goToHome')}</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">{t('myRaffles.title')}</h1>
      <div className="grid gap-4">
        {tickets.map(ticket => (
           <div key={ticket.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
               <div>
                 <h3 className="font-bold text-lg text-slate-900">{ticket.raffleTitle}</h3>
                 <p className="text-xs text-slate-500">{t('myRaffles.boughtOn')} {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                 <div className="mt-1 flex gap-2 text-xs text-slate-500">
                   <span>{ticket.userName}</span> • <span>{ticket.userPhone}</span>
                 </div>
               </div>
               <div className="mt-2 md:mt-0">
                 <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold uppercase">
                   {ticket.status === 'confirmed' ? t('myRaffles.confirmed') : t('myRaffles.pending')}
                 </span>
               </div>
             </div>
             
             <div className="bg-slate-50 p-4 rounded-lg">
               <p className="text-sm font-bold text-slate-600 mb-2">{t('myRaffles.yourNumbers')}</p>
               <div className="flex flex-wrap gap-2">
                 {ticket.numbers.map(n => (
                   <span key={n} className="bg-white border border-slate-200 text-slate-800 font-mono text-sm w-8 h-8 flex items-center justify-center rounded-md shadow-sm">
                     {n}
                   </span>
                 ))}
               </div>
             </div>
           </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---

const AppContent: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [myTickets, setMyTickets] = useState<UserTicket[]>([]);
  const { t } = useLanguage();

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      // If item for same raffle exists, simple overwrite logic for demo
      const existing = prev.filter(i => i.raffleId !== newItem.raffleId);
      return [...existing, newItem];
    });
  };

  const removeFromCart = (raffleId: string) => {
    setCart(prev => prev.filter(i => i.raffleId !== raffleId));
  };

  const handleCheckout = (userData: { name: string; phone: string }) => {
    // Convert cart to tickets
    const newTickets: UserTicket[] = cart.map(item => ({
      id: Math.random().toString(36).substr(2, 9),
      raffleId: item.raffleId,
      raffleTitle: item.raffleTitle,
      numbers: item.numbers,
      purchaseDate: new Date().toISOString(),
      status: 'confirmed',
      userName: userData.name,
      userPhone: userData.phone,
    }));

    setMyTickets([...myTickets, ...newTickets]);
    setCart([]);
    alert(t('cart.success'));
    // In a real app, this would redirect to success page
  };

  return (
    <Router>
      <Layout cartCount={cart.length}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/raffle/:id" element={<RaffleDetails addToCart={addToCart} />} />
          <Route 
            path="/cart" 
            element={<CartPage cart={cart} removeFromCart={removeFromCart} checkout={handleCheckout} />} 
          />
          <Route path="/my-raffles" element={<MyRafflesPage tickets={myTickets} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;