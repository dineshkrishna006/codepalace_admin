"use server";
import { prisma } from "@/prisma";

export const createCourse = async (name: string, image: string) => {
  try {
    const res = await prisma.course.create({
      data: {
        name: name,
        image: image,
      },
    });
    return res;
  } catch (error) {
    console.log("Error in actions>admin>course.ts>createCourse", error);
  }
};

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

export const getCourseModules = async (course_id: string) => {
  try {
    const course = await prisma.course.findFirst({
      where: {
        course_id,
      },
      include: {
        modules: true,
      },
    });
    if (!course) return [];
    return course.modules;
  } catch (error) {
    console.log("Error in actions/admin/course.ts > getCourseModules", error);
    return [];
  }
};
