import Link from "next/link";
import { SearchParamsProps } from "@/types";
import Filter from "@/components/shared/Filter";
import { Button } from "@/components/ui/button";
import NoResult from "@/components/shared/NoResult";
import { HomePageFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard from "@/components/cards/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Pagination from "@/components/shared/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Cosmos Queries",
  description:
    "Ask and answer the most interesting questions in the Cosmos community.",
  keywords: ["cosmos", "questions", "answers", "forum", "community"],
  authors: [{ name: "Cosmos Team" }],
  openGraph: {
    title: "Home | Cosmos Queries",
    description:
      "Ask and answer the most interesting questions in the Cosmos community.",
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

  const result = await getQuestions({
    searchQuery: q,
    filter,
    page: page ? +page : 1,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[45px] px-4 py-3 !text-light-900 shadow shadow-slate-500 active:shadow-inner dark:shadow-slate-800">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions..."
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question) => (
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
            title="There’s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} />
      </div>
    </>
  );
}
