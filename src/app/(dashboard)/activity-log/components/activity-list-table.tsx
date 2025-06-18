"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ActivityProps,
  getAllHistory,
  GetHistoryResponseProps,
} from "@/lib/api/history";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ActivityListTabel({
  historyResponse,
}: {
  historyResponse: GetHistoryResponseProps;
}) {
  const [ref, inView] = useInView();
  const [currentPage, setCurrentPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [historyList, setHistoryList] = useState<ActivityProps[]>([]);

  async function loadMoreActivity() {
    if (loading) return;
    if (currentPage > historyResponse.totalPages) return;
    setLoading(true);
    const fetchMoreResponse = await getAllHistory({ page: currentPage });
    console.log(fetchMoreResponse.data);
    if (!fetchMoreResponse.error) {
      setHistoryList((prev) => [...prev, ...fetchMoreResponse.data.object]);
      setCurrentPage(currentPage + 1);
    }
    setLoading(false);
  }

  useEffect(() => {
    setHistoryList(historyResponse.object);
  }, [historyResponse]);

  useEffect(() => {
    if (inView) {
      loadMoreActivity();
    }
  }, [inView]);

  return (
    <div className="flex flex-col">
      {/* <div className="bg-primary-color-1 p-3">
        <h2 className="text-xl font-bold text-white">Activity Log</h2>
      </div> */}
      {/* Table */}
      <div className="max-h-[80vh] overflow-auto">
        <Table>
          <TableHeader className="bg-primary-color-1 text-white">
            <TableRow>
              <TableHead className="w-auto whitespace-nowrap">Date</TableHead>
              <TableHead className="w-full">Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyList.map((history) => {
              return (
                <>
                  <TableRow className="bg-white">
                    <TableCell className="w-auto pr-16 whitespace-nowrap">
                      {dayjs(history.date).format("D/M/YYYY")}
                    </TableCell>
                    <TableCell className="w-full">
                      <p>{history.activity}</p>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
            {currentPage <= historyResponse.totalPages && (
              <TableRow ref={ref}>
                <TableCell>Load more...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
