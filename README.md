# Shopy Trend — site React + Vite

Front-end de la boutique Shopy Trend, fidèle à la maquette Figma (thème noir, argent, bordeaux, émeraude ; Cormorant Garamond + Manrope).
React 18 · Vite 5 · Framer Motion · Three.js / React Three Fiber (scène 3D du hero).

> État : code écrit et vérifié pour la syntaxe et les imports, mais **pas encore installé, compilé ni testé dans un navigateur**
> (l'environnement qui l'a produit n'a pas accès à internet). Le premier `npm install && npm run build` est le vrai test.

## Lancer en local
```bash
npm install
cp .env.example .env     # puis renseignez VITE_WHATSAPP_NUMBER
npm run dev
```
Node 18 ou plus récent.

## Déployer sur Cloudflare Pages (via GitHub, sans rien compiler chez vous)
1. Poussez ce dossier dans un dépôt GitHub.
2. Cloudflare > Workers & Pages > Create > Pages > Connect to Git > choisissez le dépôt.
3. Build command : `npm run build` · Build output directory : `dist` · Variable d'environnement `NODE_VERSION` = `20`.
4. Ajoutez la variable `VITE_WHATSAPP_NUMBER` (Settings > Variables and secrets), puis relancez un déploiement.

## Parcours de commande (sans paiement)
Le client ajoute des articles avec « + », ouvre « Votre commande », remplit nom, téléphone et quartier,
puis un message de commande pré-rempli s'ouvre dans WhatsApp. **Aucun paiement n'est géré par le site.**

## À configurer / fournir avant la mise en ligne
- `VITE_WHATSAPP_NUMBER` : numéro de la boutique (format international, chiffres seulement). Sans lui, l'envoi est bloqué et le client peut copier le message.
- Prix réels dans `src/data/products.js` (sinon « Sur demande ») et vraies photos dans `public/products/` (champ `image`).
- Textes des avantages (zones de livraison, délais) dans `src/data/benefits.js`.
- Paiement en ligne : à décider. Mobile money, carte ou paiement à la livraison demandent un prestataire (compte, clés API, contrat) et un petit service serveur (ex. Cloudflare Worker). Rien n'est prévu ni simulé ici.
- Recherche : l'icône loupe affiche pour l'instant tous les produits. Une vraie recherche demande un catalogue plus fourni.
- Suivi de commande : le lien ouvre WhatsApp. Un vrai suivi demande une base de données (Airtable, D1…).
- Domaine personnalisé, statistiques, mentions légales : à ajouter.

## Structure
```
src/
  components/ui/       Button, Icon, Logo, Reveal, SectionHeader
  components/layout/   Header, NavTabs, Footer
  components/product/  ProductCard
  components/category/ CategoryCard
  sections/            Hero (+ HeroVisual, HeroScene 3D), Categories, PopularProducts, Benefits, OrderCTA
  features/cart/       CartContext, CartDrawer (commande WhatsApp)
  data/ config/ utils/ catalogue, réglages, formats et message de commande
  styles/              tokens.css (couleurs Figma), base, components, layout, sections
```
