// src/app/(dashboard)/dashboard/components/TagList.tsx

"use client";
import { FormInput } from "@/components/form";
import EditDeleteButtons from "@/components/shared/button/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/modal/ReusableModal";
import { ReusableTable } from "@/components/shared/table/ReusableTable";
import { createGenericOperationsHook } from "@/hooks/useGenericOperations";
import {
  useCreateTagMutation,
  useDeleteTagMutation,
  useGetAllTagsQuery,
  useUpdateTagMutation,
} from "@/redux/features/admin/tagApi";
import { useDebounced } from "@/redux/hooks";
import {
  createTagFormSchema,
  DepartmentFormData,
  TagFormData,
  updateTagFormSchema,
} from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DasboardTitle from "./DasboardTitle";

// Separate schemas for create and update

export default function TagList() {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Use correct schema depending on modal mode
  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(
      isModalOpen === "edit" ? updateTagFormSchema : createTagFormSchema
    ),
    defaultValues: {
      name: "",
    },
  });

  // Use the custom hook for user operations
  const {
    createEntity,
    updateEntity,
    deleteEntity,
    isCreating,
    isUpdating,
    isDeleting,
  } = createGenericOperationsHook(
    {
      createMutation: useCreateTagMutation,
      updateMutation: useUpdateTagMutation,
      deleteMutation: useDeleteTagMutation,
    },
    "Tag"
  )();

  const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 600 });
  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      sortBy: "updatedAt",
      sortOrder: "asc",
      ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
      ...(filters ? filters : {}),
    }),
    [pagination, debouncedSearch, filters]
  );

  const { data, isLoading, isError } = useGetAllTagsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  // Form submission handler - simplified with custom hook
  const onSubmit = async (data: TagFormData) => {
    if (isModalOpen === "add") {
      const success = await createEntity({
        name: data.name,
      });
      if (success) {
        handleReset();
      }
    } else if (isModalOpen === "edit") {
      const success = await updateEntity(selectedId!, {
        name: data.name,
      });
      if (success) {
        handleReset();
      }
    }
  };

  // Handle form submission for modal
  const handleFormSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  // search
  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // filter
  const handleFilter = (selectedFilter: string) => {
    if (selectedFilter === "all") {
      setFilters({});
    } else {
      setFilters({ status: selectedFilter });
    }
    setPagination((prev) => ({
      ...prev,
      limit: 10,
      page: 1,
    }));
  };

  // reset
  const handleReset = () => {
    form.reset({
      name: "",
    });
    setSelectedData(null);
    setSelectedId(null);
    setIsModalOpen(null);
    setSearchTerm("");
    setFilters({});
  };

  // Populate form fields when editing a user
  useEffect(() => {
    if (isModalOpen === "edit" && selectedData) {
      form.reset({
        name: selectedData.name || "",
      });
    } else if (isModalOpen === "add") {
      form.reset({
        name: "",
      });
    }
  }, [isModalOpen, selectedData, form]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const name = row.original.name;
        return <div className="truncate  w-full">{name || "-"}</div>;
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <EditDeleteButtons
          onEdit={() => {
            setSelectedId(row.original.id);
            setSelectedData(row.original);
            setIsModalOpen("edit");
          }}
          onDelete={() => deleteEntity?.(row.original.id)}
        />
      ),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="w-full max-w-6xl md:bg-[#F5F4FC]  rounded-lg  md:shadow-lg   ">
        <DasboardTitle
          title="Tags"
          buttonText="Add Tag"
          onClick={() => setIsModalOpen("add")}
        />
        <ReusableTable
          data={data?.data || []}
          meta={data?.meta}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
          enablePagination
          searchTerm={searchTerm}
          searchPlaceholder="Search by name"
          // filterPlaceholder="Filter by status"
          searchable
          // filterable
          // filterOptions={userStatusFilterOptions.map((x) => ({
          //   label: x.title,
          //   value: x.id,
          // }))}
          // onFilterChange={handleFilter}
          onSearchChange={handleSearchChange}
          loading={isLoading || isDeleting || isUpdating || isCreating}
        />

        {/* add or edit department */}
        <FormProvider {...form}>
          <ReusableModal
            open={isModalOpen === "add" || isModalOpen === "edit"}
            onClose={() => handleReset()}
            onConfirm={handleFormSubmit}
            loading={isCreating || isUpdating}
            title={isModalOpen === "add" ? "Add Tag" : "Edit Tag"}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                name="name"
                label="Tag Name"
                placeholder="Enter tag name"
                required
              />
            </form>
          </ReusableModal>
        </FormProvider>
      </div>
    </div>
  );
}
