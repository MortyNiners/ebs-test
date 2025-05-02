import { createContext, useContext, useEffect, useState } from "react";
import { getData, Product } from "../services/api";

interface IProductContext {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
}

const ProductContext = createContext<IProductContext | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    <ProductContext.Provider value={{ products, fetchProducts, loading }}>
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
