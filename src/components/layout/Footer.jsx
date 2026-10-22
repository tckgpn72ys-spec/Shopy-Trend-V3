import Logo from '../ui/Logo.jsx';
import { SITE } from '../../config/site.js';
import { whatsappUrl } from '../../utils/order.js';

export default function Footer({ onNavigate, onOpenOrder }) {
  const wa = (text) => (SITE.whatsappNumber ? whatsappUrl(SITE.whatsappNumber, text) : null);
  const contact = wa('Bonjour Shopy Trend, j’ai une question.');
  const tracking = wa('Bonjour Shopy Trend, je souhaite avoir des nouvelles de ma commande.');

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo as="span" />
            <p className="footer__tagline">{SITE.tagline}</p>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <h3>Boutique</h3>
              <button type="button" className="footer__link" onClick={() => onNavigate('nouveautes')}>Nouveautés</button>
              <button type="button" className="footer__link" onClick={() => onNavigate('montres')}>Montres</button>
              <button type="button" className="footer__link" onClick={() => onNavigate('parfums')}>Parfums</button>
              <button type="button" className="footer__link" onClick={() => onNavigate('vetements')}>Vêtements</button>
            </div>
            <div className="footer__col">
              <h3>Aide</h3>
              <button type="button" className="footer__link" onClick={onOpenOrder}>Comment commander</button>
              <a className="footer__link" href="#avantages">Livraison</a>
              {contact ? <a className="footer__link" href={contact} target="_blank" rel="noopener noreferrer">Contact WhatsApp</a> : <span className="footer__link">Contact WhatsApp</span>}
              {tracking ? <a className="footer__link" href={tracking} target="_blank" rel="noopener noreferrer">Suivi de commande</a> : <span className="footer__link">Suivi de commande</span>}
            </div>
          </div>
        </div>
        <p className="footer__bottom">© {new Date().getFullYear()} {SITE.name} · {SITE.location}</p>
      </div>
    </footer>
  );
}
