const SkillCard = ({
  name,
  proficiencyLevel,
}: {
  name: string;
  proficiencyLevel: string;
}) => {
  return (
    <div className="bg-gray-700  rounded-md flex-col justify-between items-end p-0 m-0">
      <div className="flex justify-between lg:p-4 md:p-3 p-2">
        <h4 className="lg:text-xl md:text-lg text-lg font-bold ">{name}</h4>
        <p className="lg:text-xl md:text-lg text-md font-bold px-2 bg-primary rounded-md text-white">
          {proficiencyLevel}%
        </p>
      </div>
      <progress
        className="progress progress-primary w-100 lg:h-3 md:h-2 h-2 p-0 m-0"
        value={proficiencyLevel}
        max="100"
      ></progress>
    </div>
  );
};

export default SkillCard;
