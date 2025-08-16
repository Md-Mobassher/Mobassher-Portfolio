// src/app/(dashboard)/dashboard/components/VideoList.tsx

"use client";
import { FormInput, FormNumberInput } from "@/components/form";
import EditDeleteButtons from "@/components/shared/button/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/modal/ReusableModal";
import { ReusableTable } from "@/components/shared/table/ReusableTable";
import { createGenericOperationsHook } from "@/hooks/useGenericOperations";
import {
  useCreateVideoMutation,
  useDeleteVideoMutation,
  useGetAllVideosQuery,
  useUpdateVideoMutation,
} from "@/redux/features/admin/videoApi";
import { useDebounced } from "@/redux/hooks";
import {
  createVideoFormSchema,
  updateVideoFormSchema,
  VideoFormData,
} from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DasboardTitle from "./DasboardTitle";

export default function VideoList() {
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
  const form = useForm<VideoFormData>({
    resolver: zodResolver(
      isModalOpen === "edit" ? updateVideoFormSchema : createVideoFormSchema
    ),
    defaultValues: {
      title: "",
      videoUrl: "",
      order: 0,
    },
  });

  // Use the custom hook for Video operations
  const {
    createEntity,
    updateEntity,
    deleteEntity,
    isCreating,
    isUpdating,
    isDeleting,
  } = createGenericOperationsHook(
    {
      createMutation: useCreateVideoMutation,
      updateMutation: useUpdateVideoMutation,
      deleteMutation: useDeleteVideoMutation,
    },
    "Video"
  )();

  const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 600 });
  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      sortBy: "createdAt",
      sortOrder: "desc",
      ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    }),
    [pagination, debouncedSearch]
  );

  const { data, isLoading: isTableLoading } = useGetAllVideosQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  // Form submission handler
  const onSubmit = async (values: VideoFormData) => {
    const videoData = {
      title: values.title,
      videoUrl: values.videoUrl,
      order: values.order,
    };

    let success = false;
    if (isModalOpen === "add") {
      success = await createEntity(videoData);
    } else if (isModalOpen === "edit") {
      success = await updateEntity(selectedId!, videoData);
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

  // reset
  const handleReset = () => {
    form.reset({
      title: "",
      videoUrl: "",
      order: 0,
    });
    setSelectedData(null);
    setSelectedId(null);
    setIsModalOpen(null);
    setSearchTerm("");
  };

  // Populate form fields when editing a video
  useEffect(() => {
    if (isModalOpen === "edit" && selectedData) {
      form.reset({
        title: selectedData.title || "",
        videoUrl: selectedData.videoUrl || "",
        order: selectedData.order || 0,
      });
    } else if (isModalOpen === "add") {
      form.reset({
        title: "",
        videoUrl: "",
        order: 0,
      });
    }
  }, [isModalOpen, selectedData, form]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        const title = row.original.title;
        return <div className="truncate w-full">{title || "-"}</div>;
      },
    },
    {
      accessorKey: "videoUrl",
      header: "Video URL",
      cell: ({ row }) => {
        const videoUrl = row?.original?.videoUrl;
        return (
          <div className="truncate w-full max-w-xs">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {videoUrl || "-"}
            </a>
          </div>
        );
      },
    },
    {
      accessorKey: "order",
      header: "Order",
      cell: ({ row }) => {
        const order = row?.original?.order;
        return <div className="truncate w-full">{order || "-"}</div>;
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
          title="Videos"
          buttonText="Add Video"
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
          searchPlaceholder="Search videos..."
          searchable
          onSearchChange={handleSearchChange}
          loading={isTableLoading || isDeleting || isUpdating || isCreating}
        />

        {/* add or edit video */}
        <FormProvider {...form}>
          <ReusableModal
            open={isModalOpen === "add" || isModalOpen === "edit"}
            onClose={() => handleReset()}
            size="lg"
            onConfirm={handleFormSubmit}
            loading={isCreating || isUpdating}
            title={isModalOpen === "add" ? "Add Video" : "Edit Video"}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                name="title"
                label="Title"
                placeholder="Enter video title"
                required
              />

              <FormInput
                name="videoUrl"
                label="Video URL"
                placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                required
              />

              <FormNumberInput
                name="order"
                label="Order"
                placeholder="Enter display order"
              />
            </form>
          </ReusableModal>
        </FormProvider>
      </div>
    </div>
  );
}
