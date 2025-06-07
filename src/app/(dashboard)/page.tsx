import { getUserProfile } from "@/lib/api/profile";
import Homepage from "../homepage-components/homepage";
import { redirect } from "next/navigation";
import {
  getAllProducts,
  getCategorySummary,
  getStockSummary,
} from "@/lib/api/product";

export default async function Home() {
  const profile = await getUserProfile();
  const stockSummary = await getStockSummary();
  const categorySummary = await getCategorySummary();
  const lowStockProducts = await getAllProducts({
    sort: "LOW_STOCK",
    page: 1,
  });
  const outOfStockProducts = await getAllProducts({
    sort: "OUT_OF_STOCK",
    page: 1,
  });

  // return <p>{JSON.stringify(categorySummary.data)}</p>;
  return (
    <Homepage
      profile={profile.data}
      stockSummary={stockSummary.data}
      categorySummary={categorySummary.data}
      lowStockProducts={lowStockProducts.data}
      outOfStockProducts={outOfStockProducts.data}
    />
  );
}
