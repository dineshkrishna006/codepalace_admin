"use client";
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
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { createDocument } from "@/actions/admin/lesson";
const formSchema = z.object({
  value: z.string().min(1),
});
export default function Documentform() {
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
      value: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      await createDocument(lesson_id, values.value);
      toast.success("Document created successfully");
      router.push(`/admin/course/${course_id}/${module_id}/${lesson_id}`);
    } catch (error) {
      console.error("Document Creation error", error);
      toast.error("Failed to created the document. Please try again.");
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
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="ex:Lists.." {...field} />
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
