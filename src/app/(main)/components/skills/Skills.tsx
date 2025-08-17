"use client";

import { TSkill } from "@/types";
import SkillCard from "./SkillCard";

interface SkillsProps {
  skills: TSkill[];
}

const Skills = ({ skills }: SkillsProps) => {
  return (
    <div className="flex flex-wrap lg:gap-3 md:gap-3 gap-2 mx-auto justify-center items-center">
      {skills?.map((skill) => (
        <SkillCard key={skill._id} name={skill.name} />
      ))}
    </div>
  );
};

export default Skills;
