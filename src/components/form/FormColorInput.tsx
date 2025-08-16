// src/components/form/FormColorInput.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { forwardRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormColorInputProps } from "./types";

const FormColorInput = forwardRef<HTMLInputElement, FormColorInputProps>(
  (
    {
      name,
      label,
      description,
      placeholder = "Select color",
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
      format = "hex",
      showPreview = true,
      showInput = true,
      presetColors = [
        "#000000",
        "#ffffff",
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ffff00",
        "#ff00ff",
        "#00ffff",
        "#ffa500",
        "#800080",
        "#008000",
        "#ffc0cb",
        "#a52a2a",
        "#808080",
        "#c0c0c0",
      ],
      size = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const formToUse = form || formContext;
    const [open, setOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(
      defaultValue || "#000000"
    );

    if (!formToUse) {
      throw new Error(
        "FormColorInput must be used within a FormProvider or have a form prop"
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
      !fieldError && "text-muted-foreground",
      className
    );

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    };

    const hexToHsl = (hex: string) => {
      const rgb = hexToRgb(hex);
      if (!rgb) return null;

      const { r, g, b } = rgb;
      const rNorm = r / 255;
      const gNorm = g / 255;
      const bNorm = b / 255;

      const max = Math.max(rNorm, gNorm, bNorm);
      const min = Math.min(rNorm, gNorm, bNorm);
      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case rNorm:
            h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
            break;
          case gNorm:
            h = (bNorm - rNorm) / d + 2;
            break;
          case bNorm:
            h = (rNorm - gNorm) / d + 4;
            break;
        }
        h /= 6;
      }

      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
      };
    };

    const formatColor = (color: string, formatType: string) => {
      if (!color.startsWith("#")) return color;

      switch (formatType) {
        case "rgb":
          const rgb = hexToRgb(color);
          return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : color;
        case "hsl":
          const hsl = hexToHsl(color);
          return hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : color;
        default:
          return color;
      }
    };

    const handleColorSelect = (color: string) => {
      setSelectedColor(color);
      const formattedColor = formatColor(color, format);
      return formattedColor;
    };

    const handleInputChange = (value: string) => {
      // Validate hex color
      const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (hexRegex.test(value)) {
        setSelectedColor(value);
        const formattedColor = formatColor(value, format);
        return formattedColor;
      }
      return value;
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
                <div className="flex gap-2">
                  {showPreview && (
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-10 w-16 p-0 border-2 border-gray-300"
                          style={{ backgroundColor: selectedColor }}
                          disabled={disabled}
                          onClick={() => onFocus?.()}
                        >
                          {selectedColor === field.value && (
                            <Check className="h-4 w-4 text-white drop-shadow" />
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 p-4" align="start">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">
                              Preset Colors
                            </h4>
                            <div className="grid grid-cols-8 gap-2">
                              {presetColors.map((color) => (
                                <Button
                                  key={color}
                                  type="button"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 border-2 border-gray-300 hover:border-gray-400"
                                  style={{ backgroundColor: color }}
                                  onClick={() => {
                                    const formattedColor =
                                      handleColorSelect(color);
                                    field.onChange(formattedColor);
                                    onChange?.(formattedColor);
                                    setOpen(false);
                                    onBlur?.();
                                  }}
                                >
                                  {selectedColor === color && (
                                    <Check className="h-4 w-4 text-white drop-shadow" />
                                  )}
                                </Button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">
                              Custom Color
                            </h4>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={selectedColor}
                                onChange={(e) => {
                                  const color = e.target.value;
                                  const formattedColor =
                                    handleColorSelect(color);
                                  field.onChange(formattedColor);
                                  onChange?.(formattedColor);
                                }}
                                className="h-10 w-16 p-1"
                              />
                              {showInput && (
                                <Input
                                  type="text"
                                  value={formatColor(selectedColor, format)}
                                  onChange={(e) => {
                                    const formattedColor = handleInputChange(
                                      e.target.value
                                    );
                                    field.onChange(formattedColor);
                                    onChange?.(formattedColor);
                                  }}
                                  placeholder={
                                    format === "hex"
                                      ? "#000000"
                                      : format === "rgb"
                                        ? "rgb(0, 0, 0)"
                                        : "hsl(0, 0%, 0%)"
                                  }
                                  className="flex-1"
                                />
                              )}
                            </div>
                          </div>

                          <div className="text-xs text-muted-foreground">
                            <div>Format: {format.toUpperCase()}</div>
                            <div>
                              Current: {formatColor(selectedColor, format)}
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}

                  {showInput && (
                    <Input
                      {...field}
                      {...props}
                      ref={ref}
                      type="text"
                      placeholder={placeholder}
                      disabled={disabled}
                      className={cn(
                        "flex-1",
                        sizeClasses[size],
                        variantClasses[variant],
                        error &&
                          "border-destructive focus-visible:ring-destructive",
                        className
                      )}
                      value={field.value || ""}
                      onChange={(e) => {
                        const formattedColor = handleInputChange(
                          e.target.value
                        );
                        field.onChange(formattedColor);
                        onChange?.(formattedColor);
                      }}
                      onFocus={(e) => {
                        onFocus?.();
                      }}
                      onBlur={(e) => {
                        field.onBlur();
                        onBlur?.();
                      }}
                    />
                  )}
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
            <span className="block">Format: {format.toUpperCase()}</span>
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

FormColorInput.displayName = "FormColorInput";

export { FormColorInput };
