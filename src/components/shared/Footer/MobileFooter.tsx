"use client";
import { Bell, Heart, Home, Search, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileFooter() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0  w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50 md:hidden">
      <Link
        href="/"
        className={`flex items-center text-[#1f4f69] hover:text-[#E25A6F] ${pathname === "/" ? "text-[#E25A6F]" : ""}`}
      >
        <Home size={24} />
      </Link>
      <Link
        href="/dashboard/notification"
        className={`flex flex-col items-center text-[#1f4f69] hover:text-[#E25A6F] ${pathname === "/dashboard/notification" ? "text-[#E25A6F]" : ""}`}
      >
        <Bell size={24} />
        {/* <span className="text-xs mt-1">খুঁজুন</span> */}
      </Link>
      <Link
        href="/biodatas"
        className={`flex flex-col items-center text-[#1f4f69] hover:text-[#E25A6F] ${pathname === "/biodatas" ? "text-[#E25A6F]" : ""}`}
      >
        <Search size={24} />
        {/* <span className="text-xs mt-1">খুঁজুন</span> */}
      </Link>
      <Link
        href="/dashboard/favourite"
        className={`flex flex-col items-center text-[#1f4f69] hover:text-[#E25A6F] ${pathname === "/dashboard/favourite" ? "text-[#E25A6F]" : ""}`}
      >
        <Heart size={24} />
        {/* <span className="text-xs mt-1">ফেভারিট</span> */}
      </Link>
      <Link
        href="/dashboard"
        className={`flex flex-col items-center text-[#1f4f69] hover:text-[#E25A6F] ${pathname === "/dashboard" ? "text-[#E25A6F]" : ""}`}
      >
        <User size={24} />
        {/* <span className="text-xs mt-1">একাউন্ট</span> */}
      </Link>
    </nav>
  );
}
