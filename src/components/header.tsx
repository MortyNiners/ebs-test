import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartImage from "./../assets/cart.svg";
import { Cart } from "./cart";

export const Header = () => {
  const { cartProducts } = useCart();
  const [blockHidden, setBlockHidden] = useState<boolean>(false);
  const toggleBlockVisibility = () => {
    setBlockHidden((prev) => !prev);
  };
  return (
    <>
      <div className="relative">
        <header className="flex justify-between items-center mt-4 mx-2 py-4 px-4 rounded-3xl bg-gray-200">
          <div>
            <span className="text-[28px] font-semibold">EBS Test</span>
          </div>
          <div>
            <div
              className="relative bg-blue-400 p-6 rounded-full cursor-pointer"
              onClick={() => toggleBlockVisibility()}
            >
              <img
                src={CartImage}
                alt="Cart"
                className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2"
              />
              {cartProducts.length > 0 && (
                <div className="absolute">
                  <div className="relative top-[-30px] left-[10px] bg-green-500 p-3 rounded-full">
                    <span className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 text-center text-white">
                      {cartProducts.length}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <Cart product={cartProducts} visibility={blockHidden} />
      </div>
    </>
  );
};
