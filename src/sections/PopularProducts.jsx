import { AnimatePresence, motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { PRODUCTS } from '../data/products.js';
import { CATEGORIES } from '../data/categories.js';

function pick(filter) {
  if (filter === null) return PRODUCTS.filter((p) => p.popular);
  if (filter === 'tous') return PRODUCTS;
  if (filter === 'nouveautes') return PRODUCTS.filter((p) => p.badge === 'Nouveau');
  return PRODUCTS.filter((p) => p.category === filter);
}

function titleFor(filter) {
  if (filter === null) return 'Produits populaires';
  if (filter === 'tous') return 'Tous les produits';
  if (filter === 'nouveautes') return 'Nouveautés';
  return CATEGORIES.find((c) => c.id === filter)?.label || 'Produits';
}

export default function PopularProducts({ filter, onFilter, onAdd }) {
  const items = pick(filter);
  return (
    <section id="produits" className="products" aria-labelledby="prod-title">
      <div className="container">
        <Reveal>
          <SectionHeader
            id="prod-title"
            title={titleFor(filter)}
            actionLabel={filter === null ? 'Voir tout' : 'Voir les populaires'}
            onAction={() => onFilter(filter === null ? 'tous' : null, { scroll: false })}
          />
        </Reveal>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={String(filter)} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            {items.length ? (
              <div className="products__grid">
                {items.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 4) * 0.06}><ProductCard product={p} onAdd={onAdd} /></Reveal>
                ))}
              </div>
            ) : (
              <div className="products__empty">
                <p>Cette catégorie arrive bientôt. En attendant, découvrez le reste de la sélection.</p>
                <Button variant="ghost" onClick={() => onFilter('tous', { scroll: false })}>Voir tous les produits</Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
