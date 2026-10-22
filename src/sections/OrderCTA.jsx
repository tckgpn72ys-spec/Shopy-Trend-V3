import Button from '../components/ui/Button.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { SITE } from '../config/site.js';
import { whatsappUrl } from '../utils/order.js';

export default function OrderCTA({ onOrder }) {
  const contact = SITE.whatsappNumber ? whatsappUrl(SITE.whatsappNumber, 'Bonjour Shopy Trend, j’ai une question.') : null;
  return (
    <section id="commander" className="cta">
      <div className="container">
        <Reveal className="cta__card">
          <span className="cta__ring" aria-hidden="true" />
          <span className="cta__eyebrow">Commander</span>
          <h2 className="cta__title">Prêt à passer<br />commande ?</h2>
          <p className="cta__text">Choisissez vos articles, nous nous occupons du reste.</p>
          <div className="cta__buttons">
            <Button variant="light" icon="arrow" onClick={onOrder}>Commander maintenant</Button>
            {contact ? (
              <Button variant="ghost-on-color" iconLeft="message" href={contact} target="_blank" rel="noopener noreferrer">Écrire sur WhatsApp</Button>
            ) : (
              <Button variant="ghost-on-color" iconLeft="message" aria-disabled="true" title="Numéro WhatsApp non configuré">Écrire sur WhatsApp</Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
