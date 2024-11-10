"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createLesson, getLessons } from "@/actions/admin/lesson";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  priority: z.number(),
});

export default function Lessons() {
  const pathname = usePathname();
  const path_ = pathname.split("/");
  const module_id = path_.pop() || "";
  const course_id = path_.pop();
  const [lessons, setLessons] = useState<{ name: string; lesson_id: string }[]>(
    [],
  );
  const router = useRouter();
  useEffect(() => {
    const fetchLessons = async () => {
      const data = await getLessons(module_id);
      if (data) setLessons(data);
    };
    fetchLessons();
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      priority: 0,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      // await createCourse(values.name, values.image);
      const created = await createLesson(
        module_id,
        values.name,
        values.type,
        values.priority,
      );
      if (created) {
        toast.success("Course Created successfully");
        if (created.type === "video") {
          router.push(
            `/admin/course/${course_id}/${module_id}/${created.lesson_id}/video`,
          );
        }
        if (created.type === "document") {
          router.push(
            `/admin/course/${course_id}/${module_id}/${created.lesson_id}/document`,
          );
        }
        if (created.type === "problem") {
          router.push(
            `/admin/course/${course_id}/${module_id}/${created.lesson_id}/problem`,
          );
        }
      }
    } catch (error) {
      console.error("Course Creation error", error);
      toast.error("Failed to Create the course. Please try again.");
    }
  }
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button>New Lesson</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Create New Lessson
            </DialogTitle>
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
                          placeholder="ex:Lists.."
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
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson Type</FormLabel>
                      <FormControl>
                        <Select
                          required
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select the type of Lesson" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="document">Document</SelectItem>
                            <SelectItem value="problem">Problem</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Problem ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex:Lists.."
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormDescription>Lesson number</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {lessons.map((lesson) => {
        return (
          <Link
            href={`/admin/course/${course_id}/${module_id}/${lesson.lesson_id}`}
            key={`${lesson.lesson_id}`}
          >
            <div className="p-2 w-[300px] bg-slate-200 my-1">{lesson.name}</div>
          </Link>
        );
      })}
    </div>
  );
}
