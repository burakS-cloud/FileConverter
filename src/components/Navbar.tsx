"use client";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="flex items-center justify-between w-full mb-8 p-4">
      <div className="text-2xl font-bold transition duration-300 ease-in-out transform hover:text-blue-400">
        <Link href="/">File Converter</Link>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link
            className="font-bold relative transition duration-300 ease-in-out transform hover:text-blue-400"
            href="/"
          >
            Home
            <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 transform scale-x-0 transition-transform duration-300 ease-in-out origin-left hover:scale-x-100"></span>
          </Link>
        </li>
        <li>
          <Link
            className="font-bold relative transition duration-300 ease-in-out transform hover:text-blue-400"
            href="/upload"
          >
            Upload
            <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 transform scale-x-0 transition-transform duration-300 ease-in-out origin-left hover:scale-x-100"></span>
          </Link>
        </li>
        <li>
          {isSignedIn ? (
            <SignOutButton>
              <button className="font-bold relative transition duration-300 ease-in-out transform hover:text-blue-400">
                Sign Out
                <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 transform scale-x-0 transition-transform duration-300 ease-in-out origin-left hover:scale-x-100"></span>
              </button>
            </SignOutButton>
          ) : (
            <Link
              className="font-bold relative transition duration-300 ease-in-out transform hover:text-blue-400"
              href="/sign-in"
            >
              Sign In
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 transform scale-x-0 transition-transform duration-300 ease-in-out origin-left hover:scale-x-100"></span>
            </Link>
          )}
        </li>
        <li>
          {isSignedIn ? (
            <Link
              className="font-bold relative transition duration-300 ease-in-out transform hover:text-blue-400"
              href={`/upload-history/${user.id}`}
            >
              My Files
              <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-400 transform scale-x-0 transition-transform duration-300 ease-in-out origin-left hover:scale-x-100"></span>
            </Link>
          ) : null}
        </li>
      </ul>
    </nav>
  );
}
