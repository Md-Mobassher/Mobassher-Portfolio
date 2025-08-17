const SkillCard = ({ name }: { name: string }) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 border border-primary rounded-md md:px-4 px-3 md:py-1.5 py-1 shadow-md shadow-primary/40 ">
      <h4 className=" md:text-lg text-md font-semibold ">{name}</h4>
    </div>
  );
};

export default SkillCard;
