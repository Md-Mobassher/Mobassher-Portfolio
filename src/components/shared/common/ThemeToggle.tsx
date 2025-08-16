"use client";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted for client-side rendering
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className=" relative flex items-center justify-center cursor-pointer"
    >
      {theme === "dark" ? (
        <span className=" text-yellow-400">
          <Sun className="size-6" />
        </span>
      ) : (
        <span className="">
          <MoonStar className="size-6 text-gray-500" />
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
