"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "../../lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Email login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });
      await refresh();
      router.push("/");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFE3CA] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-[#56B6C6]/30 overflow-hidden">

        {/* Header */}
        <div className="bg-[#170C79] text-white text-center p-8">
          <h1 className="text-3xl font-extrabold">Welcome Back 🐾</h1>
          <p className="text-white/80 mt-2">Login to find your furry friends</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-5">

          {/* Email */}
          <div>
            <label className="text-[#170C79] font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full mt-2 p-3 rounded-2xl border-2 border-[#56B6C6]/30 focus:outline-none focus:border-[#56B6C6]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-[#170C79] font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full mt-2 p-3 rounded-2xl border-2 border-[#56B6C6]/30 focus:outline-none focus:border-[#56B6C6]"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#56B6C6] hover:bg-[#170C79] text-white font-bold py-3 rounded-2xl transition"
          >
            {loading ? "Logging in..." : "Login 🐾"}
          </button>

          {/* Register link */}
          <p className="text-center text-sm text-[#170C79]">
            Don’t have an account?{" "}
            <Link href="/register" className="text-[#56B6C6] font-bold">
              Register now
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="h-px bg-[#56B6C6]/30 flex-1"></div>
            <span className="text-[#170C79]/60 text-sm">OR</span>
            <div className="h-px bg-[#56B6C6]/30 flex-1"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border-2 border-[#56B6C6] text-[#170C79] font-semibold py-3 rounded-2xl hover:bg-[#56B6C6]/10 transition"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}