"use client";
import { FormInput, FormPasswordInput } from "@/components/form";
import { Button } from "@/components/ui/button";
import { useUserRegisterMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

interface RegisterFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  accountType: string;
}

const RegisterForm = () => {
  const [registerUser, { isLoading }] = useUserRegisterMutation();
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      accountType: "",
    },
  });

  const onFinish = async (values: RegisterFormValues) => {
    try {
      const result = await registerUser(values).unwrap();
      if (result.success) {
        toast.success(result.message || "Successfully registered!");
        router.push(`/login?email=${encodeURIComponent(values.email)}`);
      }
    } catch (error: any) {
      console.error("Register Error:", error);
      toast.error(
        error?.data?.message || error?.message || "Failed to register!"
      );
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4 text-left"
        onSubmit={form.handleSubmit(onFinish)}
      >
        <FormInput
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your full name"
          required
          rules={{
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          }}
          autoComplete="name"
        />

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
          description="Email must be unique. An OTP will be sent to your email for verification."
        />

        <FormInput
          name="phoneNumber"
          label="Mobile Number"
          type="tel"
          placeholder="Enter your mobile number"
          required
          rules={{
            required: "Mobile Number is required",
            pattern: {
              value: /^[0-9]{11}$/,
              message: "Please enter a valid 11-digit mobile number",
            },
          }}
          autoComplete="tel"
          description="The number must be in the Bangladeshi format and must be unique."
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
              message: "Password must be at least 6 characters",
            },
          }}
          autoComplete="new-password"
          showToggle={true}
          description="Password must be at least 6 characters."
        />

        <Button
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/80 disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
