"use client";
import { RefreshCwIcon } from "lucide-react";

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error);
  // }, [error]);

  return (
    <>
      <html className="h-screen">
        <title>Lỗi</title>
        <body className="h-screen">
          <div className="flex flex-col justify-center items-center gap-5 h-screen">
            <p className="text-2xl text-foreground font-bold">
              Đã có lỗi xảy ra
            </p>
            <button
              onClick={() => reset()}
              className="text-foreground underline flex gap-2 justify-center items-center"
            >
              <span>
                <RefreshCwIcon />
              </span>
              <span>Thử lại</span>
            </button>
          </div>
        </body>
      </html>
    </>
  );
}
