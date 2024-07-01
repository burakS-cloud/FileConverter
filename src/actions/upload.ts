"use server";

import fs from "fs";
import path from "path";
import db from "@/db/db";

const uploadDir = path.join(process.cwd(), "src/fileUploads");

// Ensure the directory exists
fs.mkdirSync(uploadDir, { recursive: true });

export default async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    throw new Error("File is required");
  }

  // Use the original filename from the file object
  const originalFileName = file.name;
  const filePath = path.join(uploadDir, originalFileName);

  const writableStream = fs.createWriteStream(filePath);
  const reader = file.stream().getReader();

  async function writeChunk({
    done,
    value,
  }: ReadableStreamReadResult<Uint8Array>): Promise<void> {
    if (done) {
      writableStream.end();
      return;
    }
    writableStream.write(Buffer.from(value));
    await reader.read().then(writeChunk);
  }

  await reader.read().then(writeChunk);

  const relativeFilePath = path.relative(process.cwd(), filePath);

  const data = await db.file.create({
    data: {
      name: originalFileName,
      url: relativeFilePath,
    },
  });

  return data;
}
