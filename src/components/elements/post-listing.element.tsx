"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Clock } from "lucide-react"
import { Link } from "react-router"

interface PostListingProps {
  listing: {
    id: number
    title: string
    price: string
    location: string
    timeAgo: string
    image: string
  }
}

export function PostListing({ listing }: PostListingProps) {
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSaved(!isSaved)
  }

  return (
    <Link to={`/listing/${listing.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative">
          <img
            src={listing.image || "/placeholder.svg"}
            alt={listing.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full ${
              isSaved ? "bg-[#ff6d0b]/10 text-[#ff6d0b]" : "bg-white/80 hover:bg-white"
            }`}
            onClick={handleSave}
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-[#ff6d0b]" : ""}`} />
            <span className="sr-only">Lưu tin</span>
          </Button>
        </div>
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-medium text-sm line-clamp-2 mb-2 flex-1">{listing.title}</h3>
          <div className="mt-auto">
            <p className="font-bold text-[#ff6d0b]">{listing.price}</p>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{listing.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{listing.timeAgo}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

