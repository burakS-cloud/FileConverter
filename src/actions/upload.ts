"use server";
import db from "@/db/db";
import { ratelimit } from "@/server/ratelimit";
import { clerkClient } from "@clerk/nextjs/server";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Helper function to convert a ReadableStream to a Buffer
async function streamToBuffer(
  stream: ReadableStream<Uint8Array>
): Promise<Buffer> {
  const reader = stream.getReader();
  const chunks = [];
  let done = false;

  while (!done) {
    const { value, done: readDone } = await reader.read();
    if (value) {
      chunks.push(Buffer.from(value));
    }
    done = readDone;
  }

  return Buffer.concat(chunks);
}

export default async function uploadFile(
  formData: FormData,
  clerkUserId: string
) {
  console.log("Step 1: Inside uploadFile");

  const file = formData.get("file") as File;
  if (!file) {
    console.log("Step 2: No file found");
    return { error: true, message: "No file found in form data" };
  }

  const originalFileName = file.name;
  const fileStream = file.stream();
  const contentType = file.type;
  const bucketName = process.env.S3_BUCKET_NAME;

  console.log("Step 3: Validating S3 parameters");

  if (!bucketName || !originalFileName || !fileStream || !contentType) {
    console.log("Step 4: Missing required parameters");
    return {
      error: true,
      message: "Missing required parameters for file upload",
    };
  }

  const uniqueFileName = `${originalFileName}-${uuidv4()}`;

  try {
    console.log("Step 5: Checking if user exists in the database");

    const userExists = await db.user.findUnique({
      where: { clerkUserId },
    });

    if (!userExists) {
      console.log("Step 6: User not found in the database");
      return {
        error: true,
        message: `User with Clerk ID ${clerkUserId} not found`,
      };
    }

    console.log("Step 7: User exists, proceeding with rate limiting");

    const { success } = await ratelimit.limit(userExists.id);

    if (!success) {
      console.log("Step 8: Rate limiting failed");
      return { error: true, message: "Unable to process at this time" };
    }

    console.log("Step 9: Fetching user data from Clerk");

    const fullUserData = await clerkClient.users.getUser(
      userExists.clerkUserId
    );

    if (!fullUserData?.privateMetadata?.["can-upload"]) {
      console.log("Step 10: User not allowed to upload");
      return { error: true, message: "User is not allowed to upload files" };
    }

    console.log("Step 11: Starting file upload to S3");

    const fileBuffer = await streamToBuffer(fileStream);
    const params = {
      Bucket: bucketName,
      Key: uniqueFileName,
      Body: fileBuffer,
      ContentType: contentType,
    };

    const s3Response = await s3.upload(params).promise();
    console.log("Step 12: File uploaded to S3:", s3Response);

    const fileUrl = s3Response.Location;

    const newFile = await db.file.create({
      data: {
        name: originalFileName,
        url: fileUrl,
      },
    });

    console.log("Step 13: New file created:", newFile);

    await db.userFile.create({
      data: {
        userId: userExists.id,
        fileId: newFile.id,
      },
    });

    console.log("Step 14: UserFile entry created:", {
      userId: userExists.id,
      fileId: newFile.id,
    });

    return newFile;
  } catch (error) {
    console.error("Error during file upload:", error);
    return { error: true, message: "Failed to upload file" };
  }
}
