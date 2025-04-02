import { MapPin, Clock } from "lucide-react";
import { Link } from "react-router";
import { Post } from "@/services/types/get-customer-information";

interface PostRecent {
  post: Post;
}

export function PostRecent({ post }: PostRecent) {
  return (
    <Link to={`/post/${post.postId}`}>
      <div className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col rounded-xl bg-white border border-gray-200">
        <div className="relative w-[300px] h-[150px] overflow-hidden">
          <img
            src={
              post.multimediaFiles.length > 0
                ? `http://localhost:3333/api/files/${post.multimediaFiles[0].fileId}`
                : "/default-image.png"
            }
            alt={String(post.multimediaFiles[0].fileId)}
            width={300}
            height={150}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-medium text-sm line-clamp-2 flex-1">
            {post.title}
          </h3>

          <div className="mt-auto">
            <p className="font-bold text-[#ff6d0b]">{post.price}</p>
            <div className="flex flex-col text-xs text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{post.district + "," + post.city}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
