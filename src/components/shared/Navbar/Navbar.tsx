import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";
import { navItemsData } from "./navItemData";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <>
      <header className=" sticky top-0 z-50 bg-[#090A15] border-b border-gray-700 py-2 shadow-sm">
        <div className="flex justify-between items-center container mx-auto xl:px-28 lg:px-16 md:px-14 px-4">
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
          <div>
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
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
