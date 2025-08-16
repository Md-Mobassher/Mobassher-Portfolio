// src/components/form/FormMultiSelect.tsx

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, X } from "lucide-react";
import { forwardRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormMultiSelectProps } from "./types";

const FormMultiSelect = forwardRef<HTMLButtonElement, FormMultiSelectProps>(
  (
    {
      name,
      label,
      description,
      placeholder = "Select options...",
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
      defaultValue = [],
      onChange,
      onBlur,
      onFocus,
      options = [],
      multiple = true,
      searchable = false,
      clearable = true,
      size = "md",
      variant = "default",
      loading = false,
      noOptionsMessage = "No options available",
      loadingMessage = "Loading...",
      maxSelected,
      showSelectedCount = true,
      selectedCountText = "selected",
      clearAllText = "Clear all",
      selectAllText = "Select all",
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const formToUse = form || formContext;
    const [open, setOpen] = useState(false);

    if (!formToUse) {
      throw new Error(
        "FormMultiSelect must be used within a FormProvider or have a form prop"
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
      outline: "border-2 border-input bg-white",
      filled: "border-0 bg-muted",
      ghost: "border-0 bg-white",
    };

    const triggerClasses = cn(
      "w-full justify-start text-left font-normal rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size],
      variantClasses[variant],
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      error && "border-destructive focus-visible:ring-destructive",
      className
    );

    const handleSelect = (value: string, currentValues: string[]) => {
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      // Check max selected limit
      if (maxSelected && newValues.length > maxSelected) {
        return;
      }

      return newValues;
    };

    const handleClearAll = (setValue: (value: string[]) => void) => {
      setValue([]);
    };

    const handleSelectAll = (setValue: (value: string[]) => void) => {
      const allValues = options.map((option) => option.value);
      setValue(allValues);
    };

    const getSelectedLabels = (values: string[]) => {
      return options
        .filter((option) => values.includes(option.value))
        .map((option) => option.label);
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
                <div className="space-y-2">
                  {/* Selected Items Display */}
                  {field.value && field.value.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {getSelectedLabels(field.value).map((label, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {label}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => {
                              const newValues = field.value.filter(
                                (_, i) => i !== index
                              );
                              field.onChange(newValues);
                              onChange?.(newValues);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Select Trigger */}
                  <Select
                    open={open}
                    onOpenChange={setOpen}
                    disabled={disabled || loading}
                  >
                    <SelectTrigger className={triggerClasses} ref={ref}>
                      <SelectValue
                        placeholder={loading ? loadingMessage : placeholder}
                      >
                        {field.value &&
                          field.value.length > 0 &&
                          showSelectedCount && (
                            <span className="text-muted-foreground">
                              {field.value.length} {selectedCountText}
                            </span>
                          )}
                      </SelectValue>
                      <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Action Buttons */}
                      {field.value && field.value.length > 0 && clearable && (
                        <div className="flex items-center justify-between p-2 border-b">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleClearAll(field.onChange)}
                            className="h-6 px-2 text-xs"
                          >
                            {clearAllText}
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSelectAll(field.onChange)}
                            className="h-6 px-2 text-xs"
                          >
                            {selectAllText}
                          </Button>
                        </div>
                      )}

                      {/* Options */}
                      {loading ? (
                        <SelectItem value="" disabled>
                          {loadingMessage}
                        </SelectItem>
                      ) : options.length === 0 ? (
                        <SelectItem value="" disabled>
                          {noOptionsMessage}
                        </SelectItem>
                      ) : (
                        options.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                            className="cursor-pointer"
                            onSelect={() => {
                              const newValues = handleSelect(
                                option.value,
                                field.value || []
                              );
                              if (newValues) {
                                field.onChange(newValues);
                                onChange?.(newValues);
                              }
                            }}
                          >
                            <div className="flex items-center gap-2">
                              {field.value?.includes(option.value) && (
                                <Check className="h-4 w-4" />
                              )}
                              {option.label}
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
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
            {maxSelected && (
              <span className="block">
                Maximum {maxSelected} items can be selected
              </span>
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

FormMultiSelect.displayName = "FormMultiSelect";

export { FormMultiSelect };
