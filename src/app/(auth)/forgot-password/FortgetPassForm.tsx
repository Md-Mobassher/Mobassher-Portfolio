"use client";

import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ForgotPasswordFormValues {
  email: string;
}

const FortgetPassForm = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const router = useRouter();

  const form = useForm<ForgotPasswordFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onFinish = async (values: ForgotPasswordFormValues) => {
    // Additional validation checks
    if (!values.email) {
      toast.error("Please enter your email address");
      return;
    }

    // Email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(values.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const result = await forgotPassword(values).unwrap();
      if (result.success) {
        toast.success("Reset password link sent to your email!");
        //router.push("/reset-password");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.error("Forgot Password Error:", error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4 text-left"
        onSubmit={form.handleSubmit(onFinish)}
      >
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email address"
          required
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          autoComplete="email"
        />

        <Button
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 disabled:opacity-50 mt-3"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Password Link"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default FortgetPassForm;
