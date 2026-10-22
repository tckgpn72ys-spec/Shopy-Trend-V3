import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Icon from '../components/ui/Icon.jsx';

// La scène 3D est chargée à part, après le premier affichage, pour ne pas ralentir la page.
const HeroScene = lazy(() => import('./HeroScene.jsx'));

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function HeroVisual({ onChip }) {
  const ref = useRef(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (!hasWebGL()) return undefined;
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 400));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => setMount(true));
    return () => cancel(id);
  }, []);

  // Met la 3D en pause quand le visuel n'est pas à l'écran (économie de batterie).
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`hero-visual ${ready ? 'is-3d' : ''}`} ref={ref}>
      <div className="hero-visual__glow" />
      <div className="hero-visual__rings" aria-hidden="true"><span /><span /></div>
      <div className="hero-visual__mark" aria-hidden="true">ST</div>
      {mount && (
        <div className="hero-visual__canvas" aria-hidden="true">
          <Suspense fallback={null}>
            <HeroScene active={inView} animate={!reduce} onReady={() => setReady(true)} />
          </Suspense>
        </div>
      )}
      <p className="hero-visual__tag" aria-hidden="true">FASHION · STYLE · LUXURY</p>
      <button type="button" className="chip" onClick={onChip}>
        <span className="dot" />
        Nouveautés de la semaine
        <Icon name="arrow" size={14} stroke={1.8} />
      </button>
    </div>
  );
}
