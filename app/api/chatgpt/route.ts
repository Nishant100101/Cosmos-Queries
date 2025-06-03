import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (request: Request) => {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { reply: "No question provided." },
        { status: 400 }
      );
    }

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content:
            "You are a knowledgeable and friendly assistant who explains concepts clearly and concisely.",
        },
        {
          role: "user",
          content: `Please help with the following question:\n${question}`,
        },
      ],
    });

    const reply = chatCompletion.choices[0]?.message?.content;

    return NextResponse.json({ reply });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
