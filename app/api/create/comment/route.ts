import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.data.comment) {
      return new NextResponse("BAD_REQUEST", { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content: body.data.comment,
        postId: body.postId,
      },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.log("POST_CREATE_ERROR");
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
}
