import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask a Question | Cosmos Queries",
  description:
    "Ask insightful and meaningful questions to the Cosmos community and get valuable answers.",
  keywords: ["cosmos", "ask", "questions", "community", "help", "support"],
  authors: [{ name: "Cosmos Team" }],
  openGraph: {
    title: "Ask a Question | Cosmos Queries",
    description:
      "Ask insightful and meaningful questions to the Cosmos community and get valuable answers.",
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

const Page = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>

      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
};

export default Page;
