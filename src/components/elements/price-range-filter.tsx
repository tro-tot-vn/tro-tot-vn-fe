"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface PriceRangeFilterProps {
  onFilterChange: (minPrice: number | null, maxPrice: number | null) => void
  initialMinPrice?: number | null
  initialMaxPrice?: number | null
}

export function PriceRangeFilter({ onFilterChange, initialMinPrice = null, initialMaxPrice = null }: PriceRangeFilterProps) {
  const [open, setOpen] = useState(false)
  const [minPrice, setMinPrice] = useState<string>(initialMinPrice ? initialMinPrice.toString() : "")
  const [maxPrice, setMaxPrice] = useState<string>(initialMaxPrice ? initialMaxPrice.toString() : "")
  const [isFiltered, setIsFiltered] = useState(!!initialMinPrice || !!initialMaxPrice)

  // Update state when props change
  useEffect(() => {
    setMinPrice(initialMinPrice ? initialMinPrice.toString() : "")
    setMaxPrice(initialMaxPrice ? initialMaxPrice.toString() : "")
    setIsFiltered(!!initialMinPrice || !!initialMaxPrice)
  }, [initialMinPrice, initialMaxPrice])

  const handleApply = () => {
    const min = minPrice ? Number.parseInt(minPrice) : null
    const max = maxPrice ? Number.parseInt(maxPrice) : null

    onFilterChange(min, max)
    setIsFiltered(!!(min || max))
    setOpen(false)
  }

  const handleClear = () => {
    setMinPrice("")
    setMaxPrice("")
    onFilterChange(null, null)
    setIsFiltered(false)
  }

  const formatPrice = (value: string) => {
    if (!value) return ""

    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, "")

    // Format with thousand separators
    return new Intl.NumberFormat("vi-VN").format(Number.parseInt(numericValue) || 0)
  }

  const parsePrice = (formattedValue: string) => {
    // Remove non-numeric characters
    return formattedValue.replace(/\D/g, "")
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
              Giá: {minPrice && formatPrice(minPrice)} - {maxPrice && formatPrice(maxPrice)}
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
              Giá <ChevronRight className="h-3 w-3 ml-1" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Khoảng giá (VNĐ)</h4>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Từ</label>
              <Input
                value={formatPrice(minPrice)}
                onChange={(e) => setMinPrice(parsePrice(e.target.value))}
                placeholder="Giá thấp nhất"
                className="text-sm"
              />
            </div>
            <div className="pt-5">-</div>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Đến</label>
              <Input
                value={formatPrice(maxPrice)}
                onChange={(e) => setMaxPrice(parsePrice(e.target.value))}
                placeholder="Giá cao nhất"
                className="text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 5].map((price) => (
              <Button
                key={price}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  setMinPrice((price * 1000000).toString())
                  setMaxPrice(((price + 1) * 1000000).toString())
                }}
              >
                {price}tr - {price + 1}tr
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
