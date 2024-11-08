"use server";
import { prisma } from "@/prisma";
export const createCourse = async (name: string, image: string) => {
  try {
    await prisma.course.create({
      data: {
        name: name,
        image: image,
      },
    });
    return { success: true, res: 200 };
  } catch (error) {
    console.log("Error in actions>admin>course.ts>createCourse", error);
  }
};
