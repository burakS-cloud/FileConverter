"use client";

import uploadFile from "@/actions/upload";
import { useUser } from "@clerk/nextjs";
import { ChangeEvent, FormEvent, useState } from "react";

const UploadForm = () => {
  const { user } = useUser(); // Get the current user's information
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file selected.");
  const [message, setMessage] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setFileName(files[0].name);
    } else {
      setFileName("No file selected");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    if (!user) {
      setMessage("User not authenticated.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadFile(formData, user.id); // Pass the userId to the uploadFile function
      setMessage("File uploaded successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unknown error occurred.");
      }
    }
  };
  console.log("user from clerk in form:", user);
  console.log("file object:", file);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="file-upload"
          className="cursor-pointer p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Choose File
        </label>
        <input
          id="file-upload"
          className="hidden"
          type="file"
          onChange={handleFileChange}
          required
        />
        <span id="file-name" className="text-gray-500 ml-5">
          {fileName}
        </span>
      </div>
      <div className="flex justify-center">
        <button
          className="pl-8 pr-8 pt-3 pb-3 mt-6 border-sky-900 rounded-md bg-sky-900 text-white font-bold text-lg"
          type="submit"
        >
          Upload
        </button>
      </div>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UploadForm;
