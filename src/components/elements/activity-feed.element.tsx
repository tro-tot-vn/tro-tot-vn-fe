import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Clock, Eye, MessageSquare } from "lucide-react"

type ActivityItem = {
  id: number
  type: "view" | "message" | "save" | "offer" | "response"
  user: {
    name: string
    avatar?: string
  }
  postTitle: string
  time: string
  status?: "pending" | "accepted" | "rejected"
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  className?: string
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "view":
        return <Eye className="h-4 w-4 text-blue-500" />
      case "message":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "save":
        return <Check className="h-4 w-4 text-purple-500" />
      case "offer":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "response":
        return <Check className="h-4 w-4 text-teal-500" />
    }
  }

  const getActivityText = (activity: ActivityItem) => {
    switch (activity.type) {
      case "view":
        return `đã xem tin đăng "${activity.postTitle}"`
      case "message":
        return `đã nhắn tin về "${activity.postTitle}"`
      case "save":
        return `đã lưu tin đăng "${activity.postTitle}"`
      case "offer":
        return `đã đưa ra đề nghị cho "${activity.postTitle}"`
      case "response":
        return `đã phản hồi tin nhắn của bạn về "${activity.postTitle}"`
    }
  }

  const getStatusBadge = (status?: ActivityItem["status"]) => {
    if (!status) return null

    switch (status) {
      case "pending":
        return <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Đang chờ</span>
      case "accepted":
        return <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Đã chấp nhận</span>
      case "rejected":
        return <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">Đã từ chối</span>
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Hoạt động gần đây</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">Chưa có hoạt động nào</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1">
                  <span className="font-medium text-sm">{activity.user.name}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
                <p className="text-sm line-clamp-1">{getActivityText(activity)}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(activity.status)}
                {getActivityIcon(activity.type)}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

