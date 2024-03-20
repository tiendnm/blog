import { cn } from "@/lib/utils";

const BlendBackground = () => {
  return (
    <div
      className={cn(
        " absolute top-0 left-0 w-full h-full",
        "bg-gradient-to-r",
        "from-[#e2e8ff] to-[#fff3f8]",
        "dark:from-[#061037] dark:to-[#000000]"
      )}
    ></div>
  );
};

export default BlendBackground;
