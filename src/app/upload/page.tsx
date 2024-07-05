import UploadForm from "./form";

export default function UploadPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">File Upload</h1>
        <UploadForm />
      </div>
    </div>
  );
}
