import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../../components/ui/Icon.jsx';
import Button from '../../components/ui/Button.jsx';
import { useCart } from './CartContext.jsx';
import { SITE } from '../../config/site.js';
import { cartTotal, formatPrice } from '../../utils/format.js';
import { buildOrderMessage, whatsappUrl } from '../../utils/order.js';

const EMPTY = { name: '', phone: '', zone: '', note: '' };

// Parcours de commande SANS paiement en ligne : le panier devient un message WhatsApp pré-rempli.
export default function CartDrawer({ onBrowse }) {
  const { items, open, closeCart, inc, dec, remove, clear } = useCart();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [missingNumber, setMissingNumber] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') closeCart(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, closeCart]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const total = cartTotal(items);
  const message = items.length ? buildOrderMessage({ items, customer: form }) : '';

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Indiquez votre nom.';
    if (!/^[+\d][\d\s().-]{6,}$/.test(form.phone.trim())) e.phone = 'Indiquez un numéro valide.';
    if (form.zone.trim().length < 2) e.zone = 'Indiquez votre commune ou quartier.';
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    if (!SITE.whatsappNumber) { setMissingNumber(true); return; }
    window.open(whatsappUrl(SITE.whatsappNumber, message), '_blank', 'noopener');
    setSent(true);
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(message); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* copie impossible */ }
  };

  const browse = () => { closeCart(); onBrowse?.(); };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="overlay" className="drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={closeCart} />
          <motion.aside key="drawer" className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
            <div className="drawer__head">
              <h2 className="drawer__title" id="drawer-title">Votre commande</h2>
              <button type="button" className="icon-btn" ref={closeRef} onClick={closeCart} aria-label="Fermer"><Icon name="close" size={22} stroke={1.5} /></button>
            </div>

            <div className="drawer__body">
              {items.length === 0 ? (
                <div className="drawer__empty">
                  <p>Votre sélection est vide. Ajoutez des articles avec le bouton « + ».</p>
                  <Button variant="primary" icon="arrow" onClick={browse}>Voir les produits</Button>
                </div>
              ) : (
                <>
                  <div>
                    <ul className="cart-lines">
                      {items.map((i) => (
                        <li className="cart-line" key={i.id}>
                          <div>
                            <p className="cart-line__name">{i.name}</p>
                            <p className="cart-line__price">{i.price != null ? formatPrice(i.price) : 'Prix à confirmer'}</p>
                          </div>
                          <div className="stepper" role="group" aria-label={`Quantité : ${i.name}`}>
                            <button type="button" onClick={() => dec(i.id)} aria-label="Retirer un"><Icon name="minus" size={14} stroke={1.8} /></button>
                            <output>{i.qty}</output>
                            <button type="button" onClick={() => inc(i.id)} aria-label="Ajouter un"><Icon name="plus" size={14} stroke={1.8} /></button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="cart-total"><span>Total</span><strong>{total != null ? formatPrice(total) : 'À confirmer'}</strong></div>
                  </div>

                  <form className="form" onSubmit={submit} noValidate>
                    <div className="field">
                      <label htmlFor="f-name">Nom</label>
                      <input id="f-name" autoComplete="name" value={form.name} onChange={update('name')} aria-invalid={!!errors.name} />
                      {errors.name && <span className="field__error">{errors.name}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="f-phone">Téléphone</label>
                      <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+243 …" value={form.phone} onChange={update('phone')} aria-invalid={!!errors.phone} />
                      {errors.phone && <span className="field__error">{errors.phone}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="f-zone">Livraison : commune / quartier</label>
                      <input id="f-zone" autoComplete="address-level2" placeholder="Ex. Gombe, Limete…" value={form.zone} onChange={update('zone')} aria-invalid={!!errors.zone} />
                      {errors.zone && <span className="field__error">{errors.zone}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="f-note">Note (facultatif)</label>
                      <textarea id="f-note" value={form.note} onChange={update('note')} />
                    </div>

                    <p className="notice">Aucun paiement en ligne. Le prix, la livraison et le mode de paiement sont confirmés avec vous sur WhatsApp.</p>

                    {missingNumber && (
                      <div className="notice notice--warn stack">
                        <p>Le numéro WhatsApp de la boutique n’est pas encore configuré (variable VITE_WHATSAPP_NUMBER). Vous pouvez copier le message et l’envoyer vous-même.</p>
                        <Button variant="ghost" onClick={copy}>{copied ? 'Message copié' : 'Copier le message'}</Button>
                      </div>
                    )}

                    {sent && (
                      <div className="notice notice--ok stack">
                        <p>WhatsApp s’est ouvert avec votre commande. Envoyez le message pour la finaliser.</p>
                        <Button variant="ghost" onClick={() => { clear(); setSent(false); setForm(EMPTY); }}>Vider ma sélection</Button>
                      </div>
                    )}

                    <Button variant="primary" type="submit" iconLeft="message" className="btn--block">Envoyer ma commande sur WhatsApp</Button>
                  </form>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
