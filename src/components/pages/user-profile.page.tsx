import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Clock,
  MapPin,
  MessageCircle,
  LoaderCircle,
} from "lucide-react";
import { PostRecent } from "../elements/post-listing.element";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CustomerService } from "@/services/customer.service";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { GetCustomerInformationRes } from "@/services/types/get-customer-information";
import { toast } from "sonner";
import { Gender } from "@/services/types/value-object.enum";

const customerService = new CustomerService();

const formatJoinedDuration = (joinedAt: Date) => {
  const joinedDate = new Date(joinedAt);
  const now = new Date();

  let years = now.getFullYear() - joinedDate.getFullYear();
  let months = now.getMonth() - joinedDate.getMonth();
  let days = now.getDate() - joinedDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += lastMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (years >= 1) return `${years} năm`;
  if (months >= 1) return `${months} tháng`;
  return `${days} ngày`;
};

export default function CustomerProfilePage() {
  const { customerId } = useParams();

  const [customerInformation, setCustomerInformation] =
    useState<GetCustomerInformationRes | null>(null);

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      if (!Number.isNaN(Number(customerId)) && customerId) {
        console.log("Fetching customer profile...");
        try {
          const res = await customerService.getCustomerProfile(
            Number(customerId)
          );
          console.log("Customer profile response:", res);
          if (res.status === 200) {
            setCustomerInformation(res.data.data);
          } else if (res.status === 204) {
            toast.error("Không tìm thấy thông tin người dùng");
          } else if (res.status === 404) {
            toast.error("Không tìm thấy thông tin người dùng");
          }
        } catch (error) {
          toast.error("Có lỗi xảy ra trong quá trình tải thông tin người dùng");
          console.log("Error fetching customer profile:", error);
        }
      } else {
        console.error("Invalid customer ID");
      }
    };

    fetchCustomerProfile();
  }, [customerId]);

  return customerInformation ? (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <Card className="mb-6 overflow-hidden mt-7">
          <div className="p-2 md:p-6 pt-0 relative">
            {/* Avatar */}
            <div className="flex flex-col md:flex-row gap-4 items-center md:items-center -mt-8 mb-2">
              <div className="relative">
                <div className="h-22 w-22 rounded-full border-4  border-white bg-white overflow-hidden">
                  <img
                    src={
                      customerInformation.avatar ||
                      ((customerInformation.gender == Gender.FEMALE) ? "/male-avatar.png" : 
                        "/female-avatar.jpg"
                      )
                    }
                    alt="Avatar"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 max-h-full text-center md:text-left">
                <h1 className="text-xl md:text-2xl font-bold">
                  {customerInformation.firstName +
                    " " +
                    customerInformation.lastName}
                </h1>
              </div>
              <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Nhắn tin
                </Button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-3">
                {/* <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Phản hồi chat: <strong>Thỉnh thoảng</strong>
                  </span>
                </div> */}

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Đã tham gia:{" "}
                    <strong>
                      {formatJoinedDuration(customerInformation.joinedAt)}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Địa chỉ:{" "}
                    <strong>
                      {customerInformation.currentCity || customerInformation.currentDistrict
                        ? `${customerInformation.currentDistrict || ""}${customerInformation.currentDistrict && customerInformation.currentCity ? ", " : ""}${customerInformation.currentCity || ""}`
                        : "Chưa có thông tin địa chỉ"}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Giới thiệu</h3>
                <p className="text-sm text-gray-600">
                  {customerInformation.bio || "Chưa có thông tin giới thiệu"}
                </p>
                {customerInformation.currentJob && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-600">
                      Công việc:{" "}
                      <strong>
                        {customerInformation.currentJob === "Student"
                          ? "Sinh viên"
                          : customerInformation.currentJob === "Employed"
                          ? "Đã đi làm"
                          : customerInformation.currentJob}
                      </strong>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Listings */}
        <div className="w-full">
          <div className="mt-0">
            <div>
              <Label className="text-xl font-semibold mb-4">Tin gần đây</Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-4">
              {customerInformation.posts.map((post) => (
                <PostRecent key={post.postId} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <LoaderCircle className="animate-spin h-8 w-8 text-gray-500" />
    </div>
  );
}