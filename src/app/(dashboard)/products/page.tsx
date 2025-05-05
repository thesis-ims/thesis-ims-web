import { getSession } from "@/lib/auth/get-session";
import ProductPage from "./components/product-page";
import { getAllProducts } from "@/lib/api/product";

export default async function Products() {
  const products = await getAllProducts();
  return (
    <div>
      {JSON.stringify(products.data)}
      <ProductPage />
    </div>
  );
}
