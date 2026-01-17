"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "@/constants/templates";
import { cn } from "@/lib/utils";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/helpers";

export const TemplateGallery = () => {
  const [isCreating, setIsCreating] = useState(false);
  const createDocument = useMutation(api.documents.createDocuments);
  const router = useRouter();

  const handleCreate = (values: { title: string; initialContent?: string }) => {
    setIsCreating(true);
    createDocument(values)
      .then((documentId) => {
        toast.success("Document created successfully");
        router.push(`/documents/${documentId}`);
      })
      .catch((error) => {
        const message = getErrorMessage(error, "Failed to create document");
        toast.error(message);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  return (
    <div className="bg-[#F1F3F4]">
      <div className="max-w-7xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7 pl-4"
              >
                <div
                  className={cn(
                    "aspect-3/4 flex flex-col gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50",
                  )}
                >
                  <Button
                    disabled={isCreating}
                    onClick={() =>
                      handleCreate({
                        title: template.label,
                        initialContent: "",
                      })
                    }
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="size-full hover:border-blue-500 rounded-smm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  ></Button>
                  <p className="font-medium text-sm truncate text-center">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};
