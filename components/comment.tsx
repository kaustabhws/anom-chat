"use client";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import useSWR from "swr";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "lucide-react";

const FormSchema = z.object({
  comment: z.string().min(5),
});

const fetcher = async (url: any) => {
  const res = await axios.get(url);

  if (res.statusText != "OK") {
    console.log("Error fetching data");
  }

  return res.data;
};

const formatDate = (dateString: Date) => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

const Comment = ({ postId }: { postId: any }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { data, mutate, isLoading } = useSWR(
    `/api/comments?postId=${postId}`,
    fetcher
  );

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const res = await axios.post("/api/create/comment", { data, postId });
    if (res.status != 200) {
      toast.error("Something went wrong");
      console.log("Error fetching data");
    } else {
      toast.success("Comment added successfully!");
      mutate();
    }
  };

  return (
    <div className="flex flex-col gap-2 pb-10">
      <h1 className="dark:text-gray-400 text-gray-600 text-2xl font-semibold">
        Comments
      </h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="w-3/4 resize-none max-[712px]:w-full"
                    placeholder="Write a comment"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="outline" className="w-max">
            Submit
          </Button>
        </form>
      </Form>
      <div className="mt-6">
        <h1 className="text-lg font-semibold">Comments</h1>
        <div className="flex flex-col gap-10 mt-5">
          {isLoading
            ? "Loading comments..."
            : data.map((comment: any) => (
                <div className="flex flex-col gap-3" key={comment.id}>
                  <div className="flex items-center gap-2">
                    <User
                      className="w-10 h-10 rounded-full border p-2"
                      size={25}
                    />
                    <div className="flex flex-col text-sm text-gray-400">
                      <p>Anonymous User</p>
                      <p>{formatDate(comment?.createdAt)}</p>
                    </div>
                  </div>
                  <div>
                    <p>{comment?.content}</p>
                  </div>
                </div>
              ))}
          {data?.length === 0 && <p>No comments yet...</p>}
        </div>
      </div>
    </div>
  );
};

export default Comment;
