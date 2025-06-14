import ProductListTable from "./components/product-list-table";
import { getAllProducts, getStockSummary } from "@/lib/api/product";
import StockInformation from "./components/stock-information";
import PageHeader from "@/components/ui/page-header";

export default async function Inventory({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let page =
    searchParams.page == null ? 1 : Number(searchParams.page as string);

  const stockSummary = await getStockSummary();
  const products = await getAllProducts({
    size: 9,
    sort: searchParams.sb as string,
    page: page,
  });
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Inventory" />
      <StockInformation stockSummary={stockSummary.data} />
      <ProductListTable products={products.data} />
    </div>
  );
}
