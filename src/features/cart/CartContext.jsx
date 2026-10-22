import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'shopy-trend:cart:v1';

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { id, name, price } = action.item;
      const found = state.find((i) => i.id === id);
      return found ? state.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) : [...state, { id, name, price: price ?? null, qty: 1 }];
    }
    case 'inc': return state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i));
    case 'dec': return state.flatMap((i) => (i.id !== action.id ? [i] : i.qty > 1 ? [{ ...i, qty: i.qty - 1 }] : []));
    case 'remove': return state.filter((i) => i.id !== action.id);
    case 'clear': return [];
    default: return state;
  }
}

function init() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter((i) => i && i.id && i.qty > 0) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], init);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* stockage indisponible */ }
  }, [items]);

  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);
  const add = useCallback((item) => dispatch({ type: 'add', item }), []);
  const inc = useCallback((id) => dispatch({ type: 'inc', id }), []);
  const dec = useCallback((id) => dispatch({ type: 'dec', id }), []);
  const remove = useCallback((id) => dispatch({ type: 'remove', id }), []);
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);
  const count = items.reduce((n, i) => n + i.qty, 0);

  const value = useMemo(() => ({ items, count, open, openCart, closeCart, add, inc, dec, remove, clear }), [items, count, open, openCart, closeCart, add, inc, dec, remove, clear]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans <CartProvider>');
  return ctx;
}
