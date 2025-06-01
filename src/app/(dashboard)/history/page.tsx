import { getAllHistory } from "@/lib/api/history";
import React from "react";

export default async function History() {
  const historyList = await getAllHistory();
  return <div>{JSON.stringify(historyList)}</div>;
}
