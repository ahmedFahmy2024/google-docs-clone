import { ConvexError } from "convex/values";

export function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ConvexError) {
    // ConvexError.data can be a string or an object
    const data = error.data;
    if (typeof data === "string") {
      return data;
    }
    if (typeof data === "object" && data !== null && "message" in data) {
      return String((data as { message: unknown }).message);
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
