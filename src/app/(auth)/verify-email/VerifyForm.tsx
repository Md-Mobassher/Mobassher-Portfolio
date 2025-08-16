"use client";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import {
  useResendOTPMutation,
  useVerifyEmailMutation,
} from "@/redux/features/auth/authApi";
import { logout, setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TUser } from "@/utils/tokenHelper";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

interface VerifyFormValues {
  email: string;
  otp: string;
}

interface ResendOTPValues {
  email: string;
}

const VerifyForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendOTP, { isLoading: isResendOTPLoading }] = useResendOTPMutation();

  const form = useForm<VerifyFormValues>({
    mode: "onChange",
    defaultValues: { email: "", otp: "" },
  });

  useEffect(() => {
    const email = searchParams.get("email");
    const otp = searchParams.get("otp");

    if (email) {
      form.setValue("email", email);
    }
    if (otp) {
      form.setValue("otp", otp);
    }
  }, [searchParams, form]);

  const handleVerifyEmail = async (values: VerifyFormValues) => {
    const verifyData = {
      email: values.email,
      otp: Number(values.otp),
    };

    try {
      const result = await verifyEmail(verifyData).unwrap();
      if (result?.success) {
        const accessToken = result?.data?.accessToken;
        const refreshToken = result?.data?.refreshToken;
        const decodedToken = jwtDecode<TUser>(accessToken);

        if (decodedToken?.emailVerified) {
          toast.success(result?.message || "Email has been verified!");
          dispatch(
            setUser({
              user: decodedToken,
              acesstoken: accessToken,
              refreshtoken: refreshToken,
            })
          );
          window.location.href = "/dashboard";
        } else {
          toast.error(result?.message || "Failed to verify your email!");
        }
      } else {
        toast.error(result?.message || "Failed to verify your email!");
      }
    } catch (error: any) {
      // console.error("Error verifying email:", error);
      toast.error(error?.message || "Failed to verify your email!");
    }
  };

  const handleResendOTP = async (values: ResendOTPValues) => {
    const verifyData = {
      email: values.email,
    };

    try {
      const res = await resendOTP(verifyData).unwrap();
      if (res?.success) {
        toast.success(res?.message || "OTP has been resend!");
      } else {
        toast.error(res?.message || "Failed to resend OTP!");
      }
    } catch (error: any) {
      console.error("Error resending OTP:", error);
      toast.error(error?.message || "Failed to resend OTP!");
    }
  };

  const isEmailAutoFilled = !!searchParams.get("email");
  const isOtpAutoFilled = !!searchParams.get("otp");

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(handleVerifyEmail)}
          className="space-y-4 w-full max-w-md"
        >
          <FormInput
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email address"
            required
            disabled={isEmailAutoFilled}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            autoComplete="email"
          />

          <FormInput
            name="otp"
            label="OTP"
            type="text"
            placeholder="Enter the OTP sent to your email"
            required
            disabled={isOtpAutoFilled}
            rules={{
              required: "OTP is required",
            }}
            autoComplete="one-time-code"
          />

          <Button
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 disabled:opacity-50 mt-3"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </FormProvider>

      <div className="flex gap-1 mt-5 justify-between items-center w-full px-4">
        <button
          disabled={isResendOTPLoading}
          className="text-sm text-blue-500 text-center cursor-pointer hover:underline hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleResendOTP({ email: searchParams.get("email") })}
        >
          Resend OTP
        </button>
        {/* <button
          className="text-sm text-blue-500 text-center cursor-pointer hover:underline hover:text-blue-500"
          onClick={() =>
            router.push(`/change-email?email=${searchParams.get("email")}`)
          }
        >
          Change Email
        </button> */}
        <button
          className="text-sm text-blue-500 text-center cursor-pointer hover:underline hover:text-blue-500"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
            toast.success("Logged out successfully");
            router.push("/");
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default VerifyForm;
