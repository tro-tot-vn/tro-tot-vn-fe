import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner"
import locationService from "@/services/location.service"
import type { ResultProvinceResponse, ResultDistrictResponse, ResultWardResponse } from "@/services/location.service"

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
  const [selectedProvince, setProvince] = useState<ResultProvinceResponse>()
  const [selectedDistrict, setDistrict] = useState<ResultDistrictResponse>()
  const [selectedWard, setWard] = useState<ResultWardResponse>()
  const [listOfDistrict, setListDistrict] = useState<ResultDistrictResponse[]>([])
  const [listOfWard, setListWard] = useState<ResultWardResponse[]>([])
  const [listOfProvinces, setListProvince] = useState<ResultProvinceResponse[]>([])
  const [isFiltered, setIsFiltered] = useState(!!initialCity)

  // Load provinces on component mount
  useEffect(() => {
    locationService.getAllProvinces().then((res) => {
      if (res && res.status === 200) {
        setListProvince(res.data.results)

        // If we have initial values, try to find the matching province
        if (initialCity) {
          const province = res.data.results.find((p: ResultProvinceResponse) => p.province_name === initialCity)
          if (province) {
            setProvince(province)
            setIsFiltered(true)
          }
        }
      }
    })
  }, [initialCity])

  // Load districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      locationService
        .getDistrictsByProvinceId(selectedProvince.province_id)
        .then((res) => {
          setListDistrict(res.data.results)

          // If we have initial district, try to find the matching district
          if (initialDistrict) {
            const district = res.data.results.find((d: ResultDistrictResponse) => d.district_name === initialDistrict)
            if (district) {
              setDistrict(district)
            }
          }
        })
        .catch((e) => {
          console.log(e)
          setListDistrict([])
        })
    }
  }, [selectedProvince, initialDistrict])

  // Load wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      locationService
        .getWardsByDistrictId(selectedDistrict.district_id)
        .then((res) => {
          setListWard(res.data.results)

          // If we have initial ward, try to find the matching ward
          if (initialWard) {
            const ward = res.data.results.find((w: ResultWardResponse) => w.ward_name === initialWard)
            if (ward) {
              setWard(ward)
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
      selectedProvince ? selectedProvince.province_name : null,
      selectedDistrict ? selectedDistrict.district_name : null,
      selectedWard ? selectedWard.ward_name : null,
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
              Vị trí: {selectedProvince?.province_name || initialCity}
              {selectedDistrict?.district_name || initialDistrict
                ? `, ${selectedDistrict?.district_name || initialDistrict}`
                : ""}
              {selectedWard?.ward_name || initialWard ? `, ${selectedWard?.ward_name || initialWard}` : ""}
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
                value={selectedProvince?.province_id}
                onValueChange={(value) => {
                  setProvince(listOfProvinces.find((province) => province.province_id === value))
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
                      <SelectItem key={province.province_id} value={province.province_id}>
                        {province.province_name}
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
                value={selectedDistrict?.district_id}
                onValueChange={(value) => {
                  setDistrict(listOfDistrict.find((district) => district.district_id === value))
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
                      <SelectItem key={district.district_id} value={district.district_id}>
                        {district.district_name}
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
                value={selectedWard?.ward_id}
                onValueChange={(value) => {
                  setWard(listOfWard.find((ward) => ward.ward_id === value))
                }}
                disabled={!selectedDistrict}
              >
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder="Chọn phường, xã" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {listOfWard.map((ward) => (
                      <SelectItem key={ward.ward_id} value={ward.ward_id}>
                        {ward.ward_name}
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
