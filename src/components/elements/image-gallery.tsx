"use client"

import { useState } from "react"
import { Heart, Share2 } from "lucide-react"

export function ImageGallery() {
  const [mainimg, setMainimg] = useState("/placeholder.svg?height=400&width=600")
  const thumbnails = [
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
    "/placeholder.svg?height=80&width=80",
  ]

  return (
    <div>
      <div className="relative">
        <img
          src={mainimg || "/placeholder.svg"}
          alt="Main property img"
          width={600}
          height={400}
          className="w-full h-[400px] object-cover rounded-lg"
        />
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white p-2 rounded-full shadow-md">
            <Heart className="h-6 w-6 text-gray-600" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md">
            <Share2 className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        {thumbnails.map((thumb, index) => (
          <button key={index} onClick={() => setMainimg(thumb)} className="flex-shrink-0">
            <img
              src={thumb || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

