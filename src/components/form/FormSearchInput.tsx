// src/components/form/FormSearchInput.tsx

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
import { ChevronDown, Loader2, X } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormSearchInputProps, SearchOption } from "./types";

const FormSearchInput = forwardRef<HTMLInputElement, FormSearchInputProps>(
  (
    {
      name,
      label,
      description,
      placeholder = "Search...",
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
      searchFunction,
      debounceMs = 300,
      minSearchLength = 2,
      maxSuggestions = 10,
      loading = false,
      clearable = true,
      size = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const formToUse = form || formContext;
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState<SearchOption[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const debounceRef = useRef<NodeJS.Timeout>(null);

    if (!formToUse) {
      throw new Error(
        "FormSearchInput must be used within a FormProvider or have a form prop"
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

    const inputClasses = cn(
      "w-full rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size],
      variantClasses[variant],
      leftIcon && "pl-10",
      (rightIcon || clearable) && "pr-10",
      error && "border-destructive focus-visible:ring-destructive",
      className
    );

    const performSearch = async (query: string) => {
      if (query.length < minSearchLength) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);

      try {
        let results: SearchOption[] = [];

        if (searchFunction) {
          // Use custom search function
          results = await searchFunction(query);
        } else {
          // Use local options filtering
          results = options.filter(
            (option) =>
              option.label.toLowerCase().includes(query.toLowerCase()) ||
              option.value.toLowerCase().includes(query.toLowerCase()) ||
              option.description?.toLowerCase().includes(query.toLowerCase())
          );
        }

        setSuggestions(results.slice(0, maxSuggestions));
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    };

    useEffect(() => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        performSearch(searchValue);
      }, debounceMs);

      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }, [searchValue, debounceMs]);

    const handleSelect = (option: SearchOption) => {
      setSearchValue(option.label);
      setSuggestions([]);
      setOpen(false);
      return option;
    };

    const handleClear = () => {
      setSearchValue("");
      setSuggestions([]);
      return "";
    };

    const highlightMatch = (text: string, query: string) => {
      if (!query) return text;

      const regex = new RegExp(`(${query})`, "gi");
      const parts = text.split(regex);

      return parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className="bg-yellow-200 font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      );
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
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Input
                        {...field}
                        {...props}
                        ref={ref}
                        type="text"
                        placeholder={placeholder}
                        disabled={disabled}
                        className={inputClasses}
                        value={searchValue || field.value || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSearchValue(value);
                          field.onChange(value);
                          onChange?.(value);

                          if (value.length >= minSearchLength) {
                            setOpen(true);
                          } else {
                            setOpen(false);
                          }
                        }}
                        onFocus={(e) => {
                          if (searchValue.length >= minSearchLength) {
                            setOpen(true);
                          }
                          onFocus?.();
                        }}
                        onBlur={(e) => {
                          // Delay closing to allow for clicks on suggestions
                          setTimeout(() => setOpen(false), 200);
                          field.onBlur();
                          onBlur?.();
                        }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setOpen(!open)}
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            open && "rotate-180"
                          )}
                        />
                      </Button>
                    </div>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-[--radix-popover-trigger-width] p-0"
                    align="start"
                  >
                    <div className="max-h-60 overflow-y-auto">
                      {isSearching || loading ? (
                        <div className="flex items-center justify-center p-4">
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          <span className="text-sm text-muted-foreground">
                            Searching...
                          </span>
                        </div>
                      ) : suggestions.length > 0 ? (
                        <div className="py-1">
                          {suggestions.map((option, index) => (
                            <Button
                              key={`${option.value}-${index}`}
                              variant="ghost"
                              className="w-full justify-start text-left h-auto p-3 rounded-none"
                              onClick={() => {
                                const selectedOption = handleSelect(option);
                                field.onChange(selectedOption);
                                onChange?.(selectedOption);
                              }}
                            >
                              <div className="flex flex-col items-start">
                                <div className="font-medium">
                                  {highlightMatch(option.label, searchValue)}
                                </div>
                                {option.description && (
                                  <div className="text-xs text-muted-foreground">
                                    {highlightMatch(
                                      option.description,
                                      searchValue
                                    )}
                                  </div>
                                )}
                              </div>
                            </Button>
                          ))}
                        </div>
                      ) : searchValue.length >= minSearchLength ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No results found
                        </div>
                      ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          Type to search...
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </FormControl>
            )}
          />

          {clearable && searchValue && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-8 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => {
                const clearedValue = handleClear();
                setSearchValue("");
                onChange?.(clearedValue);
              }}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          )}

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
            {minSearchLength > 1 && (
              <span className="block">
                Minimum {minSearchLength} characters to search
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

FormSearchInput.displayName = "FormSearchInput";

export { FormSearchInput };
