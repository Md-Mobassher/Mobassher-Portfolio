// src/components/form/FormTimeInput.tsx

"use client";

import { Button } from "@/components/ui/button";
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
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { forwardRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "./types";

interface FormTimeInputProps extends Omit<FormInputProps, "type"> {
  format?: "12h" | "24h";
  step?: number; // minutes
  minTime?: string; // HH:MM format
  maxTime?: string; // HH:MM format
  showSeconds?: boolean;
  timeFormat?: "HH:MM" | "HH:MM:SS" | "hh:mm A" | "hh:mm:ss A";
}

const FormTimeInput = forwardRef<HTMLButtonElement, FormTimeInputProps>(
  (
    {
      name,
      label,
      description,
      placeholder = "Select time",
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
      format = "24h",
      step = 15,
      minTime,
      maxTime,
      showSeconds = false,
      timeFormat = "HH:MM",
      size = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const formToUse = form || formContext;
    const [open, setOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState(12);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [selectedSecond, setSelectedSecond] = useState(0);
    const [isAM, setIsAM] = useState(true);

    if (!formToUse) {
      throw new Error(
        "FormTimeInput must be used within a FormProvider or have a form prop"
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

    const parseTime = (timeString: string) => {
      if (!timeString) return { hour: 12, minute: 0, second: 0, isAM: true };

      const timeRegex = /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i;
      const match = timeString.match(timeRegex);

      if (!match) return { hour: 12, minute: 0, second: 0, isAM: true };

      let hour = parseInt(match[1]);
      const minute = parseInt(match[2]);
      const second = match[3] ? parseInt(match[3]) : 0;
      const period = match[4]?.toUpperCase();

      if (format === "12h" && period) {
        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;
      }

      return { hour, minute, second, isAM: hour < 12 };
    };

    const formatTime = (
      hour: number,
      minute: number,
      second: number,
      isAM: boolean
    ) => {
      let displayHour = hour;

      if (format === "12h") {
        if (hour === 0) displayHour = 12;
        else if (hour > 12) displayHour = hour - 12;

        const period = isAM ? "AM" : "PM";

        if (showSeconds) {
          return `${displayHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")} ${period}`;
        }
        return `${displayHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`;
      } else {
        if (showSeconds) {
          return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
        }
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      }
    };

    const generateTimeOptions = () => {
      const options = [];
      const totalMinutes = 24 * 60;

      for (let i = 0; i < totalMinutes; i += step) {
        const hour = Math.floor(i / 60);
        const minute = i % 60;

        if (minTime) {
          const [minHour, minMinute] = minTime.split(":").map(Number);
          if (hour < minHour || (hour === minHour && minute < minMinute))
            continue;
        }

        if (maxTime) {
          const [maxHour, maxMinute] = maxTime.split(":").map(Number);
          if (hour > maxHour || (hour === maxHour && minute > maxMinute))
            continue;
        }

        const timeString = formatTime(hour, minute, 0, hour < 12);
        options.push({
          value: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
          label: timeString,
          hour,
          minute,
        });
      }

      return options;
    };

    const timeOptions = generateTimeOptions();

    const handleTimeSelect = (
      hour: number,
      minute: number,
      second: number = 0
    ) => {
      setSelectedHour(hour);
      setSelectedMinute(minute);
      setSelectedSecond(second);
      setIsAM(hour < 12);

      const timeString = formatTime(hour, minute, second, hour < 12);
      return timeString;
    };

    const incrementHour = () => {
      let newHour = selectedHour + 1;
      if (newHour >= 24) newHour = 0;
      handleTimeSelect(newHour, selectedMinute, selectedSecond);
    };

    const decrementHour = () => {
      let newHour = selectedHour - 1;
      if (newHour < 0) newHour = 23;
      handleTimeSelect(newHour, selectedMinute, selectedSecond);
    };

    const incrementMinute = () => {
      let newMinute = selectedMinute + step;
      if (newMinute >= 60) {
        newMinute = 0;
        incrementHour();
      } else {
        handleTimeSelect(selectedHour, newMinute, selectedSecond);
      }
    };

    const decrementMinute = () => {
      let newMinute = selectedMinute - step;
      if (newMinute < 0) {
        newMinute = 60 - step;
        decrementHour();
      } else {
        handleTimeSelect(selectedHour, newMinute, selectedSecond);
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
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
              {leftIcon}
            </div>
          )}

          <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field }) => {
              const parsedTime = parseTime(field.value || "");

              return (
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
                        {field.value ? field.value : <span>{placeholder}</span>}
                        <Clock className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="p-4 space-y-4">
                        {/* Time Picker Interface */}
                        <div className="flex items-center justify-center space-x-4">
                          {/* Hour */}
                          <div className="flex flex-col items-center space-y-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={incrementHour}
                              className="h-8 w-8 p-0"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <div className="text-2xl font-bold min-w-[3rem] text-center">
                              {format === "12h"
                                ? selectedHour === 0
                                  ? 12
                                  : selectedHour > 12
                                    ? selectedHour - 12
                                    : selectedHour
                                : selectedHour.toString().padStart(2, "0")}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={decrementHour}
                              className="h-8 w-8 p-0"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-2xl font-bold">:</div>

                          {/* Minute */}
                          <div className="flex flex-col items-center space-y-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={incrementMinute}
                              className="h-8 w-8 p-0"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <div className="text-2xl font-bold min-w-[3rem] text-center">
                              {selectedMinute.toString().padStart(2, "0")}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={decrementMinute}
                              className="h-8 w-8 p-0"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* AM/PM for 12h format */}
                          {format === "12h" && (
                            <>
                              <div className="text-2xl font-bold">:</div>
                              <div className="flex flex-col items-center space-y-2">
                                <Button
                                  variant={isAM ? "default" : "ghost"}
                                  size="sm"
                                  onClick={() => setIsAM(true)}
                                  className="h-8 px-3"
                                >
                                  AM
                                </Button>
                                <Button
                                  variant={!isAM ? "default" : "ghost"}
                                  size="sm"
                                  onClick={() => setIsAM(false)}
                                  className="h-8 px-3"
                                >
                                  PM
                                </Button>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Quick Time Options */}
                        <div className="grid grid-cols-3 gap-2">
                          {timeOptions.slice(0, 9).map((option) => (
                            <Button
                              key={option.value}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const timeString = handleTimeSelect(
                                  option.hour,
                                  option.minute
                                );
                                field.onChange(timeString);
                                onChange?.(timeString);
                                setOpen(false);
                                onBlur?.();
                              }}
                              className="text-xs"
                            >
                              {option.label}
                            </Button>
                          ))}
                        </div>

                        {/* Apply Button */}
                        <Button
                          className="w-full"
                          onClick={() => {
                            const timeString = formatTime(
                              selectedHour,
                              selectedMinute,
                              selectedSecond,
                              isAM
                            );
                            field.onChange(timeString);
                            onChange?.(timeString);
                            setOpen(false);
                            onBlur?.();
                          }}
                        >
                          Apply Time
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              );
            }}
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
            {step !== 15 && (
              <span className="block">Time step: {step} minutes</span>
            )}
            {(minTime || maxTime) && (
              <span className="block">
                Time range: {minTime || "00:00"} - {maxTime || "23:59"}
              </span>
            )}
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

FormTimeInput.displayName = "FormTimeInput";

export { FormTimeInput };
