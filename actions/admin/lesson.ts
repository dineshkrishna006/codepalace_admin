"use server";
import { prisma } from "@/prisma";

export const getLessons = async (module_id: string) => {
  try {
    const res = await prisma.lesson.findMany({
      where: {
        module_id: module_id,
      },
      select: {
        lesson_id: true,
        name: true,
      },
    });
    return res;
  } catch (error) {
    console.log("Error occured in actions>admin>lesson.ts>getLesson", error);
  }
};

export const createLesson = async (
  module_id: string,
  name: string,
  type: string,
  priority: number,
) => {
  try {
    const res = await prisma.lesson.create({
      data: {
        module_id: module_id,

        name: name,
        type: type,
        priority: priority,
      },
    });
    return res;
  } catch (error) {
    console.log(
      "Error in creating Lesson action>admin>lesson.ts>createLesson",
      error,
    );
  }
};

export const createVideo = async (lesson_id: string, url: string) => {
  try {
    await prisma.video.create({
      data: {
        lesson_id: lesson_id,
        url: url,
      },
    });
    return { success: true, status: 200 };
  } catch (error) {
    console.log(
      "Error in inserting the videourl to the lesson actions>admin>lesson.ts>createVideo",
      error,
    );
  }
};

export const createDocument = async (lesson_id: string, value: string) => {
  try {
    await prisma.document.create({
      data: {
        lesson_id: lesson_id,
        value: value,
      },
    });
    return { success: true, status: 200 };
  } catch (error) {
    console.log(
      "Error in inserting the document value to the lesson actions>admin>lesson.ts>createDocument",
      error,
    );
  }
};
