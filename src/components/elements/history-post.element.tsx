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
import { formatDistance, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { CustomerService } from "@/services/customer.service";
import { PostResponse } from "@/services/types/post-response";
const customerService = new CustomerService();


export function HistoryPostElement() {
  const [listPostRes, setListPostRes] = useState<PostResponse[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customerService.getHistoryViewPost();
        if (response.status === 200) {
          if(response.data){
            if(response.data.data){
              setListPostRes(response.data.data as unknown as PostResponse[]);
            }
          }
        }else if (response.status === 400) {
          console.log("Lỗi khi lấy dữ liệu lịch sử xem bài viết");
        }else if (response.status === 404) {
        console.log("Không tìm thấy dữ liệu lịch sử xem bài viết");
        } else {
          console.log("Lỗi không xác định khi lấy dữ liệu lịch sử xem bài viết");
        }
    
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log("listPostRes", listPostRes);
  return (
    <>
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
    </>
  );
}
