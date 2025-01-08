"use client";
import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";
import { navItemsData } from "./navItemData";
import { useEffect, useState } from "react";
import { MenuIcon, X } from "lucide-react";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full z-50 ${
          isScrolled
            ? "dark:bg-background bg-light-background border-b dark:border-gray-600 shadow-md transition-all duration-300"
            : "bg-transparent transition-all duration-300"
        }`}
        style={{
          paddingTop: isScrolled ? "0.5rem" : "1.5rem",
          paddingBottom: isScrolled ? "0.5rem" : "1.5rem",
        }}
      >
        <Container className="container mx-auto px-4  flex justify-between items-center">
          {/* Left Section: Logo */}
          <div className=" ">
            <Link href="/">
              <Image
                src={assets?.image?.logo}
                alt="logo"
                width={60}
                height={60}
              />
            </Link>
          </div>

          {/* Drawer and Interactive Elements (Client Component) */}
          <>
            {/* Hamburger Menu Icon for Mobile */}
            <div className="lg:hidden flex gap-3 justify-end items-center">
              <ThemeToggle />
              <button onClick={toggleDrawer} className="text-2xl">
                <div className="p-1 flex justify-center items-center gap-2 rounded-md text-white  bg-green-500">
                  <MenuIcon className="size-8" />
                </div>
              </button>
            </div>

            {/* Drawer Menu */}
            <div
              className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
              } ease-in-out duration-300`}
            >
              <div className="flex justify-end items-center p-4">
                <button onClick={toggleDrawer} className="text-2xl">
                  <div className="p-1 border border-green-500 rounded-md hover:bg-green-500 hover:text-white text-black">
                    <X className="size-8" />
                  </div>
                </button>
              </div>
              <div className="flex flex-col px-4 space-y-1">
                {navItemsData?.map((item, index) => (
                  <Link
                    key={index}
                    href={item?.url}
                    className=" text-xl font-semibold px-4 py-2 text-center text-light-text  hover:text-white hover:bg-green-500 rounded-md"
                  >
                    {item?.title}
                  </Link>
                ))}
              </div>
            </div>
          </>

          {/* Desktop Menu (visible only on larger screens) */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="lg:flex md:flex hidden flex-wrap">
              {navItemsData?.map((item, index) => (
                <Link
                  key={index}
                  href={item?.url}
                  className=" text-xl font-semibold  py-2 lg:px-4 md:px-3 hover:text-white hover:bg-green-500 rounded-md"
                >
                  {item?.title}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
