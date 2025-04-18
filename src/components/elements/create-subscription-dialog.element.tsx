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
import locationService, {
  ResultDistrictResponse,
  ResultProvinceResponse,
} from "@/services/location.service";
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
  const [selectedProvince, setProvince] = useState<ResultProvinceResponse>();
  const [selectedDistrict, setDistrict] = useState<ResultDistrictResponse>();
  const [listOfDistrict, setListDistrict] = useState<ResultDistrictResponse[]>(
    []
  );
  const [listOfProvinces, setListProvince] = useState<ResultProvinceResponse[]>(
    []
  );

  const handleSubmit = () => {
    if (!selectedProvince || !selectedDistrict) {
      toast("Vui lòng nhập đủ địa chỉ bao gồm tỉnh và huyện", {});
      return;
    }
    onSubmit({
      city: selectedProvince.province_name,
      district: selectedDistrict.district_name,
    });
    setOpen(false);
  };
  useEffect(() => {
    locationService.getAllProvinces().then((res) => {
      if (res) {
        if (res.status === 200) {
          setListProvince(res.data.results);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      locationService
        .getDistrictsByProvinceId(selectedProvince.province_id)
        .then((res) => {
          setListDistrict(res.data.results);
        })
        .catch((e) => {
          console.log(e);
          setListDistrict([]);
        });
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
              defaultValue={selectedProvince?.province_id ?? undefined}
              onValueChange={(value) => {
                setProvince(
                  listOfProvinces.find(
                    (province) => province.province_id === value
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
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="items-center gap-4">
            <Label htmlFor="ward">Chọn quận, huyện *</Label>
            <Select
              defaultValue={selectedDistrict?.district_id ?? undefined}
              onValueChange={(value) => {
                setDistrict(
                  listOfDistrict.find(
                    (district) => district.district_id === value
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
                      key={district.district_id}
                      onClick={() => {
                        console.log(district);
                        setDistrict(district);
                      }}
                      value={district.district_id}
                    >
                      {district.district_name}
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
