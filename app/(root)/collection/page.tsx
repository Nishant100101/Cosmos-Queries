import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import { QuestionFilters } from "@/constants/filters";
import HomeFilters from "@/components/home/HomeFilters";
import QuestionCard, { QuestionProps } from "@/components/cards/QuestionCard";
import { getSavedQuestions } from "@/lib/actions/user.action";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }
  const result = await getSavedQuestions({
    clerkId: userId,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
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

      <HomeFilters />

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
    </>
  );
}
