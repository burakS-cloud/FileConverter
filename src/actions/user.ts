"use server";
import db from "@/db/db";

export default async function getUser(userId: string) {
  const data = await db.user.findUnique({ where: { id: userId } });
  return data;
}
