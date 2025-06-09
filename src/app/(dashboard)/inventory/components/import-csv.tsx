"use client";

import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { importCsv } from "@/lib/api/product";
import { Upload, FileText, X } from "lucide-react";
import { CsvFileObjectProps } from "../../add-product/bulk/components/bulk-upload";
import { fileToBase64 } from "@/utils/file-to-base64-converter";

export default function CsvImportSection({
  csvFileObject,
  setCsvFileObject,
}: {
  csvFileObject: CsvFileObjectProps;
  setCsvFileObject: (data: CsvFileObjectProps) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const parsed = Papa.parse(text, { header: true });
    if (parsed.errors.length) {
      toast.error("CSV tidak valid");
      return;
    }

    const base64 = await fileToBase64(file);

    setCsvFileObject({ base64: base64, file: file });
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    setCsvFileObject({ base64: "", file: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Upload File</h2>

        <p className="text-sm">
          Upload the completed Excel (.csv) file. Make sure all data comply with
          the format requirements and ensure there are no incorrect formats.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
      />

      {csvFileObject.file ? (
        <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">
                {csvFileObject.file.name}
              </p>
              <p className="text-xs text-green-600">
                {(csvFileObject.file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button
            onClick={handleRemoveFile}
            className="rounded-full p-1 text-green-600 transition-colors hover:bg-green-100"
            title="Remove file"
          >
            <X className="h-4 w-4 cursor-pointer" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleButtonClick}
          className={`flex w-fit cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-10 py-4 transition-colors hover:border-blue-500`}
        >
          <Upload className="mb-2 h-5 w-5 text-gray-400" />
          <p className="text-sm font-medium text-gray-700">
            Upload your file here
          </p>
          <p className="text-xs text-gray-500">.csv only</p>
        </div>
      )}
    </div>
  );
}
