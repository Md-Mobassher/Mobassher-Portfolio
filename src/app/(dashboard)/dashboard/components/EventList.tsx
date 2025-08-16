// src/app/(dashboard)/dashboard/components/EventList.tsx

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
import {
  eventFilterOption,
  eventTypeOptions,
  yesNoOptions,
} from "@/lib/constant";
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useGetAllEventsQuery,
  useUpdateEventMutation,
} from "@/redux/features/admin/eventApi";
import { useDebounced } from "@/redux/hooks";
import {
  createEventFormSchema,
  EventFormData,
  updateEventFormSchema,
} from "@/types/schema";
import imageUploadCloudinary from "@/utils/imageUploadCloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DasboardTitle from "./DasboardTitle";

export default function EventList() {
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
  const form = useForm<EventFormData>({
    resolver: zodResolver(
      isModalOpen === "edit" ? updateEventFormSchema : createEventFormSchema
    ),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      type: "",
      location: "",
      isUpcoming: true,
    },
  });

  // Use the custom hook for Event operations
  const {
    createEntity,
    updateEntity,
    deleteEntity,
    isCreating,
    isUpdating,
    isDeleting,
  } = createGenericOperationsHook(
    {
      createMutation: useCreateEventMutation,
      updateMutation: useUpdateEventMutation,
      deleteMutation: useDeleteEventMutation,
    },
    "Event"
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

  const { data, isLoading: isTableLoading } = useGetAllEventsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

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
    // Check if this is an existing image deletion
    if (file.isExistingImage) {
      // Clear the existing image URL
      setSelectedData((prev) => (prev ? { ...prev, imageUrl: null } : null));
      return true;
    }

    // Handle regular file removal
    setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    return true;
  };

  // Form submission handler
  const onSubmit = async (values: EventFormData) => {
    let imageUrl = selectedData?.imageUrl || null;

    if (fileList.length > 0 && fileList[0].originFileObj) {
      const url = await imageUploadCloudinary(fileList[0].originFileObj);
      imageUrl = url;
    }

    const EventData = {
      title: values.title,
      description: content,
      date: values.date,
      type: values.type,
      location: values.location,
      imageUrl,
      isUpcoming: values.isUpcoming,
    };

    let success = false;
    if (isModalOpen === "add") {
      success = await createEntity(EventData);
    } else if (isModalOpen === "edit") {
      success = await updateEntity(selectedId!, EventData);
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
      setFilters({ isUpcoming: selectedFilter });
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
      date: new Date(),
      type: "",
      location: "",
      imageUrl: "",
      isUpcoming: true,
    });
    setContent("");
    setFileList([]);
    setSelectedData(null);
    setSelectedId(null);
    setIsModalOpen(null);
    setSearchTerm("");
    setFilters({});
  };

  // Populate form fields when editing an event
  useEffect(() => {
    if (isModalOpen === "edit" && selectedData) {
      form.reset({
        title: selectedData.title || "",
        description: selectedData.description || "",
        date: selectedData.date ? new Date(selectedData.date) : new Date(),
        type: selectedData.type || "",
        location: selectedData.location || "",
        isUpcoming: selectedData.isUpcoming ?? true,
      });
      setContent(selectedData.description || "");
    } else if (isModalOpen === "add") {
      form.reset({
        title: "",
        description: "",
        date: new Date(),
        type: "",
        location: "",
        isUpcoming: true,
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
                src={imageUrl || "/images/noimage.png"}
                alt="event"
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
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = row.original.date;
        return (
          <div className="truncate w-full">
            {date ? new Date(date).toLocaleDateString() : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const location = row.original.location;
        return <div className="truncate max-w-md">{location || "-"}</div>;
      },
    },
    {
      accessorKey: "isUpcoming",
      header: "Upcoming",
      cell: ({ row }) => {
        const isUpcoming = row.original.isUpcoming;
        return (
          <div className="truncate w-full">{isUpcoming ? "Yes" : "No"}</div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.original.type;
        return <div className="truncate w-full">{type || "-"}</div>;
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
          title="Events"
          buttonText="Add Event"
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
          filterOptions={eventFilterOption}
          onFilterChange={handleFilter}
          onSearchChange={handleSearchChange}
          loading={isTableLoading || isDeleting || isUpdating || isCreating}
        />

        {/* add or edit event */}
        <FormProvider {...form}>
          <ReusableModal
            open={isModalOpen === "add" || isModalOpen === "edit"}
            onClose={() => handleReset()}
            size="full"
            onConfirm={handleFormSubmit}
            loading={isCreating || isUpdating}
            title={isModalOpen === "add" ? "Add Event" : "Edit Event"}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start items-start gap-4">
                <FormInput
                  name="title"
                  label="Title"
                  placeholder="Enter Event title"
                  required
                />

                <FormSelect
                  name="type"
                  label="Type"
                  options={eventTypeOptions}
                  placeholder="Select type"
                />

                <FormDatePicker
                  name="date"
                  label="Date"
                  placeholder="Select date"
                />
                <FormInput
                  name="location"
                  label="Location"
                  placeholder="Enter location"
                  required
                />

                <FormSelect
                  name="isUpcoming"
                  label="Is Upcoming"
                  options={yesNoOptions}
                  placeholder="Select is upcoming"
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
                  uploadedImage={selectedData?.imageUrl}
                />
              </div>
              <div className="  w-full h-full">
                <p className=" w-full text-start font-semibold">Content: </p>
                <div className="w-full h-full rounded-lg">
                  <RichTextEditor
                    placeholder="Enter Event Description..."
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
