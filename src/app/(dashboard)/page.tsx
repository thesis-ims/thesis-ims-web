import { getUserProfile } from "@/lib/api/profile";
import Homepage from "../homepage";
import { redirect } from "next/navigation";
import { getAllProducts } from "@/lib/api/product";

export default async function Home() {
  const profile = await getUserProfile();
  const products = await getAllProducts({});

  return <Homepage profile={profile.data} products={products.data} />;
}
