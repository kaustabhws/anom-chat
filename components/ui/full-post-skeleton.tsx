import { Skeleton } from "./skeleton";

const FullPostSkeleton = () => {
  return (
    <div className="md:w-4/6 px-4 mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-[180px]" />
        </div>
        <Skeleton className="h-4 w-[80px]" />
      </div>
      <div className="pt-8 flex flex-col gap-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton className="h-4 w-full" key={i} />
        ))}
      </div>
    </div>
  );
};

export default FullPostSkeleton;
