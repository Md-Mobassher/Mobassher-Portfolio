"use client";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { useChangeEmailMutation } from "@/redux/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

interface ChangeEmailValues {
  email: string;
}

const ChangeEmailForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [changeEmail, { isLoading }] = useChangeEmailMutation();

  const form = useForm<ChangeEmailValues>({
    mode: "onChange",
    defaultValues: { email: "" },
  });

  useEffect(() => {
    const email = searchParams.get("email");

    if (email) {
      form.setValue("email", email);
    }
  }, [searchParams, form]);

  const handleChangeEmail = async (values: ChangeEmailValues) => {
    const changeEmailData = {
      email: values.email,
    };

    try {
      const res = await changeEmail(changeEmailData).unwrap();
      if (res?.success) {
        toast.success(res?.message || "Email has been changed!");
        router.push(`/verify-email?email=${values.email}`);
      } else {
        toast.error(res?.message || "Failed to change email!");
      }
    } catch (error: any) {
      console.error("Error changing email:", error);
      toast.error(error?.message || "Failed to change email!");
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleChangeEmail)}
          className="space-y-4 w-full max-w-md"
        >
          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your new email address"
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
            {isLoading ? "Changing..." : "Change"}
          </Button>
        </form>
      </FormProvider>
      {/* <div className="flex gap-1 mt-5 justify-between items-center w-full px-4">
        <button
          disabled={isResendOTPLoading}
          className="text-sm text-blue-500 text-center cursor-pointer hover:underline hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleResendOTP({ email: searchParams.get("email") })}
        >
          Resend OTP
        </button>
        <button
          className="text-sm text-blue-500 text-center cursor-pointer hover:underline hover:text-blue-500"
          onClick={() =>
            handleChangeEmail({ email: searchParams.get("email") })
          }
        >
          Change Email
        </button>
        <button
          className="text-sm text-blue-500 text-center cursor-pointer hover:underline hover:text-blue-500"
          onClick={() => handleResendOTP({ email: searchParams.get("email") })}
        >
          Logout
        </button>
      </div> */}
    </>
  );
};

export default ChangeEmailForm;
