import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { URLProps } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import { getJoinedDate } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/actions/user.action";
import AnswersTab from "@/components/shared/AnswersTab";
import QuestionTab from "@/components/shared/QuestionTab";
import ProfileLink from "@/components/shared/ProfileLink";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Metadata } from "next";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Profile | Cosmos Queries",
  description:
    "View and manage your profile, track your questions and answers, and engage with the Cosmos community.",
  keywords: [
    "cosmos",
    "profile",
    "user profile",
    "activity",
    "questions",
    "answers",
    "community",
  ],
  authors: [{ name: "Cosmos Team" }],
  openGraph: {
    title: "Profile | Cosmos Queries",
    description:
      "View and manage your profile, track your questions and answers, and engage with the Cosmos community.",
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

  const authData = await auth();
  const { userId: clerkId } = authData;
  const userInfo = await getUserInfo({ userId: id });

  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
          <div className="flex flex-col items-start gap-4 lg:flex-row">
            <Image
              src={userInfo?.user.picture}
              alt="profile picture"
              width={140}
              height={140}
              className="rounded-full object-cover"
            />

            <div className="mt-3">
              <h2 className="h2-bold text-dark100_light900">
                {userInfo.user.name}
              </h2>
              <p className="paragraph-regular text-dark200_light800">
                @{userInfo.user.username}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
                {userInfo.user.portfolioWebsite && (
                  <ProfileLink
                    imgUrl="/assets/icons/link.svg"
                    href={userInfo.user.portfolioWebsite}
                    title="Portfolio"
                  />
                )}

                {userInfo.user.location && (
                  <ProfileLink
                    imgUrl="/assets/icons/location.svg"
                    title={userInfo.user.location}
                  />
                )}

                <ProfileLink
                  imgUrl="/assets/icons/calendar.svg"
                  title={getJoinedDate(userInfo.user.joinedAt)}
                />
              </div>

              {userInfo.user.bio && (
                <p className="paragraph-regular text-dark400_light800 mt-8">
                  {userInfo.user.bio}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
            <SignedIn>
              {clerkId === userInfo.user.clerkId && (
                <Link href="/profile/edit">
                  <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                    Edit Profile
                  </Button>
                </Link>
              )}
            </SignedIn>
          </div>
        </div>

        <Stats
          reputation={userInfo.reputation}
          totalQuestions={userInfo.totalQuestions}
          totalAnswers={userInfo.totalAnswers}
          badges={userInfo.badgeCounts}
        />

        <div className="mt-10 flex">
          <Tabs defaultValue="top-posts" className="flex-1">
            <TabsList className="background-light800_dark400 min-h-[42px] p-1">
              <TabsTrigger
                value="top-posts"
                className="flex flex-1 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-light-500
      transition-all hover:text-primary-500
      data-[state=active]:bg-light-700
      data-[state=active]:text-primary-500 data-[state=active]:shadow-sm
      data-[state=active]:shadow-primary-500/20
      dark:text-light-400 dark:data-[state=active]:bg-dark-300"
              >
                Top Posts
              </TabsTrigger>
              <TabsTrigger
                value="answers"
                className="flex flex-1 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-light-500
      transition-all hover:text-primary-500
      data-[state=active]:bg-light-700
      data-[state=active]:text-primary-500 data-[state=active]:shadow-sm
      data-[state=active]:shadow-primary-500/20
      dark:text-light-400 dark:data-[state=active]:bg-dark-300"
              >
                Answers
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="top-posts"
              className="mt-5 flex w-full flex-col gap-6"
            >
              <QuestionTab
                searchParams={searchParams}
                userId={userInfo.user._id}
                clerkId={clerkId}
              />
            </TabsContent>

            <TabsContent value="answers" className="flex w-full flex-col gap-6">
              <AnswersTab
                searchParams={searchParams}
                userId={userInfo.user._id}
                clerkId={clerkId}
              />
            </TabsContent>
          </Tabs>
        </div>
      </Suspense>
    </>
  );
};

export default Page;
