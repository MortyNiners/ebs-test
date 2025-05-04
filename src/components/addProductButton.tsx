import { useState } from "react";
import { useCart } from "../context/CartContext";
import { IProduct } from "../services/api";

interface IProductButton {
  product: IProduct;
  onClose: () => void;
}

export const AddProductButton: React.FC<IProductButton> = ({
  product,
  onClose,
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const quantityHandler = (value: "+" | "-") => {
    setQuantity((prev) => {
      if (value === "+") {
        return prev + 1;
      } else if (value === "-" && prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <>
      <div className="grid grid-cols-3 self-center mt-4 w-full bg-gray-300 ">
        <button
          className="self-center border-r-1 border-gray-100 py-2 cursor-pointer hover:bg-gray-400"
          onClick={() => quantityHandler("-")}
        >
          -
        </button>
        <span className=" text-center py-2">{quantity}</span>
        <button
          className="self-center border-l-1 border-gray-100 py-2 cursor-pointer hover:bg-gray-400"
          onClick={() => quantityHandler("+")}
        >
          +
        </button>
      </div>
      <button
        className="w-full text-center bg-black text-white mt-2 p-4 hover:bg-green-500/80 cursor-pointer"
        onClick={() => {
          addToCart(product, quantity);
          onClose();
        }}
      >
        Add to cart
      </button>
    </>
  );
};
