import PageHeader from "@/components/ui/page-header";
import { getAllHistory } from "@/lib/api/history";
import React from "react";
import ActivityListTabel from "./components/activity-list-table";

export default async function History() {
  const historyResponse = await getAllHistory({});
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Activity Log" />
      {/* {JSON.stringify(historyResponse.data.object)} */}
      <ActivityListTabel historyResponse={historyResponse.data} />
    </div>
  );
}
