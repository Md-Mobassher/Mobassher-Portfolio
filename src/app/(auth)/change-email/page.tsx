import Link from "next/link";
import ChangeEmailForm from "./ChangeEmailForm";

const ChangeEmailPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-3 text-center">Change Email</h2>

      <ChangeEmailForm />

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

export default ChangeEmailPage;
