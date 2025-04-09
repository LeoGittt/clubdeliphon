import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square w-full rounded-md" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-10 w-3/4" />
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-8 w-32 mt-4" />
        </div>
        <Skeleton className="h-20 w-full" />
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-5 w-40" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full" />
          ))}
        </div>
        <div className="pt-4">
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </div>
  )
}
