import { cartTotal, formatPrice } from './format.js';

// Construit le message de commande envoyé sur WhatsApp. Aucun paiement n'est géré ici.
export function buildOrderMessage({ items, customer }) {
  const lines = items.map(
    (i) => `• ${i.qty} × ${i.name}${i.price != null ? ` — ${formatPrice(i.price * i.qty)}` : ''}`
  );
  const total = cartTotal(items);
  return [
    'Bonjour Shopy Trend, je souhaite passer commande :',
    '',
    ...lines,
    '',
    total != null ? `Total estimé : ${formatPrice(total)}` : 'Prix à confirmer avec vous.',
    '',
    `Nom : ${customer.name.trim()}`,
    `Téléphone : ${customer.phone.trim()}`,
    `Livraison (commune / quartier) : ${customer.zone.trim()}`,
    customer.note.trim() ? `Note : ${customer.note.trim()}` : null,
    '',
    'Merci de me confirmer la disponibilité, le prix de livraison et le mode de paiement.',
  ]
    .filter((l) => l !== null)
    .join('\n');
}

export function whatsappUrl(number, text) {
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}
