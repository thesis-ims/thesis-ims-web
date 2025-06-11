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
import CsvImportSection, {
  CsvFileObjectProps,
} from "@/app/(dashboard)/inventory/components/import-csv";
import { fileToBase64 } from "@/utils/file-to-base64-converter";
import { useRouter } from "next/navigation";

const importTypes = [
  { value: "REPLACE", label: "Replace" },
  { value: "APPEND", label: "Append" },
];

export default function BulkUploadForm() {
  const router = useRouter();
  const [importType, setImportType] = useState("APPEND");
  const [loading, setLoading] = useState(false);
  const [csvFileObject, setCsvFileObject] = useState<CsvFileObjectProps>(
    {} as CsvFileObjectProps,
  );

  async function uploadCSVFile() {
    if (!csvFileObject?.base64) {
      toast.error("Unggah file .xlsx / .xls terlebih dahulu!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        importType,
        csvData: csvFileObject?.base64!,
      };

      const res = await importCsv(payload);

      if (res.error) {
        toast.error(res.message || "Import gagal");
      } else {
        toast.success(res.message || "Import berhasil!");
        router.push("/inventory");
      }
    } catch (err: any) {
      toast.error("Import gagal");
    }
    setLoading(false);
  }

  return (
    <div className="border-gray-20 flex flex-col gap-10 border bg-white p-8">
      {/* {JSON.stringify(csvFileObject)} */}

      {/* download template */}
      <div className="flex gap-4">
        <div className="border-primary-color-60 text-primary-color-60 mt-[6px] flex h-4 w-4 items-center justify-center rounded-xs border-2 text-[10px] font-medium">
          1
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">
              Download & Fill Out the Template
            </h2>

            <p className="text-sm">
              Click the button below to download the provided Excel/CSV
              template. Fill in your product data according to the format
              specified in the template to ensure the system can process it
              correctly.
            </p>
          </div>

          <Link href="/product_template.xlsx" download className="w-fit">
            <Button intent={"secondary"} size={"small"}>
              <DownloadIcon />
              <p>Download Template</p>
            </Button>
          </Link>
        </div>
      </div>

      {/* upload mode selector */}
      <div className="flex gap-4">
        <div className="border-primary-color-60 text-primary-color-60 mt-[6px] flex h-4 w-4 items-center justify-center rounded-xs border-2 text-[10px] font-medium">
          2
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Choose Upload Mode</h2>

            <p className="text-sm">
              Please select how you want the uploaded file to affect your
              current product data:
            </p>
          </div>

          {/* guideline */}
          <div className="flex flex-col gap-4 px-4">
            <div className="flex items-center gap-4">
              <RectanglePlusIcon />
              <p className="text-sm">
                <span className="font-medium">Append</span>
                <br />
                Add new products to your existing inventory. Your current
                product data will remain unchanged.
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
                (Use this only if you're sure you want to wipe all current
                product data and start fresh.)
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
      </div>

      {/* csv file uploader */}
      <div className="flex gap-4">
        <div className="border-primary-color-60 text-primary-color-60 mt-[6px] flex h-4 w-4 items-center justify-center rounded-xs border-2 text-[10px] font-medium">
          3
        </div>
        <CsvImportSection
          csvFileObject={csvFileObject}
          setCsvFileObject={setCsvFileObject}
        />
      </div>

      {/* cta buttons */}
      <div className="flex w-full items-center justify-end gap-6">
        <Button
          size={"default"}
          intent={"primary"}
          disabled={loading}
          onClick={() => {
            uploadCSVFile();
          }}
        >
          Add Multiple Product
        </Button>
        <Button
          size={"default"}
          intent={"secondary"}
          disabled={loading}
          onClick={() => {
            router.back();
          }}
        >
          Discard
        </Button>
      </div>
    </div>
  );
}
