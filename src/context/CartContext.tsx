import { createContext, useContext, useEffect, useState } from "react";
import { IProduct } from "../services/api";
import { localCartStorage } from "../utils/localCartStorage";

export interface ICartProduct extends IProduct {
  quantity: number;
}
interface ICartContext {
  cartProducts: ICartProduct[];
  addToCart: (product: IProduct, quantity: number) => void;
  addCartItem: (productId: number) => void;
  removeCartItem: (productId: number) => void;
  removeSpecificCartItem: (productId: number) => void;
  emptyCart: () => void;
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
  const addCartItem = (productId: number) => {
    setCartProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity++ } : p
      )
    );
  };
  const removeCartItem = (productId: number) => {
    setCartProducts((prev) => {
      const quantityCheck = prev.filter((item) => item.id === productId);
      if (quantityCheck[0].quantity > 0) {
        return prev.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity-- } : p
        );
      } else if (quantityCheck[0].quantity === 0) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev;
    });
  };
  const removeSpecificCartItem = (productId: number) => {
    setCartProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const emptyCart = () => {
    setCartProducts([]);
    localStorage.removeItem("cart");
    console.log(cartProducts);
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        emptyCart,
        removeCartItem,
        addCartItem,
        removeSpecificCartItem,
      }}
    >
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
