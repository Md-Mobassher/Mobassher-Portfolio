"use client";

import { useState } from "react";
import { TSkill } from "./MySkills";
import SkillCard from "./SkillCard";

const Skills = (skills: TSkill[]) => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    "Web"
  );

  const getFilteredSkills = () => {
    let skill;

    if (!selectedCategory) {
      skill = skills;
    }

    // if (selectedCategory) {
    //   skill = skills.filter(
    //     (item: TSkill) => item.category === selectedCategory
    //   );
    // }

    return skill;
  };

  //   const uniqueCategory = Array.from(
  //     new Set(skills.flatMap((skill) => skill.category))
  //   );

  console.log(skills);
  return (
    <div>
      <div className="lg:px-20 md:px-14 lg:mt-10 mt-8">
        <ul className="flex flex-wrap lg:justify-start md:justify-start justify-center lg:mb-7 mb-5 lg:gap-5 md:gap-4 gap-3">
          {/* {uniqueCategory?.map((category) => (
            <li
              onClick={() => setSelectedCategory(undefined)}
              className={
                category === selectedCategory
                  ? " text-md text-white py-2  btn btn-primary hover:bg-green-400 transition duration-500 lg:px-7 md:px-5 px-4"
                  : "btn btn-outline border-primary py-2 bg-gray-800 lg:px-7 md:px-5 px-4 text-white hover:text-white hover:bg-green-400  transition duration-500"
              }
              key={category}
            >
              {category}
            </li>
          ))} */}
        </ul>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-5  gap-3 md:gap-4">
        {getFilteredSkills()?.map((skill) => (
          <SkillCard key={skill?._id} {...skill} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
