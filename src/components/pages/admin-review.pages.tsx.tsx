import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import adminService from "@/services/admin.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PostResponse } from "@/services/types/post-response";

export default function AdminReviewPage() {
  const [postData, setPostData] = useState<PostResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await adminService.getPost();
      console.log(result);

      if (result) {
        if (result.status === 200) {
          if (result.data) {
            if (Array.isArray(result.data)) {
              setPostData(result.data);
            }
          }
        }
      }
    };
    fetchData();
  }, []);

  console.log(postData);

  const navigation = useNavigate();
  return (
    <>
      {postData.length > 0 && (
        <div className="flex-1 flex overflow-hidden">
          <main className="h-full w-full overflow-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Bài Đăng Chờ Duyệt</h1>
              <div className="text-sm text-muted-foreground">
                Tổng cộng: {postData.length} bài đăng
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Bài Đăng Đang Chờ Duyệt</CardTitle>
              </CardHeader>
              <CardContent>
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tiêu Đề</TableHead>
                      <TableHead>Địa Chỉ</TableHead>
                      <TableHead>Giá</TableHead>
                      <TableHead>Diện Tích</TableHead>
                      <TableHead>Chủ Nhà</TableHead>
                      <TableHead>Ngày Đăng</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {postData.map((post) => (
                      <TableRow
                        key={post.postId}
                        onClick={() =>
                          navigation(
                            `/admin/posts/review-post/${post.postId}`,
                            { state: post }
                          )
                        }
                        className="cursor-pointer hover:bg-gray-200 border border-gray-100"
                      >
                        <TableCell className="font-semibold whitespace-normal break-words p-5">
                          {post.title}
                        </TableCell>
                        <TableCell className="font-medium whitespace-normal break-words">
                          {post.street} {post.ward}, {post.district},{" "}
                          {post.city}
                        </TableCell>
                        <TableCell className="font-medium whitespace-normal break-words">
                          {post.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </TableCell>
                        <TableCell className="font-medium whitespace-normal break-words">
                          {post.acreage} m²
                        </TableCell>
                        <TableCell className="font-medium whitespace-normal break-words">
                          {post.owner.firstName} {post.owner.lastName}
                        </TableCell>
                        <TableCell className="font-medium whitespace-normal break-words">
                          {post.extendedAt
                            ? new Date(post.extendedAt).toLocaleString()
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      )}
    </>
  );
}
