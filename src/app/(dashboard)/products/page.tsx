import { getSession } from "@/lib/auth/get-session";
import ProductPage from "./components/product-page";

export default async function Products() {
  return (
    <div>
      <ProductPage />
    </div>
  );
}
