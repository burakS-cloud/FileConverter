"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import uploadFile from "@/actions/upload";

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadFile(formData);
      setMessage("File uploaded successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          File:
          <input type="file" onChange={handleFileChange} required />
        </label>
      </div>
      <div>
        <button
          className="p-2 mt-2 border-sky-900 rounded-md bg-sky-900 text-white"
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
