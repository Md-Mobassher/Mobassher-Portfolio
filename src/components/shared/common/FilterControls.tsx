"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterControlsProps {
  // Filter options
  filterOptions?: Array<{ value: string; label: string }>;
  selectedFilter: string;
  onFilterChange: (value: string) => void;

  // Search
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;

  // All button
  allButtonLabel?: string;
  onAllClick: () => void;

  // Count display
  totalCount: number;
  countLabel?: string;
  countSuffix?: string;

  // Styling
  className?: string;
  showCount?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
}

const FilterControls = ({
  filterOptions = [],
  selectedFilter,
  onFilterChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  allButtonLabel = "All",
  onAllClick,
  totalCount,
  countLabel = "Total",
  countSuffix = "Found",
  className = "",
  showCount = true,
  showSearch = true,
  showFilter = true,
}: FilterControlsProps) => {
  return (
    <div className={`flex justify-between items-center mb-5 ${className}`}>
      {/* Left side - Filter controls */}
      <div className="flex items-center gap-1">
        <Button
          onClick={onAllClick}
          variant="outline"
          className="border-primary text-md py-1.5 bg-gray-200 dark:bg-gray-800 hover:bg-primary text-primary hover:text-white dark:text-white dark:hover:bg-primary rounded-md transition duration-500 lg:px-6 md:px-5 px-3 uppercase cursor-pointer shadow-md shadow-primary/40 md:text-lg text-md font-semibold"
        >
          {allButtonLabel}
        </Button>

        {showFilter && filterOptions.length > 0 && (
          <Select onValueChange={onFilterChange} value={selectedFilter}>
            <SelectTrigger className="lg:w-[180px] md:w-[170px] w-[140px] py-2 text-md hover:bg-primary bg-gray-200 dark:bg-gray-800 dark:text-white text-gray-800 hover:text-white border-primary rounded-md transition duration-500 cursor-pointer text-center shadow-md shadow-primary/40 md:text-lg text-md font-semibold">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="w-[200px] bg-gray-200 dark:bg-gray-700 border-primary">
              <SelectGroup>
                {filterOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="md:py-2 py-1.5 m-0 text-md bg-gray-200 dark:bg-gray-700 hover:bg-primary dark:hover:bg-primary text-gray-800 dark:text-white hover:font-semibold transition duration-300 lg:px-6 md:px-5 pl-4 cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Center - Count display (desktop) */}
      {showCount && (
        <div className="hidden md:flex">
          <h4 className="text-lg font-semibold">
            {countLabel}:{" "}
            <span className="text-green-500 px-1">{totalCount}</span>{" "}
            {countSuffix}
          </h4>
        </div>
      )}

      {/* Right side - Search */}
      {showSearch && (
        <div className="lg:w-[180px] md:w-[170px] w-[120px]">
          <Input
            type="text"
            className="border-primary text-center dark:text-white focus:border-0 bg-gray-200 dark:bg-gray-800 text-gray-800 text-md shadow-md shadow-primary/40 py-2"
            onChange={(e) => onSearchChange(e.target.value)}
            value={searchValue}
            placeholder={searchPlaceholder}
          />
        </div>
      )}
    </div>
  );
};

export default FilterControls;
