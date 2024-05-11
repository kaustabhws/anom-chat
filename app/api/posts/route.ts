import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    
    const posts = await prisma.post.findMany({
      include: {
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!posts) {
      return NextResponse.json({ message: "No posts found" }, { status: 404 });
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.log("POST_GET_ERROR");
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
}
