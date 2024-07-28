"use server";
import db from "@/db/db";
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
  const file = formData.get("file") as File;

  if (!file) {
    return { error: true, message: "No file found in form data" };
  }

  const originalFileName = file.name;
  const fileStream = file.stream();
  const contentType = file.type;
  const bucketName = process.env.S3_BUCKET_NAME;

  console.log("Clerk User ID:", clerkUserId);

  // Check if all required parameters are defined
  if (!bucketName || !originalFileName || !fileStream || !contentType) {
    return {
      error: true,
      message: "Missing required parameters for file upload",
    };
  }

  // Append a UUID to the original file name to ensure uniqueness
  const uniqueFileName = `${originalFileName}-${uuidv4()}`;

  try {
    // Check if the user exists in the database
    const userExists = await db.user.findUnique({
      where: { clerkUserId },
    });

    if (!userExists) {
      return {
        error: true,
        message: `User with Clerk ID ${clerkUserId} not found`,
      };
    }

    // Convert the ReadableStream to a Buffer
    const fileBuffer = await streamToBuffer(fileStream);

    // Upload file to S3 with public-read ACL
    const params = {
      Bucket: bucketName,
      Key: uniqueFileName,
      Body: fileBuffer,
      ContentType: contentType,
    };

    const s3Response = await s3.upload(params).promise();
    const fileUrl = s3Response.Location;

    // Create file record in the database and associate it with the user

    console.log("userExists:", userExists);
    const newFile = await db.file.create({
      data: {
        name: uniqueFileName,
        url: fileUrl,
        users: {
          connect: { id: userExists.id },
        },
      },
    });

    console.log("newFile:", newFile);
    console.log("userExists:", userExists);

    return newFile;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return { error: true, message: "Failed to upload file" };
  }
}
