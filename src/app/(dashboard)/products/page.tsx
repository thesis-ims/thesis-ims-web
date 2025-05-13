import ProductListTable from "./components/product-list-table";
import { getAllProducts } from "@/lib/api/product";

export default async function Products() {
  const products = await getAllProducts();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">Products</h1>
      {JSON.stringify(products.data)}
      <div>stocks section</div>
      <ProductListTable products={products.data.object} />
    </div>
  );
}
