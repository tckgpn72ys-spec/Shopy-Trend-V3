import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../ui/Logo.jsx';
import Icon from '../ui/Icon.jsx';
import NavTabs, { TABS } from './NavTabs.jsx';
import { useCart } from '../../features/cart/CartContext.jsx';

export default function Header({ activeTab, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenu(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [menu]);

  const go = (id) => { setMenu(false); onNavigate(id); };

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header__bar">
        <div className="header__left">
          <button type="button" className="icon-btn" onClick={() => setMenu(true)} aria-label="Ouvrir le menu" aria-expanded={menu}><Icon name="menu" size={22} stroke={1.5} /></button>
        </div>
        <Logo onClick={(e) => { e.preventDefault(); go('accueil'); }} />
        <div className="header__right">
          <button type="button" className="icon-btn" onClick={() => onNavigate('tous')} aria-label="Parcourir tous les produits"><Icon name="search" size={20} stroke={1.5} /></button>
          <button type="button" className="icon-btn" onClick={openCart} aria-label={`Ouvrir ma commande${count ? ` (${count} article${count > 1 ? 's' : ''})` : ''}`}>
            <Icon name="bag" size={20} stroke={1.5} />
            {count > 0 && <motion.span key={count} className="cart-badge" initial={{ scale: 1.7 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 20 }}>{count}</motion.span>}
          </button>
        </div>
      </div>
      <NavTabs active={activeTab} onNavigate={onNavigate} />

      <AnimatePresence>
        {menu && (
          <motion.div className="menu" role="dialog" aria-modal="true" aria-label="Menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="menu__top">
              <Logo as="span" />
              <button type="button" className="icon-btn" onClick={() => setMenu(false)} aria-label="Fermer le menu"><Icon name="close" size={22} stroke={1.5} /></button>
            </div>
            <ul className="menu__list">
              {TABS.map((t, i) => (
                <motion.li key={t.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  <button type="button" className={`menu__link ${activeTab === t.id ? 'is-active' : ''}`} onClick={() => go(t.id)}>{t.label}</button>
                </motion.li>
              ))}
            </ul>
            <p className="menu__foot">Fashion · Style · Luxury</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
