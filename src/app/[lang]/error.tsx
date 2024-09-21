"use client"; // Error components must be Client Components

import { Footer, Navbar } from "@/components";
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

  const renderError = () => {
    switch (error.message) {
      case "Unauthorized":
        return <div>Unauthorized</div>;

      default:
        return <div></div>;
    }
  };

  return (
    <div className="flex flex-col text-white my-auto items-center justify-center gap-5">
      <h2 className="text-[32px]">Something went wrong!</h2>
      {/* <div>{error.message}</div>
      <div>{renderError()}</div> */}
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
