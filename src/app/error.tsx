/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: <explanation> */
"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
