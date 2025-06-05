import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Skeleton className="background-light800_darkgradient h-[140px] w-[140px] rounded-full" />

          <div className="mt-3 space-y-3">
            <Skeleton className="background-light800_darkgradient h-7 w-48 rounded-md" />
            <Skeleton className="background-light800_darkgradient h-5 w-32 rounded-md" />

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              <Skeleton className="background-light800_darkgradient h-5 w-20 rounded-md" />
              <Skeleton className="background-light800_darkgradient h-5 w-20 rounded-md" />
              <Skeleton className="background-light800_darkgradient h-5 w-28 rounded-md" />
            </div>

            <Skeleton className="background-light800_darkgradient mt-8 h-16 w-full rounded-md" />
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <Skeleton className="background-light800_darkgradient h-[46px] w-[175px] rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Skeleton className="background-light800_darkgradient h-20 w-full rounded-xl" />
        <Skeleton className="background-light800_darkgradient h-20 w-full rounded-xl" />
        <Skeleton className="background-light800_darkgradient h-20 w-full rounded-xl" />
        <Skeleton className="background-light800_darkgradient h-20 w-full rounded-xl" />
      </div>

      <div className="mt-10 flex w-full flex-col gap-4">
        <div className="flex gap-2">
          <Skeleton className="background-light800_darkgradient h-10 w-32 rounded-lg" />
          <Skeleton className="background-light800_darkgradient h-10 w-32 rounded-lg" />
        </div>

        <div className="mt-5 space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="background-light800_darkgradient h-28 w-full rounded-xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
