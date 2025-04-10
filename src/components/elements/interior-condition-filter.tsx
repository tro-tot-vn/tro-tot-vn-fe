"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface InteriorConditionFilterProps {
  onFilterChange: (interiorCondition: string | null) => void
  initialCondition?: string | null
}

export function InteriorConditionFilter({ onFilterChange, initialCondition = null }: InteriorConditionFilterProps) {
  const [open, setOpen] = useState(false)
  const [selectedCondition, setSelectedCondition] = useState<string | null>(initialCondition)
  const [isFiltered, setIsFiltered] = useState(!!initialCondition)

  // Update state when props change
  useEffect(() => {
    setSelectedCondition(initialCondition)
    setIsFiltered(!!initialCondition)
  }, [initialCondition])

  const interiorOptions = [
    { value: "Full", label: "Đầy đủ nội thất" },
    { value: "None", label: "Trống (không nội thất)" },
  ]

  const handleApply = () => {
    onFilterChange(selectedCondition)
    setIsFiltered(!!selectedCondition)
    setOpen(false)
  }

  const handleClear = () => {
    setSelectedCondition(null)
    onFilterChange(null)
    setIsFiltered(false)
  }

  const getConditionLabel = (value: string) => {
    return interiorOptions.find((option) => option.value === value)?.label || value
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
              Nội thất: {getConditionLabel(selectedCondition!)}
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
              Điều kiện nội thất <ChevronRight className="h-3 w-3 ml-1" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Tình trạng nội thất</h4>
          <RadioGroup value={selectedCondition || ""} onValueChange={setSelectedCondition}>
            {interiorOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`interior-${option.value}`} />
                <Label htmlFor={`interior-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
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
