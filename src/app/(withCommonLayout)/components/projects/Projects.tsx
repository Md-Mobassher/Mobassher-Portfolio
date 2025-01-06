"use client";

import { TProject } from "@/type";
import { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { uniqueTechnologies } from "../../portfolios/components/Technology";
import ProjectCard from "../../portfolios/components/ProjectCard";

interface AllProjectsProps {
  projects: TProject[];
}

const Projects = ({ projects }: AllProjectsProps) => {
  const [selectedTechnology, setSelectedTechnology] = useState<
    string | undefined
  >();
  const [search, setSearch] = useState<string>("");

  const getFilteredprojects = () => {
    let project;

    if (!selectedTechnology) {
      project = projects;
    }
    if (!search) {
      project = projects;
    }

    if (selectedTechnology) {
      project = projects.filter((item: TProject) =>
        item.technology.includes(selectedTechnology)
      );
    }
    if (search) {
      project = projects.filter((item: TProject) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return project;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // const uniqueTechnologies = Array.isArray(projects)
  //   ? Array.from(new Set(projects.flatMap((project) => project.technology)))
  //   : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedTechnology("")}
            className="border border-dark-primary text-md py-2 bg-dark-primary hover:bg-green-700 text-white rounded-md transition duration-500 lg:px-6 md:px-5 px-3 uppercase cursor-pointer"
          >
            All
          </button>
          <Select onValueChange={setSelectedTechnology} defaultValue="">
            <SelectTrigger className="lg:w-[180px] md:w-[170px] w-[140px]   text-md hover:bg-green-500 bg-secondary dark:text-dark-text text-light-text hover:text-white border-dark-primary rounded-md transition duration-500   cursor-pointer text-center">
              <SelectValue className="" placeholder="Technology" />
            </SelectTrigger>
            <SelectContent className="w-[200px] bg-gray-700">
              <SelectGroup>
                {uniqueTechnologies.map((tech) => (
                  <SelectItem
                    key={tech}
                    value={tech}
                    className="py-2 m-0 text-md  bg-gray-700 hover:bg-white text-white hover:text-green-500 hover:font-semibold rounded-md transition duration-300 lg:px-6 md:px-5 pl-4  cursor-pointer"
                  >
                    {tech}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="hidden md:flex">
          <h4 className="text-lg font-semibold">
            Total:{" "}
            <span className="text-green-500 px-1">
              {getFilteredprojects()?.length || 0}
            </span>{" "}
            Projects Found
          </h4>
        </div>

        {/* Search */}
        <div className="lg:w-[180px] md:w-[170px] w-[120px] ">
          <Input
            type="text"
            className="border-dark-primary text-center dark:text-dark-text focus:border-0  dark:bg-dark-secondary text-light-text text-md"
            onChange={handleInputChange}
            placeholder="Search"
          />
        </div>
      </div>

      <div className="flex md:hidden justify-center mb-5">
        <h4 className="text-md font-semibold">
          Total:{" "}
          <span className="text-cyan-500 px-1">
            {getFilteredprojects()?.length || 0}
          </span>{" "}
          Projects Found
        </h4>
      </div>

      {/* show projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  lg:gap-8 md:gap-7 gap-6 pt-5">
        {getFilteredprojects()
          ?.slice(0, 6)
          ?.map((project: TProject) => (
            <ProjectCard key={project._id} project={project} />
          ))}
      </div>
    </div>
  );
};

export default Projects;
