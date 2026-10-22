import { motion } from 'framer-motion';

export const TABS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'nouveautes', label: 'Nouveautés' },
  { id: 'montres', label: 'Montres' },
  { id: 'parfums', label: 'Parfums' },
  { id: 'vetements', label: 'Vêtements' },
];

export default function NavTabs({ active, onNavigate }) {
  return (
    <nav className="nav" aria-label="Navigation principale">
      {TABS.map((t) => (
        <button key={t.id} type="button" className={`nav__link ${active === t.id ? 'is-active' : ''}`} aria-current={active === t.id ? 'page' : undefined} onClick={() => onNavigate(t.id)}>
          {t.label}
          {active === t.id && <motion.span layoutId="nav-underline" className="nav__underline" transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} />}
        </button>
      ))}
    </nav>
  );
}
