import ProductListTable from "./components/product-list-table";
import { getAllProducts } from "@/lib/api/product";
import StockInformation from "./components/stock-information";

export default async function Inventory() {
  const products = await getAllProducts();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold">Inventory</h1>
      {/* {JSON.stringify(products.data)} */}
      <StockInformation />
      <ProductListTable products={products.data.object} />
    </div>
  );
}
