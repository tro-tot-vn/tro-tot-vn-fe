"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface AreaRangeFilterProps {
  onFilterChange: (minArea: number | null, maxArea: number | null) => void
  initialMinArea?: number | null
  initialMaxArea?: number | null
}

export function AreaRangeFilter({
  onFilterChange,
  initialMinArea = null,
  initialMaxArea = null,
}: AreaRangeFilterProps) {
  const [open, setOpen] = useState(false)
  const [minArea, setMinArea] = useState<string>(initialMinArea ? initialMinArea.toString() : "")
  const [maxArea, setMaxArea] = useState<string>(initialMaxArea ? initialMaxArea.toString() : "")
  const [isFiltered, setIsFiltered] = useState(!!initialMinArea || !!initialMaxArea)

  // Update state when props change
  useEffect(() => {
    setMinArea(initialMinArea ? initialMinArea.toString() : "")
    setMaxArea(initialMaxArea ? initialMaxArea.toString() : "")
    setIsFiltered(!!initialMinArea || !!initialMaxArea)
  }, [initialMinArea, initialMaxArea])

  const handleApply = () => {
    const min = minArea ? Number.parseInt(minArea) : null
    const max = maxArea ? Number.parseInt(maxArea) : null

    onFilterChange(min, max)
    setIsFiltered(!!(min || max))
    setOpen(false)
  }

  const handleClear = () => {
    setMinArea("")
    setMaxArea("")
    onFilterChange(null, null)
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
              Diện tích: {minArea && `${minArea}m²`} - {maxArea && `${maxArea}m²`}
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
              Diện tích <ChevronRight className="h-3 w-3 ml-1" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Diện tích (m²)</h4>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Từ</label>
              <Input
                type="number"
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
                placeholder="Diện tích nhỏ nhất"
                className="text-sm"
              />
            </div>
            <div className="pt-5">-</div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Đến</label>
              <Input
                type="number"
                value={maxArea}
                onChange={(e) => setMaxArea(e.target.value)}
                placeholder="Diện tích lớn nhất"
                className="text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[15, 20, 25, 30].map((area) => (
              <Button
                key={area}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setMinArea(area.toString())
                  setMaxArea((area + 10).toString())
                }}
              >
                {area} - {area + 10}m²
              </Button>
            ))}
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
