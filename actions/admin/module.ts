"use server";
import { prisma } from "@/prisma";

export const createModule = async (
  course_id: string,
  name: string,
  slug: string,
) => {
  try {
    const res = await prisma.module.create({
      data: {
        course_id,
        name,
        slug,
      },
    });
    return res;
  } catch (error) {
    console.log("Error in actions/admin/module.ts > createModuel", error);
  }
};
