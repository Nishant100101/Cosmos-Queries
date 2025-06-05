import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1 rounded-lg background-light800_darkgradient" />
        <Skeleton className="h-14 w-[170px] rounded-lg background-light800_darkgradient" />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-[170px] w-full rounded-xl background-light800_darkgradient"
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Skeleton className="h-10 w-40 rounded-md background-light800_darkgradient" />
      </div>
    </div>
  );
};

export default Loading;
