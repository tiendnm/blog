"use client";

import Link from "@/components/next/link";
import headerNavLinks from "@/data/header-nav-links";
import { cn } from "@/lib/utils";
import { AlignJustifyIcon, XIcon } from "lucide-react";
import { useState } from "react";

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="sm:hidden"
      >
        <AlignJustifyIcon
          className="text-secondary-foreground"
          width={20}
          height={20}
        />
      </button>
      <div
        className={cn(
          `fixed left-0 top-0 z-20 h-full w-full transform bg-white opacity-95 duration-300 ease-in-out dark:bg-gray-950 dark:opacity-[0.98]`,
          navShow ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end">
          <button
            className="mr-8 mt-11 h-8 w-8"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <XIcon
              className="text-secondary-foreground"
              width={20}
              height={20}
            />
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-4">
              <Link
                shallow
                href={link.href}
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
