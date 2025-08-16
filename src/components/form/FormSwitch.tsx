// src/components/form/FormSwitch.tsx

"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormSwitchProps } from "./types";

const FormSwitch = forwardRef<HTMLButtonElement, FormSwitchProps>(
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
        "FormSwitch must be used within a FormProvider or have a form prop"
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
      sm: "h-4 w-7",
      md: "h-6 w-11",
      lg: "h-8 w-14",
    };

    // Variant classes
    const variantClasses = {
      default: "bg-input text-white border-0 border-primary",
      outline: "bg-input border-2 border-input",
      filled: "bg-muted",
      ghost: "border-0 bg-white",
    };

    const switchClasses = cn(
      "rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size],
      variantClasses[variant],
      error && "border-destructive focus-visible:ring-destructive",
      className
    );

    return (
      <FormItem
        className={cn(
          "flex flex-row items-center justify-between space-x-3 space-y-0",
          containerClassName
        )}
      >
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

        <Controller
          name={name}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => (
            <FormControl>
              <Switch
                {...field}
                {...props}
                ref={ref}
                checked={field.value}
                disabled={disabled}
                className={switchClasses}
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
      </FormItem>
    );
  }
);

FormSwitch.displayName = "FormSwitch";

export { FormSwitch };
