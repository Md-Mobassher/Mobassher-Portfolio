"use client";

import { ReusableModal } from "./ReusableModal";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  loading?: boolean;
  itemName?: string;
  description?: string;
}

export const DeleteConfirmationModal = ({
  open,
  onClose,
  onDelete,
  loading,
  itemName,
  description,
}: Props) => {
  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      title="Delete Confirmation"
      description={
        description
          ? description
          : `Are you sure you want to delete ${itemName || "this information"}?`
      }
      onConfirm={onDelete}
      loading={loading}
      confirmText="Delete"
      cancelText="Cancel"
    />
  );
};
