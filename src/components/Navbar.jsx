import Image from 'next/image';
import React from 'react';
import logo from '../assets/logo.jpg'
import Link from 'next/link';
const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Home</a></li>
        <li>
          <a>All Pets</a>
        </li>
        <li><a>My Requests</a></li>
        <li><a>Add Pet</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl"><Image src={logo} height={150} width={90} alt='logo'></Image></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal gap-4">
    <Link href={'/'}><li>Home</li></Link>
        <Link href={'/all-pets'}><li>All Pets</li></Link>
        <Link href={'/my-requests'}><li>My Requests</li></Link>
        <Link href={'/add-pet'}><li>Add Pet</li></Link>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn bg-[#56B6C6] text-white">Login</a>
  </div>
</div>
    );
};

export default Navbar;