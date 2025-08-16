// src/components/form/FormCheckbox.tsx

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormCheckboxProps } from "./types";

const FormCheckbox = forwardRef<HTMLButtonElement, FormCheckboxProps>(
  (
    {
      name,
      label,
      description,
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
      defaultValue = false,
      onChange,
      onBlur,
      onFocus,
      indeterminate = false,
      size = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const formToUse = form || formContext;

    if (!formToUse) {
      throw new Error(
        "FormCheckbox must be used within a FormProvider or have a form prop"
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
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };

    // Variant classes
    const variantClasses = {
      default: "border-input border-primary bg-white text-secondary",
      outline: "border-2 border-input bg-white",
      filled: "border-0 bg-muted",
      ghost: "border-0 bg-white",
    };

    const checkboxClasses = cn(
      "rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size],
      variantClasses[variant],
      error && "border-destructive focus-visible:ring-destructive",
      className
    );

    return (
      <FormItem
        className={cn(
          "flex flex-row items-start space-x-3 space-y-0",
          containerClassName
        )}
      >
        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => (
            <FormControl>
              <Checkbox
                {...field}
                {...props}
                ref={ref}
                checked={field.value}
                disabled={disabled}
                className={checkboxClasses}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  onChange?.(checked);
                }}
                onBlur={() => {
                  field.onBlur();
                  onBlur?.();
                }}
                onFocus={() => {
                  onFocus?.();
                }}
              />
            </FormControl>
          )}
        />

        <div className="space-y-1 leading-none">
          {label && (
            <FormLabel
              className={cn(
                "text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
                required &&
                  'after:content-["*"] after:ml-0.5 after:text-destructive',
                labelClassName
              )}
            >
              {label}
            </FormLabel>
          )}

          {description && (
            <FormDescription
              className={cn(
                "text-xs text-muted-foreground",
                descriptionClassName
              )}
            >
              {description}
            </FormDescription>
          )}

          {showError && fieldError && (
            <FormMessage
              className={cn("text-sm text-destructive", errorClassName)}
            >
              {fieldError}
            </FormMessage>
          )}
        </div>
      </FormItem>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";

export { FormCheckbox };
