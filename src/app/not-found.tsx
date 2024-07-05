import assets from "@/assets";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex-col bg-[#011F41] text-slate-200 flex justify-center items-center
    "
    >
      <Image className="flex" src={assets.image.notFound} alt="" />
      <div className="flex justify-center mt-16">
        <p>
          Go Back to
          <Link className="btn btn-primary bg-primary text-white ml-4" href="/">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
