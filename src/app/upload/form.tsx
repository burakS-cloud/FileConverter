"use client";

import uploadFile from "@/actions/upload";
import { useUser } from "@clerk/nextjs";
import {
  CloudArrowUpIcon,
  DocumentIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, useRef, useState } from "react";

const UploadForm = () => {
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file selected");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log("user", user);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setFileName(files[0].name);
    } else {
      setFile(null);
      setFileName("No file selected");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("");
      return;
    }
    if (!user) {
      setMessage("User not authenticated.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await uploadFile(formData, user.id);
      setMessage("File uploaded successfully!");
      setFile(null);
      setFileName("No file selected");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unknown error occurred.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    if (file) {
      handleUpload();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("No file selected");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  console.log("file", file);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUpload();
      }}
      className="space-y-6"
    >
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-300 ease-in-out ${
            file ? "pointer-events-none" : ""
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudArrowUpIcon className="w-12 h-12 mb-4 text-indigo-500" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PDF, DOCX, TXT (max. 10MB)
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </label>
      </div>

      {file && (
        <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center">
            <DocumentIcon className="w-8 h-8 text-indigo-500 mr-3" />
            <span className="text-sm font-medium text-gray-700 truncate">
              {fileName}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemoveFile}
            className="text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      <button
        onClick={handleButtonClick}
        type="submit"
        disabled={isUploading}
        className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white transition duration-300 ease-in-out ${
          isUploading
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        }`}
      >
        {isUploading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Uploading...
          </>
        ) : file ? (
          "Upload"
        ) : (
          "Choose File"
        )}
      </button>

      {message && (
        <div
          className={`mt-3 text-sm ${
            message.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default UploadForm;
