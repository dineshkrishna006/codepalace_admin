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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
});
export default function LessonPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      // const res = await createCourse(values.name, values.image);
      toast.success("Course Created successfully");
      // router.push(`/${res?.course_id}`);
    } catch (error) {
      console.error("Course Creation error", error);
      toast.error("Failed to Create the course. Please try again.");
    }
  }
  return (
    <div className="min-h-screen min-w-[100vw] p-10">
      <Dialog>
        <DialogTrigger>Create Lesson</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lesson</DialogTitle>
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
                            placeholder="Ex. Loops"
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
                        <FormLabel>Problem ID</FormLabel>
                        <FormControl>
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select type of lesson" />
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
