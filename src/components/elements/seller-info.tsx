import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Phone } from "lucide-react"

export function SellerInfo() {
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <img src="/placeholder.svg?height=64&width=64" alt="Seller" width={64} height={64} className="rounded-full" />
        <div>
          <h2 className="font-bold">Hoàng Khôi</h2>
          <p className="text-sm text-gray-500">Hoạt động 3 phút trước • Phản hồi: 80%</p>
          <p className="text-sm text-gray-500">1 tin đăng • 2 tháng trên Nhà Tốt</p>
        </div>
      </div>
      <Button className="w-full mb-2 bg-green-500 hover:bg-green-600 text-white">
        <Phone className="h-4 w-4 mr-2" />
        037684 ***
      </Button>
      <Button variant="outline" className="w-full">
        Chat
      </Button>
    </Card>
  )
}

