// Réglages de la boutique : un seul endroit à modifier.
export const SITE = {
  name: 'Shopy Trend',
  tagline: 'Fashion · Style · Luxury',
  location: 'Kinshasa, RDC',
  // Numéro WhatsApp au format international, chiffres seulement. Défini dans .env (VITE_WHATSAPP_NUMBER).
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  currency: 'USD',
};
