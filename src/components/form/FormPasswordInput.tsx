// src/components/form/FormPasswordInput.tsx

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
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormInputProps } from "./types";

interface FormPasswordInputProps extends Omit<FormInputProps, "type"> {
  showToggle?: boolean;
  showStrengthIndicator?: boolean;
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
}

interface PasswordStrength {
  score: number; // 0-4
  label: string;
  color: string;
}

const FormPasswordInput = forwardRef<HTMLInputElement, FormPasswordInputProps>(
  (
    {
      name,
      label,
      description,
      placeholder = "Enter password",
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
      showToggle = true,
      showStrengthIndicator = false,
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumbers = true,
      requireSpecialChars = false,
      size = "md",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const formContext = useFormContext();
    const formToUse = form || formContext;
    const [showPassword, setShowPassword] = useState(false);

    if (!formToUse) {
      throw new Error(
        "FormPasswordInput must be used within a FormProvider or have a form prop"
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
      "w-full text-md rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      sizeClasses[size],
      variantClasses[variant],
      leftIcon && "pl-10",
      showToggle && "pr-10",
      error && "border-destructive focus-visible:ring-destructive",
      className
    );

    const calculatePasswordStrength = (password: string): PasswordStrength => {
      if (!password) {
        return { score: 0, label: "Very Weak", color: "bg-red-500" };
      }

      let score = 0;
      const checks = [];

      // Length check
      if (password.length >= minLength) {
        score += 1;
        checks.push(`At least ${minLength} characters`);
      }

      // Uppercase check
      if (requireUppercase && /[A-Z]/.test(password)) {
        score += 1;
        checks.push("Uppercase letter");
      }

      // Lowercase check
      if (requireLowercase && /[a-z]/.test(password)) {
        score += 1;
        checks.push("Lowercase letter");
      }

      // Numbers check
      if (requireNumbers && /\d/.test(password)) {
        score += 1;
        checks.push("Number");
      }

      // Special characters check
      if (requireSpecialChars && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score += 1;
        checks.push("Special character");
      }

      const strengthMap: Record<number, { label: string; color: string }> = {
        0: { label: "Very Weak", color: "bg-red-500" },
        1: { label: "Weak", color: "bg-orange-500" },
        2: { label: "Fair", color: "bg-yellow-500" },
        3: { label: "Good", color: "bg-blue-500" },
        4: { label: "Strong", color: "bg-green-500" },
        5: { label: "Very Strong", color: "bg-green-600" },
      };

      return {
        score: Math.min(score, 5),
        label: strengthMap[Math.min(score, 5)].label,
        color: strengthMap[Math.min(score, 5)].color,
      };
    };

    const getPasswordRequirements = () => {
      const requirements = [];
      if (minLength) requirements.push(`At least ${minLength} characters`);
      if (requireUppercase) requirements.push("One uppercase letter");
      if (requireLowercase) requirements.push("One lowercase letter");
      if (requireNumbers) requirements.push("One number");
      if (requireSpecialChars) requirements.push("One special character");
      return requirements;
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
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}

          <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field }) => {
              const strength = showStrengthIndicator
                ? calculatePasswordStrength(field.value || "")
                : null;

              return (
                <FormControl>
                  <Input
                    {...field}
                    {...props}
                    ref={ref}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={inputClasses}
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
              );
            }}
          />

          {showToggle && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Password Strength Indicator */}
        {showStrengthIndicator && (
          <Controller
            name={name}
            control={control}
            render={({ field }) => {
              const strength = calculatePasswordStrength(field.value || "");
              const requirements = getPasswordRequirements();

              return (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={cn(
                          "h-2 rounded-full transition-all duration-300",
                          strength.color
                        )}
                        style={{ width: `${(strength.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground min-w-[80px]">
                      {strength.label}
                    </span>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <div className="font-medium mb-1">Requirements:</div>
                    <ul className="space-y-1">
                      {requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <span className="w-1 h-1 bg-gray-400 rounded-full" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }}
          />
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
      </FormItem>
    );
  }
);

FormPasswordInput.displayName = "FormPasswordInput";

export { FormPasswordInput };
