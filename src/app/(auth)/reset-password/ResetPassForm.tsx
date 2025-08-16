"use client";
import { FormPasswordInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ResetPasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassForm = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<ResetPasswordFormValues>({
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const id = searchParams.get("id");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!id || !token) {
      toast.error("Invalid or missing reset token");
      // router.push("/");
    }
  }, [id, token]);

  const onFinish = async (values: ResetPasswordFormValues) => {
    // Additional validation checks
    if (!values.newPassword || !values.confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Password length validation
    if (values.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Password match validation
    if (values.newPassword !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const resetData = {
      id: id,
      newPassword: values.newPassword,
    };
    console.log("resetData", resetData, token);

    try {
      const result = await resetPassword({ resetData, token }).unwrap();
      if (result.success) {
        toast.success(result.message || "Password reset successful!");
        router.push("/login");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error: any) {
      console.error("Reset Password Error:", error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4 text-left"
        onSubmit={form.handleSubmit(onFinish)}
      >
        <FormPasswordInput
          name="newPassword"
          label="New Password"
          placeholder="Enter your new password"
          required
          rules={{
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          autoComplete="new-password"
          showToggle={true}
        />

        <FormPasswordInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your new password"
          required
          rules={{
            required: "Please confirm your password",
            validate: (value) => {
              const newPassword = form.watch("newPassword");
              return value === newPassword || "Passwords do not match";
            },
          }}
          autoComplete="new-password"
          showToggle={true}
        />

        <Button
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default ResetPassForm;
