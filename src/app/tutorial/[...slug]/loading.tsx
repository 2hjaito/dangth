export default function Loading() {
  return (
    <div className="p-6 animate-pulse max-w-4xl mx-auto">
      <div className="h-10 w-1/3 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>

      <div className="space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );
}
