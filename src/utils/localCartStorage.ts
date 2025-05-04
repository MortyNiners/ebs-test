import { ICartProduct } from "../context/CartContext";

export const localCartStorage = (storage: ICartProduct[]) => {
  const localStorageCart = localStorage.getItem("cart");
  if (!localStorageCart) localStorage.setItem("cart", "[]");

  if (storage.length === 0 && localStorageCart?.length === 0) {
    return storage;
  } else if (
    storage.length === 0 &&
    localStorageCart &&
    localStorageCart.length > 0
  ) {
    return JSON.parse(localStorageCart);
  }

  return storage;
};
