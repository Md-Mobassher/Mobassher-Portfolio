import { useMemo, useState } from "react";

interface UseFilterAndSearchProps<T> {
  data: T[];
  filterField?: keyof T;
  searchFields: (keyof T)[];
  initialFilter?: string;
}

interface UseFilterAndSearchReturn<T> {
  filteredData: T[];
  selectedFilter: string;
  searchValue: string;
  setSelectedFilter: (value: string) => void;
  setSearchValue: (value: string) => void;
  resetFilters: () => void;
  uniqueFilterOptions: string[];
}

const useFilterAndSearch = <T extends Record<string, any>>({
  data,
  filterField,
  searchFields,
  initialFilter = "",
}: UseFilterAndSearchProps<T>): UseFilterAndSearchReturn<T> => {
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [searchValue, setSearchValue] = useState("");

  // Get unique filter options
  const uniqueFilterOptions = useMemo(() => {
    if (!filterField) return [];

    const uniqueValues = new Set<string>();
    data.forEach((item) => {
      const value = item[filterField];

      // Handle array fields (like technology arrays)
      if (Array.isArray(value)) {
        value.forEach((tech: string) => {
          if (tech && typeof tech === "string") {
            uniqueValues.add(tech);
          }
        });
      }
      // Handle string fields
      else if (value && typeof value === "string") {
        uniqueValues.add(value);
      }
    });

    return Array.from(uniqueValues).sort();
  }, [data, filterField]);

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = data;

    // Apply filter
    if (selectedFilter && filterField) {
      result = result.filter((item) => {
        const fieldValue = item[filterField];

        // Handle array fields (like technology arrays)
        if (Array.isArray(fieldValue)) {
          return fieldValue.includes(selectedFilter);
        }
        // Handle string fields
        else if (typeof fieldValue === "string") {
          return fieldValue === selectedFilter;
        }

        return false;
      });
    }

    // Apply search
    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase();
      result = result.filter((item) =>
        searchFields.some((field) => {
          const fieldValue = item[field];

          // Handle array fields
          if (Array.isArray(fieldValue)) {
            return fieldValue.some((val: string) =>
              val.toLowerCase().includes(searchLower)
            );
          }
          // Handle string fields
          else if (typeof fieldValue === "string") {
            return fieldValue.toLowerCase().includes(searchLower);
          }

          return false;
        })
      );
    }

    return result;
  }, [data, selectedFilter, searchValue, filterField, searchFields]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedFilter(initialFilter);
    setSearchValue("");
  };

  return {
    filteredData,
    selectedFilter,
    searchValue,
    setSelectedFilter,
    setSearchValue,
    resetFilters,
    uniqueFilterOptions,
  };
};

export default useFilterAndSearch;
