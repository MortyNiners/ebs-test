import { createContext, useContext, useEffect, useState } from "react";
import { getData, IProduct } from "../services/api";

interface IProductContext {
  products: IProduct[];
  loading: boolean;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  fetchProducts: () => Promise<void>;
}

const ProductContext = createContext<IProductContext | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Best related");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getData();
      setProducts(data ?? []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProducts,
        loading,
        activeCategory,
        setActiveCategory,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProduct must be used within ProductProvider");
  return context;
};
