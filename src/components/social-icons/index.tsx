import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
} from "lucide-react";

type Kind = "mail" | "github" | "linkedin" | "twitter" | "instagram";

type SocialIconProps = {
  kind: Kind;
  href: string | undefined;
  size?: number;
};

const icons: Partial<Record<Kind, any>> = {
  mail: MailIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
};

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (
    !href ||
    (kind === "mail" &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null;

  const Icon = icons[kind];

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <Icon
        width={size}
        height={size}
        // strokeWidth={"0.4px"}
        stroke="currentColor"
      />
    </a>
  );
};

export default SocialIcon;
