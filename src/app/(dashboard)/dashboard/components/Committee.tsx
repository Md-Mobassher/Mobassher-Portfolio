// src/app/(dashboard)/dashboard/components/CommitteeList.tsx

"use client";
import { FormFileInput, FormInput, FormSelect } from "@/components/form";
import RichTextEditor from "@/components/form/RichTextEditor";
import EditDeleteButtons from "@/components/shared/button/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/modal/ReusableModal";
import { ReusableTable } from "@/components/shared/table/ReusableTable";
import { createGenericOperationsHook } from "@/hooks/useGenericOperations";
import {
  useCreateCommitteeMutation,
  useDeleteCommitteeMutation,
  useGetAllCommitteesQuery,
  useUpdateCommitteeMutation,
} from "@/redux/features/admin/committeeApi";
import { useDebounced } from "@/redux/hooks";
import {
  CommitteeFormData,
  createCommitteeFormSchema,
  updateCommitteeFormSchema,
} from "@/types/schema";
import imageUploadCloudinary from "@/utils/imageUploadCloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DasboardTitle from "./DasboardTitle";

const CommitteeRoleOptions = [
  { value: "BOARD_DIRECTOR", label: "Board Director" },
  { value: "ADVISORY_BOARD", label: "Advisory Board" },
  { value: "RESEARCH_FELLOW", label: "Research Fellow" },
  { value: "OTHER", label: "Other" },
];

export default function CommitteeList() {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Use correct schema depending on modal mode
  const form = useForm<CommitteeFormData>({
    resolver: zodResolver(
      isModalOpen === "edit"
        ? updateCommitteeFormSchema
        : createCommitteeFormSchema
    ),
    defaultValues: {
      name: "",
      role: "BOARD_DIRECTOR",
      bio: "",
      imageUrl: "",
      designation: "",
      department: "",
      companyName: "",
    },
  });

  // Use the custom hook for Committee operations
  const {
    createEntity,
    updateEntity,
    deleteEntity,
    isCreating,
    isUpdating,
    isDeleting,
  } = createGenericOperationsHook(
    {
      createMutation: useCreateCommitteeMutation,
      updateMutation: useUpdateCommitteeMutation,
      deleteMutation: useDeleteCommitteeMutation,
    },
    "Committee"
  )();

  const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 600 });
  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      sortBy: "createdAt",
      sortOrder: "desc",
      ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
      ...(filters ? filters : {}),
    }),
    [pagination, debouncedSearch, filters]
  );

  const { data, isLoading: isTableLoading } = useGetAllCommitteesQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  const handleChange = (content: string) => {
    setContent(content);
  };

  // Handle file selection
  const handleUpload = (info: { fileList: File[] }) => {
    setFileList(
      info.fileList.map((file) => ({
        ...file,
        uid: Date.now().toString(),
        originFileObj: file,
      }))
    );
  };

  // Handle remove file selection
  const handleRemove = (file: any) => {
    if (file.isExistingImage) {
      setSelectedData((prev) => (prev ? { ...prev, imageUrl: null } : null));
      return true;
    }
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    return true;
  };

  // Form submission handler
  const onSubmit = async (values: CommitteeFormData) => {
    let imageUrl = selectedData?.imageUrl || null;

    if (fileList.length > 0 && fileList[0].originFileObj) {
      const url = await imageUploadCloudinary(fileList[0].originFileObj);
      imageUrl = url;
    }

    const CommitteeData = {
      name: values.name,
      role: values.role,
      bio: content,
      imageUrl,
      designation: values.designation,
      department: values.department,
      companyName: values.companyName,
    };

    let success = false;
    if (isModalOpen === "add") {
      success = await createEntity(CommitteeData);
    } else if (isModalOpen === "edit") {
      success = await updateEntity(selectedId!, CommitteeData);
    }

    if (success) {
      handleReset();
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
      setFilters({ role: selectedFilter });
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
      role: "BOARD_DIRECTOR",
      bio: "",
      imageUrl: "",
      designation: "",
      department: "",
      companyName: "",
    });
    setContent("");
    setSelectedData(null);
    setSelectedId(null);
    setFileList([]);
    setIsModalOpen(null);
    setSearchTerm("");
    setFilters({});
  };

  // Populate form fields when editing a Committee
  useEffect(() => {
    if (isModalOpen === "edit" && selectedData) {
      form.reset({
        name: selectedData.name || "",
        role: selectedData.role || "BOARD_DIRECTOR",
        bio: selectedData.bio || "",
        imageUrl: selectedData.imageUrl || "",
        designation: selectedData.designation || "",
        department: selectedData.department || "",
        companyName: selectedData.companyName || "",
      });
      setContent(selectedData.bio || "");
    } else if (isModalOpen === "add") {
      form.reset({
        name: "",
        role: "BOARD_DIRECTOR",
        bio: "",
        imageUrl: "",
        designation: "",
        department: "",
        companyName: "",
      });
      setContent("");
    }
  }, [isModalOpen, selectedData, form]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.original.imageUrl;
        return (
          <div className="w-full h-8 flex-shrink-0 relative rounded-md">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="committee"
                fill
                className="rounded-md"
              />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const name = row?.original?.name;
        return <div className="truncate w-full">{name || "-"}</div>;
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role;
        return <div className="truncate w-full">{role || "-"}</div>;
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
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <EditDeleteButtons
          onEdit={() => {
            setSelectedId(row?.original?.id);
            setSelectedData(row?.original);
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
          title="Committees"
          buttonText="Add Committee"
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
          searchable
          filterable
          filterOptions={CommitteeRoleOptions}
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilter}
          loading={isTableLoading || isDeleting || isUpdating || isCreating}
        />

        {/* add or edit Committee */}
        <FormProvider {...form}>
          <ReusableModal
            open={isModalOpen === "add" || isModalOpen === "edit"}
            onClose={() => handleReset()}
            onConfirm={handleFormSubmit}
            size="full"
            loading={isCreating || isUpdating}
            title={isModalOpen === "add" ? "Add Committee" : "Edit Committee"}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-start gap-4">
                <FormInput
                  name="name"
                  label="Name"
                  placeholder="Enter name"
                  required
                />
                <FormSelect
                  name="role"
                  label="Role"
                  options={CommitteeRoleOptions}
                  placeholder="Select role"
                />
                <FormInput
                  name="designation"
                  label="Designation"
                  placeholder="Enter Designation"
                />
                <FormInput
                  name="department"
                  label="Department"
                  placeholder="Enter Department"
                />
                <FormInput
                  name="companyName"
                  label="Company Name"
                  placeholder="Enter Company Name"
                />

                <FormFileInput
                  name="file"
                  label="Upload Image"
                  dragAndDrop
                  accept="image/*"
                  maxSize={1024 * 1024 * 5}
                  maxFiles={1}
                  multiple={false}
                  fileList={fileList}
                  handleUpload={handleUpload}
                  handleRemove={handleRemove}
                  required={isModalOpen === "add"}
                  uploadedImage={selectedData?.imageUrl}
                />
              </div>

              <div className="  w-full h-full">
                <p className=" w-full text-start font-semibold">Bio: </p>
                <div className="w-full h-full rounded-lg">
                  <RichTextEditor
                    placeholder="Enter Bio..."
                    value={content}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </ReusableModal>
        </FormProvider>
      </div>
    </div>
  );
}
