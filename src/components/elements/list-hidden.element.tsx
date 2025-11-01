import NoPostElement from "./no-post.element";
import { Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ListPostRes } from "@/services/types/get-list-post-by-status-reponse";
import { formatDistance, subDays } from "date-fns";
import { getFileUrl } from "@/config/env";
import { Button } from "../ui/button";
import { PostService } from "@/services/post.service";
import { toast } from "sonner";
const postService = new PostService();

export function ListHiddenPost({
  listPostRes,
}: {
  listPostRes: ListPostRes[];
}) {
  const unHidePost = async (postId: number) => {
    postService.unHidePost(postId).then((res) => {
      if (res.status === 200) {
        toast.success("Hiển thị lại tin thành công");
      } else if (res.status === 400) {
        toast.error("Yêu cầu không hợp lệ");
      } else if (res.status === 404) {
        toast.error("Không tìm thấy tin đăng");
      } else if (res.status === 403) {
        toast.error("Bạn không có quyền thực hiện hành động này");
      } else if (res.status === 500) {
        toast.error("Lỗi máy chủ");
      }
    });
  };
  const nav = useNavigate();
  return (
    <div>
      {listPostRes.length > 0 ? (
        <>
          <div className="grid grid-container grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            {listPostRes.map((post) => {
              return (
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
                    <div className="relative">
                      <img
                        src={getFileUrl(post.multimediaFiles[0].fileId)}
                        alt={post.title}
                        className="w-full h-32 object-cover"
                      />
                    </div>
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
                    <div className="flex flex-col space-y-2">
                      <Button
                        onClick={() => {
                          nav(`/posts/my-posts/${post.postId}/edit`);
                        }}
                        className=" bg-[#ff6d0b] hover:bg-[#ff6d0b] text-white 
                        font-bold py-2 px-4 rounded"
                      >
                        Chỉnh sửa
                      </Button>
                      <Button
                        onClick={() => {
                          unHidePost(post.postId);
                        }}
                        className=" bg-[#ff6d0b] hover:bg-[#ff6d0b] text-white 
                        font-bold py-2 px-4 rounded"
                      >
                        Hiển thị lại tin
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
