import {
  CoverLoading,
  NotionGalleryLoading,
  TitleLoading,
} from "@/components/notion/loading";

export default function Loading() {
  return (
    <>
      <CoverLoading />
      <div className="px-5 lg:px-10">
        <TitleLoading />
        <NotionGalleryLoading length={6} />
      </div>
    </>
  );
}
