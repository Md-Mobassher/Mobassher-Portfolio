// src/app/(dashboard)/dashboard/components/UserList.tsx

"use client";
import { FormInput, FormPasswordInput, FormSelect } from "@/components/form";
import EditDeleteButtons from "@/components/shared/button/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/modal/ReusableModal";
import { ReusableTable } from "@/components/shared/table/ReusableTable";
import { Badge } from "@/components/ui/badge";
import { createGenericOperationsHook } from "@/hooks/useGenericOperations";
import { userStatusFilterOptions } from "@/lib/constant";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/admin/userApi";
import { useUserRegisterMutation } from "@/redux/features/auth/authApi";
import { useDebounced } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import DasboardTitle from "./DasboardTitle";

// Separate schemas for create and update
const createUserFormSchema = z.object({
  name: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(18, { message: "Password must be less than 18 characters" }),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  //   {
  //     message:
  //       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  //   }
  // ),
});
const updateUserFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phoneNumber: z.string().optional(),
  password: z.string().optional(),
  status: z.string().optional(),
  emailVerified: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

type CreateFormData = z.infer<typeof createUserFormSchema>;
type UpdateFormData = z.infer<typeof updateUserFormSchema>;

type FormData = CreateFormData | UpdateFormData;

export default function UserList() {
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
  const form = useForm<FormData>({
    resolver: zodResolver(
      isModalOpen === "edit" ? updateUserFormSchema : createUserFormSchema
    ),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
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
      createMutation: useUserRegisterMutation,
      updateMutation: useUpdateUserMutation,
      deleteMutation: useDeleteUserMutation,
    },
    "User"
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

  const { data, isLoading, isError } = useGetAllUsersQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  // Form submission handler - simplified with custom hook
  const onSubmit = async (data: FormData) => {
    if (isModalOpen === "add") {
      const success = await createEntity({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
      if (success) {
        handleReset();
      }
    } else if (isModalOpen === "edit") {
      const updatedData = data as UpdateFormData;
      const success = await updateEntity(selectedId!, {
        name: updatedData.name,
        email: updatedData.email,
        phoneNumber: updatedData.phoneNumber,
        status: updatedData.status,
        emailVerified: updatedData.emailVerified,
        isDeleted: updatedData.isDeleted,
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
      email: "",
      phoneNumber: "",
      password: "",
      status: "",
      emailVerified: false,
      isDeleted: false,
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
        email: selectedData.email || "",
        phoneNumber: selectedData.phoneNumber || "",
        password: "",
        status: selectedData.status || "",
        emailVerified: selectedData.emailVerified || false,
        isDeleted: selectedData.isDeleted || false,
      });
    } else if (isModalOpen === "add") {
      form.reset({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
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
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.original.email;
        return <div className="truncate  w-full">{email || "-"}</div>;
      },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: ({ row }) => {
        const phoneNumber = row.original.phoneNumber;
        return <div className="truncate w-full">{phoneNumber || "-"}</div>;
      },
    },
    {
      accessorKey: "emailVerified",
      header: "Email Verified",
      cell: ({ row }) => {
        const emailVerified = row.original.emailVerified;

        return (
          <div className="truncate max-w-[300px]">
            {emailVerified === true ? (
              <Badge className="bg-[#307FA7] text-white">Verified</Badge>
            ) : (
              <Badge variant="destructive">Unverified</Badge>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: "User Status",
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <div className=" flex items-center gap-2 justify-center">
            {status === "PENDING" ? (
              <Badge className="bg-yellow-500 text-white dark:bg-yellow-600">
                {status}
              </Badge>
            ) : status === "ACTIVE" ? (
              <Badge className="bg-green-500 text-white dark:bg-green-600">
                {status}
              </Badge>
            ) : status === "BLOCKED" ? (
              <Badge className="bg-red-500 text-white dark:bg-red-600">
                {status}
              </Badge>
            ) : (
              <Badge className="bg-red-500 text-white dark:bg-red-600">
                {status}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role;

        return (
          <div className="truncate max-w-[300px]">
            {role === "SUPER_ADMIN" ? (
              <Badge className="bg-[#307FA7] text-white">{role}</Badge>
            ) : (
              <Badge variant="destructive">{role}</Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "isDeleted",
      header: "Deleted",
      cell: ({ row }) => {
        const isDeleted = row.original.isDeleted;

        return (
          <div className="truncate max-w-[300px]">
            {isDeleted === true ? (
              <Badge className="bg-red-600 text-white">Deleted</Badge>
            ) : (
              <Badge className="bg-green-500 text-white">Not Deleted</Badge>
            )}
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
          title="Users"
          buttonText="Add User"
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
          filterPlaceholder="Filter"
          searchable
          filterable
          filterOptions={userStatusFilterOptions.map((x) => ({
            label: x.title,
            value: x.id,
          }))}
          onFilterChange={handleFilter}
          onSearchChange={handleSearchChange}
          loading={isLoading || isDeleting || isUpdating || isCreating}
        />

        {/* add or edit user */}
        <FormProvider {...form}>
          <ReusableModal
            open={isModalOpen === "add" || isModalOpen === "edit"}
            onClose={() => handleReset()}
            onConfirm={handleFormSubmit}
            loading={isCreating || isUpdating}
            title={isModalOpen === "add" ? "Add User" : "Edit User"}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                required
              />

              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />

              <FormInput
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number"
                type="tel"
                required
              />
              {isModalOpen === "add" && (
                <FormPasswordInput
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  required
                />
              )}
              {isModalOpen === "edit" && (
                <>
                  <FormSelect
                    name="status"
                    label="Status"
                    placeholder="Select status"
                    options={userStatusFilterOptions.map((x) => ({
                      label: x.title,
                      value: x.id,
                    }))}
                  />
                  <FormSelect
                    name="emailVerified"
                    label="Email Verified"
                    placeholder="Select email verified"
                    options={[
                      { label: "Verified", value: "true" },
                      { label: "Unverified", value: "false" },
                    ]}
                  />
                  <FormSelect
                    name="isDeleted"
                    label="Deleted"
                    placeholder="Select deleted"
                    options={[
                      { label: "Deleted", value: "true" },
                      { label: "Restore", value: "false" },
                    ]}
                  />
                </>
              )}
            </form>
          </ReusableModal>
        </FormProvider>

        {/* Form Data Display (for debugging) */}
        {/* {process.env.NODE_ENV === "development" && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Form Data (Development)
            </h3>
            <pre className="text-sm text-gray-700 overflow-auto">
              {JSON.stringify(form.watch(), null, 2)}
            </pre>
          </div>
        )}*/}
      </div>
    </div>
  );
}
