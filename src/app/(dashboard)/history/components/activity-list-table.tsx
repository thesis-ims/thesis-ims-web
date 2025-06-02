"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActivityProps, GetHistoryResponseProps } from "@/lib/api/history";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function ActivityListTabel({
  historyResponse,
}: {
  historyResponse: GetHistoryResponseProps;
}) {
  const [historyList, setHistoryList] = useState<ActivityProps[]>([]);

  useEffect(() => {
    setHistoryList(historyResponse.object);
  }, [historyResponse]);

  return (
    <div className="flex flex-col">
      <div className="bg-primary-color-1 p-3">
        <h2 className="text-xl font-bold text-white">Activity History</h2>
      </div>
      {/* Table */}
      <Table>
        <TableHeader className="bg-primary-color-1 text-white">
          <TableRow>
            <TableHead className="w-auto whitespace-nowrap">Date</TableHead>
            <TableHead className="w-full">Activity</TableHead>
          </TableRow>
        </TableHeader>
      </Table>

      <div className="max-h-[73vh] overflow-y-auto">
        <Table>
          <TableBody>
            {historyList.map((history, index) => (
              <TableRow key={index} className="bg-white">
                <TableCell className="w-auto pr-16 whitespace-nowrap">
                  {dayjs(history.date).format("D/M/YYYY")}
                </TableCell>
                <TableCell className="w-full">
                  <p>{history.activity}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
