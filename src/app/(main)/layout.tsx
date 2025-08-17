import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

import { ReactNode } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="bg-light-background text-light-text dark:bg-dark-background dark:from-gray-700 dark:via-gray-950 dark:to-black dark:text-dark-text min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
