"use client";

import { useState } from "react";
import { FaPaw, FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UpdatePetForm({ pet }) {
  const router = useRouter();
  const userData = authClient.useSession();
  const user = userData.data?.user;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    petName: pet.petName || "",
    species: pet.species || "",
    breed: pet.breed || "",
    age: pet.age || "",
    gender: pet.gender || "",
    image: pet.image || "",
    healthStatus: pet.healthStatus || "",
    vaccinationStatus: pet.vaccinationStatus || "",
    location: pet.location || "",
    adoptionFee: pet.adoptionFee || "",
    description: pet.description || "",
    ownerEmail: pet.ownerEmail || user?.email || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${pet._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Pet updated successfully 🐾");
        router.push("/my-listings");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#EFE3CA] py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-[28px] shadow-2xl border-4 border-[#56B6C6]/20 overflow-hidden">

        {/* Header */}
        <div className="bg-[#170C79] text-white text-center py-10">
          <div className="flex justify-center mb-3">
            <div className="bg-[#56B6C6] p-4 rounded-full">
              <FaPaw className="text-3xl" />
            </div>
          </div>

          <h2 className="text-4xl font-bold">Update Pet 🐾</h2>
          <p className="text-white/70 mt-2">
            Edit your pet details
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* Pet Name */}
          <input
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Pet Name"
          />

          {/* Species */}
          <input
            name="species"
            value={formData.species}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Species"
          />

          {/* Breed */}
          <input
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Breed"
          />

          {/* Age */}
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Age"
          />

          {/* Gender */}
          <input
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Gender"
          />

          {/* Image */}
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input input-bordered w-full md:col-span-2"
            placeholder="Image URL"
          />

          {/* Location */}
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Location"
          />

          {/* Fee */}
          <input
            name="adoptionFee"
            value={formData.adoptionFee}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Adoption Fee"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full md:col-span-2"
            placeholder="Description"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-[#56B6C6] hover:bg-[#170C79] text-white font-bold py-3 rounded-xl"
          >
            {loading ? "Updating..." : "Update Pet 🐾"}
          </button>
        </form>
      </div>
    </section>
  );
}