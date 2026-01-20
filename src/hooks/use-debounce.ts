import { useCallback, useEffect, useRef } from "react";

/**
 * Custom hook that returns a debounced callback function.
 * The callback will only execute after the specified delay has passed
 * since the last invocation.
 *
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds (default: 500ms)
 * @returns A debounced version of the callback
 */
export function useDebounce<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number = 500,
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up pending timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
}
