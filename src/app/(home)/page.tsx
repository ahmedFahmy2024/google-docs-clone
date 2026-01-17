"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Navbar } from "./_components/navbar";
import { TemplateGallery } from "./_components/template-gallery";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);

  if (documents === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top- left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>

      <div className="mt-16">
        <TemplateGallery />
      </div>
    </div>
  );
}
