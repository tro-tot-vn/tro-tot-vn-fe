"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MessageSquare,
  MapPin,
  Home,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { env } from "@/config/env";

// Define appointment types
type AppointmentStatus = "Pending" | "Accepted" | "Rejected" | "Cancelled";

type MultimediaFile = {
  fileId: number;
  postId: number;
  file: {
    fileId: number;
    fileCloudId: string;
    fileType: string;
    createdAt: string;
  };
};

type Owner = {
  customerId: number;
  accountId: number;
  isVerified: number;
  gender: string;
  bio: string;
  firstName: string;
  lastName: string;
  birthday: string;
  avatar: string | null;
  address: string | null;
  joinedAt: string;
};

type Post = {
  postId: number;
  ownerId: number;
  status: string;
  createdAt: string;
  title: string;
  description: string;
  price: number;
  streetNumber: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  interiorCondition: string;
  acreage: number;
  extendedAt: string;
  owner: Owner;
  multimediaFiles: MultimediaFile[];
};

type Appointment = {
  appointmentId: number;
  requesterId: number;
  postId: number;
  createdAt: string;
  status: AppointmentStatus;
  appointmentAt: string;
  post: Post;
};

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("invitations");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [actionType, setActionType] = useState<
    "accept" | "reject" | "cancel" | null
  >(null);

  // Mock user ID (in a real app, this would come from authentication)
  const currentUserId = 4;

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use the sample data
    const sampleData: Appointment[] = [
      {
        appointmentId: 7,
        requesterId: 4,
        postId: 6,
        createdAt: "2025-04-06T03:43:42.900Z",
        status: "Pending",
        appointmentAt: "2025-04-06T13:42:24.000Z",
        post: {
          postId: 6,
          ownerId: 2,
          status: "Approved",
          createdAt: "2025-04-02T08:19:34.337Z",
          title: "KÍ TÚC XÁ GIÁ RẺ SINH VIEN",
          description:
            "Trọn gói 1tr1\r\n✅Tiện ích :\r\n- Giường tầng thoáng mát, rộng rãi.\r\n- Tủ quần áo.\r\n- Máy tắm nước nóng.\r\n- Máy lạnh.\r\n- Máy giặt.\r\n- Nhà bếp tiện nghi đầy đủ dụng cụ.\r\n- Nước uống miễn phí.\r\n- Internet 120 Mbps.\r\n\r\n- Sân phơi đồ rộng rãi, dàn phơi thông minh.\r\n- Có camera an ninh,có bảo vệ.\r\n- Có người dọn vệ sinh MIỄN PHÍ.\r\n- Nhà vệ sinh với thiết bị cao cấp (vòi sen, lavabo,...), nước nóng lạnh.\r\n- Giữ xe miễn phí.\r\n✅ Chi phí sinh hoạt, ăn uống khu vực xung quanh cực dễ chịu, sát đại học Luật 200m, đại học Nguyễn Tất Thành 500m, qua quận 1 chỉ 1 phút 30s ( ngay chân cầu Khánh Hội). Bảo vệ 24/24, vệ sinh hằng ngày\r\n✅ Yêu cầu: người đi làm có lí lịch rõ ràng, công việc ổn định hoặc học sinh, sinh viên.\r\n✅ Địa chỉ: 84 Nguyễn tất thành q4 - cách đại học luật 200m, đại học nguyễn tất thành 500m.\r\n✅ Cs2 : Hẻm C4 đường Phạm Hùng ( Gần siêu thị Satra) đến gọi mình ra đón\r\n✅ Cs3-4 : 350 huỳnh tấn phát quận 7- Cách KCX Tan thuan 500m . 34 đường",
          price: 1111111,
          streetNumber: "98",
          street: "Nguyễn Tất Thành",
          ward: "Phường 13",
          district: "Quận 4",
          city: "Thành phố Hồ Chí Minh",
          latitude: null,
          longitude: null,
          interiorCondition: "Full",
          acreage: 20,
          extendedAt: "2025-04-02T08:19:34.337Z",
          owner: {
            customerId: 2,
            accountId: 2,
            isVerified: 1,
            gender: "Male",
            bio: "Môi giới nhà cừa, đất đai, phòng trọ, chung cư cho thuê.",
            firstName: "Mộng Hoàn",
            lastName: "Đỗ",
            birthday: "2001-04-20",
            avatar: null,
            address: null,
            joinedAt: "2025-04-02",
          },
          multimediaFiles: [
            {
              fileId: 119,
              postId: 6,
              file: {
                fileId: 119,
                fileCloudId: "1XcP1cTOzlqNBb3NyUDR0F_Zl2mNCsdXG",
                fileType: "Image",
                createdAt: "2025-04-05T23:46:51.570Z",
              },
            },
            {
              fileId: 120,
              postId: 6,
              file: {
                fileId: 120,
                fileCloudId: "1Vm1Io9NPQuY9N_vZLUPIZDQpDJ3_f5Yy",
                fileType: "Image",
                createdAt: "2025-04-05T23:46:51.570Z",
              },
            },
            {
              fileId: 121,
              postId: 6,
              file: {
                fileId: 121,
                fileCloudId: "1oOrXA7yBW5-7juJ-4_Gv6B9ISNqPBTfu",
                fileType: "Image",
                createdAt: "2025-04-05T23:46:51.570Z",
              },
            },
            {
              fileId: 124,
              postId: 6,
              file: {
                fileId: 124,
                fileCloudId: "13H9AoBNzKq2TPeuF6MVloQ00W53Ka11c",
                fileType: "Image",
                createdAt: "2025-04-05T23:52:21.003Z",
              },
            },
          ],
        },
      },
      {
        appointmentId: 6,
        requesterId: 4,
        postId: 5,
        createdAt: "2025-04-04T02:36:43.040Z",
        status: "Pending",
        appointmentAt: "2025-04-14T09:25:50.000Z",
        post: {
          postId: 5,
          ownerId: 2,
          status: "Approved",
          createdAt: "2025-04-02T02:48:08.313Z",
          title:
            "Sale 10% Phòng Bancon,gác, ĐỦ NT, NƯỚC NÓNG NL,LỌC NƯỚC,TH.MÁY,HẦM XE",
          description:
            "Phòng Mới Gần Chợ Hiệp thành(Nguyễn ảnh Thủ)\r\nChỉ từ: 2tr3 - 2tr5(máy lạnh thêm 300k/th)\r\n\r\n✔️ Hầm xe rộng, sân phơi, không chung chủ, không giới hạn người ở, bạn bè đến chơi thoải mái\r\n\r\nNgay: Bến xe bus Hiệp Thành, Dương Thị Mười, Nguyễn Thị Búp, Trần Thị Bảy, Tô Ký, Lê Văn Khương, Lê Thị Riêng,...\r\n\r\nLiên hệ xem phòng trực tiếp: *** (Hữu Anh)",
          price: 2000000,
          streetNumber: "90",
          street: "Nguyễn Ánh Thủ",
          ward: "Phường Hiệp Thành",
          district: "Quận 12",
          city: "Thành phố Hồ Chí Minh",
          latitude: null,
          longitude: null,
          interiorCondition: "None",
          acreage: 20,
          extendedAt: "2025-04-02T02:48:08.313Z",
          owner: {
            customerId: 2,
            accountId: 2,
            isVerified: 1,
            gender: "Male",
            bio: "Môi giới nhà cừa, đất đai, phòng trọ, chung cư cho thuê.",
            firstName: "Mộng Hoàn",
            lastName: "Đỗ",
            birthday: "2001-04-20",
            avatar: null,
            address: null,
            joinedAt: "2025-04-02",
          },
          multimediaFiles: [
            {
              fileId: 125,
              postId: 5,
              file: {
                fileId: 125,
                fileCloudId: "1Jdipb-AOvhV9ou0-v2bXqrs8T-SofYe5",
                fileType: "Image",
                createdAt: "2025-04-06T00:09:00.413Z",
              },
            },
            {
              fileId: 126,
              postId: 5,
              file: {
                fileId: 126,
                fileCloudId: "1pq3NEE6ft__SWU1fxkf8nVM2X1Wo2CR0",
                fileType: "Image",
                createdAt: "2025-04-06T00:09:00.413Z",
              },
            },
            {
              fileId: 127,
              postId: 5,
              file: {
                fileId: 127,
                fileCloudId: "1GZaHBGZh-EUQr7BQr_e3H0ErbdXX8XOM",
                fileType: "Image",
                createdAt: "2025-04-06T00:09:00.413Z",
              },
            },
          ],
        },
      },
    ];

    // Add a few more appointments with different statuses for demonstration
    const additionalAppointments: Appointment[] = [
      // A received invitation (where current user is not the requester)
      {
        ...sampleData[0],
        appointmentId: 8,
        requesterId: 2, // Someone else requested to see our property
        postId: 10,
        status: "Pending",
        appointmentAt: "2025-04-08T15:00:00.000Z",
      },
      // An accepted appointment
      {
        ...sampleData[1],
        appointmentId: 9,
        status: "Accepted",
        appointmentAt: "2025-04-10T14:30:00.000Z",
      },
      // A rejected appointment
      {
        ...sampleData[0],
        appointmentId: 10,
        status: "Rejected",
        appointmentAt: "2025-04-07T11:00:00.000Z",
      },
    ];

    setAppointments([...sampleData, ...additionalAppointments]);
    setLoading(false);
  }, []);

  // Filter appointments based on tab
  const getFilteredAppointments = () => {
    const now = new Date();

    switch (activeTab) {
      case "invitations":
        // Show pending appointments where the current user is NOT the requester
        return appointments.filter(
          (app) => app.status === "Pending" && app.requesterId !== currentUserId
        );
      case "sent":
        // Show appointments where the current user is the requester
        return appointments.filter((app) => app.requesterId === currentUserId);
      case "upcoming":
        // Show accepted appointments with future dates
        return appointments.filter(
          (app) =>
            app.status === "Accepted" && new Date(app.appointmentAt) > now
        );
      case "completed":
      default:
        return [];
    }
  };

  const filteredAppointments = getFilteredAppointments();

  // Handle appointment actions
  const handleAction = (
    appointment: Appointment,
    action: "accept" | "reject" | "cancel"
  ) => {
    setSelectedAppointment(appointment);
    setActionType(action);
    setConfirmDialogOpen(true);
  };

  const confirmAction = () => {
    if (!selectedAppointment || !actionType) return;

    // In a real app, this would be an API call
    const updatedAppointments = appointments.map((app) => {
      if (app.appointmentId === selectedAppointment.appointmentId) {
        switch (actionType) {
          case "accept":
            return { ...app, status: "Accepted" as AppointmentStatus };
          case "reject":
            return { ...app, status: "Rejected" as AppointmentStatus };
          case "cancel":
            return { ...app, status: "Cancelled" as AppointmentStatus };
          default:
            return app;
        }
      }
      return app;
    });

    setAppointments(updatedAppointments);
    setConfirmDialogOpen(false);
    setSelectedAppointment(null);
    setActionType(null);

    // Show success message
    const actionText =
      actionType === "accept"
        ? "chấp nhận"
        : actionType === "reject"
        ? "từ chối"
        : "hủy";
    alert(`Đã ${actionText} cuộc hẹn thành công!`);
  };

  // Format price to VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "HH:mm - dd/MM/yyyy", { locale: vi });
  };

  return (
    <>
      <div className="p-6">
        <Tabs
          defaultValue="invitations"
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-4 mb-6">
            <TabsTrigger value="invitations">Lời mời</TabsTrigger>
            <TabsTrigger value="sent">Đã gửi</TabsTrigger>
            <TabsTrigger value="upcoming">Sắp diễn ra</TabsTrigger>
            <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
          </TabsList>

          {/* Invitations Tab */}
          <TabsContent value="invitations">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6d0b]"></div>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Không có lời mời nào
                </h3>
                <p className="text-muted-foreground">
                  Bạn chưa nhận được lời mời xem phòng nào
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <Card
                    key={appointment.appointmentId}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/4">
                        <div className="aspect-square rounded-md overflow-hidden relative">
                          {appointment.post.multimediaFiles.length > 0 ? (
                            <img
                              src={`https://drive.google.com/uc?export=view&id=${appointment.post.multimediaFiles[0].file.fileCloudId}`}
                              alt={appointment.post.title}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Home className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg line-clamp-1">
                            {appointment.post.title}
                          </h3>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            {formatDate(appointment.appointmentAt)}
                          </Badge>
                        </div>
                        <p className="text-primary font-medium mt-1">
                          {formatPrice(appointment.post.price)}/tháng
                        </p>
                        <div className="flex items-center gap-1 text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm line-clamp-1">
                            {appointment.post.streetNumber}{" "}
                            {appointment.post.street}, {appointment.post.ward},{" "}
                            {appointment.post.district}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {appointment.post.description.replace(/\r\n/g, " ")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              Người gửi:
                            </span>{" "}
                            <span className="font-medium">
                              {appointment.post.owner.firstName}{" "}
                              {appointment.post.owner.lastName}
                            </span>
                          </p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            className="bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => handleAction(appointment, "accept")}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Đồng ý
                          </Button>
                          <Button
                            variant="outline"
                            className="text-red-500 border-red-500 hover:bg-red-50"
                            onClick={() => handleAction(appointment, "reject")}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Từ chối
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Sent Tab */}
          <TabsContent value="sent">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6d0b]"></div>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Chưa gửi lời mời nào
                </h3>
                <p className="text-muted-foreground">
                  Bạn chưa gửi lời mời xem phòng nào
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <Card
                    key={appointment.appointmentId}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/4">
                        <div className="aspect-square rounded-md overflow-hidden relative">
                          {appointment.post.multimediaFiles.length > 0 ? (
                            <img
                              src={`https://drive.google.com/uc?export=view&id=${appointment.post.multimediaFiles[0].file.fileCloudId}`}
                              alt={appointment.post.title}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Home className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg line-clamp-1">
                            {appointment.post.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`
                                    ${
                                      appointment.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : appointment.status === "Accepted"
                                        ? "bg-green-100 text-green-800"
                                        : appointment.status === "Rejected"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                                    } 
                                    hover:bg-opacity-90
                                  `}
                            >
                              {appointment.status === "Pending"
                                ? "Đang chờ"
                                : appointment.status === "Accepted"
                                ? "Đã chấp nhận"
                                : appointment.status === "Rejected"
                                ? "Đã từ chối"
                                : "Đã hủy"}
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              {formatDate(appointment.appointmentAt)}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-primary font-medium mt-1">
                          {formatPrice(appointment.post.price)}/tháng
                        </p>
                        <div className="flex items-center gap-1 text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm line-clamp-1">
                            {appointment.post.streetNumber}{" "}
                            {appointment.post.street}, {appointment.post.ward},{" "}
                            {appointment.post.district}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {appointment.post.description.replace(/\r\n/g, " ")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              Chủ nhà:
                            </span>{" "}
                            <span className="font-medium">
                              {appointment.post.owner.firstName}{" "}
                              {appointment.post.owner.lastName}
                            </span>
                          </p>
                        </div>
                        {appointment.status === "Pending" && (
                          <div className="flex gap-2 mt-4">
                            <Button
                              variant="outline"
                              className="text-red-500 border-red-500 hover:bg-red-50"
                              onClick={() =>
                                handleAction(appointment, "cancel")
                              }
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Thu hồi lời mời
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Upcoming Tab */}
          <TabsContent value="upcoming">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6d0b]"></div>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Không có cuộc hẹn sắp tới
                </h3>
                <p className="text-muted-foreground">
                  Bạn chưa có cuộc hẹn xem phòng nào sắp diễn ra
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <Card
                    key={appointment.appointmentId}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/4">
                        <div className="aspect-square rounded-md overflow-hidden relative">
                          {appointment.post.multimediaFiles.length > 0 ? (
                            <img
                              src={`${env.API_BASE_URL}/file/${appointment.post.multimediaFiles[0].fileId}`}
                              alt={appointment.post.title}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Home className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg line-clamp-1">
                            {appointment.post.title}
                          </h3>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {formatDate(appointment.appointmentAt)}
                          </Badge>
                        </div>
                        <p className="text-primary font-medium mt-1">
                          {formatPrice(appointment.post.price)}/tháng
                        </p>
                        <div className="flex items-center gap-1 text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm line-clamp-1">
                            {appointment.post.streetNumber}{" "}
                            {appointment.post.street}, {appointment.post.ward},{" "}
                            {appointment.post.district}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {appointment.post.description.replace(/\r\n/g, " ")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              {appointment.requesterId === currentUserId
                                ? "Chủ nhà:"
                                : "Người xem:"}
                            </span>{" "}
                            <span className="font-medium">
                              {appointment.post.owner.firstName}{" "}
                              {appointment.post.owner.lastName}
                            </span>
                          </p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            className="text-red-500 border-red-500 hover:bg-red-50"
                            onClick={() => handleAction(appointment, "cancel")}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Hủy cuộc hẹn
                          </Button>
                          <Button className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Nhắn tin
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff6d0b]"></div>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Không có cuộc hẹn sắp tới
                </h3>
                <p className="text-muted-foreground">
                  Bạn chưa có cuộc hẹn xem phòng nào sắp diễn ra
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <Card
                    key={appointment.appointmentId}
                    className="p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/4">
                        <div className="aspect-square rounded-md overflow-hidden relative">
                          {appointment.post.multimediaFiles.length > 0 ? (
                            <img
                              src={`${env.API_BASE_URL}/file/${appointment.post.multimediaFiles[0].fileId}`}
                              alt={appointment.post.title}
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Home className="h-12 w-12 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg line-clamp-1">
                            {appointment.post.title}
                          </h3>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {formatDate(appointment.appointmentAt)}
                          </Badge>
                        </div>
                        <p className="text-primary font-medium mt-1">
                          {formatPrice(appointment.post.price)}/tháng
                        </p>
                        <div className="flex items-center gap-1 text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm line-clamp-1">
                            {appointment.post.streetNumber}{" "}
                            {appointment.post.street}, {appointment.post.ward},{" "}
                            {appointment.post.district}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {appointment.post.description.replace(/\r\n/g, " ")}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <p className="text-sm">
                            <span className="text-muted-foreground">
                              {appointment.requesterId === currentUserId
                                ? "Chủ nhà:"
                                : "Người xem:"}
                            </span>{" "}
                            <span className="font-medium">
                              {appointment.post.owner.firstName}{" "}
                              {appointment.post.owner.lastName}
                            </span>
                          </p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            variant="outline"
                            className="text-red-500 border-red-500 hover:bg-red-50"
                            onClick={() => handleAction(appointment, "cancel")}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Hủy cuộc hẹn
                          </Button>
                          <Button className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Nhắn tin
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {actionType === "accept"
                ? "Xác nhận đồng ý"
                : actionType === "reject"
                ? "Xác nhận từ chối"
                : "Xác nhận hủy"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "accept"
                ? "Bạn có chắc chắn muốn đồng ý lời mời xem phòng này?"
                : actionType === "reject"
                ? "Bạn có chắc chắn muốn từ chối lời mời xem phòng này?"
                : actionType === "cancel" &&
                  selectedAppointment?.status === "Pending" &&
                  selectedAppointment?.requesterId === currentUserId
                ? "Bạn có chắc chắn muốn thu hồi lời mời xem phòng này?"
                : "Bạn có chắc chắn muốn hủy cuộc hẹn xem phòng này?"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedAppointment && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Thông tin cuộc hẹn:</p>
                <div className="text-sm">
                  <p>
                    <span className="text-muted-foreground">Phòng:</span>{" "}
                    {selectedAppointment.post.title}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Thời gian:</span>{" "}
                    {formatDate(selectedAppointment.appointmentAt)}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Địa chỉ:</span>{" "}
                    {selectedAppointment.post.streetNumber}{" "}
                    {selectedAppointment.post.street},{" "}
                    {selectedAppointment.post.district}
                  </p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              onClick={confirmAction}
              className={
                actionType === "accept"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }
            >
              {actionType === "accept"
                ? "Đồng ý"
                : actionType === "reject"
                ? "Từ chối"
                : actionType === "cancel" &&
                  selectedAppointment?.status === "Pending" &&
                  selectedAppointment?.requesterId === currentUserId
                ? "Thu hồi"
                : "Hủy cuộc hẹn"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
