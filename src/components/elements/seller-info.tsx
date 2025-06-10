import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MessageCircle, Flag, MapPin, User } from "lucide-react";
import { Owner } from "@/services/types/get-detail-post.response";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/use-auth";
import getCurrentFileUrl from "@/utils/get-file-url";
import { Gender } from "@/services/types/value-object.enum";

export function SellerInfo({
  customerInformation,
}: {
  customerInformation: Owner;
}) {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        {/* Thông tin người bán */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-22 w-22 rounded-full border-4  border-white bg-white overflow-hidden">
              <img
                src={
                  customerInformation.avatar
                    ? getCurrentFileUrl(customerInformation.avatar)
                    : customerInformation.gender == Gender.MALE
                    ? "/male-avatar.png"
                    : "/female-avatar.jpg"
                }
                alt="Avatar"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium">
                {customerInformation.lastName +
                  " " +
                  customerInformation.firstName}
              </h3>

              {/* <div className="flex items-center gap-1 mt-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-gray-300" />
                <span className="text-sm text-gray-500 ml-1">
                  (15 đánh giá)
                </span>
              </div> */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Địa chỉ</p>
                <p className="font-medium">
                  {customerInformation.address ?? "Chưa có thông tin"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <User className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Thành viên từ</p>
                <p className="font-medium">
                  {new Date(customerInformation.joinedAt)
                    .toLocaleDateString("vi-VN", {
                      month: "long",
                      year: "numeric",
                    })
                    .replace("tháng", "Tháng")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nút liên hệ */}
        <div className="flex flex-col gap-3 min-w-[200px]">
          <Button
            className="w-full bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
            onClick={() => {
              if (auth.isAuthenticated) {
                // toast("test 123")
              } else {
                toast.error("Vui lòng đăng nhập để sử dụng tính năng này", {
                  action: {
                    label: "Đăng nhập",
                    onClick: () => {
                      navigate("/login");
                    },
                  },
                });
              }
            }}
          >
            <Phone className="h-4 w-4 mr-2" />
            {auth.isAuthenticated
              ? customerInformation.account.phone
              : customerInformation.account.phone.slice(0, -3) + "***"}
          </Button>
          <Button variant="outline" className="w-full">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat với người bán
          </Button>
          <Button
            variant="link"
            className="text-sm text-gray-500 justify-center"
          >
            <Flag className="h-4 w-4 mr-1" />
            Báo cáo tin đăng
          </Button>
        </div>
      </div>
    </Card>
  );
}
