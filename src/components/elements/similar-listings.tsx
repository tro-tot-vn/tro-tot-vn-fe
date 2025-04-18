import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MapPin } from "lucide-react"
import { Link } from "react-router"

// Mẫu dữ liệu tin đăng tương tự
const similarListings = [
  {
    id: 1,
    title: "Nhà 3 tầng mặt tiền đường Nguyễn Văn Linh",
    price: "3.5 tỷ",
    area: "35 m²",
    location: "Quận 7, TP.HCM",
    img: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Nhà phố 1 trệt 1 lầu gần chợ Phú Mỹ",
    price: "2.8 tỷ",
    area: "40 m²",
    location: "Quận 7, TP.HCM",
    img: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Nhà nguyên căn hẻm xe hơi đường Huỳnh Tấn Phát",
    price: "4.2 tỷ",
    area: "50 m²",
    location: "Quận 7, TP.HCM",
    img: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "Nhà mặt tiền đường Phạm Thế Hiển",
    price: "5.5 tỷ",
    area: "60 m²",
    location: "Quận 8, TP.HCM",
    img: "/placeholder.svg?height=200&width=300",
  },
]

export function SimilarListings() {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-6">Tin đăng tương tự</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {similarListings.map((listing) => (
          <Card key={listing.id} className="overflow-hidden">
            <Link to={`/post/${listing.id}`} className="block">
              <div className="relative">
                <div className="aspect-[4/3] relative">
                  <img src={listing.img || "/placeholder.svg"} alt={listing.title} className="object-cover" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-2 mb-2">{listing.title}</h3>
                <p className="font-bold text-[#ff6d0b]">{listing.price}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>{listing.area}</span>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{listing.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

