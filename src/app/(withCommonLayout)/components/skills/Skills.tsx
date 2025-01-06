"use client";

import { useState } from "react";
import SkillCard from "./SkillCard";
import { TSkill } from "@/type";

interface SkillsProps {
  skills: TSkill[];
}

const Skills = ({ skills }: SkillsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    "Web"
  );

  const getFilteredSkills = () => {
    if (!skills || skills.length === 0) {
      return [];
    }

    if (!selectedCategory) {
      return skills;
    }

    return skills.filter((item: TSkill) => item.category === selectedCategory);
  };

  const uniqueCategories =
    skills && skills.length > 0
      ? Array.from(new Set(skills.map((skill) => skill.category)))
      : [];

  return (
    <div>
      <div className="lg:px-20 md:px-14 lg:mt-10 mt-8">
        <ul className="flex flex-wrap lg:justify-start md:justify-start justify-center lg:mb-7 mb-5 lg:gap-5 md:gap-4 gap-3">
          {uniqueCategories?.map((category) => (
            <li
              onClick={() => setSelectedCategory(category)}
              className={`border border-green-500 py-2 bg-secondary lg:px-7 md:px-5 px-4 rounded-md  hover:text-white hover:bg-green-500 transition duration-300  cursor-pointer ${
                category === selectedCategory
                  ? "text-md dark:text-dark-text text-white py-2 bg-dark-primary cursor-pointer font-bold"
                  : "border-dark-primary font-semibold"
              }`}
              key={category}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-6 gap-4 md:gap-5">
        {getFilteredSkills().map((skill) => (
          <SkillCard key={skill._id} {...skill} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
