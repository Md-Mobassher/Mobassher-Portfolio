import { useDeleteConfirm } from "@/lib/provider/DeleteContext";
import { useCallback } from "react";
import { toast } from "sonner";

// Generic interfaces for any entity
interface BaseEntity {
  id?: string;
}

interface CreateEntityData<T> {
  [key: string]: any;
}

interface UpdateEntityData<T> {
  [key: string]: any;
}

interface UseGenericOperationsReturn<T extends BaseEntity> {
  createEntity?: (data: CreateEntityData<T>) => Promise<boolean>;
  updateEntity?: (id: string, data: UpdateEntityData<T>) => Promise<boolean>;
  deleteEntity?: (id: string) => Promise<boolean>;
  isCreating?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
  isCreateError?: boolean;
  isUpdateError?: boolean;
  isDeleteError?: boolean;
}

// Generic hook factory for any entity
export const createGenericOperationsHook = <T extends BaseEntity>(
  mutations: {
    createMutation?: any;
    updateMutation?: any;
    deleteMutation?: any;
  },
  entityName: string,
  validationRules?: {
    create?: (data: CreateEntityData<T>) => boolean;
    update?: (data: UpdateEntityData<T>) => boolean;
  }
) => {
  return (): UseGenericOperationsReturn<T> => {
    const [createMutation, { isLoading: isCreating, isError: isCreateError }] =
      mutations?.createMutation
        ? mutations.createMutation()
        : [undefined, { isLoading: false, isError: false }];
    const [updateMutation, { isLoading: isUpdating, isError: isUpdateError }] =
      mutations?.updateMutation
        ? mutations.updateMutation()
        : [undefined, { isLoading: false, isError: false }];
    const [deleteMutation, { isLoading: isDeleting, isError: isDeleteError }] =
      mutations?.deleteMutation
        ? mutations.deleteMutation()
        : [undefined, { isLoading: false, isError: false }];

    // Generic validation create data
    const validateCreateData = useCallback(
      (data: CreateEntityData<T>): boolean => {
        if (validationRules?.create) {
          return validationRules.create(data);
        }
        return true;
      },
      [validationRules]
    );

    // Generic validation update data
    const validateUpdateData = useCallback(
      (data: UpdateEntityData<T>): boolean => {
        if (validationRules?.update) {
          return validationRules.update(data);
        }
        return true;
      },
      [validationRules]
    );

    // Utility to extract error message from various error shapes
    function extractErrorMessage(error: any): string | null {
      if (!error) return null;
      if (typeof error === "string") return error;
      if (error.data?.message) return error.data.message;
      if (error.data?.error) return error.data.error;
      if (error.message) return error.message;
      if (error.error) return error.error;
      if (typeof error.data === "string") return error.data;
      return null;
    }

    // Generic error handler
    const handleApiError = useCallback(
      (error: any, operation: string) => {
        console.error(`${operation} ${entityName} error:`, error);

        const serverMessage = extractErrorMessage(error);
        if (serverMessage) {
          toast.error(serverMessage);
          return;
        }

        if (error?.status === 409) {
          toast.error(serverMessage || `${entityName} already exists`);
        } else if (error?.status === 404) {
          toast.error(serverMessage || `${entityName} not found`);
        } else if (error?.status === 400) {
          toast.error(serverMessage || "Invalid data provided");
        } else if (error?.status === 401) {
          toast.error(serverMessage || "Unauthorized access");
        } else if (error?.status === 403) {
          toast.error(serverMessage || "Access forbidden");
        } else if (error?.status >= 500) {
          toast.error(serverMessage || "Server error. Please try again later");
        } else {
          toast.error(
            serverMessage ||
              `Failed to ${operation} ${entityName}. Please try again`
          );
        }
      },
      [entityName]
    );

    // Create entity
    const createEntity = useCallback(
      async (data: CreateEntityData<T>): Promise<boolean> => {
        try {
          if (!createMutation) {
            toast.error(`Create operation not available for ${entityName}`);
            return false;
          }

          if (!validateCreateData(data)) {
            return false;
          }

          const response = await createMutation(data).unwrap();

          if (response.success) {
            toast.success(
              response.message || `${entityName} created successfully!`
            );
            return true;
          } else {
            toast.error(response.message || `Failed to create ${entityName}`);
            return false;
          }
        } catch (error: any) {
          handleApiError(error, "create");
          return false;
        }
      },
      [createMutation, validateCreateData, handleApiError, entityName]
    );

    // Update entity
    const updateEntity = useCallback(
      async (id: string, data: UpdateEntityData<T>): Promise<boolean> => {
        try {
          if (!updateMutation) {
            toast.error(`Update operation not available for ${entityName}`);
            return false;
          }

          if (!id) {
            toast.error(`${entityName} ID is required`);
            return false;
          }

          if (!validateUpdateData(data)) {
            return false;
          }

          const response = await updateMutation({
            id,
            updatedData: data,
          }).unwrap();

          if (response.success) {
            toast.success(
              response.message || `${entityName} updated successfully!`
            );
            return true;
          } else {
            toast.error(response.message || `Failed to update ${entityName}`);
            return false;
          }
        } catch (error: any) {
          handleApiError(error, "update");
          return false;
        }
      },
      [updateMutation, validateUpdateData, handleApiError, entityName]
    );

    // Delete entity

    const { confirmDelete, setIsDeleting } = useDeleteConfirm();

    const deleteEntity = useCallback(
      async (id: string): Promise<boolean> => {
        if (!deleteMutation) {
          toast.error(`Delete operation not available for ${entityName}`);
          return false;
        }

        if (!id) {
          toast.error(`${entityName} ID is required`);
          return false;
        }

        return new Promise((resolve) => {
          confirmDelete(
            id,
            entityName,
            async (deleteId: string): Promise<boolean> => {
              try {
                setIsDeleting(isDeleting);
                const response = await deleteMutation(deleteId).unwrap();
                if (response.success) {
                  toast.success(
                    response.message || `${entityName} deleted successfully!`
                  );
                  resolve(true);
                  return true;
                } else {
                  toast.error(
                    response.message || `Failed to delete ${entityName}`
                  );
                  resolve(false);
                  setIsDeleting(isDeleting);
                  return false;
                }
              } catch (error: any) {
                handleApiError(error, "delete");
                resolve(false);
                return false;
              }
            }
          );
        });
      },
      [deleteMutation, handleApiError, entityName, confirmDelete, setIsDeleting]
    );

    return {
      createEntity,
      updateEntity,
      deleteEntity,
      isCreating,
      isUpdating,
      isDeleting,
      isCreateError,
      isUpdateError,
      isDeleteError,
    };
  };
};

// Example usage for different entities:
/*
// For Proposals
export const useProposalOperations = createGenericOperationsHook(
  {
    createMutation: useCreateProposalMutation,
    updateMutation: useUpdateProposalMutation,
    deleteMutation: useDeleteProposalMutation,
  },
  "Proposal",
  {
    create: (data) => {
      if (!data.title?.trim()) {
        toast.error("Title is required");
        return false;
      }
      return true;
    },
    update: (data) => {
      if (data.title && !data.title.trim()) {
        toast.error("Title cannot be empty");
        return false;
      }
      return true;
    },
  }
);

// For Contacts
export const useContactOperations = createGenericOperationsHook(
  {
    createMutation: useCreateContactMutation,
    updateMutation: useUpdateContactMutation,
    deleteMutation: useDeleteContactMutation,
  },
  "Contact"
);
*/
