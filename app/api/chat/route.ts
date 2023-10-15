import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import OpenAI from 'openai';


export async function GET(request: NextRequest) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Say this is a test" }],
        model: "gpt-3.5-turbo",
    });


    return NextResponse.json(
    {
        body: request.body,
        path: request.nextUrl.pathname,
        query: request.nextUrl.search,
        cookies: request.cookies.getAll(),
        message: chatCompletion.choices[0].message.content
    },
    {
        status: 200,
    },
    );
}