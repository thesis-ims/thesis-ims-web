"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

export default function PageHeader({
  title,
  showBackIcon = false,
  ctaButton,
}: {
  title: string;
  showBackIcon?: boolean;
  ctaButton?: ReactElement;
}) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {showBackIcon && (
          <div
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeft className="h-8 w-8 cursor-pointer" />
          </div>
        )}
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>

      {ctaButton}
    </div>
  );
}
