import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import adminService from "@/services/admin.service";
import GetStaticsResponse from "@/services/types/get-statics.response";
import { CheckCircle, Clock, Users, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

        {/* <div className="mt-6">
          <Tabs defaultValue="pending-tasks">
            <TabsList>
              <TabsTrigger value="pending-tasks">Pending Tasks</TabsTrigger>
              <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="pending-tasks" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            Listing Review: 3-bedroom apartment in District 2
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Submitted 2 hours ago
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/posts/pending/1"
                        className="text-sm text-primary hover:underline"
                      >
                        Review
                      </Link>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">
                            Listing Review: Studio apartment near university
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Submitted 3 hours ago
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/posts/pending/2"
                        className="text-sm text-primary hover:underline"
                      >
                        Review
                      </Link>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="font-medium">
                            User Report: Suspicious landlord activity
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Reported 1 hour ago
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/reports/users/1"
                        className="text-sm text-primary hover:underline"
                      >
                        Investigate
                      </Link>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="font-medium">
                            Listing Report: Inaccurate information
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Reported 4 hours ago
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/reports/posts/1"
                        className="text-sm text-primary hover:underline"
                      >
                        Investigate
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="recent-activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b pb-2">
                      <div className="flex-1">
                        <p className="font-medium">
                          Moderator Nguyen approved listing #1234
                        </p>
                        <p className="text-sm text-muted-foreground">
                          10 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 border-b pb-2">
                      <div className="flex-1">
                        <p className="font-medium">
                          Moderator Tran rejected listing #1235
                        </p>
                        <p className="text-sm text-muted-foreground">
                          25 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 border-b pb-2">
                      <div className="flex-1">
                        <p className="font-medium">
                          Admin Le created new moderator account
                        </p>
                        <p className="text-sm text-muted-foreground">
                          1 hour ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <p className="font-medium">
                          Moderator Pham resolved user report #567
                        </p>
                        <p className="text-sm text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reports Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">User Reports</p>
                        <p className="text-sm text-muted-foreground">
                          5 pending reports
                        </p>
                      </div>
                      <Link
                        to="/reports/users"
                        className="text-sm text-primary hover:underline"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Listing Reports</p>
                        <p className="text-sm text-muted-foreground">
                          8 pending reports
                        </p>
                      </div>
                      <Link
                        to="/reports/posts"
                        className="text-sm text-primary hover:underline"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Comment Reports</p>
                        <p className="text-sm text-muted-foreground">
                          3 pending reports
                        </p>
                      </div>
                      <Link
                        to="/reports/comments"
                        className="text-sm text-primary hover:underline"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div> */}
      </main>
    </div>
  ) : (
    <></>
  );
}
