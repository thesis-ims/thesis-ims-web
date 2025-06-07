"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { exportCsv } from "@/lib/api/product";
import { Button } from "@/components/ui/button";

export default function ExportCsv() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const res = await exportCsv();
      if (res.error || !res.data) {
        toast.error(res.message || "Export gagal");
        setLoading(false);
        return;
      }
      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "products.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Export berhasil!");
    } catch (e) {
      toast.error("Export gagal");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button onClick={handleExport} disabled={loading}>
      {loading ? "Exporting..." : "Export CSV"}
    </Button>
  );
}