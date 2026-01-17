// src/hooks/use-search-param.ts
import { parseAsString, useQueryState } from "nuqs";

export function useSearchParam(key: string) {
  return useQueryState(
    key,
    parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
  );
}

/**
 * useSearchParam Custom Hook
 *
 * A utility hook that synchronizes a React state with a URL search parameter.
 * It uses the `nuqs` library to provide a type-safe and efficient way to handle query strings.
 *
 * @param key - The name of the URL search parameter to track (e.g., 'search').
 * @returns A tuple [value, setValue] similar to useState.
 *
 * Features:
 * - default value is an empty string.
 * - `clearOnDefault: true` ensures that when the value is empty, the parameter is removed from the URL, keeping it clean.
 */
