// src/components/form/FormSelect.tsx

"use client";

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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormSelectProps, SelectOption } from "./types";

const FormSelect = forwardRef<HTMLButtonElement, FormSelectProps>(
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
      options = [],
      multiple = false,
      searchable = false,
      clearable = false,
      size = "md",
      variant = "default",
      loading = false,
      noOptionsMessage = "No options available",
      loadingMessage = "Loading...",
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const formToUse = form || formContext;

    if (!formToUse) {
      throw new Error(
        "FormSelect must be used within a FormProvider or have a form prop"
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
      "w-full rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size],
      variantClasses[variant],
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      error && "border-destructive focus-visible:ring-destructive",
      className
    );

    // Group options by group if they have groups
    const groupedOptions = options.reduce(
      (acc, option) => {
        if (option.group) {
          if (!acc[option.group]) {
            acc[option.group] = [];
          }
          acc[option.group].push(option);
        } else {
          if (!acc["default"]) {
            acc["default"] = [];
          }
          acc["default"].push(option);
        }
        return acc;
      },
      {} as Record<string, SelectOption[]>
    );

    const hasGroups =
      Object.keys(groupedOptions).length > 1 ||
      (Object.keys(groupedOptions).length === 1 &&
        Object.keys(groupedOptions)[0] !== "default");

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
                <Select
                  value={
                    field.value === true
                      ? "true"
                      : field.value === false
                        ? "false"
                        : field.value
                  }
                  onValueChange={(value) => {
                    let parsedValue: any = value;
                    if (value === "true") parsedValue = true;
                    else if (value === "false") parsedValue = false;
                    field.onChange(parsedValue);
                    onChange?.(parsedValue);
                  }}
                  disabled={disabled || loading}
                >
                  <SelectTrigger className={triggerClasses} ref={ref}>
                    <SelectValue
                      placeholder={loading ? loadingMessage : placeholder}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-primary text-secondary">
                    {loading ? (
                      <SelectItem value="loading" disabled>
                        {loadingMessage}
                      </SelectItem>
                    ) : options.length === 0 ? (
                      <SelectItem value="no-options" disabled>
                        {noOptionsMessage}
                      </SelectItem>
                    ) : hasGroups ? (
                      Object.entries(groupedOptions).map(
                        ([groupName, groupOptions]) => (
                          <SelectGroup key={groupName}>
                            {groupName !== "default" && (
                              <SelectLabel className="text-xs font-medium text-muted-foreground">
                                {groupName}
                              </SelectLabel>
                            )}
                            {groupOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                                className="cursor-pointer"
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                            {groupName !== "default" && <SelectSeparator />}
                          </SelectGroup>
                        )
                      )
                    ) : (
                      options.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                          className="cursor-pointer bg-transparent"
                        >
                          {option.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
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

FormSelect.displayName = "FormSelect";

export { FormSelect };
