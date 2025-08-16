// src/components/form/FormToggleGroup.tsx

"use client";

import { Button } from "@/components/ui/button";
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
import { FormToggleGroupProps } from "./types";

const FormToggleGroup = forwardRef<HTMLDivElement, FormToggleGroupProps>(
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
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      options = [],
      type = "single",
      orientation = "horizontal",
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
        "FormToggleGroup must be used within a FormProvider or have a form prop"
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
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    };

    // Variant classes
    const variantClasses = {
      default:
        "bg-white border border-primary border-input hover:bg-accent hover:text-accent-foreground text-secondary",
      outline:
        "border-2 border-input bg-white hover:bg-accent hover:text-accent-foreground",
      filled: "border-0 bg-muted hover:bg-accent hover:text-accent-foreground",
    };

    const selectedVariantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline:
        "border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90",
      filled: "border-0 bg-primary text-primary-foreground hover:bg-primary/90",
    };

    const containerClasses = cn(
      "flex gap-1",
      orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
      className
    );

    const buttonClasses = (isSelected: boolean) =>
      cn(
        "rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        sizeClasses[size],
        isSelected ? selectedVariantClasses[variant] : variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed"
      );

    const handleToggle = (value: string, currentValues: string | string[]) => {
      if (type === "single") {
        return value;
      } else {
        const values = Array.isArray(currentValues) ? currentValues : [];
        const newValues = values.includes(value)
          ? values.filter((v) => v !== value)
          : [...values, value];
        return newValues;
      }
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
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
              {leftIcon}
            </div>
          )}

          <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue || (type === "single" ? "" : [])}
            render={({ field }) => (
              <FormControl>
                <div
                  ref={ref}
                  className={containerClasses}
                  onFocus={() => onFocus?.()}
                  onBlur={() => onBlur?.()}
                  {...props}
                >
                  {options.map((option) => {
                    const isSelected =
                      type === "single"
                        ? field.value === option.value
                        : Array.isArray(field.value) &&
                          field.value.includes(option.value);

                    return (
                      <Button
                        key={option.value}
                        type="button"
                        variant="ghost"
                        className={buttonClasses(isSelected)}
                        disabled={disabled || option.disabled}
                        onClick={() => {
                          const newValue = handleToggle(
                            option.value,
                            field.value
                          );
                          field.onChange(newValue);
                          onChange?.(newValue);
                        }}
                      >
                        {option.icon && (
                          <span className="mr-2">{option.icon}</span>
                        )}
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </FormControl>
            )}
          />

          {rightIcon && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
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
            <span className="block">
              Selection type: {type === "single" ? "Single" : "Multiple"}
            </span>
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

FormToggleGroup.displayName = "FormToggleGroup";

export { FormToggleGroup };
