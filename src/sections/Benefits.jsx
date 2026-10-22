import Icon from '../components/ui/Icon.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { BENEFITS } from '../data/benefits.js';

export default function Benefits() {
  return (
    <section id="avantages" className="benefits" aria-labelledby="benefits-title">
      <div className="container">
        <Reveal className="benefits__head">
          <span className="eyebrow">Pourquoi Shopy Trend</span>
          <h2 className="benefits__title" id="benefits-title">Le premium, sans complication.</h2>
        </Reveal>
        <ul className="benefits__list">
          {BENEFITS.map((b, i) => (
            <Reveal as="li" key={b.title} className="benefit" delay={i * 0.07}>
              <span className="benefit__icon"><Icon name={b.icon} size={22} stroke={1.4} /></span>
              <div>
                <h3 className="benefit__title">{b.title}</h3>
                <p className="benefit__text">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
