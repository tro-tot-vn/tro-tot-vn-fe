import { ArrowLeft, Home } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 min-w-screen min-h-screen justify-center items-center ">
      <div className="max-w-md  text-center ">
        <img
          src="/404_error.png"
          alt="Page not found"
          width={200}
          height={200}
          className="mx-auto mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">Không tìm thấy trang</h1>

        <p className="text-gray-600 mb-8">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Có thể đường dẫn
          không chính xác hoặc trang đã bị di chuyển.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại trang trước
          </Button>

          <Button
            className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white flex items-center gap-2"
            asChild
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              Về trang chủ
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
