"use client";

import FilterControls from "@/components/shared/common/FilterControls";
import MobileCountDisplay from "@/components/shared/common/MobileCountDisplay";
import useFilterAndSearch from "@/hooks/useFilterAndSearch";
import { TBlog } from "@/types";
import BlogCard from "./BlogCard";

interface AllBlogsProps {
  blogs: TBlog[];
}

const AllBlogs = ({ blogs }: AllBlogsProps) => {
  // Use the reusable hook for filtering and searching
  const {
    filteredData: filteredBlogs,
    selectedFilter,
    searchValue,
    setSelectedFilter,
    setSearchValue,
    resetFilters,
    uniqueFilterOptions,
  } = useFilterAndSearch({
    data: blogs,
    filterField: "category",
    searchFields: ["title", "category"],
  });

  // Convert filter options to the format expected by FilterControls
  const filterOptions = uniqueFilterOptions.map((cat) => ({
    value: cat,
    label: cat,
  }));

  return (
    <div className="min-h-[300px]">
      {/* Reusable Filter Controls */}
      <FilterControls
        filterOptions={filterOptions}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder="Search blogs..."
        allButtonLabel="All"
        onAllClick={resetFilters}
        totalCount={filteredBlogs.length}
        countLabel="Total"
        countSuffix="Blog Found"
        showCount={true}
        showSearch={true}
        showFilter={true}
      />

      {/* Mobile Count Display */}
      <MobileCountDisplay
        totalCount={filteredBlogs.length}
        countLabel="Total"
        countSuffix="Blog Found"
        color="text-cyan-500"
      />

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 md:gap-7 gap-6">
        {filteredBlogs?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {/* No results message */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            No blogs found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
