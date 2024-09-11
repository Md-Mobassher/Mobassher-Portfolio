"use client";

import { TPortfolio } from "@/type";
import { ChangeEvent, useState } from "react";
import PortfolioCard from "./PortfolioCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { uniqueTechnologies } from "./Technology";

interface AllPortfoliosProps {
  portfolios: TPortfolio[];
}

const AllPortfolios = ({ portfolios }: AllPortfoliosProps) => {
  const [selectedTechnology, setSelectedTechnology] = useState<
    string | undefined
  >();
  const [search, setSearch] = useState<string>("");

  const getFilteredPortfolios = () => {
    let portfolio;

    if (!selectedTechnology) {
      portfolio = portfolios;
    }
    if (!search) {
      portfolio = portfolios;
    }

    if (selectedTechnology) {
      portfolio = portfolios.filter((item: TPortfolio) =>
        item.technology.includes(selectedTechnology)
      );
    }
    if (search) {
      portfolio = portfolios.filter((item: TPortfolio) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return portfolio;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // const uniqueTechnologies = Array.isArray(portfolios)
  //   ? Array.from(new Set(portfolios.flatMap((project) => project.technology)))
  //   : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSelectedTechnology(undefined)}
            className="border border-green-500 text-md py-2 bg-green-500 hover:bg-green-700 text-white rounded-md transition duration-500 lg:px-6 md:px-5 px-3 uppercase cursor-pointer"
          >
            All
          </button>
          <Select onValueChange={setSelectedTechnology} defaultValue="">
            <SelectTrigger className="lg:w-[180px] md:w-[170px] w-[140px]   text-md hover:bg-green-500 bg-gray-700 text-white border-green-500 rounded-md transition duration-500   cursor-pointer text-center">
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
              {getFilteredPortfolios()?.length || 0}
            </span>{" "}
            Portfolio Found
          </h4>
        </div>

        {/* Search */}
        <div className="lg:w-[180px] md:w-[170px] w-[120px] ">
          <Input
            type="text"
            className="border-green-500 text-center text-white focus:border-0  bg-gray-700 text-md"
            onChange={handleInputChange}
            placeholder="Search"
          />
        </div>
      </div>

      <div className="flex md:hidden justify-center mb-5">
        <h4 className="text-md font-semibold">
          Total:{" "}
          <span className="text-cyan-500 px-1">
            {getFilteredPortfolios()?.length || 0}
          </span>{" "}
          Portfolio Found
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-7 gap-6 pt-5">
        {getFilteredPortfolios()?.map((project: TPortfolio) => (
          <PortfolioCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default AllPortfolios;
