import Image from "next/image";
import Link from "next/link";
import { socialData } from "./SocialData";
import assets from "@/assets";

const Footer = () => {
  return (
    <footer className=" border-t border-gray-700 lg:mt-20 md:mt-14 mt-10 pt-5 pb-5">
      <div className="max-w-7xl mx-auto lg:px-8 md:px-6 px-4">
        <div className="flex lg:flex-row md:flex-row flex-col lg:justify-between md:justify-between lg:gap-10 gap-2 items-center py-3">
          <div className="flex gap-5 items-center">
            <Link href="/">
              <Image
                src={assets?.image?.logo}
                alt="Logo Image"
                width={60}
                height={60}
              />
            </Link>
            <p>Providing reliable tech since 2023</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-center">Contact Me</h3>
            <div className="flex flex-wrap mt-4">
              {socialData.map((item) => (
                <a
                  href={item?.link}
                  key={item?.title}
                  target={item.link.startsWith("http") ? "_blank" : ""}
                  rel={
                    item.link.startsWith("http") ? "noopener noreferrer" : ""
                  }
                >
                  <Image
                    src={item?.image}
                    alt={item?.title}
                    className="object-cover filter grayscale transition duration-500 ease-in-out p-1 hover:grayscale-0"
                    width={50}
                    height={50}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* copyright */}
        <div className="flex items-center justify-center mt-3">
          <p className="text-center">
            Copyright &copy; {new Date().getFullYear()}. All right regerved to{" "}
            <Link
              href="/"
              className="text-slate-500 hover:text-blue-500 font-semibold"
            >
              Md Mobassher Hossain
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
