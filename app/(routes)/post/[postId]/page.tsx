"use client";

import axios from "axios";
import { User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import CommentPage from "@/components/comment";
import FullPostSkeleton from "@/components/ui/full-post-skeleton";

const PostPage = ({ params }: { params: { postId: string } }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchPostData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/posts/${params.postId}`);
      if (res.status === 200) {
        setData(res.data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [params.postId]);

  return (
    <div className="md:w-4/6 pt-28 px-4 mx-auto">
      {loading && <FullPostSkeleton />}
      {!loading && data && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between max-[356px]:flex-col max-[356px]:gap-6">
            <div className="flex items-center gap-3">
              <User2
                size={25}
                className="w-8 h-8 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              />
              <p className="text-sm text-gray-400">
                {data.authorId === null ? "Anonymous User" : data.authorId}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">
                {format(new Date(data.createdAt), "dd/MM/yyyy hh:mm:ss a")}
              </p>
            </div>
          </div>
          <h2>{data.message}</h2>
          <div>
            <CommentPage postId={data.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;
