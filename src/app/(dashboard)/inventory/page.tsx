import ProductListTable from "./components/product-list-table";
import { getAllProducts } from "@/lib/api/product";
import StockInformation from "./components/stock-information";
import PageHeader from "@/components/ui/page-header";

export default async function Inventory({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = await getAllProducts({ sort: searchParams.sb as string });
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Inventory" />
      {/* {JSON.stringify(searchParams)} */}
      <StockInformation stockSummary={products.data.otherInfo} />
      <ProductListTable products={products.data.object} />
    </div>
  );
}
