"use client";
import { useTheme } from "@/providers/theme";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Skeleton className="w-5 h-5 rounded-full"></Skeleton>;
  }

  return (
    <button
      className="text-secondary-foreground"
      aria-label="Toggle Dark Mode"
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <SunIcon width={20} height={20} />
      ) : (
        <MoonIcon width={20} height={20} />
      )}
    </button>
  );
};

export default ThemeSwitch;
