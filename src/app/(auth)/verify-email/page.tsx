import Link from "next/link";
import VerifyForm from "./VerifyForm";

const VerifyEmailPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-3 text-center">Verify Email</h2>

      <ul className="text-md text-gray-600 text-justify mb-5 list-disc pl-5">
        <li>
          We have send OTP in your email. Please check your email (inbox and
          spam folder) and verify your email.
        </li>
        <li>
          OTP will be valid for 5 minutes. If you exceed 5 minutes, click
          "Resend OTP" and check your email again.
        </li>
      </ul>
      <VerifyForm />

      <div className="mt-5">
        <p className="text-sm text-gray-600 text-center">
          Already Verified? Please{" "}
          <Link href="/login" className="text-blue-500 hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
