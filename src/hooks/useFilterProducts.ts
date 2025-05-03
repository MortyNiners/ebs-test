import { CategoryListProps } from "../components/categoryList";
import { useProduct } from "../context/ProductContext";

export function useFilterProducts({ products }: CategoryListProps) {
  const { activeCategory, sortBy } = useProduct();
  const productsByCategory =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  if (sortBy === "Best related") {
    return productsByCategory;
  } else if (sortBy === "Lowest Price") {
    return productsByCategory.sort((a, b) => a.price - b.price);
  } else {
    return productsByCategory.sort((a, b) => b.price - a.price);
  }
}
