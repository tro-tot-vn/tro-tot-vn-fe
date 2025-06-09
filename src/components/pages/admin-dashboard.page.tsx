import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import adminService from "@/services/admin.service";
import GetStaticsResponse from "@/services/types/get-statics.response";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

export default function DashboardPage() {
  const [statics, setStatistics] = useState<GetStaticsResponse>();

  useEffect(() => {
    adminService
      .getStatisticsForDashBoard()
      .then((res) => {
        if (res.status === 200 && res.data.data) {
          setStatistics(res.data.data);
        } else {
          toast.error(
            res.data.message ||
              "Có lỗi xảy ra trong quá trình lấy thông tin thống kê"
          );
        }
      })
      .catch((err) => {
        toast.error(
          err.message || "Có lỗi xảy ra trong quá trình lấy thông tin thống kê"
        );
        console.error(
          "Có lỗi xảy ra trong quá trình lấy thông tin thống kê",
          err.message
        );
      });
  }, []);
  return statics ? (
    <div className="flex flex-1">
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Tổng quan </h1>
          <div className="text-sm text-muted-foreground">
            Cập nhật lần cuối: {new Date().toLocaleString()}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tin chờ duyệt
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statics.totalPendingPost}
              </div>
              <p className="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tin đã duyệt trong tuần
              </CardTitle>
              <CheckCircle
                className="h-4 w-4 text-muted-foreground"
                color="green"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statics.totalApprovedPostInWeek}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tin đã từ chối trong tuần
              </CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" color="red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {statics.totalRejectedPostInWeek}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê bài đăng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: "Đã duyệt (tuần)",
                        value: statics.totalApprovedPostInWeek,
                        fill: "#10b981"
                      },
                      {
                        name: "Từ chối (tuần)",
                        value: statics.totalRejectedPostInWeek,
                        fill: "#ef4444"
                      }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  ) : (
    <></>
  );
}
