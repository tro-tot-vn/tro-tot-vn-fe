import React, { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Image, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePickerProps {
  onImageSelect?: (file: File) => void;
  onError?: (error: string) => void;
  maxFileSize?: number;
  className?: string;
  disabled?: boolean;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageSelect,
  onError,
  maxFileSize = 5 * 1024 * 1024,
  className,
  disabled = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "Vui lòng chọn file ảnh hợp lệ";
    }

    if (file.size > maxFileSize) {
      const maxSizeMB = (maxFileSize / 1024 / 1024).toFixed(1);
      return `Ảnh quá lớn. Kích thước tối đa là ${maxSizeMB}MB`;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      return "Chỉ hỗ trợ các định dạng: JPG, PNG, GIF, WebP";
    }

    return null;
  };

  const handleImageFile = async (file: File): Promise<void> => {
    setIsLoading(true);

    const error = validateImage(file);
    if (error) {
      onError?.(error);
      setIsLoading(false);
      return;
    }

    try {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const newPreviewUrl = URL.createObjectURL(file);

      setSelectedImage(file);
      setPreviewUrl(newPreviewUrl);
      onImageSelect?.(file);
    } catch (error) {
      console.error("Error creating preview URL:", error);
      const errorMsg = "Không thể tải ảnh preview";
      onError?.(errorMsg);
    }

    setIsLoading(false);
  };

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    await handleImageFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (
    event: React.DragEvent<HTMLDivElement>
  ): Promise<void> => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      await handleImageFile(files[0]);
    }
  };

  const openImageDialog = (): void => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const clearImage = (): void => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedImage(null);
    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        multiple={false}
        disabled={disabled}
      />

      {!selectedImage ? (
        <Card
          className={cn(
            "border-2 border-dashed transition-all duration-200 cursor-pointer hover:border-primary/50",
            isDragOver && "border-primary bg-primary/5",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openImageDialog}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div
              className={cn(
                "flex items-center justify-center w-12 h-12 mb-3 rounded-full transition-colors",
                isDragOver ? "bg-primary text-primary-foreground" : "bg-muted"
              )}
            >
              <Upload className="w-6 h-6" />
            </div>

            <h3 className="mb-2 text-sm font-semibold">
              {isDragOver ? "Thả ảnh vào đây" : "Chọn avatar"}
            </h3>

            <p className="mb-3 text-xs text-muted-foreground">
              Kéo thả hoặc nhấn để chọn ảnh
            </p>

            <div className="flex flex-wrap gap-1 justify-center">
              <Badge variant="secondary" className="text-xs">
                JPG
              </Badge>
              <Badge variant="secondary" className="text-xs">
                PNG
              </Badge>
              <Badge variant="secondary" className="text-xs">
                GIF
              </Badge>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Tối đa {(maxFileSize / 1024 / 1024).toFixed(1)}MB
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              {/* Avatar preview */}
              <div className="relative">
                <img
                  src={previewUrl}
                  alt={selectedImage.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full p-0"
                  onClick={clearImage}
                  disabled={disabled}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>

              {/* File info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <FileImage className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span
                    className="text-sm font-medium truncate"
                    title={selectedImage.name}
                  >
                    {selectedImage.name}
                  </span>
                </div>

                <div className="text-xs text-muted-foreground">
                  {formatFileSize(selectedImage.size)} • {selectedImage.type}
                </div>

                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openImageDialog}
                    disabled={disabled || isLoading}
                    className="text-xs h-7"
                  >
                    <Image className="w-3 h-3 mr-1" />
                    Đổi ảnh
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="mt-2 text-center">
          <div className="inline-flex items-center px-2 py-1 text-xs bg-muted rounded-full">
            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin mr-2"></div>
            Đang xử lý...
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
