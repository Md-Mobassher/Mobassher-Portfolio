import { Dot, MoveRight } from "lucide-react";
import UseIcon from "../../../components/ui/UseIcon";
import IntroButton from "./IntroButton";

const Intro = () => {
  return (
    <div className="container">
      <div className="min-h-screen flex items-center -mt-12">
        <div className="text-center md:text-start lg:text-start">
          <p className="lg:text-2xl md:text-xl text-xl font-semibold text-[#02CF5F]">
            Hello! I am
          </p>
          <h1 className="lg:text-[78px] md:text-[70px] text-[55px] font-extrabold lg:mb-5 mb-2">
            Md Mobassher Hossain
          </h1>
          <h3 className=" text-2xl font-semibold  text-[#02CF5F]">
            Full Stack Developer
          </h3>
          <div className="flex flex-start gap-5 lg:justify-start  md:justify-start justify-center items-center">
            <div className="p-0 mt-3">
              <MoveRight className="size-7 text-[#02CF5F]" />
            </div>

            <p className="text-md font-semibold mt-3 ">Web Developer</p>
            <div className="badge badge-primary badge-xs mt-3">
              <MoveRight className="size-7 text-[#02CF5F]" />
            </div>
            <p className="text-md font-semibold mt-3">Programmer</p>
          </div>

          <IntroButton />
          <div className="lg:mt-12 mt-10 flex lg:justify-start md:justify-start  justify-center mb-2">
            <h4 className="lg:text-2xl md:text-xl text-xl  font-semibold divider lg:w-1/3 md:w-1/3 w-2/3 ">
              Follow Me
            </h4>
          </div>
          <UseIcon />
        </div>
      </div>
    </div>
  );
};

export default Intro;
