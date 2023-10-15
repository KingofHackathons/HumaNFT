import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import OpenAI from 'openai';


export async function POST(request: NextRequest) {
    console.log("Sending POST request to ChatGPT API");

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const { messages } = await request.json();

    const chatCompletion = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
    });

    console.log(`ChatGPT reply ${chatCompletion.choices[0].message.content}`);

    return NextResponse.json(
    {
        cookies: request.cookies.getAll(),
        reply: {
            role: "assistant",
            content: chatCompletion.choices[0].message.content
        }
    },
    {
        status: 200,
    },
    );
}