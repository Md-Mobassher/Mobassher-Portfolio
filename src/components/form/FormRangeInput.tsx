// src/components/form/FormRangeInput.tsx

"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormRangeInputProps } from "./types";

const FormRangeInput = forwardRef<HTMLDivElement, FormRangeInputProps>(
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
      min,
      max,
      step = 1,
      showValue = true,
      showTicks = false,
      dual = false,
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
        "FormRangeInput must be used within a FormProvider or have a form prop"
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
      sm: "h-2",
      md: "h-3",
      lg: "h-4",
    };

    // Variant classes
    const variantClasses = {
      default: "bg-primary text-white",
      outline: "bg-primary border-2 border-primary",
      filled: "bg-muted",
      ghost: "border-0 bg-white",
    };

    const sliderClasses = cn(
      "w-full transition-colors",
      sizeClasses[size],
      variantClasses[variant],
      error && "border-destructive",
      className
    );

    const formatValue = (value: number | number[]) => {
      if (Array.isArray(value)) {
        return value.map((v) => v.toFixed(step < 1 ? 1 : 0)).join(" - ");
      }
      return value.toFixed(step < 1 ? 1 : 0);
    };

    const generateTicks = () => {
      if (!showTicks) return [];

      const ticks = [];
      const tickCount = Math.min(10, Math.floor((max - min) / step) + 1);

      for (let i = 0; i < tickCount; i++) {
        const value = min + i * step;
        ticks.push({
          value,
          label: value.toString(),
        });
      }

      return ticks;
    };

    const ticks = generateTicks();

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
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}

          <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue || (dual ? [min, max] : min)}
            render={({ field }) => (
              <FormControl>
                <div className="space-y-2">
                  {/* Value Display */}
                  {showValue && (
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Min: {min}</span>
                      <span className="font-medium">
                        {formatValue(field.value)}
                      </span>
                      <span>Max: {max}</span>
                    </div>
                  )}

                  {/* Slider */}
                  <Slider
                    {...field}
                    {...props}
                    ref={ref}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    className={sliderClasses}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      onChange?.(value);
                    }}
                    onValueCommit={() => {
                      onBlur?.();
                    }}
                  />

                  {/* Ticks */}
                  {showTicks && ticks.length > 0 && (
                    <div className="flex justify-between text-xs text-muted-foreground px-1">
                      {ticks.map((tick, index) => (
                        <span key={index} className="flex-1 text-center">
                          {tick.label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
            )}
          />

          {rightIcon && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-muted-foreground">
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
              Range: {min} - {max} (Step: {step})
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

FormRangeInput.displayName = "FormRangeInput";

export { FormRangeInput };
