import Loader from "@/components/loader";
import { NavigationEvents } from "@/components/navigation-events";
import { siteMetadata } from "@/data/site-metadata";

import GoogleAdsense from "@/lib/google-ads";
import { cn } from "@/lib/utils";
import AppProvider from "@/providers/app";
import type { Metadata } from "next";
import next_dynamic from "next/dynamic";
import { Cabin } from "next/font/google";
import "prismjs/themes/prism-tomorrow.css";
import { Suspense } from "react";
import "./globals.css";
const cabin = Cabin({ subsets: ["latin"] });

// --- dynamic load component
const ThreeJSBackground = next_dynamic(
  () => import("@/components/background"),
  {
    ssr: false,
  }
);
const Footer = next_dynamic(() => import("@/components/footer"));
const Header = next_dynamic(() => import("@/components/header"));
export const metadata: Metadata = {
  ...siteMetadata,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cabin.className}>
        <AppProvider>
          <ThreeJSBackground />
          <div
            className={cn(
              "relative w-full max-w-[60rem] mx-auto min-h-full z-0"
            )}
          >
            <div
              className={cn(
                "bg-background/60 backdrop-blur-xl",
                "w-full max-w-[60rem] mx-auto h-screen ",
                "fixed z-0 shadow-xl shadow-black/40"
              )}
            ></div>
            <div className="relative z-10">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
          <Loader />
        </AppProvider>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <GoogleAdsense />
      </body>
    </html>
  );
}
