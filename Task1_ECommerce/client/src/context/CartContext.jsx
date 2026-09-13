import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data.cart);
    } catch {
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
      setLoading(false);
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    const res = await api.post('/cart/add', { productId, quantity });
    setCart(res.data.cart);
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);