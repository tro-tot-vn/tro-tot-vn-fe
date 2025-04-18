import NoPostElement from "./no-post.element";
import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDistance, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { CustomerService } from "@/services/customer.service";
import { ListPostRes } from "@/services/types/get-list-post-by-status-reponse";
import { Button } from "../ui/button";
import { toast } from "sonner";

const customerService = new CustomerService();

export function ListSavedPost() {
  const [listPostRes, setListPostRes] = useState<ListPostRes[]>([]);
  useEffect(() => {
    customerService.getListSavedPost().then((res) => {
      if (res.status === 200) {
        if (res.data.data) {
          setListPostRes(res.data.data);
        }
      }
    });
  }, []);
  const handleDeletePost = (postId: number) => {
    customerService.deleteSavedPost(postId).then((res) => {
      if (res.status === 200) {
        toast("Xóa tin thành công");
        setListPostRes((prev) => prev.filter((post) => post.postId !== postId));
      } else if (res.status === 400) {
        if (res.data.message == "POST_NOT_SAVED") {
          toast("tin không tồn tại trong danh sách đã lưu");
        }
      } else {
        toast("Xóa tin không thành công");
      }
    });
  };
  return (
    <div>
      {listPostRes.length > 0 ? (
        <>
          <div className="grid grid-container grid-cols-1 md:grid-cols-1 gap-2 mb-4">
            {listPostRes.map((post) => {
              return (
                <Card className="overflow-hidden hover:shadow-md transition-shadow flex flex-col mt-3">
                  <CardHeader>
                    <Link
                      to={`/posts/${post.postId}/detail`}
                      key={post.postId}
                      className="grid"
                    >
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>
                        {post.description.length > 100
                          ? post.description.substring(0, 100) + "..."
                          : post.description}
                      </CardDescription>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <div className="relative"></div>
                    <div className="flex-1 flex flex-col">
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
                  <CardFooter className="flex justify-end">
                    <Button
                      onClick={() => {
                        handleDeletePost(post.postId);
                      }}
                    >
                      Xóa
                    </Button>
                  </CardFooter>
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
