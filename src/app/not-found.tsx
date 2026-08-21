import React from "react"
import Kaomoji from '@/components/Kaomoji';

export const metadata = {
  title: "404 - Không tìm thấy trang | dangth.dev",
  description:
    "Trang bạn tìm kiếm không tồn tại. Có thể đường dẫn đã thay đổi hoặc bạn nhập sai URL. Hãy quay về trang chủ để tiếp tục khám phá.",
  robots: {
    index: false,      // KHÔNG index trang lỗi
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <div className="text-center max-w-xl">
        <Kaomoji />
        <h1 className="text-3xl font-semibold mb-4 mt-[80px] dark:text-white">Lạc trôi đâu đếyyy ???</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Đừng mò nữa, ở đây không có gì ngoài sự trống vắng…
        </p>
      </div>
    </div>
  );
}
