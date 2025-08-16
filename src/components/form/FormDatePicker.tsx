// src/components/form/FormDatePicker.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { forwardRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormDatePickerProps } from "./types";

const FormDatePicker = forwardRef<HTMLButtonElement, FormDatePickerProps>(
  (
    {
      name,
      label,
      description,
      placeholder = "Pick a date",
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
      format: dateFormat = "PPP",
      minDate,
      maxDate,
      disabledDates = [],
      enabledDates = [],
      showTimePicker = false,
      timeFormat = "24h",
      size = "md",
      variant = "default",
      calendarClassName,
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const formToUse = form || formContext;
    const [open, setOpen] = useState(false);

    if (!formToUse) {
      throw new Error(
        "FormDatePicker must be used within a FormProvider or have a form prop"
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
      "w-full text-secondary justify-start text-left font-normal rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size],
      variantClasses[variant],
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      error && "border-destructive focus-visible:ring-destructive",
      !fieldError && "text-muted-foreground",
      className
    );

    // Filter disabled dates
    // const isDateDisabled = (date: Date) => {
    //   const effectiveMaxDate = maxDate ?? new Date("2099-12-31");

    //   if (minDate && date < minDate) return true;
    //   if (effectiveMaxDate && date > effectiveMaxDate) return true;

    //   const isInDisabledDates = disabledDates.some(
    //     (disabledDate) =>
    //       disabledDate.getFullYear() === date.getFullYear() &&
    //       disabledDate.getMonth() === date.getMonth() &&
    //       disabledDate.getDate() === date.getDate()
    //   );

    //   if (isInDisabledDates) return true;

    //   if (
    //     enabledDates.length > 0 &&
    //     !enabledDates.some(
    //       (enabledDate) =>
    //         enabledDate.getFullYear() === date.getFullYear() &&
    //         enabledDate.getMonth() === date.getMonth() &&
    //         enabledDate.getDate() === date.getDate()
    //     )
    //   ) {
    //     return true;
    //   }

    //   return false;
    // };

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
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={triggerClasses}
                      disabled={disabled}
                      ref={ref}
                      onClick={() => onFocus?.()}
                    >
                      {field.value ? (
                        format(field.value, dateFormat)
                      ) : (
                        <span>{placeholder}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 " />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-white text-secondary"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        onChange?.(date);
                        setOpen(false);
                        onBlur?.();
                      }}
                      fromYear={1950}
                      toYear={2060}
                      disabled={(date) =>
                        date > new Date("2060-12-31") ||
                        date < new Date("1950-01-01")
                      }
                      className={calendarClassName}
                      captionLayout="dropdown"
                      {...props}
                    />
                  </PopoverContent>
                </Popover>
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

FormDatePicker.displayName = "FormDatePicker";

export { FormDatePicker };
