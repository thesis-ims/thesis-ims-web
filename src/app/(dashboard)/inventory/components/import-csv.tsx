"use client";

import React, { useRef } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { Upload, FileText, X } from "lucide-react";
import { fileToBase64 } from "@/utils/file-to-base64-converter";

export type CsvFileObjectProps = {
  csvFile: File | null;
  xlsxFile?: File | null;
  base64: string;
};

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

    try {
      // Read the XLSX file
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), {
        type: "array",
      });

      // Get the first worksheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert to CSV string
      const csvString = XLSX.utils.sheet_to_csv(worksheet);

      // Validate the CSV data using Papa Parse
      const parsed = Papa.parse(csvString, { header: true });
      if (parsed.errors.length) {
        toast.error(
          "File XLSX tidak valid atau tidak memiliki data yang benar",
        );
        return;
      }

      // Create a CSV File object from the converted string
      const csvBlob = new Blob([csvString], { type: "text/csv" });
      const csvFileName = file.name.replace(/\.[^/.]+$/, "") + ".csv";
      const csvFile = new File([csvBlob], csvFileName, { type: "text/csv" });

      // Get base64 of the CSV file
      const base64 = await fileToBase64(csvFile);

      setCsvFileObject({
        base64: base64,
        csvFile: csvFile,
        xlsxFile: file,
      });

      toast.success("Berhasil mengunggah file template!");
    } catch (error) {
      toast.error("Gagal mengkonversi file XLSX. Pastikan file valid.");
    }
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    setCsvFileObject({ base64: "", csvFile: null, xlsxFile: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Upload File</h2>

        <p className="text-sm">
          Upload the completed Excel (.xlsx / .xls) file. Make sure all data
          comply with the format requirements and ensure there are no incorrect
          formats.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleFileChange}
      />

      {csvFileObject.csvFile ? (
        <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">
                {csvFileObject.xlsxFile?.name || csvFileObject.csvFile.name}
              </p>
              <p className="text-xs text-green-600">
                {csvFileObject.xlsxFile
                  ? `${(csvFileObject.xlsxFile.size / 1024).toFixed(1)} KB`
                  : `${(csvFileObject.csvFile.size / 1024).toFixed(1)} KB`}
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
          <p className="text-xs text-gray-500">.xlsx / .xls only</p>
        </div>
      )}
    </div>
  );
}
