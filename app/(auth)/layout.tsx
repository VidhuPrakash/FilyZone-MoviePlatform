import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import ToastContext from "@/context/ToasterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth FilyZone",
  description: "Movie Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black-1`}>
        <ToastContext />
        {children}
      </body>
    </html>
  );
}
