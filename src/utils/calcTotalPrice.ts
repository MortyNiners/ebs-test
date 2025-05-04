import { ICartProduct } from "../context/CartContext";

export const calculateTotalPrice = (cartProducts: ICartProduct[]) => {
  const total = cartProducts.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  return total.toFixed(2);
};
