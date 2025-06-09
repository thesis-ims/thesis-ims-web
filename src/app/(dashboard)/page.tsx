import { getUserProfile } from "@/lib/api/profile";
import Homepage from "../homepage-components/homepage";
import { redirect } from "next/navigation";
import {
  getAllProducts,
  getCategorySummary,
  getProductNameSummary,
  getStockSummary,
} from "@/lib/api/product";

export default async function Home() {
  const stockSummary = await getStockSummary();
  const categorySummary = await getCategorySummary();
  const productNameSummary = await getProductNameSummary();
  const lowStockProducts = await getAllProducts({
    sort: "LOW_STOCK",
    page: 1,
    size: 5,
  });
  const outOfStockProducts = await getAllProducts({
    sort: "OUT_OF_STOCK",
    page: 1,
    size: 5,
  });

  // return <p>{JSON.stringify(categorySummary.data)}</p>;
  return (
    <Homepage
      productNameSummary={productNameSummary.data}
      stockSummary={stockSummary.data}
      categorySummary={categorySummary.data}
      lowStockProducts={lowStockProducts.data}
      outOfStockProducts={outOfStockProducts.data}
    />
  );
}
