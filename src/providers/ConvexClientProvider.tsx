"use client";

import { SignIn, useAuth } from "@clerk/nextjs";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { ReactNode } from "react";
import { FullScreenLoader } from "@/components/full-screen-loader";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <SignIn />
        </div>
      </Unauthenticated>
      <AuthLoading>
        <FullScreenLoader label="Authenticating..." />
      </AuthLoading>
    </ConvexProviderWithClerk>
  );
}
