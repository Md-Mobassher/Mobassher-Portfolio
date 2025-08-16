import { Progress } from "@/components/ui/progress";

const SkillCard = ({
  name,
  proficiencyLevel,
}: {
  name: string;
  proficiencyLevel: string;
}) => {
  return (
    <div className="bg-secondary  rounded-md flex-col justify-between items-end p-0 m-0">
      <div className="flex justify-between lg:p-4 md:p-3 p-2">
        <h4 className="lg:text-xl md:text-lg text-lg font-bold ">{name}</h4>
        <p className="lg:text-xl md:text-lg text-md font-bold px-2 bg-[#00CF5D] rounded-md text-white">
          {proficiencyLevel}%
        </p>
      </div>

      <Progress
        className=" bg-gray-800 lg:h-3 h-2 "
        value={Number(proficiencyLevel)}
      />
    </div>
  );
};

export default SkillCard;
