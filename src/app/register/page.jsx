"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "../../lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Password validation rules
  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const upper = /[A-Z]/.test(password);
    const lower = /[a-z]/.test(password);

    return minLength && upper && lower;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // validations
    if (!validatePassword(form.password)) {
      return setError(
        "Password must be at least 6 characters, include uppercase & lowercase letters"
      );
    }

    if (form.password !== form.confirmPassword) {
      return setError("Password and Confirm Password do not match");
    }

    try {
      setLoading(true);

      await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.image || undefined,
      });

      // ✅ redirect after success
      router.push("/login"); // or "/"
    } catch (err) {
      console.log(err);
      setError("Registration failed. Please try again.");
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
    <div className="min-h-screen bg-[#EFE3CA] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-[#56B6C6]/30 overflow-hidden">

        {/* Header */}
        <div className="bg-[#170C79] text-white text-center p-8">
          <h1 className="text-3xl font-extrabold">Create Account 🐾</h1>
          <p className="text-white/80 mt-2">
            Join and find your furry friends
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Name */}
          <div>
            <label className="text-[#170C79] font-semibold">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-2xl border-2 border-[#56B6C6]/30 focus:border-[#56B6C6] outline-none"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-[#170C79] font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-2xl border-2 border-[#56B6C6]/30 focus:border-[#56B6C6] outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="text-[#170C79] font-semibold">Photo URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-2xl border-2 border-[#56B6C6]/30 focus:border-[#56B6C6] outline-none"
              placeholder="https://..."
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
              required
              className="w-full mt-2 p-3 rounded-2xl border-2 border-[#56B6C6]/30 focus:border-[#56B6C6] outline-none"
              placeholder="••••••••"
            />

            <p className="text-xs text-[#170C79]/70 mt-1">
              At least 6 characters, 1 uppercase, 1 lowercase
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-[#170C79] font-semibold">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 rounded-2xl border-2 border-[#56B6C6]/30 focus:border-[#56B6C6] outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm font-medium">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#56B6C6] hover:bg-[#170C79] text-white font-bold py-3 rounded-2xl transition"
          >
            {loading ? "Creating account..." : "Register 🐾"}
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-[#170C79]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#56B6C6] font-bold">
              Login
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