import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-[56px] flex-1 rounded background-light800_darkgradient" />
        <Skeleton className="h-[56px] w-[170px] rounded background-light800_darkgradient" />
      </div>

      <div className="mt-10 flex w-full justify-center flex-wrap gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-[120px] w-full sm:w-[260px] rounded-2xl background-light800_darkgradient"
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center w-full">
        <Skeleton className="h-10 w-32 rounded background-light800_darkgradient" />
      </div>
    </div>
  );
};

export default Loading;
