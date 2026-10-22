import { SITE } from '../config/site.js';

export function formatPrice(price) {
  if (price == null) return 'Sur demande';
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: SITE.currency, maximumFractionDigits: 2 }).format(price);
}

// Total du panier, ou null si au moins un article n'a pas de prix.
export function cartTotal(items) {
  if (items.some((i) => i.price == null)) return null;
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}
