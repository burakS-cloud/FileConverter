// "use server";
// import db from "@/db/db";

// export async function getUser(userId: string) {
//   const data = await db.user.findUnique({ where: { id: userId } });
//   return data;
// }

// export async function createUser(data: any) {
//   try {
//     const user = await db.user.create({ data });
//     return JSON.parse(JSON.stringify(user));
//   } catch (error) {
//     console.log(error);
//   }
// }

"use server";
import db from "@/db/db";

// Define the data type for the createUser function
interface CreateUserParams {
  id: string | undefined;
  email: string;
  clerkUserId: string;
}

export async function getUser(userId: string) {
  try {
    const data = await db.user.findUnique({ where: { id: userId } });
    if (!data) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw new Error(`Failed to fetch user with ID ${userId}`);
  }
}

export async function createUser(data: CreateUserParams) {
  try {
    const user = await db.user.create({ data });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}
