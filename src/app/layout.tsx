import type { Metadata } from "next";
import "./globals.css";
import Toast from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Inventory Management System App",
  description:
    "Thesis Project IMS Web Application, created using Next.Js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toast />
        {children}
      </body>
    </html>
  );
}
