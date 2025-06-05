/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import Link from "next/link";
import Image from "next/image";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { getQuestionById } from "@/lib/actions/question.action";
import Answer from "@/components/forms/Answer";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import AllAnswers from "@/components/shared/AllAnswers";
import { Votes } from "@/components/shared/Votes";
import { URLProps } from "@/types";
import type { Metadata } from "next";
import Loading from "./loading";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Question Details | Cosmos Queries",
  description:
    "Explore the full discussion on this question, view answers, and join the conversation in the Cosmos community.",
  keywords: ["cosmos", "question", "discussion", "answers", "community", "Q&A"],
  authors: [{ name: "Cosmos Team" }],
  openGraph: {
    title: "Question Details | Cosmos Queries",
    description:
      "Explore the full discussion on this question, view answers, and join the conversation in the Cosmos community.",
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

const Page = async ({ params, searchParams }: URLProps) => {
  const { id } = await params;
  const { page, filter } = await searchParams;
  const result = await getQuestionById({ questionId: id });

  const authData = await auth();
  const { userId: clerkId } = authData;

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="flex-start w-full flex-col">
          <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
            <Link
              href={`/profile/${result.author.clerkId}`}
              className="flex items-center justify-start gap-1"
            >
              <Image
                src={result.author.picture}
                className="rounded-full"
                width={22}
                height={22}
                alt="profile"
              />
              <p className="paragraph-semibold text-dark300_light700">
                {result.author.name}
              </p>
            </Link>

            <div className="flex justify-end">
              <Votes
                type="Question"
                itemId={JSON.stringify(result._id)}
                userId={JSON.stringify(mongoUser._id)}
                upvotes={result.upvotes.length}
                hasupVoted={result.upvotes.includes(mongoUser._id)}
                downvotes={result.downvotes.length}
                hasdownVoted={result.downvotes.includes(mongoUser._id)}
                hasSaved={mongoUser?.saved.includes(result._id)}
              />
            </div>
          </div>

          <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
            {result.title}
          </h2>
        </div>

        <div className="mb-8 mt-5 flex flex-wrap gap-4">
          <Metric
            imgUrl="/assets/icons/clock.svg"
            alt="Clock icon"
            value={` asked ${getTimestamp(result.createdAt)}`}
            title=""
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="answers"
            value={formatAndDivideNumber(result.answers.length)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="eye"
            value={formatAndDivideNumber(result.views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>

        <ParseHTML data={result.content} />

        <AllAnswers
          totalAnswers={result.answers.length}
          questionId={result._id}
          userId={mongoUser._id}
          page={page}
          filter={filter}
        />

        <Answer
          question={result.content}
          questionId={JSON.stringify(result._id)}
          authorId={JSON.stringify(mongoUser._id)}
        />
      </Suspense>
    </>
  );
};

export default Page;
