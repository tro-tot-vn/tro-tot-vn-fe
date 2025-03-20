import { Button } from "../ui/button";

export default function NoPostElement() {
  return (
    <div className="text-center py-16">
      <img
        src="/empty-frame.svg"
        alt="No posts"
        width={300}
        height={300}
        className="mx-auto mb-4"
      />
      <h2 className="text-lg font-medium mb-2">Không tìm thấy tin đăng</h2>
      <p className="text-muted-foreground mb-6">
        Bạn hiện tại không có tin đăng nào cho trạng thái này
      </p>
      <Button className="bg-[#ff6d0b] hover:bg-[#ff6d0b]/90 text-white">
        Đăng tin
      </Button>
    </div>
  );
}
