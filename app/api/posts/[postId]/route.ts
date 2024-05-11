import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    if (!params.postId) {
      return new NextResponse("BAD_REQUEST", { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: params.postId,
      },
      include: {
        comments: true,
      },
    });

    if (!post) {
      return new NextResponse("NOT_FOUND", { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.log("POST_ID_GET_ERROR");
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
}
