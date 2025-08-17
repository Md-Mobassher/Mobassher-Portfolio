"use client";

import FilterControls from "@/components/shared/common/FilterControls";
import MobileCountDisplay from "@/components/shared/common/MobileCountDisplay";
import useFilterAndSearch from "@/hooks/useFilterAndSearch";
import { TProject } from "@/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import ProjectCard from "../../projects/components/ProjectCard";
import { uniqueTechnologies } from "../../projects/components/Technology";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AllProjectsProps {
  projects: TProject[];
}

const Projects = ({ projects }: AllProjectsProps) => {
  const filterControlsRef = useRef<HTMLDivElement>(null);
  const mobileCountRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const projectCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const noResultsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Wait for next tick to ensure refs are populated
    const timeoutId = setTimeout(() => {
      if (projectsGridRef.current) {
        // GSAP Timeline for smooth sequential animations
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: projectsGridRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // Initial state - hide all elements
        gsap.set(
          [
            filterControlsRef.current,
            mobileCountRef.current,
            projectsGridRef.current,
          ],
          {
            opacity: 0,
            y: 50,
          }
        );

        // Animate elements in sequence
        tl.to(filterControlsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        })
          .to(
            mobileCountRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.4"
          )
          .to(
            projectsGridRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.4"
          );

        // Animate project cards with stagger effect
        if (projectCardRefs.current.length > 0) {
          gsap.fromTo(
            projectCardRefs.current,
            {
              opacity: 0,
              scale: 0.8,
              y: 60,
              rotation: -5,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              stagger: {
                amount: 1.2,
                from: "start",
                ease: "power2.out",
              },
              scrollTrigger: {
                trigger: projectsGridRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Animate no results message if it exists
        if (noResultsRef.current && filteredProjects.length === 0) {
          gsap.fromTo(
            noResultsRef.current,
            { opacity: 0, scale: 0.8, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: noResultsRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [filteredProjects]);

  // Function to add ref to each project card
  const addProjectCardRef = (el: HTMLDivElement | null, index: number) => {
    projectCardRefs.current[index] = el;
  };

  return (
    <div>
      {/* Reusable Filter Controls */}
      <div ref={filterControlsRef}>
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
      </div>

      {/* Mobile Count Display */}
      <div ref={mobileCountRef}>
        <MobileCountDisplay
          totalCount={filteredProjects.length}
          countLabel="Total"
          countSuffix="Projects Found"
          color="text-cyan-500"
        />
      </div>

      {/* Show projects */}
      <div
        ref={projectsGridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-7 gap-6 pt-5"
      >
        {filteredProjects
          ?.slice(0, 6)
          ?.map((project: TProject, index: number) => (
            <div key={project._id} ref={(el) => addProjectCardRef(el, index)}>
              <ProjectCard project={project} />
            </div>
          ))}
      </div>

      {/* No results message */}
      {filteredProjects.length === 0 && (
        <div ref={noResultsRef} className="text-center py-10">
          <p className="text-gray-500 text-lg">
            No projects found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default Projects;
