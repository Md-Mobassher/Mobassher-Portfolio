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
      className="border rounded-full w-12 relative h-7 flex items-center justify-center p-2 dark:border-gray-500 border-gray-500"
    >
      {theme === "dark" ? (
        <span className="mr-3 text-yellow-400">
          <Sun className="size-5" />
        </span>
      ) : (
        <span className="ml-4">
          <MoonStar className="size-5 text-black-400" />
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
