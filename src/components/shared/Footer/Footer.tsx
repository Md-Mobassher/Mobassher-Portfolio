import Image from "next/image";
import Link from "next/link";
import assets from "@/assets";
import SocialIcon from "@/components/ui/SocialIcon";
import Container from "@/components/ui/Container";

const Footer = () => {
  return (
    <footer className="border-t dark:border-gray-600 lg:mt-20 md:mt-14 mt-10 pt-5 pb-5">
      <Container>
        <div className="flex lg:flex-row md:flex-row flex-col md:justify-between justify-center lg:gap-10 gap-5 lg:items-start md:items-start items-center py-5">
          <div className="flex lg:flex-row md:flex-col flex-col justify-center md:justify-start md:items-start items-center lg:gap-20 md:gap-5 gap-4">
            <div className="flex lg:flex-col md:flex-row flex-row md:gap-4 gap-3">
              <FooterLink href="/" text="Home" />
              <FooterLink href="/#about" text="About" />
              <FooterLink href="/#myskill" text="Skills" />
              <FooterLink href="/" text="Education" />
            </div>
            <div className="flex lg:flex-col md:flex-row flex-row md:gap-4 gap-3">
              <FooterLink href="/projects" text="Projects" />
              <FooterLink href="/blogs" text="Blogs" />
              <FooterLink href="/#contact" text="Contact" />
              <FooterLink
                href="https://drive.google.com/file/d/1lrAMInBo2I610RC-oMsihi2_Tt2sZW7j/view?usp=sharing"
                text="Resume"
                target="_blank"
              />
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

const FooterLink = ({
  target,
  href,
  text,
}: {
  target?: string;
  href: string;
  text: string;
}) => (
  <Link
    href={href}
    className="relative group text-gray-800 dark:text-gray-200 hover:text-blue-500 transition"
    target={target ? target : "_parent"}
  >
    {text}
    {/* Underline Element */}
    <div className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 group-hover:left-0"></div>
  </Link>
);

export default Footer;
