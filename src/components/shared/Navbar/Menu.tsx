"use client";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type SubItem = {
  title: string;
  link: string;
};

export type Item = {
  title: string;
  link: string;
  option?: "sub" | string | undefined;
  subItems?: SubItem[] | undefined;
};

type MenuProps = {
  items: Item[];
};

const Menu: React.FC<MenuProps> = ({ items }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const user = useAppSelector(selectCurrentUser);

  const handleLogOut = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="z-20 block sticky top-0 w-full">
      <div className="flex lg:flex-row md:flex-row flex-col lg:justify-end lg:items-center lg:gap-1 md:gap-0.5 gap-0 flex-wrap text-black md:border-none border border-gray-300">
        {items.map((item, index) => (
          <div
            key={index}
            className={` ${item.option === "sub" ? "relative" : ""}`}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <Link
              href={item.link}
              className="p-2 text-black  block font-medium  lg:px-3 md:px-2 px-4 py-2 hover:bg-primary hover:text-white transition-all duration-200 "
            >
              {item.title}
            </Link>
            {hoverIndex === index && item.option === "sub" && item.subItems && (
              <div className="absolute lg:left-0 md:left-0 left-28 bg-gray-200 shadow-lg w-52 border border-gray-300 z-50">
                <div className="flex flex-col">
                  {item.subItems.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.link}
                      className={`p-2 bg-[#F7F3E7] text-black block hover:bg-primary hover:text-white transition-all duration-200 font-medium ${
                        subIndex === 0 && subIndex && "border-b "
                      }`}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {!pathname.startsWith("/dashboard") && user ? (
          <Link
            href={"/dashboard"}
            className="p-2 text-black block font-medium lg:px-3 md:px-2 px-4 py-2 hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
          >
            Dashboard
          </Link>
        ) : null}

        {user && (
          <h5
            onClick={() => handleLogOut()}
            className="p-2 text-black  block font-medium  lg:px-3 md:px-2 px-4 py-2 hover:bg-primary  cursor-pointer"
          >
            Logout
          </h5>
        )}
      </div>
    </div>
  );
};

export default Menu;
