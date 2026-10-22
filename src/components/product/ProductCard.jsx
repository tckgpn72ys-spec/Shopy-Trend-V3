import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../ui/Icon.jsx';
import { CATEGORIES } from '../../data/categories.js';
import { formatPrice } from '../../utils/format.js';

const swap = { initial: { scale: 0.4, opacity: 0, rotate: -45 }, animate: { scale: 1, opacity: 1, rotate: 0 }, exit: { scale: 0.4, opacity: 0, rotate: 45 }, transition: { duration: 0.22 } };

export default function ProductCard({ product, onAdd }) {
  const [fav, setFav] = useState(false);
  const [added, setAdded] = useState(false);
  const category = CATEGORIES.find((c) => c.id === product.category);

  useEffect(() => {
    if (!added) return undefined;
    const t = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(t);
  }, [added]);

  const handleAdd = () => { onAdd(product); setAdded(true); };

  return (
    <motion.article className="pcard" whileHover={{ y: -2 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
      <div className="pcard__media">
        {product.image ? (
          <img className="pcard__img" src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <span className="pcard__icon"><Icon name={category?.icon || 'gem'} size={64} stroke={0.9} /></span>
        )}
        {product.badge && <span className="pcard__badge">{product.badge}</span>}
        <motion.button type="button" className="pcard__fav" aria-pressed={fav} aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'} onClick={() => setFav((v) => !v)} whileTap={{ scale: 0.85 }}>
          <motion.span key={String(fav)} initial={{ scale: fav ? 0.6 : 1 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.3 }} style={{ display: 'grid' }}>
            <Icon name="heart" size={15} stroke={1.5} fill={fav ? 'currentColor' : 'none'} />
          </motion.span>
        </motion.button>
      </div>
      <div className="pcard__info">
        <span className="pcard__cat">{category?.label}</span>
        <h3 className="pcard__name">{product.name}</h3>
        <div className="pcard__row">
          <span className={`pcard__price ${product.price == null ? 'is-ask' : ''}`}>{formatPrice(product.price)}</span>
          <motion.button type="button" className={`pcard__add ${added ? 'is-added' : ''}`} onClick={handleAdd} whileTap={{ scale: 0.9 }} aria-label={`Ajouter ${product.name} à la commande`}>
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span key="check" {...swap}><Icon name="check" size={16} stroke={2} /></motion.span>
              ) : (
                <motion.span key="plus" {...swap}><Icon name="plus" size={16} stroke={1.8} /></motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
