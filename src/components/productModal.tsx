import { IProduct } from "../services/api";
import CloseButton from "../assets/close_button.svg";
import { AddProductButton } from "./addProductButton";
import { useEffect, useRef } from "react";
interface IProductModal {
  product: IProduct | null;
  onClose: () => void;
}

export const ProductModal: React.FC<IProductModal> = ({ product, onClose }) => {
  if (!product) return null;
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="h-full w-full fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-black/15 z-20">
      <div className="flex justify-center items-center h-full ">
        <div className="flex bg-gray-200" ref={dropdownRef}>
          <div className="flex items-center justify-center bg-white ">
            <img
              src={product.image}
              alt={product.title}
              className="w-[600px] p-10"
            />
          </div>
          <div className="inline flex-col min-w-[500px]">
            <div className="flex justify-between m-14 ">
              <div>
                <h2 className="font-semibold text-2xl max-w-[400px]">
                  {product.title}
                </h2>
                <div className="max-w-[400px] mt-2">
                  <span className="font-semibold">Description:</span>
                  <p className="mt-1">{product.description}</p>
                </div>
                <span className="inline-block mt-4 bg-green-500/80 text-white rounded-lg p-2 px-2 font-medium text-lg">
                  Price: <b>{product.price}$</b>
                </span>
                <AddProductButton product={product} onClose={onClose} />
              </div>
              <div>
                <img
                  src={CloseButton}
                  alt="Close Button"
                  className="w-4 cursor-pointer"
                  onClick={() => onClose()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
