// Force dynamic rendering to prevent static generation issues
export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Registration",
};

export default function RegistrationPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-8 bg-[#fff4f4] rounded-lg p-2 mb-8">
        <Link
          href="/login"
          className="text-xl w-full px-5 py-2 hover:bg-white font-semibold  text-center rounded-lg"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="text-xl w-full px-5 py-2 bg-white font-semibold  text-center rounded-lg"
        >
          Register
        </Link>
      </div>{" "}
      <RegisterForm />
    </>
  );
}
