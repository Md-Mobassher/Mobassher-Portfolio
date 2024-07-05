import Image from "next/image";
import bg from "@/assets/image/Mobassher-Hossain-Full-Stack-Developer.png";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="mt-2 mb-10 relative">
      <Link href="https://dev-mobassher.web.app" target="_blank">
        <Image src={bg} alt="banner Image" className="rounded-md " />
      </Link>
    </div>
  );
};

export default Banner;
