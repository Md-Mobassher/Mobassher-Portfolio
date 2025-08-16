// src/app/(dashboard)/dashboard/components/ContactList.tsx

"use client";
import EditDeleteButtons from "@/components/shared/button/EditDeleteButtons";
import DetailsCard from "@/components/shared/card/DetailsCard";
import { ReusableModal } from "@/components/shared/modal/ReusableModal";
import { ReusableTable } from "@/components/shared/table/ReusableTable";
import { createGenericOperationsHook } from "@/hooks/useGenericOperations";
import {
  useDeleteContactMutation,
  useGetAllContactsQuery,
} from "@/redux/features/admin/contactApi";
import { useDebounced } from "@/redux/hooks";
import { dateFormatter } from "@/utils/dateFormatter";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import DasboardTitle from "./DasboardTitle";

const contactTypeFilterOptions = [
  { id: "all", title: "All" },
  { id: "general", title: "General" },
  { id: "inquiry", title: "Inquiry" },
  { id: "other", title: "Other" },
];

export default function ContactList() {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  // Use the custom hook for contact operations
  const { deleteEntity, isDeleting } = createGenericOperationsHook(
    {
      deleteMutation: useDeleteContactMutation,
    },
    "Contact"
  )();

  const debouncedSearch = useDebounced({ searchQuery: searchTerm, delay: 600 });
  const query = useMemo(
    () => ({
      page: pagination.page,
      limit: pagination.limit,
      sortBy: "createdAt",
      sortOrder: "asc",
      ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    }),
    [pagination, debouncedSearch]
  );

  const { data, isLoading, isError } = useGetAllContactsQuery(query, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data?.meta?.total) {
      setPagination((prev) => ({ ...prev, total: data.meta.total }));
    }
  }, [data?.meta?.total]);

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
    setSelectedData(null);
    setIsModalOpen(null);
    setSearchTerm("");
  };

  // Populate form fields when editing a user

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
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        const phone = row.original.phone;
        return <div className="truncate  w-full">{phone || "-"}</div>;
      },
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => {
        const message = row.original.message;
        return (
          <div className="truncate  w-full text-wrap">
            {message.slice(0, 100) || "-"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <EditDeleteButtons
          onView={() => {
            setSelectedData(row.original);
            setIsModalOpen("view");
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
          title="Contacts"
          // buttonText="Add Contact"
          // onClick={() => setIsModalOpen("add")}
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
          filterPlaceholder="Filter by type"
          searchable
          filterable
          filterOptions={contactTypeFilterOptions.map((x) => ({
            label: x.title,
            value: x.id,
          }))}
          onFilterChange={handleFilter}
          onSearchChange={handleSearchChange}
          loading={isLoading || isDeleting}
        />

        {/* Contact Details Modal */}
        <ReusableModal
          open={isModalOpen === "view"}
          onClose={() => handleReset()}
          onConfirm={() => handleReset()}
          size="3xl"
          hideCancelButton
          confirmText="Close"
          loading={isLoading || isDeleting}
          title={"Contact Details"}
        >
          <div className="max-w-4xl mx-auto">
            <DetailsCard
              title={selectedData?.name || "Contact Information"}
              subtitle={`From: ${selectedData?.email}`}
              showShareButtons={false}
              className="border-0 shadow-none"
              content={
                <div className="flex flex-col gap-2 -mt-5">
                  <div className="flex flex-col gap-2">
                    <p>
                      <span className="font-bold">Phone:</span>{" "}
                      {selectedData?.phone || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Date:</span>{" "}
                      {dateFormatter(selectedData?.createdAt) || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Type:</span>{" "}
                      {selectedData?.type || "N/A"}
                    </p>
                    <p>
                      <span className="font-bold">Message:</span>{" "}
                      {selectedData?.message || "N/A"}
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </ReusableModal>
      </div>
    </div>
  );
}
