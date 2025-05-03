import { useState } from "react";
import { useFilterProducts } from "../hooks/useFilterProducts";
import { CategoryListProps } from "./categoryList";
import { ProductModal } from "./productModal";
import { IProduct } from "../services/api";

export const ProductList: React.FC<CategoryListProps> = ({ products }) => {
  const filteredProducts = useFilterProducts({ products });
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  return (
    <>
      <div className="flex flex-col mx-2 mt-6">
        <h2 className="font-bold text-[28px]">Products</h2>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              onClick={() => setSelectedProduct(product)}
              className="flex flex-col p-2 bg-gray-200 rounded-2xl cursor-pointer border-2 border-transparent hover:border-gray-300 "
            >
              <div className="flex gap-3 p-2">
                <div className="">
                  <img
                    src={product.image}
                    alt={product.title}
                    className=" h-[160px] min-w-[120px] aspect-square object-cover rounded-2xl"
                  />
                </div>
                <div className="inline flex-col">
                  <h4 className="font-semibold ">{product.title}</h4>
                  <span className="inline-block mt-1 bg-gray-300 rounded-2xl p-1 px-2 font-medium">
                    Price: <b>{product.price}$</b>
                  </span>
                </div>
              </div>
              <div className="flex flex-col mx-2 my-2">
                <span className="font-semibold">Description</span>
                <p className="overflow-ellipsis overflow-hidden  whitespace-nowrap text-gray-700 ">
                  {product.description}
                </p>
                <button
                  className="self-start my-2 border-[2px] border-gray-400 rounded-lg px-2 py-1 cursor-pointer font-medium hover:bg-green-500/80 hover:border-green-500/80 hover:text-white"
                  onClick={() => setSelectedProduct(product)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};
