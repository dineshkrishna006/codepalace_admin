"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { createVideo } from "@/actions/admin/lesson";
const formSchema = z.object({
  video: z.string(),
});
export default function Videoform() {
  const pathname = usePathname();
  const router = useRouter();
  const path_ = pathname.split("/");
  path_.pop();
  const lesson_id = path_.pop() || "";
  const module_id = path_.pop() || "";
  const course_id = path_.pop() || "";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      video: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      // await createCourse(values.name, values.image);
      await createVideo(lesson_id, values.video);
      toast.success("Video Uploaded successfully");
      router.push(`/admin/course/${course_id}/${module_id}/${lesson_id}`);
    } catch (error) {
      console.error("Course Creation error", error);
      toast.error("Failed to Create the course. Please try again.");
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UploadButton
                    endpoint="videoUploader"
                    onClientUploadComplete={async (res) => {
                      // Do something with the response
                      // console.log("Files: ", res[0].appUrl);
                      form.setValue("video", res[0].appUrl);
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
    </div>
  );
}
