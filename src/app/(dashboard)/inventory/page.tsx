import ProductListTable from "./components/product-list-table";
import { getAllProducts } from "@/lib/api/product";
import StockInformation from "./components/stock-information";
import PageHeader from "@/components/ui/page-header";

export default async function Inventory() {
  const products = await getAllProducts();
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Inventory" />
      {/* {JSON.stringify(products.data)} */}
      <StockInformation />
      <ProductListTable products={products.data.object} />
    </div>
  );
}
