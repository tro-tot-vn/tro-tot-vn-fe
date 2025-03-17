import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight } from "lucide-react"

export function ProfileInfoForm() {
  const [formData, setFormData] = useState({
    fullName: "Đặng Lâm",
    phone: "0842943637",
    address: "",
    bio: "",
    nickname: "",
    email: "",
    gender: "",
    birthDate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement profile update logic here
    console.log("Profile update submitted:", formData)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hồ sơ cá nhân</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Họ và tên <span className="text-red-500">*</span>
            </Label>
            <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled
              className="bg-gray-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Địa chỉ</Label>
          <div className="relative">
            <Input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Địa chỉ" />
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Giới thiệu</Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Viết vài dòng giới thiệu về bạn..."
            className="min-h-[100px]"
          />
          <div className="text-right text-xs text-gray-500">Tối đa 60 từ</div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nickname">Tên gợi nhớ</Label>
          <Input
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="Tên gợi nhớ"
          />
          <div className="text-xs text-gray-500"></div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="flex-1"
            />
            <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white">
              Liên kết
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>CCCD / CMND / Hộ chiếu</Label>
          <div className="relative">
            <Input disabled placeholder="CCCD / CMND / Hộ chiếu" className="bg-gray-50" />
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Thông tin xuất hoá đơn</Label>
          <div className="relative">
            <Input disabled placeholder="Thông tin xuất hoá đơn" className="bg-gray-50" />
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="taxId">Mã số thuế</Label>
          <Input id="taxId" name="taxId" placeholder="Mã số thuế" />
        </div>

        <div className="space-y-2">
          <Label>Danh mục yêu thích</Label>
          <div className="relative">
            <Input disabled placeholder="Danh mục yêu thích" className="bg-gray-50" />
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="gender">Giới tính</Label>
            <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Ngày, tháng, năm sinh</Label>
            <Select value={formData.birthDate} onValueChange={(value) => handleSelectChange("birthDate", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Ngày, tháng, năm sinh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1990">1990</SelectItem>
                <SelectItem value="1991">1991</SelectItem>
                <SelectItem value="1992">1992</SelectItem>
                <SelectItem value="1993">1993</SelectItem>
                <SelectItem value="1994">1994</SelectItem>
                <SelectItem value="1995">1995</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="bg-gray-300 hover:bg-gray-400 text-gray-800">
          LƯU THAY ĐỔI
        </Button>
      </form>
    </div>
  )
}

