"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FaEdit,
    FaTrash,
    FaEye,
    FaClipboardList,
    FaPaw,
} from "react-icons/fa";

import { authClient } from "@/lib/auth-client";


const MyListingsPage = () => {
    const { data: session } = authClient.useSession();

    const user = session?.user;

    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/my-pets/${user.email}`
        )
            .then((res) => res.json())
            .then((data) => {
                setPets(data);
                setLoading(false);
            });
    }, [user]);

    const handleDelete = async (id) => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this pet?"
        );

        if (!confirmDelete) return;

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`,
            {
                method: "DELETE",
            }
        );

        const data = await res.json();

        if (data.deletedCount > 0) {
            setPets(pets.filter((pet) => pet._id !== id));
        }
    };

    const totalListings = pets.length;

    const adoptedPets = pets.filter(
        (pet) => pet.status === "adopted"
    ).length;

    const availablePets = totalListings - adoptedPets;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-3xl font-bold text-[#170C79]">
                Loading...
            </div>
        );
    }

    const handleShowRequests = async (petId) => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/requests/${petId}`
        );

        const data = await res.json();

        setRequests(data);
        setOpen(true);
    };
    return (
        <div className="min-h-screen bg-[#EFE3CA] py-10 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold text-[#170C79]">
                        My Pet Listings 🐾
                    </h1>

                    <p className="text-[#170C79]/70 mt-2">
                        Manage your added pets and adoption requests
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

                    <div className="bg-white rounded-3xl p-6 shadow-md border border-[#56B6C6]/20">
                        <p className="text-[#170C79]/70 font-medium">
                            Total Listings
                        </p>

                        <h2 className="text-4xl font-extrabold text-[#170C79] mt-2">
                            {totalListings}
                        </h2>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-md border border-[#56B6C6]/20">
                        <p className="text-[#170C79]/70 font-medium">
                            Available
                        </p>

                        <h2 className="text-4xl font-extrabold text-[#56B6C6] mt-2">
                            {availablePets}
                        </h2>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-md border border-[#56B6C6]/20">
                        <p className="text-[#170C79]/70 font-medium">
                            Adopted
                        </p>

                        <h2 className="text-4xl font-extrabold text-green-500 mt-2">
                            {adoptedPets}
                        </h2>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {pets.map((pet) => (
                        <div
                            key={pet._id}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#56B6C6]/20"
                        >

                            {/* Image */}
                            <div className="relative h-64">
                                <Image
                                    src={pet.image || pet.imageUrl}
                                    alt={pet.petName}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />

                                <div className="absolute top-4 left-4 bg-[#56B6C6] text-white px-4 py-1 rounded-full text-sm font-bold">
                                    {pet.species}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">

                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-extrabold text-[#170C79]">
                                        {pet.petName}
                                    </h2>

                                    <span className="bg-[#EFE3CA] text-[#170C79] px-3 py-1 rounded-full text-sm font-bold">
                                        ৳ {pet.adoptionFee}
                                    </span>
                                </div>

                                <p className="mt-2 text-[#170C79]/70">
                                    {pet.breed}
                                </p>

                                {/* Buttons */}
                                <div className="grid grid-cols-2 gap-3 mt-6">

                                    <button
                                        onClick={() => handleShowRequests(pet._id)}
                                        className="btn rounded-2xl bg-[#56B6C6] hover:bg-[#170C79] text-white border-none"
                                    >
                                        <FaClipboardList />
                                        Requests
                                    </button>

                                    <Link href={`/update-pet/${pet._id}`}>
                                        <button className="btn w-full rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-black border-none">
                                            <FaEdit />
                                            Edit
                                        </button>
                                    </Link>

                                    <Link href={`/pets/${pet._id}`}>
                                        <button className="btn w-full rounded-2xl bg-[#170C79] hover:bg-[#0f084d] text-white border-none">
                                            <FaEye />
                                            View
                                        </button>
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(pet._id)}
                                        className="btn rounded-2xl bg-red-500 hover:bg-red-600 text-white border-none"
                                    >
                                        <FaTrash />
                                        Delete
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {pets.length === 0 && (
                    <div className="bg-white rounded-3xl p-16 text-center shadow-md border border-[#56B6C6]/20">
                        <FaPaw className="text-6xl text-[#56B6C6] mx-auto mb-5" />

                        <h2 className="text-3xl font-bold text-[#170C79]">
                            No Pets Added Yet
                        </h2>

                        <p className="text-[#170C79]/70 mt-3">
                            Start helping pets find loving homes 🐶
                        </p>

                        <Link href="/add-pet">
                            <button className="btn mt-6 bg-[#56B6C6] hover:bg-[#170C79] text-white border-none rounded-full px-8">
                                Add Pet
                            </button>
                        </Link>
                    </div>
                )}

                {open && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white w-[95%] max-w-lg p-6 rounded-2xl shadow-xl">

                            <h2 className="text-2xl font-bold text-[#170C79] mb-4">
                                Adoption Requests 🐾
                            </h2>

                            {requests.length === 0 ? (
                                <p>No requests found</p>
                            ) : (
                                requests.map((req) => (
                                    <div key={req._id} className="border p-3 rounded-xl mb-3">
                                        <p><b>Name:</b> {req.userName}</p>
                                        <p><b>Email:</b> {req.userEmail}</p>
                                        <p><b>Pickup:</b> {req.pickupDate}</p>
                                        <p><b>Status:</b> {req.status}</p>
                                    </div>
                                ))
                            )}

                            <button
                                onClick={() => setOpen(false)}
                                className="btn w-full mt-4 bg-red-500 text-white"
                            >
                                Close
                            </button>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MyListingsPage;