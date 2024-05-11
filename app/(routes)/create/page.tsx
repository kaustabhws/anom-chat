"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  message: z.string().min(5),
});

const CreatePage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await axios.post("/api/create/post", values);
    if (res.status === 200) {
      toast.success("Posted Successfully");
      router.push(`/post/${res.data.id}`);
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="pt-20">
      <div className="flex items-center justify-center min-h-[85vh]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="w-screen">
                  <div className="w-11/12 mx-auto lg:w-3/6">
                    <FormLabel className="text-2xl font-semibold">
                      Enter your message
                    </FormLabel>
                    <FormDescription className='text-xs'>
                      Note: Once submitted, messages cannot be deleted
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        className="w-full h-40 mt-3"
                        placeholder="xx xx xx xx"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-max mx-auto">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
