import { HomeIcon, Ruler, DoorOpen, Bath, Compass, Thermometer, ArrowUpDown } from "lucide-react"

export function PropertyDetails() {
  const details = [
    { icon: HomeIcon, label: "Loại hình nhà ở", value: "Nhà riêng, hẻm" },
    { icon: Ruler, label: "Diện tích đất", value: "30 m²" },
    { icon: Ruler, label: "Diện tích sử dụng", value: "90 m²" },
    { icon: Ruler, label: "Giá/m²", value: "123,33 tr/m²" },
    { icon: DoorOpen, label: "Số phòng ngủ", value: "3 phòng" },
    { icon: Bath, label: "Số phòng vệ sinh", value: "2 phòng" },
    { icon: HomeIcon, label: "Tình trạng nội thất", value: "Nội thất đầy đủ" },
    { icon: Compass, label: "Hướng cửa chính", value: "Đông Bắc" },
    { icon: Thermometer, label: "Giấy tờ pháp lý", value: "Đã có sổ" },
    { icon: ArrowUpDown, label: "Chiều ngang", value: "5 m" },
    { icon: ArrowUpDown, label: "Chiều dài", value: "6 m" },
    { icon: HomeIcon, label: "Tổng số tầng", value: "2" },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {details.map((detail, index) => (
        <div key={index} className="flex items-center space-x-2">
          <detail.icon className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">{detail.label}</p>
            <p className="font-medium">{detail.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
