"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAlgoliaContext } from "@/lib/algolia/components/provider";
import { SearchIcon } from "lucide-react";
import dynamic from "next/dynamic";
const SearchPanel = dynamic(
  () => import("./search").then((x) => x.SearchPanel),
  { ssr: false }
);

const SearchButton = () => {
  const { searchVisible, setSearchVisible } = useAlgoliaContext();
  return (
    <>
      <Dialog
        open={searchVisible}
        onOpenChange={(e) => {
          setSearchVisible(e);
        }}
      >
        <DialogTrigger>
          <SearchIcon
            className="text-secondary-foreground"
            width={22}
            height={22}
          />
        </DialogTrigger>
        <DialogContent
          forceMount
          className="bg-card text-card-foreground top-[40%]"
        >
          <DialogHeader>
            <DialogTitle>tìm kiếm bài viết</DialogTitle>
          </DialogHeader>
          <SearchPanel />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchButton;
