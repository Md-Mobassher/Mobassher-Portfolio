// src/app/(dashboard)/dashboard/components/PartnerList.tsx

"use client";
import { FormFileInput, FormInput, FormTextarea } from "@/components/form";
import EditDeleteButtons from "@/components/shared/button/EditDeleteButtons";
import { ReusableModal } from "@/components/shared/modal/ReusableModal";
import { ReusableTable } from "@/components/shared/table/ReusableTable";
import { createGenericOperationsHook } from "@/hooks/useGenericOperations";
import {
  useCreatePartnerMutation,
  useDeletePartnerMutation,
  useGetAllPartnersQuery,
  useUpdatePartnerMutation,
} from "@/redux/features/admin/partnerApi";
import { useDebounced } from "@/redux/hooks";
import {
  createPartnerFormSchema,
  PartnerFormData,
  updatePartnerFormSchema,
} from "@/types/schema";
import imageUploadCloudinary from "@/utils/imageUploadCloudinary";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import DasboardTitle from "./DasboardTitle";

export default function PartnerList() {
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
  const [fileList, setFileList] = useState<any[]>([]);
  // Use correct schema depending on modal mode
  const form = useForm<PartnerFormData>({
    resolver: zodResolver(
      isModalOpen === "edit" ? updatePartnerFormSchema : createPartnerFormSchema
    ),
    defaultValues: {
      name: "",
      url: "",
      description: "",
    },
  });

  // Use the custom hook for Partner operations
  const {
    createEntity,
    updateEntity,
    deleteEntity,
    isCreating,
    isUpdating,
    isDeleting,
  } = createGenericOperationsHook(
    {
      createMutation: useCreatePartnerMutation,
      updateMutation: useUpdatePartnerMutation,
      deleteMutation: useDeletePartnerMutation,
    },
    "Partner"
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

  const { data, isLoading: isTableLoading } = useGetAllPartnersQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

  // Form submission handler
  const onSubmit = async (values: PartnerFormData) => {
    let imageUrl = selectedData?.imageUrl || null;

    if (fileList.length > 0 && fileList[0].originFileObj) {
      const url = await imageUploadCloudinary(fileList[0].originFileObj);
      imageUrl = url;
    }
    const PartnerData = {
      name: values.name,
      logoUrl: imageUrl,
      url: values.url,
      description: values.description,
    };

    let success = false;
    if (isModalOpen === "add") {
      success = await createEntity(PartnerData);
    } else if (isModalOpen === "edit") {
      success = await updateEntity(selectedId!, PartnerData);
    }

    if (success) {
      handleReset();
    }
  };

  // Handle form submission for modal
  const handleFormSubmit = () => {
    form.handleSubmit(onSubmit)();
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
      setFilters({
        /* Add filters if needed */
      });
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
      url: "",
      description: "",
    });
    setSelectedData(null);
    setSelectedId(null);
    setIsModalOpen(null);
    setFileList([]);
    setSearchTerm("");
    setFilters({});
  };

  // Populate form fields when editing a partner
  useEffect(() => {
    if (isModalOpen === "edit" && selectedData) {
      form.reset({
        name: selectedData.name || "",
        url: selectedData.url || "",
        description: selectedData.description || "",
      });
    } else if (isModalOpen === "add") {
      form.reset({
        name: "",
        url: "",
        description: "",
      });
    }
  }, [isModalOpen, selectedData, form]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "logoUrl",
      header: "Logo",
      cell: ({ row }) => {
        const logoUrl = row.original.logoUrl;
        return (
          <div className="w-full h-20 relative rounded-md max-w-[100px]">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="partner logo"
                fill
                className="rounded-md"
              />
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const name = row.original.name;
        return <div className="truncate w-full">{name || "-"}</div>;
      },
    },
    {
      accessorKey: "url",
      header: "URL",
      cell: ({ row }) => {
        const url = row.original.url;
        return <div className="truncate w-full">{url || "-"}</div>;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const description = row.original.description;
        return <div className="truncate w-full">{description || "-"}</div>;
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
          title="Partners"
          buttonText="Add Partner"
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

        {/* add or edit partner */}
        <FormProvider {...form}>
          <ReusableModal
            open={isModalOpen === "add" || isModalOpen === "edit"}
            onClose={() => handleReset()}
            onConfirm={handleFormSubmit}
            loading={isCreating || isUpdating}
            title={isModalOpen === "add" ? "Add Partner" : "Edit Partner"}
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                name="name"
                label="Partner Name"
                placeholder="Enter partner name"
                required
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

              <FormInput
                name="url"
                label="Website URL"
                placeholder="Enter website URL"
              />

              <FormTextarea
                name="description"
                label="Description"
                placeholder="Enter description"
              />
            </form>
          </ReusableModal>
        </FormProvider>
      </div>
    </div>
  );
}
