"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import Link from "next/link";
import { PostSkeleton } from "./ui/post-skeleton";
import Image from "next/image";

type Post = {
  id: string;
  message: string;
  authorId?: string;
  createdAt: string;
  votes: number;
  comments: any;
};

const Posts = () => {
  const [data, setData] = useState<Post[] | null>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/posts");
      if (res.status !== 200) {
        toast.error("Failed to fetch posts");
      } else {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex items-center gap-6 justify-around flex-wrap max-[640px]:flex-col">
      {loading && [1, 2, 3, 4].map((index) => <PostSkeleton key={index} />)}
      {data ? (
        data.map((post) => (
          <Card key={post.id} className="w-2/5 max-[640px]:w-full">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between text-sm text-center font-normal max-[350px]:flex-col max-[350px]:gap-3">
                  <div className="flex items-center gap-2">
                    <User
                      className="w-10 h-10 rounded-full border p-2"
                      size={25}
                    />
                    <p className="text-gray-500 font-semibold">
                      Anonymous User
                    </p>
                  </div>
                  <p>{new Date(post.createdAt).toDateString()}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2">{post.message}</p>{" "}
              <Link href={`/post/${post.id}`}>
                <Button variant="link" className="p-0 text-gray-400">
                  Read More
                </Button>
              </Link>
            </CardContent>
            <CardFooter>
              <p>{post.comments.length} comments</p>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <Image
            src="/notfound.svg"
            alt="No posts found"
            width={300}
            height={300}
          />
          <p className="text-xl text-center">
            No posts found.{" "}
            <Link href="/create" className="text-blue-400 underline">
              Create
            </Link>{" "}
            now
          </p>
        </div>
      )}
    </div>
  );
};

export default Posts;
