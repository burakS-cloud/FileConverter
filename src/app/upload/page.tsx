import {
  ArrowPathIcon,
  DocumentArrowUpIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
import UploadForm from "./form";

export default function UploadPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          FileConverter
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Your all-in-one solution for document management and conversion.
          Upload, transform, and optimize your files with ease.
        </p>
      </div>

      <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upload Your Document
          </h2>
          <UploadForm />
        </div>

        <div className="bg-gray-50 px-8 py-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Why use FileConverter?
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <DocumentArrowUpIcon
                  className="h-6 w-6 text-indigo-600"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-3 text-sm text-gray-700">
                <span className="font-medium text-gray-900">
                  Secure uploads:
                </span>{" "}
                Your documents are encrypted and protected throughout the entire
                process.
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <ArrowPathIcon
                  className="h-6 w-6 text-indigo-600"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-3 text-sm text-gray-700">
                <span className="font-medium text-gray-900">
                  Coming soon - File conversion:
                </span>{" "}
                Transform your documents between various formats, including PDF
                to Word and Word to PDF.
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <DocumentChartBarIcon
                  className="h-6 w-6 text-indigo-600"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-3 text-sm text-gray-700">
                <span className="font-medium text-gray-900">
                  Advanced features:
                </span>{" "}
                Optimize file sizes, merge documents, and more - all coming in
                future updates.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: "Upload",
              description:
                "Select and upload your document securely to our servers.",
            },
            {
              step: 2,
              title: "Process",
              description:
                "We handle your file with care, preparing it for the next step.",
            },
            {
              step: 3,
              title: "Transform",
              description:
                "Download your file in its new format or with applied optimizations.",
            },
          ].map((item) => (
            <div key={item.step} className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {item.step}
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h4>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
