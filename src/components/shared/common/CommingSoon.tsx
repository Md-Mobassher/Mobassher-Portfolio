"use client";

import commingSoon from "@/assets/images/comming-soon.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CommingSoon = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-full  flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-[500px]">
          <Image
            src={commingSoon}
            alt="cooming-soon"
            className="flex"
            width={500}
            height={500}
          />
        </div>

        <div className="flex items-center justify-center w-full gap-5 mb-10">
          <Button
            onClick={() => router.back()}
            className="px-10 bg-[#D14A5F] text-white hover:bg-[#D14A5F]/80"
          >
            Back
          </Button>
          <Button
            onClick={() => router.push("/")}
            className="bg-[#186E9D] hover:bg-[#186E9D]/80 text-white rounded-lg px-10 py-3"
          >
            Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default CommingSoon;
