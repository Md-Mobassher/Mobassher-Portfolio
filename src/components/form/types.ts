import { ReactNode } from "react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

// Base form field props interface
export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  containerClassName?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showError?: boolean;
  form?: UseFormReturn<TFieldValues>;
  rules?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  onBlur?: (event?: any) => void;
  onFocus?: (event?: any) => void;
}

// Input specific props
export interface FormInputProps<TFieldValues extends FieldValues = FieldValues>
  extends FormFieldProps<TFieldValues> {
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week";
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled" | "ghost";
}

// Textarea specific props
export interface FormTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormFieldProps<TFieldValues> {
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled" | "ghost";
}

// Select specific props
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface FormSelectProps<TFieldValues extends FieldValues = FieldValues>
  extends FormFieldProps<TFieldValues> {
  options: SelectOption[];
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled" | "ghost";
  loading?: boolean;
  noOptionsMessage?: string;
  loadingMessage?: string;
}

// Date picker specific props
export interface FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormFieldProps<TFieldValues> {
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  enabledDates?: Date[];
  showTimePicker?: boolean;
  timeFormat?: "12h" | "24h";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled" | "ghost";
  calendarClassName?: string;
}

// Checkbox specific props
export interface FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormFieldProps<TFieldValues> {
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
}

// Radio group specific props
export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface FormRadioGroupProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormFieldProps<TFieldValues> {
  options: RadioOption[];
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
}

// Switch specific props
export interface FormSwitchProps<TFieldValues extends FieldValues = FieldValues>
  extends FormFieldProps<TFieldValues> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
}

// File input specific props
export interface FormFileInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<
    FormFieldProps<TFieldValues>,
    "onChange" | "onBlur" | "onFocus"
  > {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  dragAndDrop?: boolean;
  preview?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled" | "ghost";
  fileList?: any[];
  handleUpload?: (info: { fileList: File[] }) => void;
  handleRemove?: (file: any) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  uploadedImage?: string;
}

// Multi-select specific props
export interface FormMultiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormSelectProps<TFieldValues> {
  maxSelected?: number;
  showSelectedCount?: boolean;
  selectedCountText?: string;
  clearAllText?: string;
  selectAllText?: string;
}

// Phone input specific props
export interface FormPhoneInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormInputProps<TFieldValues> {
  countryCode?: string;
  showCountryCode?: boolean;
  allowedCountries?: string[];
  defaultCountry?: string;
  format?: "national" | "international";
}

// Range input specific props
export interface FormRangeInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormFieldProps<TFieldValues> {
  min: number;
  max: number;
  step?: number;
  showValue?: boolean;
  showTicks?: boolean;
  dual?: boolean; // for range slider with two handles
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
}

// Time input specific props
export interface FormTimeInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormFieldProps<TFieldValues> {
  format?: "12h" | "24h";
  step?: number; // minutes
  minTime?: string; // HH:MM format
  maxTime?: string; // HH:MM format
  showSeconds?: boolean;
  timeFormat?: "HH:MM" | "HH:MM:SS" | "hh:mm A" | "hh:mm:ss A";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled" | "ghost";
}

// DateTime input specific props
export interface FormDateTimeInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormFieldProps<TFieldValues> {
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  enabledDates?: Date[];
  timeFormat?: "12h" | "24h";
  timeStep?: number;
  minTime?: string;
  maxTime?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled" | "ghost";
}

// Toggle group specific props
export interface ToggleOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface FormToggleGroupProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormFieldProps<TFieldValues> {
  options: ToggleOption[];
  type?: "single" | "multiple";
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
}

// Search input specific props
export interface SearchOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface FormSearchInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormFieldProps<TFieldValues> {
  options?: SearchOption[];
  searchFunction?: (query: string) => Promise<SearchOption[]>;
  debounceMs?: number;
  minSearchLength?: number;
  maxSuggestions?: number;
  loading?: boolean;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled" | "ghost";
}

// Color input specific props
export interface FormColorInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormFieldProps<TFieldValues> {
  format?: "hex" | "rgb" | "hsl";
  showPreview?: boolean;
  showInput?: boolean;
  presetColors?: string[];
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled" | "ghost";
}

// Number input specific props
export interface FormNumberInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<FormInputProps<TFieldValues>, "type"> {
  min?: number;
  max?: number;
  step?: number;
  allowNegative?: boolean;
  allowDecimal?: boolean;
  formatOnBlur?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  locale?: string;
}

// Password input specific props
export interface FormPasswordInputProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<FormInputProps<TFieldValues>, "type"> {
  showToggle?: boolean;
  showStrengthIndicator?: boolean;
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumbers?: boolean;
  requireSpecialChars?: boolean;
}

// Toggle group specific props
export interface ToggleOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface FormToggleGroupProps<
  TFieldValues extends FieldValues = FieldValues,
> extends FormFieldProps<TFieldValues> {
  options: ToggleOption[];
  type?: "single" | "multiple";
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
}

// Common validation rules
export interface ValidationRules {
  required?: boolean | string;
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  email?: boolean | string;
  url?: boolean | string;
  phone?: boolean | string;
  custom?: (value: any) => boolean | string;
}

// Form field state
export interface FormFieldState {
  isDirty: boolean;
  isTouched: boolean;
  error?: string;
  isValid: boolean;
  isRequired: boolean;
}

// Form field context
export interface FormFieldContextValue {
  name: string;
  error?: string;
  isDirty: boolean;
  isTouched: boolean;
  isValid: boolean;
  isRequired: boolean;
  setValue: (value: any) => void;
  clearValue: () => void;
}
