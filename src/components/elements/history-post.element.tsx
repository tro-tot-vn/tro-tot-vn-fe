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

// Dữ liệu mẫu cứng
const mockData = [
  {
    postId: "1",
    title: "Cho thuê căn hộ cao cấp Vinhomes Central Park",
    description:
      "Căn hộ 2PN, nội thất đầy đủ, view sông Sài Gòn, gần Landmark 81, thuận tiện di chuyển.",
    price: 15000000,
    streetNumber: "720A",
    street: "Điện Biên Phủ",
    ward: "Phường 22",
    district: "Bình Thạnh",
    city: "TP. Hồ Chí Minh",
    createdAt: new Date("2024-04-01"),
  },
  {
    postId: "2",
    title: "Nhà nguyên căn 1 trệt 1 lầu Quận 7, gần Lotte Mart",
    description:
      "Diện tích 60m², nhà sạch sẽ, thoáng mát, khu dân cư yên tĩnh, phù hợp gia đình nhỏ.",
    price: 12000000,
    streetNumber: "101",
    street: "Nguyễn Thị Thập",
    ward: "Tân Hưng",
    district: "Quận 7",
    city: "TP. Hồ Chí Minh",
    createdAt: new Date("2024-03-30"),
  },
  {
    postId: "3",
    title: "Nhà nguyên căn 1 trệt 1 lầu Quận 7, gần Lotte Mart",
    description:
      "Diện tích 60m², nhà sạch sẽ, thoáng mát, khu dân cư yên tĩnh, phù hợp gia đình nhỏ.",
    price: 12000000,
    streetNumber: "101",
    street: "Nguyễn Thị Thập",
    ward: "Tân Hưng",
    district: "Quận 7",
    city: "TP. Hồ Chí Minh",
    createdAt: new Date("2024-03-30"),
  },
  {
    postId: "4",
    title: "Nhà nguyên căn 1 trệt 1 lầu Quận 7, gần Lotte Mart",
    description:
      "Diện tích 60m², nhà sạch sẽ, thoáng mát, khu dân cư yên tĩnh, phù hợp gia đình nhỏ.",
    price: 12000000,
    streetNumber: "101",
    street: "Nguyễn Thị Thập",
    ward: "Tân Hưng",
    district: "Quận 7",
    city: "TP. Hồ Chí Minh",
    createdAt: new Date("2024-03-30"),
  },
  {
    postId: "5",
    title: "Nhà nguyên căn 1 trệt 1 lầu Quận 7, gần Lotte Mart",
    description:
      "Diện tích 60m², nhà sạch sẽ, thoáng mát, khu dân cư yên tĩnh, phù hợp gia đình nhỏ.",
    price: 12000000,
    streetNumber: "101",
    street: "Nguyễn Thị Thập",
    ward: "Tân Hưng",
    district: "Quận 7",
    city: "TP. Hồ Chí Minh",
    createdAt: new Date("2024-03-30"),
  },
];

export function HistoryPostElement() {
  const [listPostRes, setListPostRes] = useState<PostResponse[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customerService.getHistoryViewPost();
        if (response.status === 200) {
          if(response.data){
            if(response.data.data){
              setListPostRes(response.data.data);
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
