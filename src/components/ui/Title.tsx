type TTitle = {
  title: string;
};

const Title = ({ title }: TTitle) => {
  return (
    <div className="lg:mt-10 mt-5 flex lg:justify-start md:justify-start  justify-center lg:mb-5 md:mb-4 mb-2">
      <h4 className="lg:text-4xl md:text-3xl text-2xl  font-bold divider lg:divider-start md:divider-start lg:w-1/3 md:w-1/3 w-2/3 divider-primary">
        {title}
      </h4>
    </div>
  );
};

export default Title;
