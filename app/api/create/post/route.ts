import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { message, author } = body;

    if (!message) {
      return new NextResponse("BAD_REQUEST", { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        message,
        ...(author && { author }),
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log("POST_CREATE_ERROR");
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
}
