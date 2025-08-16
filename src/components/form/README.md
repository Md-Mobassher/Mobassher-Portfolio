# Reusable Form Field Components

This directory contains industry-standard reusable form field components that integrate seamlessly with `react-hook-form` and provide consistent styling, validation, and accessibility features.

## Features

- ✅ **React Hook Form Integration**: All components work with react-hook-form out of the box
- ✅ **TypeScript Support**: Full TypeScript support with proper type inference
- ✅ **Consistent Styling**: Unified design system with customizable variants and sizes
- ✅ **Accessibility**: Built-in accessibility features (ARIA labels, keyboard navigation)
- ✅ **Validation**: Integrated error handling and validation display
- ✅ **Customizable**: Extensive customization options for styling and behavior
- ✅ **Icon Support**: Left and right icon support for enhanced UX
- ✅ **Responsive**: Mobile-friendly and responsive design

## Available Components

### FormInput

A versatile input field supporting various input types (text, email, password, number, etc.).

```tsx
import { FormInput } from "@/components/form";

<FormInput
  name="email"
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  required
  description="We'll never share your email with anyone else."
/>;
```

### FormTextarea

A multi-line text input for longer content.

```tsx
import { FormTextarea } from "@/components/form";

<FormTextarea
  name="bio"
  label="Biography"
  placeholder="Tell us about yourself..."
  rows={4}
  maxLength={500}
  description="Maximum 500 characters"
/>;
```

### FormSelect

A dropdown select component with support for grouped options.

```tsx
import { FormSelect } from "@/components/form";

<FormSelect
  name="country"
  label="Country"
  placeholder="Select your country"
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ]}
  required
/>;
```

### FormDatePicker

A date picker component with calendar popup.

```tsx
import { FormDatePicker } from "@/components/form";

<FormDatePicker
  name="birthDate"
  label="Date of Birth"
  placeholder="Select your birth date"
  minDate={new Date("1900-01-01")}
  maxDate={new Date()}
  required
/>;
```

### FormCheckbox

A checkbox component for boolean values.

```tsx
import { FormCheckbox } from "@/components/form";

<FormCheckbox
  name="terms"
  label="I agree to the terms and conditions"
  required
  description="You must agree to continue"
/>;
```

### FormRadioGroup

A radio button group for single selection from multiple options.

```tsx
import { FormRadioGroup } from "@/components/form";

<FormRadioGroup
  name="gender"
  label="Gender"
  options={[
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]}
  required
/>;
```

### FormSwitch

A toggle switch component for boolean values.

```tsx
import { FormSwitch } from "@/components/form";

<FormSwitch
  name="notifications"
  label="Enable notifications"
  description="Receive email notifications about updates"
/>;
```

### FormFileInput

A file upload component with drag-and-drop support.

```tsx
import { FormFileInput } from "@/components/form";

<FormFileInput
  name="avatar"
  label="Profile Picture"
  accept="image/*"
  multiple={false}
  maxSize={5 * 1024 * 1024} // 5MB
  dragAndDrop
  preview
  description="Upload a profile picture (max 5MB)"
/>;
```

### FormTimeInput

A time picker component with 12h/24h format support.

```tsx
import { FormTimeInput } from "@/components/form";

<FormTimeInput
  name="appointmentTime"
  label="Appointment Time"
  format="12h"
  step={30}
  minTime="09:00"
  maxTime="17:00"
  description="Select your preferred appointment time"
/>;
```

## Common Props

All form components share these common props:

| Prop                   | Type                                            | Default     | Description                                    |
| ---------------------- | ----------------------------------------------- | ----------- | ---------------------------------------------- |
| `name`                 | `string`                                        | -           | Field name (required)                          |
| `label`                | `string`                                        | -           | Field label                                    |
| `description`          | `string`                                        | -           | Help text below the field                      |
| `placeholder`          | `string`                                        | -           | Placeholder text                               |
| `required`             | `boolean`                                       | `false`     | Whether the field is required                  |
| `disabled`             | `boolean`                                       | `false`     | Whether the field is disabled                  |
| `className`            | `string`                                        | -           | Additional CSS classes for the input           |
| `labelClassName`       | `string`                                        | -           | CSS classes for the label                      |
| `descriptionClassName` | `string`                                        | -           | CSS classes for the description                |
| `errorClassName`       | `string`                                        | -           | CSS classes for error messages                 |
| `containerClassName`   | `string`                                        | -           | CSS classes for the container                  |
| `leftIcon`             | `ReactNode`                                     | -           | Icon to display on the left                    |
| `rightIcon`            | `ReactNode`                                     | -           | Icon to display on the right                   |
| `showError`            | `boolean`                                       | `true`      | Whether to show error messages                 |
| `form`                 | `UseFormReturn`                                 | -           | Form instance (optional if using FormProvider) |
| `rules`                | `object`                                        | -           | Validation rules                               |
| `defaultValue`         | `any`                                           | -           | Default value                                  |
| `onChange`             | `function`                                      | -           | Change handler                                 |
| `onBlur`               | `function`                                      | -           | Blur handler                                   |
| `onFocus`              | `function`                                      | -           | Focus handler                                  |
| `size`                 | `'sm' \| 'md' \| 'lg'`                          | `'md'`      | Component size                                 |
| `variant`              | `'default' \| 'outline' \| 'filled' \| 'ghost'` | `'default'` | Visual variant                                 |

## Usage with React Hook Form

### Basic Usage

```tsx
import { useForm } from "react-hook-form";
import { Form, FormInput, FormTextarea, FormSelect } from "@/components/form";

interface FormData {
  name: string;
  email: string;
  message: string;
  category: string;
}

export default function ContactForm() {
  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
      category: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <FormSelect
          name="category"
          label="Category"
          placeholder="Select a category"
          options={[
            { value: "general", label: "General Inquiry" },
            { value: "support", label: "Technical Support" },
            { value: "billing", label: "Billing Question" },
          ]}
          required
        />

        <FormTextarea
          name="message"
          label="Message"
          placeholder="Enter your message"
          rows={4}
          required
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Form>
  );
}
```

### With Validation

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormInput, FormDatePicker } from "@/components/form";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  birthDate: z
    .date()
    .refine((date) => date < new Date(), "Birth date must be in the past"),
});

type FormData = z.infer<typeof schema>;

export default function UserForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      birthDate: undefined,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormInput
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <FormDatePicker
          name="birthDate"
          label="Date of Birth"
          placeholder="Select your birth date"
          required
        />
      </form>
    </Form>
  );
}
```

## Styling and Customization

### Size Variants

```tsx
<FormInput name="field" size="sm" /> // Small
<FormInput name="field" size="md" /> // Medium (default)
<FormInput name="field" size="lg" /> // Large
```

### Visual Variants

```tsx
<FormInput name="field" variant="default" /> // Default
<FormInput name="field" variant="outline" /> // Outlined
<FormInput name="field" variant="filled" /> // Filled background
<FormInput name="field" variant="ghost" /> // Minimal
```

### Custom Styling

```tsx
<FormInput
  name="field"
  className="border-blue-500 focus:border-blue-700"
  labelClassName="text-blue-600 font-bold"
  errorClassName="text-red-600 font-semibold"
/>
```

### With Icons

```tsx
import { Mail, Lock, User } from 'lucide-react';

<FormInput
  name="email"
  label="Email"
  leftIcon={<Mail className="h-4 w-4" />}
  placeholder="Enter your email"
/>

<FormInput
  name="password"
  label="Password"
  type="password"
  leftIcon={<Lock className="h-4 w-4" />}
  rightIcon={<Eye className="h-4 w-4" />}
  placeholder="Enter your password"
/>
```

## Migration from Existing Forms

### Before (Manual Form Fields)

```tsx
// Old way
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input {...field} placeholder="Enter email" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

### After (Reusable Component)

```tsx
// New way
<FormInput name="email" label="Email" placeholder="Enter email" />
```

## Best Practices

1. **Always use FormProvider**: Wrap your forms with `Form` component for better performance
2. **Consistent naming**: Use descriptive field names that match your data structure
3. **Proper validation**: Use validation libraries like Zod or Yup for type-safe validation
4. **Accessibility**: Always provide labels and descriptions for better UX
5. **Error handling**: Let the components handle error display automatically
6. **Responsive design**: Use appropriate sizes for different screen sizes

## TypeScript Support

All components are fully typed with TypeScript. The form data types are automatically inferred from your form configuration:

```tsx
interface UserForm {
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

const form = useForm<UserForm>();

// TypeScript will provide full type safety and autocomplete
<FormInput name="name" /> // ✅ name is typed as string
<FormInput name="age" type="number" /> // ✅ age is typed as number
<FormCheckbox name="isActive" /> // ✅ isActive is typed as boolean
```

## Contributing

When adding new form components:

1. Follow the existing patterns and structure
2. Include proper TypeScript types
3. Add comprehensive props interface
4. Include accessibility features
5. Add to the index.ts exports
6. Update this README with usage examples
