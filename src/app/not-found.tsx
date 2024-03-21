import NextLink from "@/components/next/link";
import { ArrowLeftFromLine } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <title>404: Không tìm thấy trang.</title>
      <div className="flex flex-col justify-center items-center gap-5">
        <p className="text-5xl text-foreground font-bold">404</p>
        <p className="text-2xl text-foreground font-bold">
          Không tìm thấy trang bạn tìm kiếm
        </p>
        <NextLink
          href={"/home"}
          className="text-foreground underline flex gap-2 justify-center items-center"
        >
          <span>
            <ArrowLeftFromLine />
          </span>
          <span>Trở về trang chủ</span>
        </NextLink>
      </div>
    </>
  );
}
