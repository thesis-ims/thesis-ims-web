import { getUserProfile } from "@/lib/api/profile";
import Homepage from "../homepage";
import { redirect } from "next/navigation";
import { getAllProducts, getStockSummary } from "@/lib/api/product";

export default async function Home() {
  const profile = await getUserProfile();
  const stockSummary = await getStockSummary();

  return <Homepage profile={profile.data} stockSummary={stockSummary.data} />;
}
