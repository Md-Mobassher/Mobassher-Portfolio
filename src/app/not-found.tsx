import assets from "@/assets";
import Button from "@/components/ui/Button";
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
          <Button
            className="bg-dark-primary text-white ml-4 px-4 py-2 hover:bg-green-600"
            link="/"
            title="Home"
          ></Button>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
