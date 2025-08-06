// File: apps/web/src/components/SkeletonLoader.tsx
export function SkeletonLoader() {
  return (
    <div className="w-full h-full p-4 animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-3/4 mb-6"></div>
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-16 w-16 bg-gray-700 rounded-full"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
       <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
       <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
       <div className="h-4 bg-gray-700 rounded w-2/3 mb-4"></div>
    </div>
  );
}