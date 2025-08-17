"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ReactNode } from "react";

// Size variants for consistent modal sizing
export type ModalSize =
  | "xs" // Extra small: 320px
  | "sm" // Small: 480px
  | "md" // Medium: 640px (default)
  | "lg" // Large: 768px
  | "xl" // Extra large: 1024px
  | "2xl" // 2X large: 1280px
  | "3xl" // 3X large: 1536px
  | "full" // Full screen
  | "custom"; // Custom width

export interface ReusableModalProps {
  open: boolean;
  size?: ModalSize;
  customWidth?: string; // For custom size (e.g., "800px", "50vw")
  onClose?: () => void;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  loading?: boolean;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
  hideFooter?: boolean;
  hideCancelButton?: boolean;
  hideButtons?: boolean;
  // Additional industry-standard props
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  centered?: boolean;
  scrollable?: boolean;
  maxHeight?: string;
}

// Size configuration object
const sizeConfig = {
  xs: "max-w-xs w-[90%] sm:w-[320px]",
  sm: "max-w-sm w-[90%] sm:w-[480px]",
  md: "max-w-md w-[90%] sm:w-[640px]",
  lg: "max-w-lg w-[90%] sm:w-[768px]",
  xl: "max-w-xl w-[90%] sm:w-[1024px]",
  "2xl": "max-w-2xl w-[90%] sm:w-[1280px]",
  "3xl": "max-w-3xl w-[90%] sm:w-[1536px]",
  full: "w-[95vw] h-[95vh] max-w-none",
  custom: "", // Will use customWidth prop
} as const;

export const ReusableModal = ({
  open,
  size = "md",
  customWidth,
  onClose,
  title,
  description,
  onConfirm,
  loading = false,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
  hideFooter = false,
  hideCancelButton = false,
  hideButtons = false,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  centered = true,
  scrollable = true,
  maxHeight = "80vh",
}: ReusableModalProps) => {
  // Handle close behavior
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && onClose) {
      onClose();
    }
  };

  // Generate width classes
  const getWidthClasses = () => {
    if (size === "custom" && customWidth) {
      return `w-[${customWidth}]`;
    }
    return sizeConfig[size];
  };

  // Generate height/max-height classes
  const getHeightClasses = () => {
    if (size === "full") {
      return "max-h-[95vh]";
    }
    return scrollable ? `max-h-[${maxHeight}]` : "max-h-[80vh]";
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal={true}>
      <DialogContent
        className={cn(
          "text-black bg-[#F5F4FC] lg:px-10 md:px-8 px-4 md:pb-8 pb-5 overflow-y-auto",
          getWidthClasses(),
          getHeightClasses(),
          centered &&
            "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
          // Responsive improvements - only apply to non-full and non-custom sizes
          size !== "full" &&
            size !== "custom" &&
            `sm:w-[90%] max-h-[${maxHeight}]`,
          size === "full" &&
            `sm:w-[95vw] md:w-[95vw] lg:w-[95vw] max-w-7xl max-h-[${maxHeight || "90vh"}]`,
          size === "custom" &&
            customWidth &&
            `sm:w-[${customWidth}] md:w-[${customWidth}] max-h-[${maxHeight}]`
        )}
        onPointerDownOutside={
          closeOnOverlayClick ? undefined : (e) => e.preventDefault()
        }
        onEscapeKeyDown={closeOnEscape ? undefined : (e) => e.preventDefault()}
      >
        {(title || description) && (
          <DialogHeader>
            {title === "No Title" ? (
              <VisuallyHidden>
                <DialogTitle>No Title</DialogTitle>
              </VisuallyHidden>
            ) : (
              <DialogTitle className="text-xl lg:text-2xl font-semibold">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-md text-gray-600 mt-2">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}

        {children && <div className={cn("w-full mx-auto")}>{children}</div>}

        {!hideFooter && (
          <DialogFooter className="flex justify-center lg:gap-5 gap-4 ">
            {!hideButtons && (
              <>
                {!hideCancelButton && (
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="bg-gray-600 hover:bg-secondary text-white text-md min-w-[80px]"
                    disabled={loading}
                  >
                    {cancelText}
                  </Button>
                )}
                <Button
                  type="submit"
                  onClick={onConfirm}
                  disabled={loading}
                  className="bg-primary hover:bg-accent text-white text-md min-w-[80px]"
                >
                  {loading ? "Processing..." : confirmText}
                </Button>
              </>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
