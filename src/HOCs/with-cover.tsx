// import NotionCover from "@/components/notion/cover";
import dynamic from "next/dynamic";
const Cover = dynamic(() => import("@/components/notion/cover"));
export default function withCover(Component: React.FC<any>) {
  const WithCover = (props: any) => {
    return (
      <>
        <Cover src={"/home-cover.avif"} />
        <div className="px-5 lg:px-10 ">
          <Component {...props} />
        </div>
      </>
    );
  };
  WithCover.displayName = "WithCover";
  return WithCover;
}
