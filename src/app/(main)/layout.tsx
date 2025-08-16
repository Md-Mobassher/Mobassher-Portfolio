// File: src/app/(main)/layout.tsx

import Footer from "@/components/shared/footer/Footer";
import MainNavbar from "@/components/shared/navbar/MainNavbar";
import DynamicPageTitle from "@/components/shared/title/DynamicPageTitle";
import { ReactNode } from "react";
import DynamicSidebar from "./components/sidebar/DynamicSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar top={1} header={1} menu={1} />
      <DynamicPageTitle />

      {/* Main Content Area */}
      <main className="flex-1 ">
        <div className="container mx-auto px-4 md:py-8 lg:py-10 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Left Side */}
            <div className="flex-1 lg:w-3/4">
              <div className="bg-white rounded-lg">{children}</div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:w-1/4">
              <div className="sticky top-8">
                <DynamicSidebar />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
