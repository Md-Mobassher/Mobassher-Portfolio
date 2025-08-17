// File: src/app/(main)/layout.tsx

import Navbar from "@/components/shared/navbar/Navbar";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
