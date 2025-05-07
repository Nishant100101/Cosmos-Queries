import Link from "next/link";
import { SearchParamsProps } from "@/types";
import Filter from "@/components/shared/Filter";
import { Button } from "@/components/ui/button";
import { UserFilters } from "@/constants/filters";
import UserCard from "@/components/cards/UserCard";
import { getAllUsers } from "@/lib/actions/user.action";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Pagination from "@/components/shared/Pagination";

const page = async ({ searchParams }: SearchParamsProps) => {
  const { q, filter, page } = await searchParams;

  const result = await getAllUsers({
    searchQuery: q,
    filter,
    page: page ? +page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900"> All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search amazing minds here..."
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-wrap gap-6">
        {result.users.length > 0 ? (
          result.users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="mt-10 flex w-full flex-col items-center justify-center">
            <h2 className="h2-bold text-dark200_light900 mt-8">
              No users yet.
            </h2>
            <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
              Be the first to join and build the community! 🚀 Connect with
              others, share knowledge, and collaborate on exciting discussions.
              Your contribution makes a difference! 💡
            </p>

            <Link href="/sign-up">
              <Button className="paragraph-medium primary-gradient mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 shadow shadow-slate-500 hover:bg-primary-500 active:shadow-inner dark:bg-primary-500 dark:text-light-900 dark:shadow-slate-800">
                Join the Community
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} />
      </div>
    </>
  );
};

export default page;
