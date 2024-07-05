import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";
import { navItemsData } from "./navItemData";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <>
      <header className=" sticky top-0 z-50 bg-white border-b border-t border-gray-300 py-[2px] shadow-sm">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
          <div className="w-[200px] ">
            <Link href="/">
              <Image
                src={assets.image.logo}
                alt="logo"
                width={70}
                height={70}
              />
            </Link>
          </div>
          <div>
            <nav className="lg:flex md:flex hidden flex-wrap">
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
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
