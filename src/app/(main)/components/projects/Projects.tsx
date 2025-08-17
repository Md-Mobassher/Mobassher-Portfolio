"use client";

import FilterControls from "@/components/shared/common/FilterControls";
import MobileCountDisplay from "@/components/shared/common/MobileCountDisplay";
import useFilterAndSearch from "@/hooks/useFilterAndSearch";
import { TProject } from "@/types";
import ProjectCard from "../../projects/components/ProjectCard";
import { uniqueTechnologies } from "../../projects/components/Technology";

interface AllProjectsProps {
  projects: TProject[];
}

const Projects = ({ projects }: AllProjectsProps) => {
  // Use the reusable hook for filtering and searching
  const {
    filteredData: filteredProjects,
    selectedFilter,
    searchValue,
    setSelectedFilter,
    setSearchValue,
    resetFilters,
    uniqueFilterOptions,
  } = useFilterAndSearch({
    data: projects,
    filterField: "technology",
    searchFields: ["name", "description", "technology"],
  });

  // Use hook results or fallback to existing technologies
  const availableTechnologies =
    uniqueFilterOptions.length > 0 ? uniqueFilterOptions : uniqueTechnologies;

  // Convert filter options to the format expected by FilterControls
  const filterOptions = availableTechnologies.map((tech) => ({
    value: tech,
    label: tech,
  }));

  return (
    <div>
      {/* Reusable Filter Controls */}
      <FilterControls
        filterOptions={filterOptions}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search projects..."
        allButtonLabel="All"
        onAllClick={resetFilters}
        totalCount={filteredProjects.length}
        countLabel="Total"
        countSuffix="Projects Found"
        showCount={true}
        showSearch={true}
        showFilter={true}
      />

      {/* Mobile Count Display */}
      <MobileCountDisplay
        totalCount={filteredProjects.length}
        countLabel="Total"
        countSuffix="Projects Found"
        color="text-cyan-500"
      />

      {/* Show projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-7 gap-6 pt-5">
        {filteredProjects?.slice(0, 6)?.map((project: TProject) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>

      {/* No results message */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            No projects found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Projects;
