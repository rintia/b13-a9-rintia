"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "../lib/auth-client";

const Navbar = () => {

  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const userData = authClient.useSession();
  const user = userData.data?.user;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Pets", path: "/pets" },
    { name: "My Requests", path: "/my-requests", private: true },
    { name: "Add Pet", path: "/add-pet", private: true },
  ];





  const handleLogout = async () => {
    await authClient.signOut();
    
    setOpen(false);
    router.push("/");
  };

  return (
    <div className="w-full bg-[#EFE3CA] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto navbar px-4 md:px-8">

        {/* LEFT */}
        <div className="navbar-start">

          {/* MOBILE MENU */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-[#170C79]">
              ☰
            </label>

            <ul className="menu menu-sm dropdown-content bg-white rounded-2xl mt-3 w-56 p-3 shadow border border-[#56B6C6]/30">

              {navItems.map((item) => {
                

                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`px-3 py-2 rounded-xl block ${pathname === item.path
                        ? "bg-[#56B6C6] text-white"
                        : "text-[#170C79]"
                        }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              width={45}
              height={45}
              alt="logo"
              
            />
            <span className="text-xl font-extrabold text-[#170C79] hidden sm:block">
              Pawfect Match 🐾
            </span>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                 
                  className={`px-4 py-2 rounded-full font-semibold transition
        ${pathname === item.path
                      ? "bg-[#56B6C6] text-white shadow"
                      : "text-[#170C79] hover:bg-[#56B6C6]/20"
                    }`}
                >
                  {item.name}


                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">

          {!user ? (
            <Link
              href="/login"
              className="bg-[#56B6C6] hover:bg-[#170C79] text-white px-5 py-2 rounded-full font-semibold transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative">

              <button onClick={() => setOpen(!open)}>
                {user?.image || user?.imageUrl ? (
                  <Image
                    src={user.image || user.imageUrl}
                    width={40}
                    height={40}
                    alt="avatar"
                    className="rounded-full border-2 border-[#56B6C6]"
                  />
                ) : (
                  <FaUserCircle className="text-3xl text-[#170C79]" />
                )}
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-lg border border-[#56B6C6]/30 overflow-hidden">

                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 hover:bg-[#56B6C6]/20 text-[#170C79]"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-500 flex items-center gap-2"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;