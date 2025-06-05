import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import QuestionCard, { QuestionProps } from "@/components/cards/QuestionCard";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Pagination from "@/components/shared/Pagination";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Your Collection | Cosmos Queries",
  description:
    "View and manage all the questions and answers you've saved in your Cosmos Queries collection.",
  keywords: [
    "cosmos",
    "collection",
    "saved questions",
    "saved answers",
    "favorites",
    "community",
  ],
  authors: [{ name: "Cosmos Team" }],
  openGraph: {
    title: "Your Collection | Cosmos Queries",
    description:
      "View and manage all the questions and answers you've saved in your Cosmos Queries collection.",
    url: "",
    siteName: "Cosmos Queries",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "Cosmos Queries Preview",
      },
    ],
    type: "website",
  },
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { q, filter, page } = await searchParams;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: q,
    filter,
    page: page ? +page : 1,
  });

  return (
    <>
      <Suspense fallback={<Loading />}>
        <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar
            route="/collection"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for questions..."
            otherClasses="flex-1"
          />

          <Filter
            filters={QuestionFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>

        <div className="mt-10 flex w-full flex-col gap-6">
          {result.questions.length > 0 ? (
            result.questions.map((question: QuestionProps) => (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            ))
          ) : (
            <NoResult
              title="No Saved Questions Found"
              description="Looks like you haven’t saved any questions yet. 📝 Start exploring and save the ones that spark your interest. You never know what might inspire your next big idea! 💡"
              link="/"
              linkTitle="Explore Questions"
            />
          )}
        </div>

        <div className="mt-10">
          <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} />
        </div>
      </Suspense>
    </>
  );
}
