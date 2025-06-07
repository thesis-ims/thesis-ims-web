import ProductListTable from "./components/product-list-table";
import { getAllProducts } from "@/lib/api/product";
import StockInformation from "./components/stock-information";
import PageHeader from "@/components/ui/page-header";
import ImportCsv from "./components/import-csv";
import ExportCsv from "./components/export-csv";

export default async function Inventory({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let page =
    searchParams.page == null ? 1 : Number(searchParams.page as string);
  const products = await getAllProducts({
    sort: searchParams.sb as string,
    page: page,
  });
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Inventory" />
      <ImportCsv />
      <ExportCsv />
      <StockInformation stockSummary={products.data.otherInfo} />
      <ProductListTable products={products.data} />
    </div>
  );
}
