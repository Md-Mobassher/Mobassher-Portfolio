"use client";

import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navItemsData } from "./navItemData";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* Mobile Menu Button (visible on small screens) */}
      <div className=" flex md:hidden lg:hidden px-2 relative justify-center items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className=" text-slate-700  rounded"
          aria-controls="mobile-menu"
          aria-expanded={isOpen ? "true" : "false"}
        >
          {isOpen ? (
            <div className="p-1 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white">
              <X className="size-8" />
            </div>
          ) : (
            <div className="p-1 flex justify-center items-center gap-2 border rounded-md hover:text-white hover:bg-blue-500">
              <MenuIcon className="size-8" />
            </div>
          )}
          {isOpen && (
            <div className=" mt-3 w-[250px] top-8 right-0 shadow-lg rounded-lg absolute transition-all duration-500 z-50 bg-gray-200 border border-blue-400 ">
              <nav className="w-full flex flex-col rounded-lg ">
                {navItemsData.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className=" text-xl font-semibold  py-2 px-4 hover:text-white hover:bg-blue-500 rounded-md"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
