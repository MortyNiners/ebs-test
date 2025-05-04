import { createContext, useContext, useEffect, useState } from "react";
import { IProduct } from "../services/api";
import { localCartStorage } from "../utils/localCartStorage";

export interface ICartProduct extends IProduct {
  quantity: number;
}
interface ICartContext {
  cartProducts: ICartProduct[];
  addToCart: (product: IProduct, quantity: number) => void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartProducts, setCartProducts] = useState<ICartProduct[]>(() => {
    return localCartStorage([]);
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts]);

  const addToCart = (product: IProduct, quantity: number) => {
    setCartProducts((prev) => {
      const existingProducts = prev.find((p) => p.id === product.id);

      if (existingProducts) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  return (
    <CartContext.Provider value={{ cartProducts, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useProduct must be used within ProductProvider");
  return context;
};
