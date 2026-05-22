import Image from "next/image";
import { FaPaw, FaMapMarkerAlt } from "react-icons/fa";
import AdoptionForm from "@/components/AdoptionForm";

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;

  // fetch single pet from backend
 const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`,
    { cache: "no-store" }
  );

  const pet = await res.json();
  return (
    <div className="min-h-screen bg-[#EFE3CA] px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE - PET INFO */}
        <div className="lg:col-span-2 space-y-6">

          {/* IMAGE */}
          <div className="relative w-full h-100 rounded-3xl overflow-hidden border-4 border-[#56B6C6]/30 shadow-lg">
            <Image
              src={pet.imageUrl}
              alt={pet.petName}
              fill
              unoptimized
              className="object-cover"
            />

            <div className="absolute top-4 left-4 bg-[#56B6C6] text-white px-4 py-1 rounded-full flex items-center gap-2">
              <FaPaw />
              {pet.species}
            </div>
          </div>

          {/* DETAILS */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-[#56B6C6]/20">

            <h1 className="text-4xl font-extrabold text-[#170C79]">
              {pet.petName}
            </h1>

            <div className="mt-4 space-y-2 text-[#170C79]/80">

              <p><b>Breed:</b> {pet.breed}</p>
              <p><b>Age:</b> {pet.age} years</p>

              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#56B6C6]" />
                {pet.location}
              </p>

              <p><b>Health:</b> {pet.healthStatus}</p>
              <p><b>Vaccination:</b> {pet.vaccinationStatus}</p>
              <p><b>Fee:</b> ৳ {pet.adoptionFee}</p>
            </div>

            <p className="mt-5 text-[#170C79]/70">
              {pet.description}
            </p>

          </div>
        </div>

        {/* RIGHT SIDE - FORM (CLIENT COMPONENT) */}
        <AdoptionForm pet={pet} />
      </div>
    </div>
  );
};

export default PetDetailsPage;