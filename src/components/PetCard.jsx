"use client";

import Image from "next/image";
import { FaPaw, FaMapMarkerAlt } from "react-icons/fa";

const PetCard = ({ pet }) => {
  return (
    <div className="card bg-white border-2 border-[#56B6C6]/20 shadow-md hover:shadow-2xl transition duration-300 rounded-3xl overflow-hidden hover:-translate-y-2">

      {/* Image */}
      <figure className="relative h-64">
        <Image
          src={pet.imageUrl}
          alt={pet.petName}
          fill
          unoptimized
          className="object-cover"
        />

        {/* Species badge */}
        <div className="absolute top-3 left-3 bg-[#56B6C6] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <FaPaw />
          {pet.species}
        </div>
      </figure>

      {/* Content */}
      <div className="card-body">

        <h2 className="card-title text-[#170C79] text-2xl font-extrabold">
          {pet.petName}
        </h2>

        <div className="space-y-1 text-[#170C79]/80 text-sm">

          <p>
            <span className="font-bold">Breed:</span> {pet.breed}
          </p>

          <p>
            <span className="font-bold">Age:</span> {pet.age} years
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#56B6C6]" />
            {pet.location}
          </p>
        </div>

        {/* Description */}
        <p className="text-[#170C79]/70 text-sm mt-3 line-clamp-3">
          {pet.description}
        </p>

        {/* Footer */}
        <div className="card-actions justify-between items-center mt-5">

          <span className="bg-[#EFE3CA] text-[#170C79] px-4 py-2 rounded-full font-bold text-sm">
            ৳ {pet.adoptionFee}
          </span>

          <button className="btn border-none bg-[#56B6C6] hover:bg-[#170C79] text-white rounded-full">
            Adopt Now 🐶
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;