import { ReactNode } from "react";

type NotionGalleryProps = { children: ReactNode };

const NotionGallery = ({ children }: NotionGalleryProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5">
        {children}
      </div>
    </>
  );
};

export default NotionGallery;
