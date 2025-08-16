// src/components/form/FormRadioGroup.tsx

"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormRadioGroupProps } from "./types";

const FormRadioGroup = forwardRef<HTMLDivElement, FormRadioGroupProps>(
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
      orientation = "vertical",
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
        "FormRadioGroup must be used within a FormProvider or have a form prop"
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

    const radioClasses = cn(
      "rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size],
      variantClasses[variant],
      error && "border-destructive focus-visible:ring-destructive",
      className
    );

    const groupClasses = cn(
      "space-y-2",
      orientation === "horizontal" && "flex flex-row space-x-6 space-y-0",
      containerClassName
    );

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

        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => (
            <FormControl>
              <RadioGroup
                {...field}
                {...props}
                ref={ref}
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  onChange?.(value);
                }}
                onBlur={() => {
                  field.onBlur();
                  onBlur?.();
                }}
                onFocus={() => {
                  onFocus?.();
                }}
                disabled={disabled}
                className={groupClasses}
              >
                {options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`${name}-${option.value}`}
                      disabled={option.disabled || disabled}
                      className={radioClasses}
                    />
                    <FormLabel
                      htmlFor={`${name}-${option.value}`}
                      className={cn(
                        "text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
                        option.disabled && "cursor-not-allowed opacity-50"
                      )}
                    >
                      {option.label}
                      {option.description && (
                        <span className="block text-xs text-muted-foreground font-normal">
                          {option.description}
                        </span>
                      )}
                    </FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          )}
        />

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
      </FormItem>
    );
  }
);

FormRadioGroup.displayName = "FormRadioGroup";

export { FormRadioGroup };
