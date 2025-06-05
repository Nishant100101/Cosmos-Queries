import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[45px] px-4 py-3 !text-light-900 shadow shadow-slate-500 active:shadow-inner dark:shadow-slate-800">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1 rounded-lg background-light800_darkgradient" />
        <Skeleton className="h-14 w-[170px] rounded-lg background-light800_darkgradient" />
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-10 w-24 rounded-md background-light800_darkgradient"
          />
        ))}
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
