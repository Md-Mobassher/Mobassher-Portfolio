// src/app/(dashboard)/dashboard/components/AuthorList.tsx

"use client";
import { FormInput, FormTextarea } from "@/components/form";
import EditDeleteButtons from "@/components/shared/button/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/modal/ReusableModal";
import { ReusableTable } from "@/components/shared/table/ReusableTable";
import { createGenericOperationsHook } from "@/hooks/useGenericOperations";
import {
  useCreateAuthorMutation,
  useDeleteAuthorMutation,
  useGetAllAuthorsQuery,
  useUpdateAuthorMutation,
} from "@/redux/features/admin/authorApi";
import { useDebounced } from "@/redux/hooks";
import {
  AuthorFormData,
  createAuthorFormSchema,
  updateAuthorFormSchema,
} from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DasboardTitle from "./DasboardTitle";

export default function AuthorList() {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Use correct schema depending on modal mode
  const form = useForm<AuthorFormData>({
    resolver: zodResolver(
      isModalOpen === "edit" ? updateAuthorFormSchema : createAuthorFormSchema
    ),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      designation: "",
      bio: "",
    },
  });

  // Use the custom hook for Author operations
  const {
    createEntity,
    updateEntity,
    deleteEntity,
    isCreating,
    isUpdating,
    isDeleting,
  } = createGenericOperationsHook(
    {
      createMutation: useCreateAuthorMutation,
      updateMutation: useUpdateAuthorMutation,
      deleteMutation: useDeleteAuthorMutation,
    },
    "Author"
  )();

  const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 600 });
  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      sortBy: "id",
      sortOrder: "desc",
      ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    }),
    [pagination, debouncedSearch]
  );

  const { data, isLoading: isTableLoading } = useGetAllAuthorsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  // Form submission handler
  const onSubmit = async (values: AuthorFormData) => {
    const authorData = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      designation: values.designation,
      bio: values.bio,
    };

    let success = false;
    if (isModalOpen === "add") {
      success = await createEntity(authorData);
    } else if (isModalOpen === "edit") {
      success = await updateEntity(selectedId!, authorData);
    }

    if (success) {
      handleReset();
    }
  };

  const handleFormSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // reset
  const handleReset = () => {
    form.reset({
      name: "",
      email: "",
      phone: "",
      designation: "",
      bio: "",
    });
    setSelectedData(null);
    setSelectedId(null);
    setIsModalOpen(null);
    setSearchTerm("");
  };

  // Populate form fields when editing an author
  useEffect(() => {
    if (isModalOpen === "edit" && selectedData) {
      form.reset({
        name: selectedData.name || "",
        email: selectedData.email || "",
        phone: selectedData.phone || "",
        designation: selectedData.designation || "",
        bio: selectedData.bio || "",
      });
    } else if (isModalOpen === "add") {
      form.reset({
        name: "",
        email: "",
        phone: "",
        designation: "",
        bio: "",
      });
    }
  }, [isModalOpen, selectedData, form]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const name = row.original.name;
        return <div className="truncate w-full font-medium">{name || "-"}</div>;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row?.original?.email;
        return (
          <div className="truncate w-full max-w-xs">
            {email ? (
              <a
                href={`mailto:${email}`}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {email}
              </a>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        const phone = row?.original?.phone;
        return (
          <div className="truncate w-full">
            {phone ? (
              <a
                href={`tel:${phone}`}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                {phone}
              </a>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }) => {
        const designation = row?.original?.designation;
        return <div className="truncate w-full">{designation || "-"}</div>;
      },
    },
    {
      accessorKey: "bio",
      header: "Bio",
      cell: ({ row }) => {
        const bio = row?.original?.bio;
        return (
          <div className="truncate w-full max-w-xs">
            {bio ? (bio.length > 50 ? `${bio.substring(0, 50)}...` : bio) : "-"}
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
      <div className="w-full max-w-6xl md:bg-[#F5F4FC] rounded-lg md:shadow-lg">
        <DasboardTitle
          title="Authors"
          buttonText="Add Author"
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
          searchPlaceholder="Search authors..."
          searchable
          onSearchChange={handleSearchChange}
          loading={isTableLoading || isDeleting || isUpdating || isCreating}
        />

        {/* add or edit author */}
        <FormProvider {...form}>
          <ReusableModal
            open={isModalOpen === "add" || isModalOpen === "edit"}
            onClose={() => handleReset()}
            size="lg"
            onConfirm={handleFormSubmit}
            loading={isCreating || isUpdating}
            title={isModalOpen === "add" ? "Add Author" : "Edit Author"}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                name="name"
                label="Name"
                placeholder="Enter author name"
                required
              />

              <FormInput
                name="email"
                label="Email"
                placeholder="Enter author email"
                type="email"
              />

              <FormInput
                name="phone"
                label="Phone"
                placeholder="Enter author phone number"
              />

              <FormInput
                name="designation"
                label="Designation"
                placeholder="Enter author designation"
              />

              <FormTextarea
                name="bio"
                label="Bio"
                placeholder="Enter author bio"
                rows={4}
              />
            </form>
          </ReusableModal>
        </FormProvider>
      </div>
    </div>
  );
}
