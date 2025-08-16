import { Separator } from "../ui/separator";

type TTitle = {
  title: string;
};

const Title = ({ title }: TTitle) => {
  return (
    <div className="lg:mt-10 mt-5 flex lg:justify-start md:justify-start  justify-center lg:mb-8 md:mb-7 mb-5">
      <div className="lg:hidden md:hidden flex justify-end items-center mr-2">
        <Separator className="lg:w-40 md:w-36 w-20 border border-[#02CF5F]" />
      </div>
      <div>
        <h4 className="lg:text-4xl md:text-3xl text-2xl text-center font-bold ">
          {title}
        </h4>
      </div>
      <div className="flex justify-start items-center ml-2">
        <Separator className="lg:w-40 md:w-36 w-20 border border-[#02CF5F]" />
      </div>
    </div>
  );
};

export default Title;
