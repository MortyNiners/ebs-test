import { useProduct } from "../context/ProductContext";
import { IProduct } from "../services/api";
import ArrowDown from "../assets/arrow_down.svg";
import { useState } from "react";
export interface CategoryListProps {
  products: IProduct[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ products }) => {
  const { activeCategory, setActiveCategory, setSortBy, sortBy } = useProduct();
  const [blockHidden, setBlockHidden] = useState<boolean>(false);

  const cleanDublicate = Array.from(
    new Set(products.map((a) => a.category))
  ).map((category) => {
    return products.find((a) => a.category === category);
  });
  const categoryWithAll = [{ category: "All" } as IProduct, ...cleanDublicate];

  const toggleBlockVisibility = () => {
    setBlockHidden((prev) => !prev);
  };

  return (
    <div className="flex flex-col mx-2 mt-6">
      <h2 className="font-bold text-[28px]">Categories</h2>
      <div className="flex justify-between mt-4">
        <div>
          {categoryWithAll.map((product, index) => (
            <button
              key={index}
              className={
                activeCategory === product?.category
                  ? "bg-green-500/80 mr-2 px-4 py-2 rounded-2xl text-white cursor-pointer font-medium "
                  : "bg-gray-200 mr-2 px-4 py-2 rounded-2xl cursor-pointer font-medium border-2 border-transparent hover:border-gray-300 "
              }
              onClick={() => setActiveCategory(product?.category ?? "All")}
            >
              {product?.category}
            </button>
          ))}
        </div>
        <div className="relative">
          <button
            className="flex justify-center items-center bg-gray-200  px-4 py-2 rounded-2xl cursor-pointer font-medium border-2 border-transparent hover:border-gray-300 "
            onClick={() => toggleBlockVisibility()}
          >
            Sort by: {sortBy}{" "}
            <img src={ArrowDown} alt="Arrow down" className="w-6 " />
          </button>
          <div
            className={
              blockHidden
                ? "absolute right-0 top-[50px] bg-gray-300 rounded-xl border-2 border-gray-200 overflow-hidden"
                : "hidden"
            }
          >
            <button
              className="text-start min-w-[120px] p-2 cursor-pointer hover:bg-gray-400 hover:text-white "
              onClick={() => {
                setSortBy("Lowest Price"), toggleBlockVisibility();
              }}
            >
              Lowest Price
            </button>
            <hr className="text-white" />
            <button
              className="text-start min-w-[120px] p-2 cursor-pointer hover:bg-gray-400 hover:text-white "
              onClick={() => {
                setSortBy("Highest Price"), toggleBlockVisibility();
              }}
            >
              Highest Price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
