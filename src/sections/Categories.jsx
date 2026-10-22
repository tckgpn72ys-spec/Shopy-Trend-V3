import SectionHeader from '../components/ui/SectionHeader.jsx';
import CategoryCard from '../components/category/CategoryCard.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { CATEGORIES } from '../data/categories.js';

export default function Categories({ activeFilter, onSelect, onSeeAll }) {
  return (
    <section id="categories" className="categories" aria-labelledby="cat-title">
      <div className="container">
        <Reveal><SectionHeader id="cat-title" title="Catégories" actionLabel="Tout voir" onAction={onSeeAll} /></Reveal>
        <div className="categories__track">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06} className="categories__item">
              <CategoryCard category={c} active={activeFilter === c.id} onSelect={onSelect} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
