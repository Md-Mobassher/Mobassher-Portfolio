// src/components/form/ExampleForm.tsx

"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, File, Mail, Phone, Upload, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormCheckbox,
  FormDatePicker,
  FormFileInput,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from "./index";

// Validation schema
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  birthDate: z
    .date()
    .refine((date) => date < new Date(), "Birth date must be in the past"),
  gender: z.string().min(1, "Please select a gender"),
  bio: z.string().max(500, "Bio must be less than 500 characters"),
  country: z.string().min(1, "Please select a country"),
  notifications: z.boolean(),
  terms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
  avatar: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Sample data
const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "in", label: "India" },
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export default function ExampleForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      birthDate: undefined,
      gender: "",
      bio: "",
      country: "",
      notifications: false,
      terms: false,
      avatar: undefined,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          User Registration Form
        </h1>
        <p className="text-gray-600">
          This example demonstrates all available form field components
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                leftIcon={<User className="h-4 w-4" />}
                required
                description="Your full name as it appears on official documents"
              />

              <FormInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                leftIcon={<Mail className="h-4 w-4" />}
                required
                description="We'll never share your email with anyone else"
              />

              <FormInput
                name="phone"
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                leftIcon={<Phone className="h-4 w-4" />}
                required
              />

              <FormDatePicker
                name="birthDate"
                label="Date of Birth"
                placeholder="Select your birth date"
                leftIcon={<Calendar className="h-4 w-4" />}
                required
                minDate={new Date("1900-01-01")}
                maxDate={new Date()}
                description="You must be at least 18 years old"
              />
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Additional Information
            </h2>

            <div className="space-y-4">
              <FormRadioGroup
                name="gender"
                label="Gender"
                options={genderOptions}
                orientation="horizontal"
                required
                description="This information helps us provide better service"
              />

              <FormSelect
                name="country"
                label="Country"
                placeholder="Select your country"
                options={countries}
                required
                description="Your country of residence"
              />

              <FormTextarea
                name="bio"
                label="Biography"
                placeholder="Tell us about yourself..."
                rows={4}
                maxLength={500}
                description="Share a bit about yourself (max 500 characters)"
              />
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Preferences & Settings
            </h2>

            <div className="space-y-4">
              <FormSwitch
                name="notifications"
                label="Email Notifications"
                description="Receive email updates about new features and announcements"
              />

              <FormCheckbox
                name="terms"
                label="I agree to the Terms and Conditions"
                required
                description="You must agree to our terms to continue"
              />
            </div>
          </div>

          {/* File Upload Section */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              File Uploads
            </h2>

            <div className="space-y-6">
              {/* Single Image Upload */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Single Image Upload
                </h3>
                <FormFileInput
                  name="avatar"
                  label="Upload Profile Picture"
                  accept="image/*"
                  multiple={false}
                  maxSize={5 * 1024 * 1024} // 5MB
                  dragAndDrop
                  preview
                  leftIcon={<Upload className="h-4 w-4" />}
                  description="Upload a profile picture (JPG, PNG, GIF - max 5MB)"
                  uploadedImage="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                />
              </div>

              {/* Multiple Image Upload */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Multiple Image Upload
                </h3>
                <FormFileInput
                  name="gallery"
                  label="Upload Gallery Images"
                  accept="image/*"
                  multiple={true}
                  maxFiles={5}
                  maxSize={10 * 1024 * 1024} // 10MB
                  dragAndDrop
                  preview
                  leftIcon={<Upload className="h-4 w-4" />}
                  description="Upload multiple images for gallery (max 5 files, 10MB each)"
                />
              </div>

              {/* Document Upload */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  Document Upload
                </h3>
                <FormFileInput
                  name="documents"
                  label="Upload Documents"
                  accept=".pdf,.doc,.docx,.txt"
                  multiple={true}
                  maxFiles={3}
                  maxSize={2 * 1024 * 1024} // 2MB
                  dragAndDrop
                  leftIcon={<File className="h-4 w-4" />}
                  description="Upload documents (PDF, DOC, DOCX, TXT - max 3 files, 2MB each)"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset Form
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Submit Registration
            </Button>
          </div>
        </form>
      </FormProvider>

      {/* Form Data Display (for debugging) */}
      {process.env.NODE_ENV === "development" && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Form Data (Development)
          </h3>
          <pre className="text-sm text-gray-700 overflow-auto">
            {JSON.stringify(form.watch(), null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
