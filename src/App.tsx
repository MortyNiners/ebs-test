import { CategoryList } from "./components/categoryList";
import { Header } from "./components/header";
import { ProductList } from "./components/productList";
import { useProduct } from "./context/ProductContext";

function App() {
  const { products } = useProduct();
  return (
    <section className="max-w-[1600px] mx-auto">
      <Header />
      <CategoryList products={products} />
      <ProductList products={products} />
    </section>
  );
}

export default App;
