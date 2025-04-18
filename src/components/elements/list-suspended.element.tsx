import NoPostElement from "./no-post.element";
import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ListPostRes } from "@/services/types/get-list-post-by-status-reponse";
import { formatDistance, subDays } from "date-fns";

export function ListSuspendedPost({
  listPostRes,
}: {
  listPostRes: ListPostRes[];
}) {
  return (
    <div>
      {listPostRes.length > 0 ? (
        <>
          <div className="grid grid-container grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            {listPostRes.map((post) => {
              return (
                <Link
                  to={`/posts/${post.postId}/detail`}
                  key={post.postId}
                  className="grid"
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow flex flex-col mt-3">
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>
                        {post.description.length > 100
                          ? post.description.substring(0, 100) + "..."
                          : post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative"></div>
                      <div className="flex-1 flex flex-col">
                        {/* <h3 className="font-medium text-sm line-clamp-2 mb-2 flex-1">
                      {post.title}
                    </h3> */}
                        <div className="">
                          <p className="font-bold text-[#ff6d0b]">
                            {Number(post.price).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}{" "}
                            VND
                          </p>
                          <div className="flex flex-col  justify-start mt-2 text-xs text-gray-500">
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>
                                {post.streetNumber +
                                  ", " +
                                  post.street +
                                  ", " +
                                  post.ward +
                                  ", " +
                                  post.district +
                                  ", " +
                                  post.city}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>
                                {formatDistance(
                                  subDays(post.createdAt, 3),
                                  new Date(),
                                  { addSuffix: true }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <NoPostElement />
      )}
    </div>
  );
}
