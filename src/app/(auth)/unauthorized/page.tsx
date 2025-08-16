"use client";

import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const UnauthorizedPage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logout());
    toast.error("Unauthorized access!!!");
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="text-2xl font-bold text-center text-[#E25A6F]">
        You are not authorized
      </h1>
      <div className="flex gap-8 mt-8">
        <button
          onClick={() => router.push("/login")}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/80 cursor-pointer"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
