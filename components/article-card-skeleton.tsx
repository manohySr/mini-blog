import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ArticleCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-48" />

      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-4/5" />
      </CardHeader>

      <CardContent className="pt-0 pb-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Skeleton className="h-5 w-24" />
      </CardFooter>
    </Card>
  );
}

interface ArticleGridSkeletonProps {
  count?: number;
}

export function ArticleGridSkeleton({ count = 6 }: ArticleGridSkeletonProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
}