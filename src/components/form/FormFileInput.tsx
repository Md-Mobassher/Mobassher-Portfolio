// src/components/form/FormFileInput.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { File, Trash2, Upload, X } from "lucide-react";
import React, { forwardRef, useCallback, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormFileInputProps } from "./types";

/**
 * FormFileInput Component
 *
 * A comprehensive file input component with the following features:
 * - Drag and drop file upload
 * - File validation (size, type, count)
 * - Image preview for existing images with delete functionality
 * - Support for both single and multiple file uploads
 * - Visual feedback for selected files with thumbnails
 * - Hover effects for image deletion
 * - Integration with React Hook Form
 *
 * @example
 * // Single image upload with existing image
 * <FormFileInput
 *   name="avatar"
 *   label="Profile Picture"
 *   accept="image/*"
 *   multiple={false}
 *   uploadedImage="https://example.com/existing-image.jpg"
 *   handleUpload={handleUpload}
 *   handleRemove={handleRemove}
 * />
 *
 * @example
 * // Multiple file upload
 * <FormFileInput
 *   name="gallery"
 *   label="Gallery Images"
 *   accept="image/*"
 *   multiple={true}
 *   maxFiles={5}
 *   handleUpload={handleUpload}
 *   handleRemove={handleRemove}
 * />
 */
const FormFileInput = forwardRef<HTMLInputElement, FormFileInputProps>(
  (
    {
      name,
      label,
      description,
      placeholder = "Choose file...",
      required = false,
      disabled = false,
      className,
      labelClassName,
      descriptionClassName,
      errorClassName,
      containerClassName,
      leftIcon,
      rightIcon,
      showError = true,
      form,
      rules,
      defaultValue,
      onChange: customOnChange,
      onBlur: customOnBlur,
      onFocus: customOnFocus,
      accept,
      multiple = false,
      maxSize,
      maxFiles,
      dragAndDrop = false,
      preview = false,
      size = "md",
      variant = "default",
      fileList = [],
      handleUpload,
      handleRemove,
      uploadedImage,
      ...inputProps
    },
    ref
  ) => {
    const formContext = useFormContext();
    const formToUse = form || formContext;
    const [dragActive, setDragActive] = useState(false);

    if (!formToUse) {
      throw new Error(
        "FormFileInput must be used within a FormProvider or have a form prop"
      );
    }

    const {
      control,
      formState: { errors },
    } = formToUse;

    const error = errors[name];
    const fieldError = error?.message as string;

    // Size classes
    const sizeClasses = {
      sm: "h-8 px-2 text-sm",
      md: "h-10 px-3 text-base",
      lg: "h-12 px-4 text-lg",
    };

    // Variant classes
    const variantClasses = {
      default: "border-input border-primary bg-white text-secondary",
      outline: "border-2 border-input bg-white border-primary",
      filled: "border-0 bg-muted",
      ghost: "border-0 bg-white",
    };

    const inputClasses = cn(
      "w-full rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size],
      variantClasses[variant],
      dragActive && "border-primary bg-primary/5",
      error && "border-destructive focus-visible:ring-destructive",
      className
    );

    const handleDrag = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
      }
    }, []);

    const handleFiles = useCallback(
      (files: File[]) => {
        // Validate file count
        if (maxFiles && files.length > maxFiles) {
          const errorMessage = `Maximum ${maxFiles} file(s) allowed`;
          console.error(errorMessage);
          return;
        }

        // Validate file sizes
        if (maxSize) {
          const oversizedFiles = files.filter((file) => file.size > maxSize);
          if (oversizedFiles.length > 0) {
            const errorMessage = `File(s) too large. Maximum size is ${formatFileSize(maxSize)}`;
            console.error(errorMessage);
            return;
          }
        }

        // Update file list via callback
        handleUpload?.({ fileList: files });
      },
      [maxFiles, maxSize, handleUpload]
    );

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const handleDeleteExistingImage = () => {
      // Call handleRemove with a special object to indicate existing image deletion
      handleRemove?.({ isExistingImage: true, url: uploadedImage });
    };

    return (
      <FormItem className={cn("space-y-1", containerClassName)}>
        {label && (
          <FormLabel
            className={cn(
              "text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              required &&
                'after:content-["*"] after:ml-0.5 after:text-destructive',
              labelClassName
            )}
          >
            {label}
          </FormLabel>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
              {leftIcon}
            </div>
          )}

          <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field }) => (
              <FormControl>
                <div
                  className={cn(
                    "relative",
                    dragAndDrop &&
                      "border border-dashed rounded-md p-4 border-primary",
                    dragActive && "border-primary bg-primary/5"
                  )}
                  onDragEnter={dragAndDrop ? handleDrag : undefined}
                  onDragLeave={dragAndDrop ? handleDrag : undefined}
                  onDragOver={dragAndDrop ? handleDrag : undefined}
                  onDrop={dragAndDrop ? handleDrop : undefined}
                >
                  {uploadedImage ? (
                    <div className="relative w-32 h-32 border rounded-md overflow-hidden group">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={handleDeleteExistingImage}
                          className="gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "",
                        dragAndDrop && "flex flex-col flex-wrap gap-4",
                        dragActive && "bg-primary/10 border-primary"
                      )}
                      onDragEnter={dragAndDrop ? handleDrag : undefined}
                      onDragLeave={dragAndDrop ? handleDrag : undefined}
                      onDragOver={dragAndDrop ? handleDrag : undefined}
                      onDrop={dragAndDrop ? handleDrop : undefined}
                    >
                      {dragAndDrop && (
                        <div className="flex-1 text-center">
                          <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
                          <p className="text-sm text-muted-foreground">
                            Drag and drop or click to upload
                          </p>
                        </div>
                      )}
                      {fileList.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {fileList.map((file, index) => (
                            <div
                              key={file.uid || index}
                              className="flex items-center justify-between p-2 border rounded-md bg-gray-50"
                            >
                              <div className="flex items-center gap-2 flex-1">
                                {file?.originFileObj?.type?.startsWith(
                                  "image/"
                                ) ? (
                                  <div className="flex items-center gap-2">
                                    <div className="w-full h-10 flex-shrink-0 border border-gray-300">
                                      <img
                                        src={URL.createObjectURL(
                                          file?.originFileObj
                                        )}
                                        alt={
                                          file?.originFileObj?.name ||
                                          file?.originFileObj?.type
                                        }
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <File className="h-4 w-4 text-gray-500" />
                                )}
                                <span className="text-sm truncate max-w-[200px]">
                                  {file?.originFileObj?.name ||
                                    file?.originFileObj?.type}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ({formatFileSize(file?.originFileObj?.size)})
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemove?.(file)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <Input
                    {...inputProps}
                    ref={ref}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    disabled={disabled}
                    className={cn(
                      inputClasses,
                      dragAndDrop && "absolute inset-0 opacity-0 cursor-pointer"
                    )}
                    onChange={(e) => {
                      const files = e.target.files
                        ? Array.from(e.target.files)
                        : [];
                      handleFiles(files);
                      const value = multiple ? files : files[0] || null;
                      field.onChange(value);
                      customOnChange?.(e);
                      e.target.value = ""; // Clear input to allow re-selection of same file
                    }}
                    onBlur={(e) => {
                      field.onBlur();
                      customOnBlur?.(e);
                    }}
                    onFocus={(e) => {
                      customOnFocus?.(e);
                    }}
                    name={field.name}
                  />
                </div>
              </FormControl>
            )}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
              {rightIcon}
            </div>
          )}
        </div>

        {description && (
          <FormDescription
            className={cn(
              "text-xs text-muted-foreground",
              descriptionClassName
            )}
          >
            {description}
            {maxSize && (
              <span className="block">
                Maximum file size: {formatFileSize(maxSize)}
              </span>
            )}
            {maxFiles && (
              <span className="block">Maximum files: {maxFiles}</span>
            )}
          </FormDescription>
        )}

        {showError && fieldError && (
          <FormMessage
            className={cn("text-sm text-destructive", errorClassName)}
          >
            {fieldError}
          </FormMessage>
        )}
      </FormItem>
    );
  }
);

FormFileInput.displayName = "FormFileInput";

export { FormFileInput };
