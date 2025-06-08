"use client";

import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { importCsv } from "@/lib/api/product";

const importTypes = [
  { value: "REPLACE", label: "Replace" },
  { value: "APPEND", label: "Append" },
];

export default function CsvImportSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importType, setImportType] = useState<"APPEND" | "REPLACE">("APPEND");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const text = await file.text();
      const parsed = Papa.parse(text, { header: true });
      if (parsed.errors.length) {
        toast.error("CSV tidak valid");
        setLoading(false);
        return;
      }

      const base64 = await toBase64(file);

      const payload = {
        importType,
        csvData: base64.split(",")[1],
      };

      const res = await importCsv(payload);

      if (res.error) {
        toast.error(res.message || "Import gagal");
      } else {
        toast.success(res.message || "Import berhasil!");
      }
    } catch (err: any) {
      toast.error("Import gagal");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return (
    <div className="mb-4 flex flex-col items-center gap-4 md:flex-row">
      <a
        href="/product_template.csv"
        download
        className="text-blue-600 underline"
      >
        Download CSV Template
      </a>

      <select
        className="rounded border px-2 py-1"
        value={importType}
        onChange={(e) => setImportType(e.target.value as "APPEND" | "REPLACE")}
        disabled={loading}
      >
        {importTypes.map((type) => (
          <option value={type.value} key={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
        disabled={loading}
      />
      <Button
        intent="secondary"
        size="small"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
      >
        {loading ? "Importing..." : "Import CSV"}
      </Button>
    </div>
  );
}
