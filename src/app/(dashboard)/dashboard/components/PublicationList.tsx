// src/app/(dashboard)/dashboard/components/PublicationList.tsx

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
import { publicationTypeOptions } from "@/lib/constant";
import { useGetAllAuthorsQuery } from "@/redux/features/admin/authorApi";
import {
  useCreatePublicationMutation,
  useDeletePublicationMutation,
  useGetAllPublicationsQuery,
  useUpdatePublicationMutation,
} from "@/redux/features/admin/publicationApi";
import { useDebounced } from "@/redux/hooks";
import {
  createPublicationFormSchema,
  PublicationFormData,
  updatePublicationFormSchema,
} from "@/types/schema";
import imageUploadCloudinary from "@/utils/imageUploadCloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DasboardTitle from "./DasboardTitle";

export default function PublicationList() {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [content, setContent] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [fileList, setFileList] = useState<any[]>([]);

  // Use correct schema depending on modal mode
  const form = useForm<PublicationFormData>({
    resolver: zodResolver(
      isModalOpen === "edit"
        ? updatePublicationFormSchema
        : createPublicationFormSchema
    ),
    defaultValues: {
      title: "",
      type: "JOURNAL",
      content: "",
      fileUrl: "",
      publishDate: new Date(),
      authorId: "",
    },
  });

  // Use the custom hook for publication operations
  const {
    createEntity,
    updateEntity,
    deleteEntity,
    isCreating,
    isUpdating,
    isDeleting,
  } = createGenericOperationsHook(
    {
      createMutation: useCreatePublicationMutation,
      updateMutation: useUpdatePublicationMutation,
      deleteMutation: useDeletePublicationMutation,
    },
    "Publication"
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

  const { data, isLoading: isTableLoading } = useGetAllPublicationsQuery(
    query,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: authorData, isLoading: isAuthorLoading } =
    useGetAllAuthorsQuery(
      {
        page: 1,
        limit: 30,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

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
  const onSubmit = async (values: PublicationFormData) => {
    let imageUrl = selectedData?.imageUrl || null;

    if (fileList.length > 0 && fileList[0].originFileObj) {
      const url = await imageUploadCloudinary(fileList[0].originFileObj);
      imageUrl = url;
    }

    const publicationData = {
      title: values.title,
      type: values.type,
      imageUrl: imageUrl,
      content: content,
      fileUrl: values.fileUrl,
      publishDate: values.publishDate,
      authorId: values.authorId,
    };

    let success = false;
    if (isModalOpen === "add") {
      success = await createEntity(publicationData);
    } else if (isModalOpen === "edit") {
      success = await updateEntity(selectedId!, publicationData);
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
      setFilters({ type: selectedFilter });
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
      type: "JOURNAL",
      content: "",
      fileUrl: "",
      publishDate: null,
      authorId: "",
    });
    setSelectedData(null);
    setSelectedId(null);
    setIsModalOpen(null);
    setFileList([]);
    setSearchTerm("");
    setContent("");
    setFilters({});
  };

  // Populate form fields when editing
  useEffect(() => {
    if (isModalOpen === "edit" && selectedData) {
      form.reset({
        title: selectedData.title || "",
        type: selectedData.type || "JOURNAL",
        fileUrl: selectedData.fileUrl || "",
        publishDate: selectedData.publishDate
          ? new Date(selectedData.publishDate)
          : undefined,
        authorId: selectedData.authorId || "",
      });
      setContent(selectedData.content || "");
    } else if (isModalOpen === "add") {
      form.reset({
        title: "",
        type: "JOURNAL",
        fileUrl: "",
        publishDate: undefined,
        authorId: "",
      });
      setContent("");
    }
  }, [isModalOpen, selectedData, form]);

  const authorOption =
    authorData?.data?.map((author) => {
      return { value: author?.id, label: author?.name };
    }) || [];

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.original.imageUrl;
        return (
          <div className="w-full h-8 flex-shrink-0 relative rounded-md max-w-[100px]">
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
        return (
          <div className="truncate max-w-[200px] font-medium">
            {title || "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;
        const typeLabel =
          publicationTypeOptions.find((option) => option.value === type)
            ?.label || type;
        return (
          <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {typeLabel}
          </div>
        );
      },
    },
    {
      accessorKey: "publishDate",
      header: "Publish Date",
      cell: ({ row }) => {
        const publishDate = row.original.publishDate;
        return (
          <div>
            {publishDate ? new Date(publishDate).toLocaleDateString() : "-"}
          </div>
        );
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
      accessorKey: "authorName",
      header: "Author Name",
      cell: ({ row }) => {
        const author = row?.original?.author;
        return (
          <div className="truncate max-w-[150px]">{author?.name || "-"}</div>
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
          title="Publications"
          buttonText="Add Publication"
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
          searchPlaceholder="Search publications..."
          searchable
          filterable
          filterOptions={publicationTypeOptions}
          onFilterChange={handleFilter}
          onSearchChange={handleSearchChange}
          loading={isTableLoading || isCreating || isUpdating || isDeleting}
        />

        {/* add or edit publication */}
        <FormProvider {...form}>
          <ReusableModal
            open={isModalOpen === "add" || isModalOpen === "edit"}
            size="full"
            onClose={() => handleReset()}
            onConfirm={handleFormSubmit}
            loading={isCreating || isUpdating}
            title={
              isModalOpen === "add" ? "Add Publication" : "Edit Publication"
            }
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-start">
                <FormInput
                  name="title"
                  label="Title"
                  placeholder="Enter publication title"
                  required
                />

                <FormSelect
                  name="type"
                  label="Publication Type"
                  placeholder="Select publication type"
                  options={publicationTypeOptions}
                  required
                />
                <FormDatePicker
                  name="publishDate"
                  label="Publish Date"
                  placeholder="Select publish date"
                  required
                />
                <FormInput
                  name="fileUrl"
                  label="File URL"
                  placeholder="Enter file URL (optional)"
                />
                <FormSelect
                  name="authorId"
                  label="Select Author"
                  placeholder="Enter Author Name"
                  options={authorOption}
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
                <div className="w-full h-full rounded-md">
                  <RichTextEditor
                    placeholder="Enter Description..."
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
