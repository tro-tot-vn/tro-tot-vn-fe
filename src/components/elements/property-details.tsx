import { Card } from "@/components/ui/card";
import { GetDetailPostResponse } from "@/services/types/get-detail-post.response";
import { InteriorCondition } from "@/services/types/value-object.enum";
import { MapPin, Calendar, Maximize2, Compass } from "lucide-react";

export function PropertyDetails({
  postData,
}: {
  postData: GetDetailPostResponse;
}) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Thông tin chi tiết</h2>
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-gray-500">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-gray-500">Địa chỉ</p>
                <p className="font-medium">
                  {postData.streetNumber +
                    ", " +
                    postData.street +
                    ", " +
                    postData.ward +
                    ", " +
                    postData.district +
                    ", " +
                    postData.city}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 text-gray-500">
                <Maximize2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-gray-500">Diện tích</p>
                <p className="font-medium">{postData.acreage} m²</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-gray-500">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <p className="text-gray-500">Nội thất</p>
                <p className="font-medium">
                  {postData.interiorCondition === InteriorCondition.FULL
                    ? "Có"
                    : "Không"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 text-gray-500">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-gray-500">Ngày đăng</p>
                <p className="font-medium">
                  {postData.createdAt.toLocaleDateString("vi-VN")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
