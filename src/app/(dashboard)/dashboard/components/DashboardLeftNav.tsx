// File: src/app/(main)/dashboard/DashboardLeftNav.tsx
"use client";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardLeftNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

// Dashboard menu items array
const dashboardMenuItems = [
  { label: "Dashboard", href: "/dashboard", activePath: "/dashboard" },
  {
    label: "User List",
    href: "/dashboard/user-list",
    activePath: "/dashboard/user-list",
  },

  {
    label: "Research",
    href: "/dashboard/research",
    activePath: "/dashboard/research",
  },
  { label: "Event", href: "/dashboard/event", activePath: "/dashboard/event" },
  {
    label: "Publication",
    href: "/dashboard/publication",
    activePath: "/dashboard/publication",
  },
  {
    label: "Committee",
    href: "/dashboard/committee",
    activePath: "/dashboard/committee",
  },
  {
    label: "Department",
    href: "/dashboard/department",
    activePath: "/dashboard/department",
  },
  { label: "Tag", href: "/dashboard/tag", activePath: "/dashboard/tag" },
  {
    label: "Slider",
    href: "/dashboard/slider",
    activePath: "/dashboard/slider",
  },
  {
    label: "Author",
    href: "/dashboard/author",
    activePath: "/dashboard/author",
  },
  {
    label: "Partner",
    href: "/dashboard/partner",
    activePath: "/dashboard/partner",
  },
  {
    label: "Video",
    href: "/dashboard/video",
    activePath: "/dashboard/video",
  },
  {
    label: "Contact",
    href: "/dashboard/inquiry",
    activePath: "/dashboard/inquiry",
  },
];

export default function DashboardLeftNav({
  isOpen,
  onClose,
}: DashboardLeftNavProps) {
  const user = useAppSelector(selectCurrentUser);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static overflow-y-auto  top-0 left-0  pt-8 pb-2 md:w-72 w-64 flex flex-col items-center space-y-1 bg-primary z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0 overflow-y-auto min-h-screen" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 text-white lg:hidden cursor-pointer"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-[#77a1b8] p-4 rounded-full">
          <User className="w-10 h-10 text-white" />
        </div>

        {/* <div className="mb-0 mt-3 text-center text-white">
          {user?.fullName}
        </div>
        <div className="mb-0 text-center text-white">
          {user?.email}
        </div>
        <div className="mb-3 text-center text-white">
          {user?.phoneNumber}
        </div> */}
        <div className="mb-4 mt-2 p-3 bg-[#c6d8e1] text-black rounded-xl">
          <span className="font-semibold">{user?.role}</span>
        </div>
        {dashboardMenuItems.map((item, idx) => (
          <Link
            key={item.label}
            href={item.href}
            className={`p-2 m-0 border-b border-b-slate-300 ${idx === 0 ? " border-t border-t-slate-300" : ""} w-full text-center  ${isActive(item.activePath) ? "bg-[#f4f4f4] text-black" : "hover:bg-[#f4f4f4] hover:text-black text-white"}`}
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
