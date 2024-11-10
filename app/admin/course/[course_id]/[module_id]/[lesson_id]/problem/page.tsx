"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createCourseQuestion } from "@/actions/admin/question";

const formSchema = z.object({
  problem_id: z.number(),
  title: z.string(),
  statement: z.string(),
  slug: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  points: z.number(),
  language: z.string(),
});

export default function MyForm() {
  const params = useParams<{
    course_id: string;
    module_id: string;
    lesson_id: string;
  }>();
  const lesson_id = params.lesson_id;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problem_id: 0,
      title: "",
      statement: "",
      difficulty: "Easy",
      slug: "",
      points: 100,
      language: "any",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createCourseQuestion({
        lesson_id,
        problem_id: values.problem_id,
        title: values.title,
        difficulty: values.difficulty,
        statement: values.statement,
        slug: values.slug,
        points: values.points,
        language: values.language,
      });
      toast.success("Video Uploaded successfully");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="p-8 rounded-lg border-4 bg-gray-100 shadow-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10"
          >
            <FormField
              control={form.control}
              name="problem_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: 100"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        if (e.target) {
                          field.onChange(e.target.valueAsNumber);
                        }
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Two Sum" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="statement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statement</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Placeholder"
                      className=""
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can @mention other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="points"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Points</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: 100"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        if (e.target) {
                          field.onChange(e.target.valueAsNumber);
                        }
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="javascript">Javascript</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="c++">C++</SelectItem>
                      <SelectItem value="go">Go</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="ex: two-sum" type="" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
