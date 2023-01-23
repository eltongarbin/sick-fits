/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, ReactNode, useContext, useState } from 'react';

const LocalStateContext = createContext({
  cartOpen: false,
  toggleCart: () => {},
  closeCart: () => {},
  openCart: () => {},
});

const { Provider: LocalStateProvider } = LocalStateContext;

type CartStateProviderProps = {
  children: ReactNode;
};

export function CartStateProvider({ children }: CartStateProviderProps) {
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
