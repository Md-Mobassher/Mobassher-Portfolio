// src/app/(dashboard)/dashboard/components/DepartmentList.tsx

"use client";
import { FormInput, FormTextarea } from "@/components/form";
import EditDeleteButtons from "@/components/shared/button/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/modal/ReusableModal";
import { ReusableTable } from "@/components/shared/table/ReusableTable";
import { createGenericOperationsHook } from "@/hooks/useGenericOperations";
import {
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetAllDepartmentsQuery,
  useUpdateDepartmentMutation,
} from "@/redux/features/admin/departmentApi";
import { useDebounced } from "@/redux/hooks";
import {
  createDepartmentFormSchema,
  DepartmentFormData,
  updateDepartmentFormSchema,
} from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DasboardTitle from "./DasboardTitle";

// Separate schemas for create and update

export default function DepartmentList() {
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
      isModalOpen === "edit"
        ? updateDepartmentFormSchema
        : createDepartmentFormSchema
    ),
    defaultValues: {
      name: "",
      description: "",
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
      createMutation: useCreateDepartmentMutation,
      updateMutation: useUpdateDepartmentMutation,
      deleteMutation: useDeleteDepartmentMutation,
    },
    "Department"
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

  const { data, isLoading, isError } = useGetAllDepartmentsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  // Form submission handler - simplified with custom hook
  const onSubmit = async (data: DepartmentFormData) => {
    if (isModalOpen === "add") {
      const success = await createEntity({
        name: data.name,
        description: data.description,
      });
      if (success) {
        handleReset();
      }
    } else if (isModalOpen === "edit") {
      const success = await updateEntity(selectedId!, {
        name: data.name,
        description: data.description,
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
  // const handleFilter = (selectedFilter: string) => {
  //   if (selectedFilter === "all") {
  //     setFilters({});
  //   } else {
  //     setFilters({ status: selectedFilter });
  //   }
  //   setPagination((prev) => ({
  //     ...prev,
  //     limit: 10,
  //     page: 1,
  //   }));
  // };

  // reset
  const handleReset = () => {
    form.reset({
      name: "",
      description: "",
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
        description: selectedData.description || "",
      });
    } else if (isModalOpen === "add") {
      form.reset({
        name: "",
        description: "",
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
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.original.description;
        return (
          <div className="truncate  w-full text-wrap">
            {description.slice(0, 100) || "-"}
          </div>
        );
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
          title="Departments"
          buttonText="Add Department"
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
          searchPlaceholder="Search"
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
            title={isModalOpen === "add" ? "Add Department" : "Edit Department"}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                name="name"
                label="Department Name"
                placeholder="Enter department name"
                required
              />

              <FormTextarea
                name="description"
                label="Description"
                placeholder="Enter department description"
              />
            </form>
          </ReusableModal>
        </FormProvider>
      </div>
    </div>
  );
}
