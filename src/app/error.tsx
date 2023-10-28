"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="absolute z-[9999] w-screen h-screen top-0 left-0 flex flex-col text-white bg-linear items-center justify-center gap-10">
      <h2 className="text-[32px]">Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            history.go();
          }
        }
      >
        Try again
      </button>
    </div>
  );
}
