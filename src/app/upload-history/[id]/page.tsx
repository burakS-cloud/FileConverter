"use client";

import { getUserFiles } from "@/actions/user";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type File = {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
};

const Page = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const { id } = params;
  const [files, setFiles] = useState<File[]>([]);

  console.log("id from url:", id);
  console.log("user from clerk:", user);
  console.log("isSignedIn:", isSignedIn);

  useEffect(() => {
    if (!isLoaded) return; // Wait for user data to load

    if (
      !isSignedIn ||
      (user?.id !== id && user?.publicMetadata?.clerkUserId !== id)
    ) {
      // Redirect or show an error if the user is not signed in or the IDs do not match
      router.push("/");
    }

    const fetchFiles = async () => {
      try {
        if (!user) return;
        const userFiles = await getUserFiles(user.id); // or user.publicMetadata.clerkUserId
        setFiles(userFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [isLoaded, isSignedIn, user, id, router]);

  if (
    !isLoaded ||
    !isSignedIn ||
    (user?.id !== id && user?.publicMetadata?.clerkUserId !== id)
  ) {
    return <div>Loading...</div>; // Or a better loading indicator
  }

  console.log("files:", files);
  return (
    <div className="container mx-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">URL</th>
            <th className="py-2 px-4 border-b text-left">File Name</th>
            <th className="py-2 px-4 border-b text-left">Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td className="py-2 px-4 border-b border-r">
                <div className="max-w-full overflow-x-auto">
                  <Link
                    className="text-blue-500 hover:text-blue-700 hover:underline"
                    href={`${file.url}`}
                  >
                    {file.url}
                  </Link>
                </div>
              </td>
              <td className="py-2 px-4 border-b border-r">{file.name}</td>
              <td className="py-2 px-4 border-b">
                {file.createdAt.toISOString()}
              </td>
            </tr>
          ))}

          {/* Add more rows here */}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
