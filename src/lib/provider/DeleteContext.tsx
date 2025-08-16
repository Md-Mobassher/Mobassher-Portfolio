// src/lib/provider/DeleteContext.tsx

"use client";
import { DeleteConfirmationModal } from "@/components/shared/modal/DeleteConfirmationModal";
import { createContext, useContext, useState } from "react";

interface DeleteContextType {
  confirmDelete: (
    id: string,
    itemName: string,
    onDelete: (id: string) => Promise<boolean>
  ) => void;
  setIsDeleting: (isDeleting: boolean) => void;
}

const DeleteContext = createContext<DeleteContextType | undefined>(undefined);

export const useDeleteConfirm = () => {
  const context = useContext(DeleteContext);
  if (!context)
    throw new Error("useDeleteConfirm must be used within DeleteProvider");
  return context;
};

export const DeleteProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState<{
    id: string;
    itemName: string;
    onDelete: (id: string) => Promise<boolean>;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const confirmDelete = (
    id: string,
    itemName: string,
    onDelete: (id: string) => Promise<boolean>
  ) => {
    setDeleteInfo({ id, itemName, onDelete });
    setIsOpen(true);
  };

  const handleDelete = async () => {
    if (deleteInfo) {
      await deleteInfo.onDelete(deleteInfo.id);
      setIsDeleting(false);
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <DeleteContext.Provider value={{ confirmDelete, setIsDeleting }}>
      {children}
      <DeleteConfirmationModal
        open={isOpen}
        onClose={handleClose}
        onDelete={handleDelete}
        itemName={deleteInfo?.itemName || "Item"}
        loading={isDeleting}
      />
    </DeleteContext.Provider>
  );
};
