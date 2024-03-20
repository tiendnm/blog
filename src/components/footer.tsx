import SocialIcon from "@/components/social-icons";
import { additionalMetadata } from "@/data/site-metadata";

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center px-5 lg:px-10 ">
        <div className="mb-3 flex space-x-4 ">
          <SocialIcon
            kind="linkedin"
            href={additionalMetadata.linkedin}
            size={22}
          />
          <SocialIcon
            kind="github"
            href={additionalMetadata.github}
            size={22}
          />
          <SocialIcon
            kind="mail"
            href={`mailto:${additionalMetadata.email}`}
            size={22}
          />
          <SocialIcon
            kind="twitter"
            href={additionalMetadata.twitter}
            size={22}
          />
          <SocialIcon
            kind="instagram"
            href={additionalMetadata.instagram}
            size={22}
          />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{additionalMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
        {/* <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>
        </div> */}
      </div>
    </footer>
  );
}
