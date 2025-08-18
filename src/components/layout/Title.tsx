import { Separator } from "../ui/separator";

type TTitle = {
  title: string;
  titleColor?: string;
  className?: string;
};

const Title = ({ title, titleColor, className }: TTitle) => {
  return (
    <div
      className={`lg:mt-10 mt-5 flex justify-center lg:mb-12 md:mb-10 mb-5 ${className}`}
    >
      <div className=" flex justify-end items-center mr-2 lg:w-40 md:w-36 w-20">
        <Separator className="lg:w-40 md:w-36 w-20 h-2 bg-gradient-to-l from-primary to-primary/0" />
      </div>
      <div>
        <h4 className="lg:text-5xl md:text-4xl text-3xl text-center font-bold ">
          {title}{" "}
          <span
            className={`text-primary lg:text-5xl md:text-4xl text-3xl text-center font-bold`}
          >
            {titleColor}
          </span>
        </h4>
      </div>
      <div className="flex justify-start items-center ml-2 lg:w-40 md:w-36 w-20">
        <Separator className="lg:w-40 md:w-36 w-20 h-2 bg-gradient-to-r from-primary to-primary/0" />
      </div>
    </div>
  );
};

export default Title;
