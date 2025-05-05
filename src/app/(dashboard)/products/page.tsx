import { getSession } from "@/lib/auth/get-session";
import ProductPage from "./components/product-page";

export default function Products() {
  const session = getSession();
  return (
    <div>
      {JSON.stringify(session)}
      {/* <ProductPage /> */}
    </div>
  );
}
