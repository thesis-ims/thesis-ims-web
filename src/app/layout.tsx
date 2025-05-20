import type { Metadata } from "next";
import "./globals.css";
import Toast from "@/components/ui/toast";
import { Roboto } from "next/font/google";

// Configure Roboto font
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Add more if needed
  display: "swap",
  variable: "--font-roboto", // Optional: for Tailwind custom font
});

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
    <html lang="en" className={roboto.className}>
      <body>
        <Toast />
        {children}
      </body>
    </html>
  );
}
