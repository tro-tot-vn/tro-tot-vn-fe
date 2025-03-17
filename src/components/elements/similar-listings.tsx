import { Heart } from "lucide-react"

export function SimilarListings() {
  const posts = [
    {
      img: "/placeholder.svg?height=150&width=200",
      title: "PLB ngay ĐHVH, gần trung tâm chủ 1 đời bán nhà...",
      price: "1 tỷ",
      size: "65 triệu",
      area: "48 m²",
      location: "Phú Nhuận, Tp Hồ Chí Minh",
      time: "3 ngày trước",
    },
    // Add more similar posts here
  ]

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Tin đăng tương tự</h2>
      <div className="grid grid-cols-4 gap-6">
        {posts.map((listing, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={listing.img || "/placeholder.svg"}
                alt={listing.title}
                width={200}
                height={150}
                className="w-full h-40 object-cover"
              />
              <button className="absolute top-2 right-2 bg-white p-1 rounded-full">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm mb-2 line-clamp-2">{listing.title}</h3>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-bold text-orange-500">{listing.price}</span>
                <span>{listing.size}</span>
                <span>{listing.area}</span>
              </div>
              <p className="text-xs text-gray-500 mb-1">{listing.location}</p>
              <p className="text-xs text-gray-400">{listing.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

