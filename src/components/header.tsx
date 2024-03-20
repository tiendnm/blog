import Link from "@/components/next/link";
import headerNavLinks from "@/data/header-nav-links";
import { additionalMetadata } from "@/data/site-metadata";
import dynamic from "next/dynamic";
import NextImage from "./next/image";

const SearchButton = dynamic(
  () => import("@/lib/algolia/components/search-button"),
  { ssr: false }
);
const MobileNav = dynamic(() => import("./mobile-nav"), { ssr: false });
const ThemeSwitch = dynamic(() => import("./theme-switch"), { ssr: false });
const Header = () => {
  return (
    <header className="flex items-center justify-between py-10 px-5 lg:px-10 ">
      <div>
        <Link href="/home" shallow aria-label={additionalMetadata.author}>
          <div className="flex items-center justify-between text-secondary-foreground">
            <div className="mr-3 ">
              <NextImage
                width={48}
                height={48}
                alt="logo"
                src={additionalMetadata.siteLogo}
                className="rounded-full relative flex h-12 w-12 shrink-0 overflow-hidden"
              />
            </div>
            {typeof additionalMetadata.author === "string" ? (
              <div className="hidden text-2xl font-semibold sm:block ">
                {additionalMetadata.author}
              </div>
            ) : (
              additionalMetadata.author
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== "/home")
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-secondary-foreground sm:block"
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
