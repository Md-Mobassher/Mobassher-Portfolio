"use client";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DashboardLeftNav from "./components/DashboardLeftNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main
      className="flex justify-stretch flex-grow bg-gradient-to-r from-[#FFEFF5] to-[#f3f7f6] text-black 
    "
    >
      {/* Dashboard Toggle Button - Only visible on mobile */}
      <button
        className="fixed top-5 right-4 z-50 lg:hidden   rounded-lg cursor-pointer"
        onClick={() => setIsSidebarOpen(true)}
      >
        <CircleUserRound className="w-8 h-8 text-gray-500" />
      </button>

      <DashboardLeftNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="w-full bg-gradient-to-r from-blue-100 to-[#f3f7f6] text-background px-4 md:px-6 lg:px-5 py-5">
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
