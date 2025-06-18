import React, { useEffect, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/utils/tw-merge";

export default function CategoryCombobox({
  categoryList,
  errorMessages,
  helperText,
  onChange,
  initValue,
}: {
  categoryList: string[];
  errorMessages?: string;
  helperText?: string;
  onChange: (value: string) => void;
  initValue: string;
}) {
  const [selectedValue, setSelectedValue] = useState("");
  const [query, setQuery] = useState("");
  const filteredValue =
    query === ""
      ? categoryList
      : categoryList.filter((category) => {
          return category.toLowerCase().includes(query.toLowerCase());
        });

  function setQueryAndValue(query: string) {
    setQuery(query);
    setSelectedValue(query);
    onChange(query!);
  }

  useEffect(() => {
    setSelectedValue(initValue);
  }, [initValue]);

  return (
    <div className="flex flex-col gap-1">
      <Combobox
        value={selectedValue}
        onChange={(value) => {
          setSelectedValue(value!);
          onChange(value!);
        }}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={cn(
              "bg-gray-10 w-full px-4 py-3 focus:outline-0",
              errorMessages
                ? "border-2 border-red-600"
                : "border-b border-[#C1C7CD]",
            )}
            placeholder="Enter product category"
            aria-label="Categories"
            displayValue={(value) => value as string}
            onChange={(event) => setQueryAndValue(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 cursor-pointer px-2.5">
            <ChevronDownIcon className="text-gray-60 h-6 w-6" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          className="bg-gray-10 w-(--input-width) p-1 shadow-lg"
        >
          {categoryList.length > 0 ? (
            filteredValue.map((value, index) => (
              <ComboboxOption
                key={index}
                value={value}
                className={`bg-gray-10 hover:bg-gray-20 cursor-pointer px-3 py-2 hover:font-bold ${value === selectedValue ? "bg-gray-20 font-bold" : ""}`}
              >
                {value}
              </ComboboxOption>
            ))
          ) : (
            <div className="py-6 text-center">
              Belum ada kategori yang pernah ditambahkan.
            </div>
          )}
        </ComboboxOptions>
      </Combobox>

      {helperText && !errorMessages && (
        <p className="text-gray-60 text-xs">{helperText}</p>
      )}

      {errorMessages && (
        <p className="text-xs font-medium text-red-600">{errorMessages}</p>
      )}
    </div>
  );
}
