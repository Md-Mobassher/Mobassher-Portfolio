// src/app/(dashboard)/dashboard/components/SliderList.tsx

"use client";
import { FormInput, FormNumberInput, FormTextarea } from "@/components/form";
import { FormFileInput } from "@/components/form/FormFileInput"; // Ensure import is correct
import EditDeleteButtons from "@/components/shared/button/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/modal/ReusableModal";
import { ReusableTable } from "@/components/shared/table/ReusableTable";
import { createGenericOperationsHook } from "@/hooks/useGenericOperations";
import {
  useCreateSliderMutation,
  useDeleteSliderMutation,
  useGetAllSlidersQuery,
  useUpdateSliderMutation,
} from "@/redux/features/admin/sliderApi";
import { useDebounced } from "@/redux/hooks";
import {
  createSliderFormSchema,
  SliderFormData,
  updateSliderFormSchema,
} from "@/types/schema";
import imageUploadCloudinary from "@/utils/imageUploadCloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DasboardTitle from "./DasboardTitle";

export default function SliderList() {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [fileList, setFileList] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

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

  // Use correct schema depending on modal mode
  const form = useForm<SliderFormData>({
    resolver: zodResolver(
      isModalOpen === "edit" ? updateSliderFormSchema : createSliderFormSchema
    ),
    defaultValues: {
      title: "",
      slogan: "",
      description: "",
      order: 0,
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
      createMutation: useCreateSliderMutation,
      updateMutation: useUpdateSliderMutation,
      deleteMutation: useDeleteSliderMutation,
    },
    "Slider"
  )();

  const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 600 });
  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      sortBy: "order",
      sortOrder: "desc",
      ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
      ...(filters ? filters : {}),
    }),
    [pagination, debouncedSearch, filters]
  );

  const { data, isLoading: isTableLoading } = useGetAllSlidersQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  // Form submission handler - simplified with custom hook
  const onSubmit = async (values: SliderFormData) => {
    let imageUrl = selectedData?.imageUrl || null;

    if (fileList.length > 0 && fileList[0].originFileObj) {
      const url = await imageUploadCloudinary(fileList[0].originFileObj);
      imageUrl = url;
    }

    const sliderData = {
      imageUrl,
      title: values.title,
      slogan: values.slogan,
      description: values.description,
      order: values.order,
    };

    let success = false;
    if (isModalOpen === "add") {
      success = await createEntity(sliderData);
    } else if (isModalOpen === "edit") {
      success = await updateEntity(selectedId!, sliderData);
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
      slogan: "",
      description: "",
      order: 0,
    });
    setFileList([]);
    setSelectedData(null);
    setSelectedId(null);
    setIsModalOpen(null);
    setSearchTerm("");
    setFilters({});
  };

  // Populate form fields when editing
  useEffect(() => {
    if (isModalOpen === "edit" && selectedData) {
      form.reset({
        title: selectedData.title || "",
        slogan: selectedData.slogan || "",
        description: selectedData.description || "",
        order: selectedData.order || 0,
      });
      setFileList([]);
    } else if (isModalOpen === "add") {
      form.reset({
        title: "",
        slogan: "",
        description: "",
        order: 0,
      });
      setFileList([]);
    }
  }, [isModalOpen, selectedData, form]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.original.imageUrl;
        return (
          <div className="w-full h-20 relative rounded-md">
            {imageUrl ? (
              <Image src={imageUrl} alt="slider" fill className="rounded-md" />
            ) : (
              "-"
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
        return <div className="truncate max-w-[200px]">{title || "-"}</div>;
      },
    },
    {
      accessorKey: "slogan",
      header: "Slogan",
      cell: ({ row }) => {
        const slogan = row.original.slogan;
        return <div className="truncate max-w-[200px]">{slogan || "-"}</div>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.original.description;
        return (
          <div className="truncate max-w-[300px]">
            {description?.slice(0, 50) || "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "order",
      header: "Order",
      cell: ({ row }) => {
        const order = row.original.order;
        return <div>{order ?? "-"}</div>;
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
          title="Sliders"
          buttonText="Add Slider"
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
          onSearchChange={handleSearchChange}
          loading={isTableLoading || isDeleting || isUpdating || isCreating}
        />

        {/* add or edit slider */}
        <FormProvider {...form}>
          <ReusableModal
            open={isModalOpen === "add" || isModalOpen === "edit"}
            onClose={() => handleReset()}
            onConfirm={handleFormSubmit}
            loading={isCreating || isUpdating}
            title={isModalOpen === "add" ? "Add Slider" : "Edit Slider"}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput name="title" label="Title" placeholder="Enter title" />
              <FormInput
                name="slogan"
                label="Slogan"
                placeholder="Enter slogan"
              />
              <FormTextarea
                name="description"
                label="Description"
                placeholder="Enter description"
              />
              <FormNumberInput
                name="order"
                label="Order"
                placeholder="Enter order"
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
            </form>
          </ReusableModal>
        </FormProvider>
      </div>
    </div>
  );
}
