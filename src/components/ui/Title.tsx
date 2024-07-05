import { Separator } from "./separator";

type TTitle = {
  title: string;
};

const Title = ({ title }: TTitle) => {
  return (
    <div className="lg:mt-10 mt-5 flex lg:justify-start md:justify-start  justify-center lg:mb-5 md:mb-4 mb-2">
      <div>
        <h4 className="lg:text-4xl md:text-3xl text-2xl  font-bold ">
          {title}
        </h4>
      </div>
      <div>
        <Separator className="w-60 pb-1 text-[#02CF5F]" />
      </div>
    </div>
  );
};

export default Title;
