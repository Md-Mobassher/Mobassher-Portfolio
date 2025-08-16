// src/components/form/FormNumberInput.tsx

"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "./types";

interface FormNumberInputProps extends Omit<FormInputProps, "type"> {
  min?: number;
  max?: number;
  step?: number;
  allowNegative?: boolean;
  allowDecimal?: boolean;
  formatOnBlur?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;
}

const FormNumberInput = forwardRef<HTMLInputElement, FormNumberInputProps>(
  (
    {
      name,
      label,
      description,
      placeholder,
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
      onChange,
      onBlur,
      onFocus,
      min,
      max,
      step = 1,
      allowNegative = true,
      allowDecimal = true,
      formatOnBlur = false,
      formatOptions = {},
      locale = "en-US",
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
        "FormNumberInput must be used within a FormProvider or have a form prop"
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

    const inputClasses = cn(
      "w-full rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size],
      variantClasses[variant],
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      error && "border-destructive focus-visible:ring-destructive",
      className
    );

    const formatNumber = (value: number | string): string => {
      if (typeof value === "string") {
        const num = parseFloat(value);
        if (isNaN(num)) return value;
        value = num;
      }

      if (formatOnBlur && typeof value === "number") {
        return new Intl.NumberFormat(locale, formatOptions).format(value);
      }

      return value.toString();
    };

    const parseNumber = (value: string): number | string => {
      // Remove formatting characters
      const cleanValue = value.replace(/[^\d.-]/g, "");

      if (!cleanValue) return "";

      const num = parseFloat(cleanValue);
      if (isNaN(num)) return value;

      // Validate min/max
      if (min !== undefined && num < min) return value;
      if (max !== undefined && num > max) return value;

      // Validate negative numbers
      if (!allowNegative && num < 0) return value;

      // Validate decimals
      if (!allowDecimal && !Number.isInteger(num)) return value;

      return num;
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
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
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
                <Input
                  {...field}
                  {...props}
                  ref={ref}
                  type="number"
                  placeholder={placeholder}
                  disabled={disabled}
                  min={min}
                  max={max}
                  step={step}
                  className={inputClasses}
                  onChange={(e) => {
                    const value = e.target.value;
                    const parsedValue = parseNumber(value);
                    field.onChange(parsedValue);
                    onChange?.(parsedValue);
                  }}
                  onBlur={(e) => {
                    if (formatOnBlur && field.value) {
                      const formatted = formatNumber(field.value);
                      field.onChange(formatted);
                    }
                    field.onBlur();
                    onBlur?.();
                  }}
                  onFocus={(e) => {
                    // Remove formatting on focus for editing
                    if (formatOnBlur && typeof field.value === "string") {
                      const num = parseFloat(
                        field.value.replace(/[^\d.-]/g, "")
                      );
                      if (!isNaN(num)) {
                        field.onChange(num.toString());
                      }
                    }
                    onFocus?.();
                  }}
                />
              </FormControl>
            )}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
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
            {min !== undefined && max !== undefined && (
              <span className="block">
                Range: {min} - {max}
              </span>
            )}
            {step !== 1 && <span className="block">Step: {step}</span>}
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

FormNumberInput.displayName = "FormNumberInput";

export { FormNumberInput };
