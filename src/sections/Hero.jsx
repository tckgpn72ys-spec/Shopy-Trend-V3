import { motion } from 'framer-motion';
import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import HeroVisual from './HeroVisual.jsx';

const ease = [0.22, 1, 0.36, 1];
const line = (delay) => ({ initial: { y: '105%' }, animate: { y: 0 }, transition: { duration: 0.9, ease, delay } });

export default function Hero({ onDiscover, onNews }) {
  return (
    <section id="accueil" className="hero container" aria-labelledby="hero-title">
      <div className="hero__copy">
        <Reveal as="div" y={8}><span className="eyebrow"><span className="dot" />Nouvelle collection</span></Reveal>
        <h1 className="hero__title" id="hero-title">
          <span className="line"><motion.span {...line(0.05)}>L’élégance,</motion.span></span>
          <span className="line"><motion.span {...line(0.18)}><em>simplement.</em></motion.span></span>
        </h1>
        <Reveal delay={0.3}>
          <p className="hero__text">Montres, parfums et pièces sélectionnées pour celles et ceux qui aiment le style, sans compromis sur la qualité.</p>
        </Reveal>
        <Reveal delay={0.4} style={{ width: '100%' }}>
          <Button variant="primary" icon="arrow" onClick={onDiscover}>Découvrir la collection</Button>
        </Reveal>
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.25 }}>
        <HeroVisual onChip={onNews} />
      </motion.div>
    </section>
  );
}
