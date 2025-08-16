// src/app/(dashboard)/dashboard/components/ResearchList.tsx

"use client";
import {
  FormDatePicker,
  FormFileInput,
  FormInput,
  FormSelect,
} from "@/components/form";
import RichTextEditor from "@/components/form/RichTextEditor";
import EditDeleteButtons from "@/components/shared/button/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/modal/ReusableModal";
import { ReusableTable } from "@/components/shared/table/ReusableTable";
import { createGenericOperationsHook } from "@/hooks/useGenericOperations";
import { useGetAllDepartmentsQuery } from "@/redux/features/admin/departmentApi";
import {
  useCreateResearchMutation,
  useDeleteResearchMutation,
  useGetAllResearchesQuery,
  useUpdateResearchMutation,
} from "@/redux/features/admin/researchApi";
import { useDebounced } from "@/redux/hooks";
import {
  createResearchFormSchema,
  ResearchFormData,
  updateResearchFormSchema,
} from "@/types/schema";
import imageUploadCloudinary from "@/utils/imageUploadCloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DasboardTitle from "./DasboardTitle";

const researchStatusOptions = [
  { value: "ONGOING", label: "Ongoing" },
  { value: "COMPLETED", label: "Completed" },
];

export default function ResearchList() {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [fileList, setFileList] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Use correct schema depending on modal mode
  const form = useForm<ResearchFormData>({
    resolver: zodResolver(
      isModalOpen === "edit"
        ? updateResearchFormSchema
        : createResearchFormSchema
    ),
    defaultValues: {
      title: "",
      description: "",
      status: "ONGOING",
      startDate: new Date(),
      endDate: new Date(),
      departmentId: "",
      fileUrl: "",
    },
  });

  // Use the custom hook for Research operations
  const {
    createEntity,
    updateEntity,
    deleteEntity,
    isCreating,
    isUpdating,
    isDeleting,
  } = createGenericOperationsHook(
    {
      createMutation: useCreateResearchMutation,
      updateMutation: useUpdateResearchMutation,
      deleteMutation: useDeleteResearchMutation,
    },
    "Research"
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

  const { data, isLoading: isTableLoading } = useGetAllResearchesQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  const { data: departmentsData } = useGetAllDepartmentsQuery({}); // Fetch departments for select options

  const departmentOptions = useMemo(() => {
    return (
      departmentsData?.data?.map((dept: any) => ({
        value: dept.id,
        label: dept.name,
      })) || []
    );
  }, [departmentsData]);

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  // handle content change
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
  const onSubmit = async (values: ResearchFormData) => {
    let imageUrl = selectedData?.imageUrl || null;

    if (fileList.length > 0 && fileList[0].originFileObj) {
      const url = await imageUploadCloudinary(fileList[0].originFileObj);
      imageUrl = url;
    }

    const ResearchData = {
      imageUrl,
      title: values.title,
      description: content,
      status: values.status,
      startDate: values.startDate,
      endDate: values.endDate,
      departmentId: values.departmentId,
      fileUrl: values.fileUrl,
    };

    let success = false;
    if (isModalOpen === "add") {
      success = await createEntity(ResearchData);
    } else if (isModalOpen === "edit") {
      success = await updateEntity(selectedId!, ResearchData);
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
      title: "",
      description: "",
      status: "ONGOING",
      startDate: new Date(),
      endDate: new Date(),
      fileUrl: "",
      departmentId: "",
    });
    setContent("");
    setSelectedData(null);
    setFileList([]);
    setSelectedId(null);
    setIsModalOpen(null);
    setSearchTerm("");
    setFilters({});
  };

  // Populate form fields when editing a research
  useEffect(() => {
    if (isModalOpen === "edit" && selectedData) {
      form.reset({
        title: selectedData.title || "",
        description: selectedData.description || "",
        status: selectedData.status || "ONGOING",
        startDate: selectedData.startDate
          ? new Date(selectedData.startDate)
          : new Date(),
        endDate: selectedData.endDate
          ? new Date(selectedData.endDate)
          : new Date(),
        fileUrl: selectedData.fileUrl || "",
        departmentId: selectedData.departmentId || "",
      });
      setContent(selectedData.description || "");
    } else if (isModalOpen === "add") {
      form.reset({
        title: "",
        description: "",
        status: "ONGOING",
        startDate: new Date(),
        endDate: new Date(),
        fileUrl: "",
        departmentId: "",
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
                alt="research"
                fill
                className="rounded-md"
              />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const title = row.original.title;
        return <div className="truncate max-w-md">{title || "-"}</div>;
      },
    },
    {
      accessorKey: "fileUrl",
      header: "File",
      cell: ({ row }) => {
        const fileUrl = row.original.fileUrl;
        return (
          <div>
            {fileUrl ? (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                View File
              </a>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return <div className="truncate w-full">{status || "-"}</div>;
      },
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => {
        const startDate = row.original.startDate;
        return (
          <div className="truncate w-full">
            {startDate ? new Date(startDate).toLocaleDateString() : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        const endDate = row.original.endDate;
        return (
          <div className="truncate w-full">
            {endDate ? new Date(endDate).toLocaleDateString() : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => {
        const department = row.original.department?.name;
        return <div className="truncate w-full">{department || "-"}</div>;
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
          title="Research Projects"
          buttonText="Add Research"
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
          searchPlaceholder="Search by title"
          searchable
          filterable
          filterOptions={researchStatusOptions}
          onFilterChange={handleFilter}
          onSearchChange={handleSearchChange}
          loading={isTableLoading || isDeleting || isUpdating || isCreating}
        />

        {/* add or edit research */}
        <FormProvider {...form}>
          <ReusableModal
            open={isModalOpen === "add" || isModalOpen === "edit"}
            onClose={() => handleReset()}
            size="full"
            onConfirm={handleFormSubmit}
            loading={isCreating || isUpdating}
            title={isModalOpen === "add" ? "Add Research" : "Edit Research"}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start items-start gap-4">
                <FormInput
                  name="title"
                  label="Research Title"
                  placeholder="Enter research title"
                  required
                />

                <FormSelect
                  name="status"
                  label="Status"
                  options={researchStatusOptions}
                  placeholder="Select status"
                />

                <FormDatePicker
                  name="startDate"
                  label="Start Date"
                  placeholder="Select start date"
                />

                <FormDatePicker
                  name="endDate"
                  label="End Date"
                  placeholder="Select end date"
                />

                <FormSelect
                  name="departmentId"
                  label="Department"
                  options={departmentOptions}
                  placeholder="Select department"
                />

                <FormInput
                  name="fileUrl"
                  label="File URL"
                  placeholder="Enter file URL (optional)"
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
                <p className=" w-full text-start font-semibold">Content: </p>
                <div className="w-full h-full rounded-lg">
                  <RichTextEditor
                    placeholder="Enter Research Description..."
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
