import { Link } from "react-router";

export default function Footer() {
  return (
    <footer>
      <div className="border-t">
        <div className="container ">
          <div className="flex flex-row gap-8 justify-center mt-8">
            <div>
              <h3 className="font-semibold mb-4">TẢI ỨNG DỤNG TRỌ TỐT</h3>
              <img
                src="/google-play-store-logo.svg"
                alt="QR Code"
                width={100}
                height={100}
                className="mb-4"
              />
              <div className="space-y-2">
                <img
                  src="/apple-app-store-logo.svg"
                  alt="Google Play"
                  width={100}
                  height={100}
                  className="mb-4"
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">HỖ TRỢ KHÁCH HÀNG</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    An toàn mua bán
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Liên hệ hỗ trợ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">VỀ TRỌ TỐT</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Quy chế hoạt động sàn
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Chính sách bảo mật
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">LIÊN KẾT</h3>
              <div className="flex gap-2">
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <img
                    src="/facebook-logo.svg"
                    alt="Facebook"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </Link>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <img
                    src="/youtube-logo.svg"
                    alt="YouTube"
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-4  ">
        <p className="text-center text-gray-600 ">
          © 2025 NhaTot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
