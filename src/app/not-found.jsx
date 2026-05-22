"use client";

import Link from "next/link";
import { FaPaw } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFE3CA] px-4">
      <div className="text-center max-w-md bg-white p-10 rounded-3xl shadow-2xl border-4 border-[#56B6C6]/20">

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-[#56B6C6] p-5 rounded-full text-white">
            <FaPaw className="text-4xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-[#170C79]">
          404
        </h1>

        {/* Message */}
        <p className="mt-4 text-[#170C79]/70 text-lg">
          Oops! This page ran away like a lost puppy 🐶
        </p>

        <p className="text-sm text-[#170C79]/60 mt-2">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link href="/">
          <button className="mt-6 bg-[#56B6C6] hover:bg-[#170C79] text-white font-bold px-6 py-3 rounded-full transition">
            Back to Home 🏠
          </button>
        </Link>
      </div>
    </div>
  );
}