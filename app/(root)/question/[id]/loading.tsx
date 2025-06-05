import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex-start w-full flex-col">
      <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex items-center justify-start gap-1">
          <Skeleton className="h-6 w-6 rounded-full background-light800_darkgradient" />
          <Skeleton className="h-5 w-20 rounded background-light800_darkgradient" />
        </div>

        <div className="flex justify-end">
          <Skeleton className="h-8 w-32 rounded background-light800_darkgradient" />
        </div>
      </div>

      <div className="mt-4 w-full space-y-2">
        <Skeleton className="h-8 w-full max-w-3xl rounded background-light800_darkgradient" />
        <Skeleton className="background-light800_darkgradient h-8 w-[80%] rounded" />
      </div>

      <div className="mb-8 mt-5 flex flex-wrap w-full gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-6 w-24 rounded background-light800_darkgradient"
          />
        ))}
      </div>

      <div className="flex flex-col space-y-3 w-full">
        <div className="space-y-2 w-full">
          <Skeleton className="background-light800_darkgradient h-6 w-full  rounded" />
          <Skeleton className="background-light800_darkgradient h-6 w-full  rounded" />
        </div>
        <Skeleton className="background-light800_darkgradient h-[125px] w-full rounded" />
        <div className="space-y-2 w-full">
          <Skeleton className="background-light800_darkgradient h-6 w-full  rounded" />
          <Skeleton className="background-light800_darkgradient h-6 w-[90%] rounded" />
        </div>
      </div>

      {[...Array(2)].map((_, i) => (
        <div className="w-full mt-11" key={i}>
          <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-center justify-start gap-1">
              <Skeleton className="h-6 w-6 rounded-full background-light800_darkgradient" />
              <Skeleton className="h-5 w-20 rounded background-light800_darkgradient" />
            </div>

            <div className="flex justify-end">
              <Skeleton className="h-8 w-32 rounded background-light800_darkgradient" />
            </div>
          </div>
          <div className="flex mb-8 mt-5 flex-col space-y-3 w-full">
            <div className="space-y-2 w-full">
              <Skeleton className="background-light800_darkgradient h-6 w-full  rounded" />
            </div>
            <Skeleton className="background-light800_darkgradient h-[125px] w-full rounded" />
            <div className="space-y-2 w-full">
              <Skeleton className="background-light800_darkgradient h-6 w-[90%] rounded" />
            </div>
          </div>
        </div>
      ))}

      <div className="mt-8 flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <Skeleton className="background-light800_darkgradient h-8 w-20 rounded" />

        <Skeleton className="background-light800_darkgradient h-8 w-48 rounded" />
      </div>
      <Skeleton className="mt-6 h-48 w-full rounded background-light800_darkgradient" />
    </div>
  );
};

export default Loading;
