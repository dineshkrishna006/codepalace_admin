"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { createModule } from "@/actions/admin/module";
import { getCourseModules } from "@/actions/admin/course";
import { useParams } from "next/navigation";

const formSchema = z.object({
  course_id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export default function CoursePage() {
  const router = useRouter();
  const params = useParams<{ course_id: string }>();
  const course_id = params.course_id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course_id: course_id!,
      name: "",
      slug: "",
    },
  });
  const [modules, setModules] = useState<
    {
      name: string;
      course_id: string;
      module_id: string;
    }[]
  >([]);

  useEffect(() => {
    if (course_id) {
      const getData = async () => {
        const x = await getCourseModules(course_id);
        setModules(x);
      };
      getData();
    }
  }, [course_id]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await createModule(
        values.course_id,
        values.name,
        values.slug,
      );
      if (res) {
        toast.success("Moduele created Successfully");
        router.push(`/admin/course/${course_id}/${res.module_id}`);
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {modules.map((module) => (
        <Link
          key={module.module_id}
          href={`/admin/course/${course_id}/${module.module_id}`}
        >
          <div className="w-[250px] h-[250px] rounded-md shadow-md p-7">
            <p>{module.name}</p>
          </div>
        </Link>
      ))}
      <Dialog>
        <DialogTrigger>Create</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Module</DialogTitle>
            <DialogDescription>
              <div className="p-8 rounded-lg border-4 bg-gray-100 shadow-lg w-[300px]">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 max-w-3xl mx-auto py-10"
                  >
                    <FormField
                      control={form.control}
                      name="course_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              disabled
                              placeholder=""
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="" type="text" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input placeholder="" type="text" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
