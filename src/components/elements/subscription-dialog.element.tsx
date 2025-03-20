import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock data for locations
const cities = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng"];

const districtsByCity: Record<string, string[]> = {
  "TP. Hồ Chí Minh": [
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 7",
    "Quận Bình Thạnh",
    "Quận Thủ Đức",
  ],
  "Hà Nội": [
    "Quận Ba Đình",
    "Quận Hoàn Kiếm",
    "Quận Hai Bà Trưng",
    "Quận Đống Đa",
    "Quận Cầu Giấy",
  ],
  "Đà Nẵng": [
    "Quận Hải Châu",
    "Quận Thanh Khê",
    "Quận Sơn Trà",
    "Quận Ngũ Hành Sơn",
    "Quận Liên Chiểu",
  ],
  "Cần Thơ": [
    "Quận Ninh Kiều",
    "Quận Bình Thủy",
    "Quận Cái Răng",
    "Quận Ô Môn",
    "Quận Thốt Nốt",
  ],
  "Hải Phòng": [
    "Quận Hồng Bàng",
    "Quận Ngô Quyền",
    "Quận Lê Chân",
    "Quận Hải An",
    "Quận Kiến An",
  ],
};

const wardsByDistrict: Record<string, string[]> = {
  "Quận 1": [
    "Phường Bến Nghé",
    "Phường Bến Thành",
    "Phường Cầu Kho",
    "Phường Cầu Ông Lãnh",
    "Phường Đa Kao",
  ],
  "Quận 7": [
    "Phường Tân Phong",
    "Phường Tân Thuận Đông",
    "Phường Tân Thuận Tây",
    "Phường Phú Mỹ",
    "Phường Bình Thuận",
  ],
  "Quận Bình Thạnh": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 5",
    "Phường 7",
    "Phường 11",
    "Phường 12",
  ],
  "Quận Thủ Đức": [
    "Phường Linh Trung",
    "Phường Linh Tây",
    "Phường Linh Đông",
    "Phường Bình Chiểu",
    "Phường Hiệp Bình Phước",
  ],
  "Quận 2": [
    "Phường An Phú",
    "Phường Thảo Điền",
    "Phường Bình An",
    "Phường Bình Trưng Đông",
    "Phường Bình Trưng Tây",
  ],
  "Quận 3": [
    "Phường 1",
    "Phường 2",
    "Phường 3",
    "Phường 4",
    "Phường 5",
    "Phường 9",
    "Phường 10",
  ],
};

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { city: string; district: string; ward?: string }) => void;
}

export function SubscriptionDialog({
  open,
  onOpenChange,
  onSubmit,
}: SubscriptionDialogProps) {
  const [city, setCity] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [ward, setWard] = useState<string>("");

  const handleSubmit = () => {
    if (!city || !district) return;

    onSubmit({
      city,
      district,
      ward: ward || undefined,
    });

    // Reset form
    setCity("");
    setDistrict("");
    setWard("");
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    setDistrict("");
    setWard("");
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setWard("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Đăng ký nhận tin theo khu vực</DialogTitle>
          <DialogDescription>
            Chọn khu vực bạn muốn nhận thông báo khi có tin đăng mới.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="city">
              Thành phố <span className="text-red-500">*</span>
            </Label>
            <Select value={city} onValueChange={handleCityChange}>
              <SelectTrigger id="city">
                <SelectValue placeholder="Chọn thành phố" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="district">
              Quận/Huyện <span className="text-red-500">*</span>
            </Label>
            <Select
              value={district}
              onValueChange={handleDistrictChange}
              disabled={!city}
            >
              <SelectTrigger id="district">
                <SelectValue placeholder="Chọn quận/huyện" />
              </SelectTrigger>
              <SelectContent>
                {city &&
                  districtsByCity[city]?.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ward">
              Phường/Xã{" "}
              <span className="text-gray-400 text-sm font-normal">
                (Không bắt buộc)
              </span>
            </Label>
            <Select
              value={ward}
              onValueChange={setWard}
              disabled={!district || !wardsByDistrict[district]}
            >
              <SelectTrigger id="ward">
                <SelectValue placeholder="Chọn phường/xã" />
              </SelectTrigger>
              <SelectContent>
                {district &&
                  wardsByDistrict[district]?.map((ward) => (
                    <SelectItem key={ward} value={ward}>
                      {ward}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!city || !district}
            className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
          >
            Đăng ký
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
