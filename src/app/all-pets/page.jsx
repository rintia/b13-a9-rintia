"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaPaw, FaMapMarkerAlt } from "react-icons/fa";

export default function PetCardsPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/pets")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pets:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EFE3CA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#56B6C6] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-2xl font-bold text-[#170C79]">
            Loading cute pets 🐾
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFE3CA] px-4 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#170C79]">
            Find Your Pawfect Friend 🐾
          </h1>

          <p className="text-[#170C79]/70 mt-4 max-w-2xl mx-auto text-lg">
            Give a loving home to adorable pets waiting for their forever family.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white border-2 border-[#56B6C6]/20 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 flex flex-col"
            >

              {/* Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={pet.imageUrl}
                  alt={pet.petName}
                  fill
                  unoptimized
                  className="object-cover hover:scale-110 transition duration-500"
                />

                {/* Cute Badge */}
                <div className="absolute top-3 left-3 bg-[#56B6C6] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow">
                  <FaPaw />
                  {pet.species}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">

                <h2 className="text-2xl font-extrabold text-[#170C79] mb-3">
                  {pet.petName}
                </h2>

                <div className="space-y-2 text-sm text-[#170C79]/80">

                  <p>
                    <span className="font-bold text-[#170C79]">
                      Breed:
                    </span>{" "}
                    {pet.breed}
                  </p>

                  <p>
                    <span className="font-bold text-[#170C79]">
                      Age:
                    </span>{" "}
                    {pet.age} years
                  </p>

                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#56B6C6]" />
                    {pet.location}
                  </p>
                </div>

                {/* Description */}
                <p className="mt-4 text-[#170C79]/70 text-sm leading-relaxed flex-grow line-clamp-3">
                  {pet.description}
                </p>

                {/* Fee */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="bg-[#EFE3CA] text-[#170C79] px-4 py-2 rounded-full font-bold text-sm">
                    ৳ {pet.adoptionFee}
                  </span>
                </div>

                {/* Button */}
                <button className="mt-5 bg-[#56B6C6] hover:bg-[#170C79] text-white font-bold py-3 rounded-2xl transition duration-300 shadow-md hover:shadow-xl">
                  Adopt Me 
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {pets.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-[#170C79]">
              No pets available right now 
            </h2>

            <p className="text-[#170C79]/70 mt-3">
              Please check back later for more adorable friends.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}