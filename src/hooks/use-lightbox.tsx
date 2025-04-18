import { useState, useCallback } from "react";
import { Lightbox } from "@/components/elements/lightbox.element";
import { MultimediaFileDetailPost } from "@/services/types/get-detail-post.response";

export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<MultimediaFileDetailPost | null>(null);

  const openLightbox = useCallback((file: MultimediaFileDetailPost) => {
    setFile(file);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setFile(null);
  }, []);

  const LightboxComponent = useCallback(() => (
    <Lightbox isOpen={isOpen} onClose={closeLightbox} file={file} />
  ), [isOpen, closeLightbox, file]);

  return {
    openLightbox,
    closeLightbox,
    LightboxComponent,
  };
}