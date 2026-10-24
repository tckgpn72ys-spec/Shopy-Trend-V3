// Catalogue. price: null => « Sur demande ». Prix en USD (FC convertis à 2500 FC = 1 $).
// image: chemin d'une photo placée dans /public/products/ (ex. '/products/montre-camel.jpg'), sinon icône élégante.
export const PRODUCTS = [
  { id: 'kayali', category: 'parfums', name: 'Kayali', price: 20, image: null, badge: null, popular: true },
  { id: 'asad-elixir', category: 'parfums', name: 'Asad Élixir', price: 15, image: null, badge: null, popular: true },
  { id: 'asad-noir', category: 'parfums', name: 'Asad Noir', price: 15, image: null, badge: null, popular: false },
  { id: 'asad-bourbon', category: 'parfums', name: 'Asad Bourbon', price: 15, image: null, badge: null, popular: false },
  { id: 'yara', category: 'parfums', name: 'Yara', price: 15, image: null, badge: null, popular: true },
  { id: 'badeel-oud', category: 'parfums', name: 'Badeel Oud', price: 10, image: null, badge: null, popular: false },
  { id: 'matelots', category: 'parfums', name: 'Matelots', price: 20, image: null, badge: null, popular: false },
  { id: 'parfum-tube', category: 'parfums', name: 'Parfum en tube', price: 2, image: null, badge: null, popular: false },
  { id: 'huile-roll', category: 'parfums', name: 'Huile de parfum roll-on', price: 1.8, image: null, badge: null, popular: false },
  { id: 'huile-orientale', category: 'parfums', name: 'Huile de parfum orientale', price: 5, image: null, badge: null, popular: false },
  { id: 'brume-phlur', category: 'parfums', name: 'Brume Phlur', price: 17, image: null, badge: null, popular: false },
  { id: 'brume-vs', category: 'parfums', name: 'Brume Victoria’s Secret', price: 13, image: null, badge: null, popular: true },
  { id: 'brume-story-of-love', category: 'parfums', name: 'Brume Story of Love', price: 2.8, image: null, badge: null, popular: false },
  { id: 'collier-trefle', category: 'bijoux', name: 'Collier trèfle', price: 4, image: null, badge: null, popular: true },
  { id: 'collier-croix', category: 'bijoux', name: 'Collier en croix', price: 4, image: null, badge: null, popular: false },
  { id: 'polo-cotele', category: 'vetements', name: 'Polo côtelé', price: 15, image: null, badge: 'Nouveau', popular: true },
  { id: 'montre-rolex', category: 'montres', name: 'Montre Rolex', price: 12, image: null, badge: null, popular: true },
];


