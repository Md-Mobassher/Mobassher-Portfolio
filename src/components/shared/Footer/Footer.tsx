import Image from "next/image";
import Link from "next/link";
import assets from "@/assets";
import SocialIcon from "@/components/ui/SocialIcon";
import Container from "@/components/ui/Container";

const Footer = () => {
  return (
    <footer className=" border-t border-gray-700 lg:mt-20 md:mt-14 mt-10 pt-5 pb-5">
      <Container>
        <div className="flex lg:flex-row md:flex-row flex-col md:justify-between justify-center lg:gap-10 gap-5 lg:items-start md:items-start items-center py-5 ">
          <div className="flex lg:flex-row md:flex-col flex-col justify-center md:justify-start md:items-start items-center  lg:gap-20 md:gap-5 gap-4">
            <div className="flex lg:flex-col md:flex-row flex-row md:gap-4 gap-3">
              <Link href="/">Home</Link>
              <Link href="/">About</Link>
              <Link href="/">Skills</Link>
              <Link href="/">Education</Link>
            </div>
            <div className="flex lg:flex-col md:flex-row flex-row md:gap-4 gap-3">
              <Link href="/">Projects</Link>
              <Link href="/">Blogs</Link>
              <Link href="/">Contact</Link>
              <Link href="/">Resume</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg text-center">
              Follow, contact, tag, like, clone, watch - me
            </h3>
            <SocialIcon />
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
