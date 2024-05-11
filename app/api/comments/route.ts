import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return new NextResponse("BAD_REQUEST", { status: 400 });
  }

  try {
    const comment = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.log("COMMENT_GET_ERROR");
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
}
