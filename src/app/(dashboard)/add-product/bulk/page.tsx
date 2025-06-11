import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import Link from "next/link";
import React from "react";
import BulkUploadForm from "./components/bulk-upload";

export default function AddMultipleProduct() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Add Multiple Product"
        showBackIcon={true}
        ctaButton={
          <Link href="/add-product">
            <Button>Add Single Product</Button>
          </Link>
        }
      />
      <BulkUploadForm />
    </div>
  );
}
