"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { createCourse } from "@/actions/admin/course";
import { getCourses } from "@/actions/admin/course";

import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1),
  image: z.string(),
});
export default function Courseform() {
  const [courses, setCourses] = useState<
    {
      name: string;
      image: string | null;
      course_id: string;
    }[]
  >([]);
  useEffect(() => {
    const getData = async () => {
      const x = await getCourses();
      setCourses(x);
    };
    getData();
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const res = await createCourse(values.name, values.image);
      toast.success("Course Created successfully");
      router.push(`/${res?.course_id}`);
    } catch (error) {
      console.error("Course Creation error", error);
      toast.error("Failed to Create the course. Please try again.");
    }
  }

  return (
    <div className="min-h-screen min-w-[100vw] p-10">
      {courses.map((course) => (
        <Link
          key={course.course_id}
          className=""
          href={`/admin/courses/${course.course_id}`}
        >
          <div className="min-w-[700px] min-h-[20%] rounded-md shadow-md p-3">
            {course.name}
          </div>
        </Link>
      ))}
      <Dialog>
        <DialogTrigger>Create Course</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Course</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 max-w-3xl mx-auto py-10"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Problem ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: Web Dev..."
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={async (res) => {
                              // Do something with the response
                              // console.log("Files: ", res[0].appUrl);
                              form.setValue("image", res[0].appUrl);
                            }}
                            onUploadError={(error: Error) => {
                              // Do something with the error.
                              alert(`ERROR! ${error.message}`);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
