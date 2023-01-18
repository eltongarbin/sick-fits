import { createContext, useContext, useState } from "react";

const LocalStateContext = createContext({
  cartOpen: false,
});

const { Provider: LocalStateProvider } = LocalStateContext;

export function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => setCartOpen(!cartOpen);
  const closeCart = () => setCartOpen(false);
  const openCart = () => setCartOpen(true);

  return (
    <LocalStateProvider value={{ cartOpen, toggleCart, closeCart, openCart }}>
      {children}
    </LocalStateProvider>
  );
}

export function useCart() {
  return useContext(LocalStateContext);
}
