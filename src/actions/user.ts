"use server";
import db from "@/db/db";

export async function getUser(userId: string) {
  const data = await db.user.findUnique({ where: { id: userId } });
  return data;
}

export async function createUser(data: any) {
  try {
    const user = await db.user.create({ data });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
}
