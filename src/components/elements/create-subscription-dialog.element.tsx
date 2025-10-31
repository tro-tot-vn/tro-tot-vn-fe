import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import locationService from "@/services/location.service";
import { Province, District } from "@/services/types/location.types";
import { toast } from "sonner";

interface SubscriptionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: { city: string; district: string }) => void;
}

export function CreateSubscriptionDialog({
  open,
  setOpen,
  onSubmit,
}: SubscriptionDialogProps) {
  const [selectedProvince, setProvince] = useState<Province>();
  const [selectedDistrict, setDistrict] = useState<District>();
  const [listOfDistrict, setListDistrict] = useState<District[]>(
    []
  );
  const [listOfProvinces, setListProvince] = useState<Province[]>(
    []
  );

  const handleSubmit = () => {
    if (!selectedProvince || !selectedDistrict) {
      toast("Vui lòng nhập đủ địa chỉ bao gồm tỉnh và huyện", {});
      return;
    }
    onSubmit({
      city: selectedProvince.name,
      district: selectedDistrict.name,
    });
    setOpen(false);
  };
  useEffect(() => {
    const provinces = locationService.getAllProvinces();
    setListProvince(provinces);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const districts = locationService.getDistrictsByProvinceId(selectedProvince.id);
      setListDistrict(districts);
    }
  }, [selectedProvince]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chọn địa chỉ</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="items-center gap-4">
            <Label htmlFor="city">Chọn thành phố *</Label>
            <Select
              defaultValue={selectedProvince?.id ?? undefined}
              onValueChange={(value) => {
                setProvince(
                  listOfProvinces.find(
                    (province) => province.id === value
                  )
                );
                setDistrict(undefined);
                setListDistrict([]);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn thành phố" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listOfProvinces.map((province) => (
                    <SelectItem
                      key={province.id}
                      value={province.id}
                    >
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="items-center gap-4">
            <Label htmlFor="ward">Chọn quận, huyện *</Label>
            <Select
              defaultValue={selectedDistrict?.id ?? undefined}
              onValueChange={(value) => {
                setDistrict(
                  listOfDistrict.find(
                    (district) => district.id === value
                  )
                );
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn quận, huyện" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listOfDistrict.map((district) => (
                    <SelectItem
                      key={district.id}
                      onClick={() => {
                        console.log(district);
                        setDistrict(district);
                      }}
                      value={district.id}
                    >
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Lưu thay đổi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
