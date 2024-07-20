"use server";

import db from "@/db/db";
import AWS from "aws-sdk";

// Configure the AWS SDK with the region and credentials
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

export default async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("File is required");
  }

  const originalFileName = file.name;
  const fileStream = file.stream();
  const contentType = file.type;
  const bucketName = process.env.S3_BUCKET_NAME;

  // Check if all required parameters are defined
  if (!bucketName || !originalFileName || !fileStream || !contentType) {
    throw new Error("Missing required parameters for file upload");
  }

  try {
    // Convert the ReadableStream to a Buffer
    const fileBuffer = await streamToBuffer(fileStream);

    // Upload file to S3
    const params = {
      Bucket: bucketName,
      Key: originalFileName,
      Body: fileBuffer,
      ContentType: contentType,
    };

    const s3Response = await s3.upload(params).promise();
    const fileUrl = s3Response.Location;

    // Store the file URL in the database
    const data = await db.file.create({
      data: {
        name: originalFileName,
        url: fileUrl,
      },
    });

    return data;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file");
  }
}
