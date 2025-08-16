import { Metadata } from "next";
import Link from "next/link";
import ResetPassForm from "./ResetPassForm";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Reset Password
      </h2>
      <ResetPassForm />
      <p className="text-sm text-gray-600 mt-3 text-center">
        Already have an account?
        <Link href="/login" className="text-blue-500 hover:underline ml-1">
          Login
        </Link>
      </p>
    </>
  );
}
