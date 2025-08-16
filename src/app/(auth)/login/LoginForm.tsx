// File: src/app/(auth)/login/LoginForm.tsx
"use client";
import { FormInput, FormPasswordInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TUser } from "@/utils/tokenHelper";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [loginUser, { isLoading }] = useUserLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard"; // Get redirect URL

  const form = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    const email = searchParams.get("email");

    if (email) {
      form.setValue("email", email);
    }
  }, [searchParams, form]);

  const onFinish = async (values: LoginFormValues) => {
    if (!values.email || !values.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(values.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (values.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await loginUser(values).unwrap();
      if (result?.success) {
        const accessToken = result?.data?.accessToken;
        const refreshToken = result?.data?.refreshToken;
        const decodedToken = jwtDecode<TUser>(accessToken);
        console.log(decodedToken?.emailVerified);

        if (decodedToken?.emailVerified) {
          toast.success(result?.message || "You have successfully logged in!");

          dispatch(
            setUser({
              user: decodedToken,
              acesstoken: accessToken,
              refreshtoken: refreshToken,
            })
          );

          //router.push(decodeURIComponent(redirectUrl)); // Redirect to the specified URL
          window.location.href = decodeURIComponent(redirectUrl);
        } else {
          toast.error(result?.message || "Please verify your email!");
          const accessToken = result?.data?.accessToken;
          const refreshToken = result?.data?.refreshToken;
          const decodedToken = jwtDecode<TUser>(accessToken);

          dispatch(
            setUser({
              user: decodedToken,
              acesstoken: accessToken,
              refreshtoken: refreshToken,
            })
          );

          window.location.href = `/verify-email?email=${encodeURIComponent(values.email)}`;
        }
      } else {
        toast.error(result.message || "Invalid email or password!");
      }
    } catch (error: any) {
      // console.error("Login Error:", error);
      toast.error(error?.message || "Invalid email or password!");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onFinish)} className="space-y-4">
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          }}
          autoComplete="email"
        />

        <FormPasswordInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          required
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          autoComplete="current-password"
          showToggle={true}
        />

        <div className="text-right">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
