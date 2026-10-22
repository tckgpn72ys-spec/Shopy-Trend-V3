import { motion } from 'framer-motion';
import Icon from '../ui/Icon.jsx';

export default function CategoryCard({ category, active, onSelect }) {
  return (
    <motion.button
      type="button"
      className={`cat-card ${active ? 'is-active' : ''}`}
      aria-pressed={active}
      onClick={() => onSelect(category.id)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="cat-card__icon"><Icon name={category.icon} size={22} stroke={1.4} /></span>
      <span className="cat-card__label">
        <span className="cat-card__name">{category.label}</span>
        <span className="cat-card__more">Découvrir <Icon name="arrow" size={12} stroke={1.8} /></span>
      </span>
    </motion.button>
  );
}
