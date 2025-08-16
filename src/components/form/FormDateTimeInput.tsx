// src/components/form/FormDateTimeInput.tsx

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
import { CalendarIcon, ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormDateTimeInputProps } from "./types";

const FormDateTimeInput = forwardRef<HTMLButtonElement, FormDateTimeInputProps>(
  (
    {
      name,
      label,
      description,
      placeholder = "Select date and time",
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
      format: dateFormat = "PPP p",
      minDate,
      maxDate,
      disabledDates,
      enabledDates,
      timeFormat = "24h",
      timeStep = 15,
      minTime,
      maxTime,
      size = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const formToUse = form || formContext;
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [selectedHour, setSelectedHour] = useState(12);
    const [selectedMinute, setSelectedMinute] = useState(0);
    const [isAM, setIsAM] = useState(true);

    if (!formToUse) {
      throw new Error(
        "FormDateTimeInput must be used within a FormProvider or have a form prop"
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

    const formatTime = (hour: number, minute: number, isAM: boolean) => {
      let displayHour = hour;

      if (timeFormat === "12h") {
        if (hour === 0) displayHour = 12;
        else if (hour > 12) displayHour = hour - 12;

        const period = isAM ? "AM" : "PM";
        return `${displayHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`;
      } else {
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      }
    };

    const generateTimeOptions = () => {
      const options = [];
      const totalMinutes = 24 * 60;

      for (let i = 0; i < totalMinutes; i += timeStep) {
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

        const timeString = formatTime(hour, minute, hour < 12);
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

    const handleDateTimeSelect = (date: Date, hour: number, minute: number) => {
      const newDateTime = new Date(date);
      newDateTime.setHours(hour, minute, 0, 0);

      setSelectedDate(date);
      setSelectedHour(hour);
      setSelectedMinute(minute);
      setIsAM(hour < 12);

      return newDateTime;
    };

    const incrementHour = () => {
      let newHour = selectedHour + 1;
      if (newHour >= 24) newHour = 0;
      if (selectedDate) {
        handleDateTimeSelect(selectedDate, newHour, selectedMinute);
      }
    };

    const decrementHour = () => {
      let newHour = selectedHour - 1;
      if (newHour < 0) newHour = 23;
      if (selectedDate) {
        handleDateTimeSelect(selectedDate, newHour, selectedMinute);
      }
    };

    const incrementMinute = () => {
      let newMinute = selectedMinute + timeStep;
      if (newMinute >= 60) {
        newMinute = 0;
        incrementHour();
      } else if (selectedDate) {
        handleDateTimeSelect(selectedDate, selectedHour, newMinute);
      }
    };

    const decrementMinute = () => {
      let newMinute = selectedMinute - timeStep;
      if (newMinute < 0) {
        newMinute = 60 - timeStep;
        decrementHour();
      } else if (selectedDate) {
        handleDateTimeSelect(selectedDate, selectedHour, newMinute);
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
              const dateTime = field.value ? new Date(field.value) : undefined;

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
                        {field.value ? (
                          format(dateTime!, dateFormat)
                        ) : (
                          <span>{placeholder}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="p-4 space-y-4">
                        {/* Date Picker */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Select Date</h4>
                          <Calendar
                            mode="single"
                            selected={selectedDate || dateTime}
                            onSelect={(date) => {
                              setSelectedDate(date);
                              if (date && selectedHour !== undefined) {
                                const newDateTime = handleDateTimeSelect(
                                  date,
                                  selectedHour,
                                  selectedMinute
                                );
                                field.onChange(newDateTime);
                                onChange?.(newDateTime);
                              }
                            }}
                            disabled={(date) => {
                              if (minDate && date < minDate) return true;
                              if (maxDate && date > maxDate) return true;
                              if (disabledDates?.includes(date)) return true;
                              if (enabledDates && !enabledDates.includes(date))
                                return true;
                              return false;
                            }}
                            className="rounded-md border"
                          />
                        </div>

                        {/* Time Picker */}
                        {selectedDate && (
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Select Time</h4>
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
                                  {timeFormat === "12h"
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
                              {timeFormat === "12h" && (
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
                                    const newDateTime = handleDateTimeSelect(
                                      selectedDate,
                                      option.hour,
                                      option.minute
                                    );
                                    field.onChange(newDateTime);
                                    onChange?.(newDateTime);
                                  }}
                                  className="text-xs"
                                >
                                  {option.label}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Apply Button */}
                        <Button
                          className="w-full"
                          onClick={() => {
                            if (selectedDate && selectedHour !== undefined) {
                              const newDateTime = handleDateTimeSelect(
                                selectedDate,
                                selectedHour,
                                selectedMinute
                              );
                              field.onChange(newDateTime);
                              onChange?.(newDateTime);
                              setOpen(false);
                              onBlur?.();
                            }
                          }}
                          disabled={!selectedDate}
                        >
                          Apply Date & Time
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
            {timeStep !== 15 && (
              <span className="block">Time step: {timeStep} minutes</span>
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

FormDateTimeInput.displayName = "FormDateTimeInput";

export { FormDateTimeInput };
