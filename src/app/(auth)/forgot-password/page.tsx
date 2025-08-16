import { Metadata } from "next";
import Link from "next/link";
import FortgetPassForm from "./FortgetPassForm";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Forgot Password
      </h2>
      <FortgetPassForm />

      <p className="text-sm text-gray-600 mt-3 text-center">
        Already have an account?
        <Link href="/login" className="text-blue-500 hover:underline ml-1">
          Login
        </Link>
      </p>
    </>
  );
}
