export default function Loading() {
  return (
    <div className="flex justify-center px-4 mt-20">
      <div className="prose dark:prose-invert animate-pulse max-w-4xl w-full">
        {/* Tiêu đề bài viết */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-6" />

        {/* Subtitle hoặc vài dòng mở đầu */}
        <div className="space-y-3 mb-10">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
        </div>

        {/* Metadata */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4" />

        {/* Nội dung markdown giả lập */}
        <div className="grid gap-3 mb-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-11/12" />
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-4/5" />
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-9/12" />
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-10/12" />
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-6/12" />
        </div>

        {/* Khối lớn như code block / ảnh / biểu đồ */}
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded w-full" />
      </div>
    </div>
  )
}
