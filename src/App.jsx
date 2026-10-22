import { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { CartProvider, useCart } from './features/cart/CartContext.jsx';
import CartDrawer from './features/cart/CartDrawer.jsx';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './sections/Hero.jsx';
import Categories from './sections/Categories.jsx';
import PopularProducts from './sections/PopularProducts.jsx';
import Benefits from './sections/Benefits.jsx';
import OrderCTA from './sections/OrderCTA.jsx';

function Page() {
  // filter : null (populaires) | 'tous' | 'nouveautes' | id de catégorie
  const [filter, setFilter] = useState(null);
  const { count, add, openCart } = useCart();

  const scrollToProducts = useCallback(() => {
    requestAnimationFrame(() => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }, []);

  const showProducts = useCallback((next, { scroll = true } = {}) => {
    setFilter(next);
    if (scroll) scrollToProducts();
  }, [scrollToProducts]);

  const navigate = useCallback((id) => {
    if (id === 'accueil') {
      setFilter(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showProducts(id);
    }
  }, [showProducts]);

  const startOrder = useCallback(() => { if (count > 0) openCart(); else scrollToProducts(); }, [count, openCart, scrollToProducts]);

  return (
    <>
      <a className="skip" href="#main">Aller au contenu</a>
      <Header activeTab={filter === null ? 'accueil' : filter} onNavigate={navigate} />
      <main id="main">
        <Hero onDiscover={() => showProducts(null)} onNews={() => showProducts('nouveautes')} />
        <Categories activeFilter={filter} onSelect={(id) => showProducts(id)} onSeeAll={() => showProducts('tous')} />
        <PopularProducts filter={filter} onFilter={showProducts} onAdd={add} />
        <Benefits />
        <OrderCTA onOrder={startOrder} />
      </main>
      <Footer onNavigate={navigate} onOpenOrder={openCart} />
      <CartDrawer onBrowse={scrollToProducts} />
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <Page />
      </CartProvider>
    </MotionConfig>
  );
}
