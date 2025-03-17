import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Plus, RefreshCw, Share2, Zap } from "lucide-react"

interface QuickActionsProps {
  className?: string
}

export function QuickActions({ className }: QuickActionsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Thao tác nhanh</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
          <Plus className="h-5 w-5 text-[#ff6d0b]" />
          <span>Đăng tin mới</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
          <Edit className="h-5 w-5 text-blue-500" />
          <span>Chỉnh sửa tin</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
          <RefreshCw className="h-5 w-5 text-green-500" />
          <span>Làm mới tin</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <span>Đẩy tin</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2 col-span-2">
          <Share2 className="h-5 w-5 text-purple-500" />
          <span>Chia sẻ tin đăng</span>
        </Button>
      </CardContent>
    </Card>
  )
}

