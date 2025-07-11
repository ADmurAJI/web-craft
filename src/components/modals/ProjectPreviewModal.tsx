"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  images: string[];
};

export const ProjectPreviewModal = ({
  isOpen,
  onClose,
  title,
  images,
}: Props) => {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        if (fullscreenIndex !== null) {
          setFullscreenIndex(null);
        } else {
          onClose();
        }
      }}
      className="fixed inset-0 z-50"
    >
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <Dialog.Panel className="relative max-w-6xl w-full rounded-2xl bg-background text-foreground shadow-lg ring-1 ring-border p-6 animate-fade-in-up">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <Dialog.Title className="text-2xl font-bold mb-6 text-center">
            {title}
          </Dialog.Title>

          <div className="grid grid-cols-3 gap-4">
            {images.map((src, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setFullscreenIndex(index)}
              >
                <Image
                  src={src}
                  alt={`Preview ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </Dialog.Panel>
      </div>

      {fullscreenIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center cursor-zoom-out"
          onClick={() => setFullscreenIndex(null)}
        >
          <div
            onClick={() => setFullscreenIndex(null)}
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center cursor-zoom-out"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90%] max-h-[90%] relative"
            >
              <Image
                src={images[fullscreenIndex]}
                alt={`Fullscreen ${fullscreenIndex + 1}`}
                width={1600}
                height={1000}
                priority
                loading="eager"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.jpg";
                }}
                className="object-contain w-full h-full animate-fade-in"
              />
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};
