import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import locationService from "@/services/location.service"
import type { Province, District, Ward } from "@/services/types/location.types"

interface LocationFilterProps {
  onFilterChange: (city: string | null, district: string | null, ward: string | null) => void
  initialCity?: string | null
  initialDistrict?: string | null
  initialWard?: string | null
}

export function LocationFilter({
  onFilterChange,
  initialCity = null,
  initialDistrict = null,
  initialWard = null,
}: LocationFilterProps) {
  const [open, setOpen] = useState(false)
  const [selectedProvince, setProvince] = useState<Province>()
  const [selectedDistrict, setDistrict] = useState<District>()
  const [selectedWard, setWard] = useState<Ward>()
  const [listOfDistrict, setListDistrict] = useState<District[]>([])
  const [listOfWard, setListWard] = useState<Ward[]>([])
  const [listOfProvinces, setListProvince] = useState<Province[]>([])
  const [isFiltered, setIsFiltered] = useState(!!initialCity)

  // Load provinces on component mount
  useEffect(() => {
    const provinces = locationService.getAllProvinces()
    setListProvince(provinces)

        // If we have initial values, try to find the matching province
        if (initialCity) {
      const province = provinces.find((p: Province) => p.name === initialCity)
          if (province) {
            setProvince(province)
            setIsFiltered(true)
          }
        }
  }, [initialCity])

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      const districts = locationService.getDistrictsByProvinceId(selectedProvince.id)
      setListDistrict(districts)

          // If we have initial district, try to find the matching district
          if (initialDistrict) {
        const district = districts.find((d: District) => d.name === initialDistrict)
            if (district) {
              setDistrict(district)
            }
          }
    }
  }, [selectedProvince, initialDistrict])

  // Load wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      locationService
        .getWardsByDistrictId(selectedDistrict.id)
        .then((res) => {
          if (res.data.code === "SUCCESS") {
            setListWard(res.data.wards)

          // If we have initial ward, try to find the matching ward
          if (initialWard) {
              const ward = res.data.wards.find((w: Ward) => w.name === initialWard)
            if (ward) {
              setWard(ward)
              }
            }
          }
        })
        .catch((e) => {
          console.log(e)
          setListWard([])
        })
    } else {
      setListWard([])
      setWard(undefined)
    }
  }, [selectedDistrict, initialWard])

  const handleApply = () => {
    if (!selectedProvince) {
      toast("Vui lòng chọn ít nhất tỉnh/thành phố")
      return
    }

    onFilterChange(
      selectedProvince ? selectedProvince.name : null,
      selectedDistrict ? selectedDistrict.name : null,
      selectedWard ? selectedWard.name : null,
    )

    setIsFiltered(true)
    setOpen(false)
  }

  const handleClear = () => {
    setProvince(undefined)
    setDistrict(undefined)
    setWard(undefined)
    onFilterChange(null, null, null)
    setIsFiltered(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`rounded-full text-xs ${isFiltered ? "bg-[#ff6d0b]/10 border-[#ff6d0b]/50 text-[#ff6d0b]" : ""}`}
        >
          {isFiltered ? (
            <>
              Vị trí: {selectedProvince?.name || initialCity}
              {selectedDistrict?.name || initialDistrict
                ? `, ${selectedDistrict?.name || initialDistrict}`
                : ""}
              {selectedWard?.name || initialWard ? `, ${selectedWard?.name || initialWard}` : ""}
              <X
                className="h-3 w-3 ml-1"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
              />
            </>
          ) : (
            <>
              Vị trí <ChevronRight className="h-3 w-3 ml-1" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Chọn địa điểm</h4>

          <div className="space-y-3">
            <div>
              <Label htmlFor="city" className="text-xs text-gray-500 mb-1 block">
                Chọn thành phố
              </Label>
              <Select
                value={selectedProvince?.id}
                onValueChange={(value) => {
                  setProvince(listOfProvinces.find((province) => province.id === value))
                  setDistrict(undefined)
                  setWard(undefined)
                  setListDistrict([])
                  setListWard([])
                }}
              >
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder="Chọn thành phố" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {listOfProvinces.map((province) => (
                      <SelectItem key={province.id} value={province.id}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="district" className="text-xs text-gray-500 mb-1 block">
                Chọn quận, huyện
              </Label>
              <Select
                value={selectedDistrict?.id}
                onValueChange={(value) => {
                  setDistrict(listOfDistrict.find((district) => district.id === value))
                  setWard(undefined)
                }}
                disabled={!selectedProvince}
              >
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder="Chọn quận, huyện" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {listOfDistrict.map((district) => (
                      <SelectItem key={district.id} value={district.id}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ward" className="text-xs text-gray-500 mb-1 block">
                Chọn phường, xã
              </Label>
              <Select
                value={selectedWard?.id.toString()}
                onValueChange={(value) => {
                  setWard(listOfWard.find((ward) => ward.id.toString() === value))
                }}
                disabled={!selectedDistrict}
              >
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder="Chọn phường, xã" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {listOfWard.map((ward) => (
                      <SelectItem key={ward.id} value={ward.id.toString()}>
                        {ward.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" onClick={handleClear}>
              Xóa
            </Button>
            <Button size="sm" className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white" onClick={handleApply}>
              Áp dụng
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
