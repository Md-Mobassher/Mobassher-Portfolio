"use client";
import Container from "@/components/layout/Container";
import ThemeToggle from "@/components/shared/common/ThemeToggle";
import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItemsData } from "./navItemData";

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
            ? "dark:bg-dark-background bg-background border-b dark:border-gray-600 shadow-md transition-all duration-300"
            : "bg-transparent transition-all duration-300"
        }`}
        style={{
          paddingTop: isScrolled ? "0.2rem" : "1.5rem",
          paddingBottom: isScrolled ? "0.2rem" : "1.5rem",
        }}
      >
        <Container className="container mx-auto px-4  flex justify-between items-center">
          {/* Left Section: Logo */}
          <div className="flex items-center justify-between gap-4">
            <Link href="/">
              <Image
                src={"/images/logo.png"}
                alt="logo"
                width={60}
                height={60}
              />
            </Link>
            {/* Desktop Menu (visible only on larger screens) */}
            <div className="hidden lg:flex items-center space-x-8 ">
              <nav className="lg:flex md:flex hidden flex-wrap">
                {navItemsData?.map((item, index) => (
                  <Link
                    key={index}
                    href={item?.url}
                    className=" text-lg font-medium  py-2 lg:px-3 md:px-2 hover:text-primary rounded-md"
                  >
                    {item?.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Drawer and Interactive Elements (Client Component) */}
          <>
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href={"#"}
                className=" text-lg font-medium  hover:text-primary rounded-md"
              >
                <Image
                  src={"/icons/github.png"}
                  alt="github"
                  width={25}
                  height={25}
                />
              </Link>
              <Link
                href={"#"}
                className="text-lg font-medium  hover:text-primary rounded-md grayscale"
              >
                <Image
                  src={"/icons/linkedin.png"}
                  alt="linkedin"
                  width={25}
                  height={25}
                />
              </Link>

              <ThemeToggle />
              <Link
                href={"#"}
                className="  text-lg font-medium  hover:text-primary rounded-md bg-gray-200/50 dark:bg-gray-800/50  px-4 py-2 flex items-center justify-center gap-3 cursor-pointer"
              >
                <div className="bg-primary w-3 h-3 rounded-full relative">
                  <div className="bg-primary w-3 h-3 rounded-full absolute top-0 left-0 animate-ping"></div>
                </div>
                <span className="text-lg">Say Hello</span>{" "}
              </Link>
            </div>

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
        </Container>
      </div>
    </>
  );
};

export default Navbar;
