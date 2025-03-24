import type React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, VideoIcon, X } from "lucide-react";
import { Link } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

export default function CreatePostPage() {
  const [imgFiles, setImgFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const locationRef = useRef(null);
  const ipSelectImage = useRef<HTMLInputElement>(null);
  const ipSelectVideo = useRef<HTMLInputElement>(null);

  const onSelectImageListener = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      for (const file of e.target.files) {
        if (file.size > 1024 * 1024 * 5) {
          toast("Hình ảnh không được vượt quá 5MB", {});
          return;
        }
      }
      setImgFiles((currentFiles) => {
        if (e.target.files) {
          if (currentFiles.length + e.target.files.length <= 12) {
            return [...currentFiles, ...Array.from(e.target.files)];
          } else {
            toast("Chỉ được đăng tối đa 12 hình ảnh", {});
          }
        }
        return currentFiles;
      });
    }
  };

  const onSelectVideoListener = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      for (const file of e.target.files) {
        if (file.size > 1024 * 1024 * 25) {
          toast("Video không được vượt quá 25MB", {});
          return;
        }
      }
      setVideoFiles((current) => {
        if (e.target.files) {
          if (current.length + e.target.files.length <= 1) {
            return [...current, ...Array.from(e.target.files)];
          } else {
            toast("Chỉ được đăng tối đa 1 video", {});
          }
        }
        return current;
      });
    }
  };

  const removeImage = (index: number) => {
    setImgFiles(imgFiles.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideoFiles(videoFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Hình ảnh và Video sản phẩm</h2>
          <Link to="#" className="text-primary text-sm hover:underline">
            Xem thêm về Quy định đăng tin của Trọ Tốt
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            onClick={() => {
              ipSelectImage.current?.click();
            }}
            className="aspect-video flex flex-col items-center justify-center p-6 border-dashed border-2 cursor-pointer hover:bg-muted/50"
          >
            <Camera className="w-12 h-12 text-muted-foreground mb-2" />
            <p className="text-sm text-center text-muted-foreground">
              ĐĂNG TỐI ĐA 12 HÌNH
            </p>
            <p className="text-xs text-center text-muted-foreground mt-1">
              {imgFiles.length}/12 hình ảnh
            </p>
          </Card>
          <Input
            type="file"
            ref={ipSelectImage}
            accept="image/*"
            multiple
            onChange={onSelectImageListener}
            className="hidden"
          />
          <Card
            onClick={() => {
              ipSelectVideo.current?.click();
            }}
            className="aspect-video flex flex-col items-center justify-center p-6 border-dashed border-2 cursor-pointer hover:bg-muted/50"
          >
            <VideoIcon className="w-12 h-12 text-muted-foreground mb-2" />
            <p className="text-sm text-center text-muted-foreground">
              ĐĂNG TỐI ĐA 01 VIDEO
            </p>
            <p className="text-xs text-center text-muted-foreground mt-1">
              {videoFiles.length}/1 video
            </p>
          </Card>
          <Input
            type="file"
            accept="video/*"
            ref={ipSelectVideo}
            onChange={onSelectVideoListener}
            className="hidden"
          />
        </div>

        {/* Image Preview */}
        {imgFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Hình ảnh đã chọn</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {imgFiles.map((file, index) => (
                <div key={`img-${index}`} className="relative group">
                  <div className="aspect-square rounded-md overflow-hidden border">
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#ff6d0b] text-white text-xs py-1 text-center">
                      Ảnh bìa
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Preview */}
        {videoFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Video đã chọn</h3>
            <div className="grid grid-cols-1 gap-3">
              {videoFiles.map((file, index) => (
                <div key={`video-${index}`} className="relative group">
                  <div className="aspect-video rounded-md overflow-hidden border bg-black">
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVideo(index);
                    }}
                    className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label>Địa chỉ nhà trọ và hình ảnh</Label>
          <Input
            onClick={() => setOpen(true)}
            ref={locationRef}
            placeholder="Địa chỉ nhà trọ"
          ></Input>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger />
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Chọn địa chỉ</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="items-center gap-4">
                  <Label htmlFor="city">Chọn thành phố</Label>
                  <Input id="city" value="" className="col-span-3" />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="ward">Chọn quận, huyện</Label>
                  <Input value="" className="col-span-3" />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="ward">Chọn phường, xã, thị trấn</Label>
                  <Input value="" className="col-span-3" />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="">Tên đường</Label>
                  <Input value="" className="col-span-3" />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="">Số nhà </Label>
                  <Input value="" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setOpen(false)}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Label>Tình trạng nội thất</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tình trạng nội thất" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full">Đầy đủ nội thất</SelectItem>
              <SelectItem value="Null">Nhà trống</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Diện tích & giá</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Diện tích *</Label>
              <Input placeholder="Diện tích" />
            </div>
            <div>
              <Label>Giá thuê *</Label>
              <Input placeholder="Giá thuê" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Tiêu đề tin đăng và Mô tả chi tiết</h3>
          <div>
            <Label>Tiêu đề tin đăng *</Label>
            <Input placeholder="0/70 kí tự" />
          </div>
          <div>
            <Label>Mô tả chi tiết *</Label>
            <Textarea
              placeholder="Nên mô tả: Phòng trọ, vị trí, tiện ích, diện tích, tình trạng nội thất, v.v.
Ví dụ: Phòng trọ 30m2 đường Nguyễn X, Bình Thạnh, nội thất đầy đủ."
              className="min-h-[250px]"
            />
            <p className="text-xs text-muted-foreground mt-1">0/1000 kí tự</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1">
          Xem trước
        </Button>
        <Button className="flex-1 bg-[#ff6d0b] hover:bg-[#ff6d0b]/90">
          Đăng tin
        </Button>
      </div>
    </div>
  );
}
