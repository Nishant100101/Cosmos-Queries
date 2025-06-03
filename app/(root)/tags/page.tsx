import Link from "next/link";
import { SearchParamsProps } from "@/types";
import Filter from "@/components/shared/Filter";
import { TagFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import { getAllTags } from "@/lib/actions/tag.actions";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Pagination from "@/components/shared/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags | Cosmos Queries",
  description:
    "Browse all tags used in Cosmos Queries to discover topics and explore related questions in the community.",
  keywords: [
    "cosmos",
    "tags",
    "topics",
    "browse tags",
    "question categories",
    "community",
  ],
  authors: [{ name: "Cosmos Team" }],
  openGraph: {
    title: "Tags | Cosmos Queries",
    description:
      "Browse all tags used in Cosmos Queries to discover topics and explore related questions in the community.",
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

const page = async ({ searchParams }: SearchParamsProps) => {
  const { q, filter, page } = await searchParams;

  const result = await getAllTags({
    searchQuery: q,
    filter,
    page: page ? +page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search by tag name..."
          otherClasses="flex-1"
        />

        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-wrap gap-6">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-lg px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>

                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination pageNumber={page ? +page : 1} isNext={result.isNext} />
      </div>
    </>
  );
};

export default page;
