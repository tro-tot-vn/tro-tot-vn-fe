import { Card } from "@/components/ui/card";
import { Link } from "react-router";
import { ImageGallery } from "../elements/image-gallery";
import { PropertyDetails } from "../elements/property-details";
import { SellerInfo } from "../elements/seller-info";
import { SimilarListings } from "../elements/similar-listings";
import { SiteHeader } from "../elements/site-header";

export default function PropertyListingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <SiteHeader />

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <ImageGallery />
              <h1 className="text-2xl font-bold mt-6 mb-4">
                ACE mô giới bán hộ mình với chú chủ nhà tên hàng chỉ là chủ nhà
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>3 PN - Hướng Đông Bắc - Nhà ngõ, hẻm</span>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-orange-500">
                  3.7 tỷ
                </span>
                <span className="text-xl">123,33 triệu/m²</span>
                <span className="text-xl">30 m²</span>
                <Link to="#" className="text-blue-500 hover:underline">
                  Xem lịch sử giá
                </Link>
              </div>
              <PropertyDetails />
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Mô tả chi tiết</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="mb-2">
                    SĐT Liên hệ: 037684 ***{" "}
                    <button className="text-blue-500 hover:underline">
                      Hiện SĐT
                    </button>
                  </p>
                  <p>Tiện ích: Gần trường tiểu học</p>
                  <p>
                    Pháp lý: Sổ hồng chính chủ, cho tộp tác mua bán công chứng
                    nhanh.
                  </p>
                  {/* Add more description text here */}
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Xem trên bản đồ</h2>
                <div className="h-64 bg-gray-300 rounded-lg">
                  {/* Add map component here */}
                  <p className="text-center pt-24">Map placeholder</p>
                </div>
              </div>
            </div>
            <div>
              <SellerInfo />
              <Card className="mt-6 p-4">
                <h2 className="font-bold mb-2">Tin đăng này có phải là:</h2>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 bg-gray-100 rounded hover:bg-gray-200">
                    Nhà này còn không ạ?
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-gray-100 rounded hover:bg-gray-200">
                    Thời hạn thuê?
                  </button>
                </div>
              </Card>
            </div>
          </div>
          <SimilarListings />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">
            © 2025 NhaTot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
