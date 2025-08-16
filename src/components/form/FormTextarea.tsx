// src/components/form/FormTextarea.tsx

"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormTextareaProps } from "./types";

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
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
      rows = 3,
      cols,
      maxLength,
      minLength,
      resize = "vertical",
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
        "FormTextarea must be used within a FormProvider or have a form prop"
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
      sm: "px-2 py-1 text-sm min-h-[60px]",
      md: "px-3 py-2 text-base min-h-[80px]",
      lg: "px-4 py-3 text-lg min-h-[100px]",
    };

    // Variant classes
    const variantClasses = {
      default: "border-input border-primary bg-white text-secondary",
      outline: "border-2 border-input bg-white",
      filled: "border-0 bg-muted",
      ghost: "border-0 bg-white",
    };

    // Resize classes
    const resizeClasses = {
      none: "resize-none",
      both: "resize",
      horizontal: "resize-x",
      vertical: "resize-y",
    };

    const textareaClasses = cn(
      "w-full rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size],
      variantClasses[variant],
      resizeClasses[resize],
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      error && "border-destructive focus-visible:ring-destructive",
      className
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

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-3 text-muted-foreground">
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
                <Textarea
                  {...field}
                  {...props}
                  ref={ref}
                  placeholder={placeholder}
                  disabled={disabled}
                  rows={rows}
                  cols={cols}
                  maxLength={maxLength}
                  minLength={minLength}
                  className={textareaClasses}
                  onChange={(e) => {
                    field.onChange(e);
                    onChange?.(e.target.value);
                  }}
                  onBlur={(e) => {
                    field.onBlur();
                    onBlur?.();
                  }}
                  onFocus={(e) => {
                    onFocus?.();
                  }}
                />
              </FormControl>
            )}
          />

          {rightIcon && (
            <div className="absolute right-3 top-3 text-muted-foreground">
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

FormTextarea.displayName = "FormTextarea";

export { FormTextarea };
