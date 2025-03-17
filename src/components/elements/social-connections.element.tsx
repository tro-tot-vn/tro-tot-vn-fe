"use client";

import { Button } from "@/components/ui/button";

export function SocialConnections() {
  const handleConnect = (provider: string) => {
    // Implement social connection logic here
    console.log(`Connecting to ${provider}...`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Liên kết mạng xã hội</h2>
      <p className="text-gray-600 mb-6">
        Những thông tin dưới đây chỉ mang tính xác thực. Người dùng khác sẽ
        không thể thấy thông tin này.
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Facebook</h3>
          <Button
            onClick={() => handleConnect("facebook")}
            className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100"
          >
            <img src="/facebook-logo.svg" width="24" height="24" />
            Liên kết với Facebook
          </Button>
        </div>

        <div>
          <h3 className="font-medium mb-3">Google</h3>
          <Button
            onClick={() => handleConnect("google")}
            className="flex items-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-100"
          >
            <img src="/google-logo.svg" width="24" height="24" />
            Liên kết với Google
          </Button>
        </div>
      </div>
    </div>
  );
}
