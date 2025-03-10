import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, MessageSquare, ShoppingBag, User } from "lucide-react"
import { Link } from "react-router"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            <Link to="/" className="flex-shrink-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-E7gQnzKUfrhMNooyOzfDPOhE7qcjoO.png"
                alt="Chợ Tốt"
                width={90}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            <Button variant="ghost" className="text-sm">
              Danh mục
            </Button>

            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Input placeholder="Tìm kiếm sản phẩm trên Chợ Tốt" className="w-full pl-4 pr-10" />
                <Button
                  size="sm"
                  className="absolute right-0 top-0 h-full bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white"
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="text-sm">
                Quản lý tin
              </Button>
              <Button variant="ghost" className="text-sm">
                <User className="h-5 w-5 mr-2" />
                Đăng Lâm
              </Button>
              <Button className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white">ĐĂNG TIN</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Chợ Tốt
          </Link>
          <span className="text-muted-foreground">/</span>
          <span>Quản lý tin</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Đăng Lâm</h1>
            <Button variant="outline" size="sm">
              Gói PRO
            </Button>
            <Button variant="outline" size="sm">
              Danh sách liên hệ
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">👋 Số dư: 0</span>
            <Button variant="outline" size="icon" className="h-6 w-6">
              +
            </Button>
          </div>
        </div>

        <Tabs defaultValue="current">
          <TabsList className="w-full justify-start border-b h-auto p-0 bg-transparent">
            <TabsTrigger
              value="current"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              ĐANG HIỆN THỊ (0)
            </TabsTrigger>
            <TabsTrigger
              value="expired"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              HẾT HẠN (0)
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              BỊ TỪ CHỐI (0)
            </TabsTrigger>
            <TabsTrigger
              value="pending-payment"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              CẦN THANH TOÁN (0)
            </TabsTrigger>
            <TabsTrigger
              value="draft"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              TIN NHÁP (1)
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              CHỜ DUYỆT (0)
            </TabsTrigger>
            <TabsTrigger
              value="hidden"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ff6d0b] data-[state=active]:bg-transparent"
            >
              ĐÃ ẨN (0)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-8">
            <div className="text-center py-16">
              <img src="/placeholder.svg" alt="No listings" width={200} height={200} className="mx-auto mb-4" />
              <h2 className="text-lg font-medium mb-2">Không tìm thấy tin đăng</h2>
              <p className="text-muted-foreground mb-6">Bạn hiện tại không có tin đăng nào cho trạng thái này</p>
              <Button className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white">Đăng tin</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">TẢI ỨNG DỤNG CHỢ TỐT</h3>
              <img src="/placeholder.svg" alt="QR Code" width={120} height={120} className="mb-4" />
              <div className="space-y-2">
                <img src="/placeholder.svg" alt="App Store" width={120} height={40} className="h-10 w-auto" />
                <img src="/placeholder.svg" alt="Google Play" width={120} height={40} className="h-10 w-auto" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">HỖ TRỢ KHÁCH HÀNG</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    An toàn mua bán
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Liên hệ hỗ trợ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">VỀ CHỢ TỐT</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Quy chế hoạt động sàn
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-muted-foreground hover:text-foreground">
                    Chính sách bảo mật
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">LIÊN KẾT</h3>
              <div className="flex gap-2">
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  <img src="/placeholder.svg" alt="Facebook" width={32} height={32} className="h-8 w-8" />
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  <img src="/placeholder.svg" alt="YouTube" width={32} height={32} className="h-8 w-8" />
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-foreground">
                  <img src="/placeholder.svg" alt="LinkedIn" width={32} height={32} className="h-8 w-8" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

