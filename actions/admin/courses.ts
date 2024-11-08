"use server";
import { prisma } from "@/prisma";

export const getCourses = async () => {
  try {
    const courses = await prisma.course.findMany({});
    console.log("Courses", courses);
    return courses;
  } catch (error) {
    console.log("Error in actions/admin/courses.ts > getCourses", error);
    return [];
  }
};
