"use client";

import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  RectanglePlusIcon,
  RefreshIcon,
} from "@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { importCsv } from "@/lib/api/product";
import { ChevronDownIcon, Upload } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import Papa from "papaparse";

const importTypes = [
  { value: "REPLACE", label: "Replace" },
  { value: "APPEND", label: "Append" },
];

export default function BulkUploadForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importType, setImportType] = useState("APPEND");
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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

  return (
    <div className="border-gray-20 flex flex-col gap-10 border bg-white p-8">
      {/* download template */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">
            Download & Fill Out the Template
          </h2>

          <p className="text-sm">
            Click the button below to download the provided Excel/CSV template.
            Fill in your product data according to the format specified in the
            template to ensure the system can process it correctly.
          </p>
        </div>

        <Link href="/product_template.csv" download className="w-fit">
          <Button intent={"secondary"} size={"small"}>
            <DownloadIcon />
            <p>Download Template</p>
          </Button>
        </Link>
      </div>

      {/* upload mode selector */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Choose Upload Mode</h2>

          <p className="text-sm">
            Please select how you want the uploaded file to affect your current
            product data:
          </p>
        </div>

        {/* guideline */}
        <div className="flex flex-col gap-4 px-4">
          <div className="flex items-center gap-4">
            <RectanglePlusIcon />
            <p className="text-sm">
              <span className="font-medium">Append</span>
              <br />
              Add new products to your existing inventory. Your current product
              data will remain unchanged.
              <br />
              (Use this if you just want to add more products without removing
              the old ones.)
            </p>
          </div>

          <div className="flex items-center gap-4">
            <RefreshIcon className="text-primary-color-60 h-4 w-4" />
            <p className="text-sm">
              <span className="font-medium">Replace</span>
              <br />
              Remove all existing products and replace them with the products
              from your uploaded file.
              <br />
              (Use this only if you're sure you want to wipe all current product
              data and start fresh.)
            </p>
          </div>
        </div>

        <Select
          value={importType}
          onValueChange={(value) => {
            setImportType(value);
          }}
        >
          <SelectTrigger className="flex cursor-pointer items-center gap-4 px-4">
            <SelectValue />
            <ChevronDownIcon className="h-5 w-5" />
          </SelectTrigger>
          <SelectContent>
            {importTypes.map((type) => {
              return <SelectItem value={type.value}>{type.label}</SelectItem>;
            })}
          </SelectContent>
        </Select>
      </div>

      {/* excel file uploader */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Upload File</h2>

          <p className="text-sm">
            Upload the completed Excel (.csv) file. Make sure all data comply
            with the format requirements and ensure there are no incorrect
            formats.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />

        <div
          onClick={handleButtonClick}
          className={`flex w-fit cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-10 py-4 transition-colors hover:border-blue-500`}
        >
          <Upload className="mb-2 h-6 w-6 text-gray-400" />
          <p className="text-sm font-medium text-gray-700">
            Upload your file here
          </p>
          <p className="mt-1 text-xs text-gray-500">.csv only</p>
        </div>
      </div>
    </div>
  );
}
