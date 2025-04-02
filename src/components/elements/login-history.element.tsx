"use client"

import { Button } from "@/components/ui/button"
import { Monitor } from "lucide-react"

export function LoginHistory() {
  const currentDevice = {
    type: "Linux x86_64 (Edge 134.0.0.0)",
    date: "17/03/2025",
    time: "08:58",
    location: "Ho Chi Minh City, Viet Nam",
    isCurrent: true,
  }

  const loginHistory = [
    {
      id: 1,
      type: "Windows 10.0 (Edge 133.0.0.0)",
      date: "23/02/2025",
      time: "14:38",
      location: "Ho Chi Minh City, Viet Nam",
    },
    {
      id: 2,
      type: "Windows 10.0 (Edge 131.0.0.0)",
      date: "06/01/2025",
      time: "20:13",
      location: "Thu Dau Mot, Viet Nam",
    },
  ]

  const handleLogout = (id?: number) => {
    console.log(`Logging out device ${id || "all"}`)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quản lý lịch sử đăng nhập</h2>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-4">Thiết bị hiện tại</h3>
          <div className="flex items-start gap-4 p-4 border rounded-md">
            <div className="mt-1">
              <Monitor className="h-6 w-6 text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{currentDevice.type}</p>
              <p className="text-sm text-gray-500 mt-1">
                Đăng nhập bằng SĐT lúc {currentDevice.date} - {currentDevice.time} • {currentDevice.location}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Lịch sử đăng nhập</h3>
          <div className="space-y-4">
            {loginHistory.map((device) => (
              <div key={device.id} className="flex items-start gap-4 p-4 border rounded-md">
                <div className="mt-1">
                  <Monitor className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{device.type}</p>
                    <Button variant="outline" size="sm" onClick={() => handleLogout(device.id)} className="text-sm">
                      Đăng xuất
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Đăng nhập bằng SĐT lúc {device.date} - {device.time} • {device.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-gray-600 mb-4">
            Nếu phát hiện thiết bị lạ, Trọ Tốt khuyến khích bạn{" "}
            <a href="/settings/password" className="text-blue-600 hover:underline">
              đổi mật khẩu
            </a>{" "}
            để tăng cường bảo mật tài khoản.
          </p>
          <Button onClick={() => handleLogout()} className="w-full bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white">
            Đăng xuất tất cả
          </Button>
        </div>
      </div>
    </div>
  )
}

