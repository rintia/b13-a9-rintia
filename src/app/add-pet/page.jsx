// components/AddPetForm.jsx

"use client";

import { useState } from "react";
import { FaPaw, FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddPetForm() {
  const router = useRouter();

  // Replace with your logged in user
  const user = {
    email: "user@gmail.com",
  };

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    petName: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    image: "",
    healthStatus: "",
    vaccinationStatus: "",
    location: "",
    adoptionFee: "",
    description: "",
    ownerEmail: user.email,
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Replace with your API route
      const response = await fetch("/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Pet added successfully! 🐾");

        router.push("/my-listings");
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to add pet!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#EFE3CA] py-10 sm:py-14 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-[28px] sm:rounded-[35px] shadow-2xl overflow-hidden border-4 border-[#56B6C6]/20">
        
        {/* Header */}
        <div className="bg-[#170C79] text-white px-5 sm:px-8 md:px-12 py-10 sm:py-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#56B6C6] p-4 sm:p-5 rounded-full shadow-lg">
              <FaPaw className="text-3xl sm:text-4xl" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Add A New Pet 🐾
          </h2>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Help a furry friend find their forever home
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
        >
          {/* Pet Name */}
          <div>
            <label className="block mb-2 font-semibold text-[#170C79] text-sm sm:text-base">
              Pet Name
            </label>

            <input
              type="text"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
              placeholder="Enter pet name"
              className="w-full p-3 sm:p-4 rounded-2xl border-2 border-[#56B6C6]/30 text-sm sm:text-base focus:outline-none focus:border-[#56B6C6]"
            />
          </div>

          {/* Species */}
          <div>
            <label className="block mb-2 font-semibold text-[#170C79] text-sm sm:text-base">
              Species
            </label>

            <select
              name="species"
              value={formData.species}
              onChange={handleChange}
              required
              className="w-full p-3 sm:p-4 rounded-2xl border-2 border-[#56B6C6]/30 text-sm sm:text-base focus:outline-none focus:border-[#56B6C6]"
            >
              <option value="">Select species</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Bird</option>
              <option>Rabbit</option>
              <option>Fish</option>
              <option>Other</option>
            </select>
          </div>

          {/* Breed */}
          <div>
            <label className="block mb-2 font-semibold text-[#170C79] text-sm sm:text-base">
              Breed
            </label>

            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Golden Retriever"
              className="w-full p-3 sm:p-4 rounded-2xl border-2 border-[#56B6C6]/30 text-sm sm:text-base focus:outline-none focus:border-[#56B6C6]"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block mb-2 font-semibold text-[#170C79] text-sm sm:text-base">
              Age
            </label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              placeholder="2"
              className="w-full p-3 sm:p-4 rounded-2xl border-2 border-[#56B6C6]/30 text-sm sm:text-base focus:outline-none focus:border-[#56B6C6]"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 font-semibold text-[#170C79] text-sm sm:text-base">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 sm:p-4 rounded-2xl border-2 border-[#56B6C6]/30 text-sm sm:text-base focus:outline-none focus:border-[#56B6C6]"
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 font-semibold text-[#170C79] text-sm sm:text-base">
              Image URL
            </label>

            <div className="relative">
              <FaCloudUploadAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-[#56B6C6] text-lg" />

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="https://..."
                className="w-full pl-12 p-3 sm:p-4 rounded-2xl border-2 border-[#56B6C6]/30 text-sm sm:text-base focus:outline-none focus:border-[#56B6C6]"
              />
            </div>
          </div>

          {/* Health Status */}
          <div>
            <label className="block mb-2 font-semibold text-[#170C79] text-sm sm:text-base">
              Health Status
            </label>

            <input
              type="text"
              name="healthStatus"
              value={formData.healthStatus}
              onChange={handleChange}
              placeholder="Healthy"
              className="w-full p-3 sm:p-4 rounded-2xl border-2 border-[#56B6C6]/30 text-sm sm:text-base focus:outline-none focus:border-[#56B6C6]"
            />
          </div>

          {/* Vaccination Status */}
          <div>
            <label className="block mb-2 font-semibold text-[#170C79] text-sm sm:text-base">
              Vaccination Status
            </label>

            <input
              type="text"
              name="vaccinationStatus"
              value={formData.vaccinationStatus}
              onChange={handleChange}
              placeholder="Vaccinated"
              className="w-full p-3 sm:p-4 rounded-2xl border-2 border-[#56B6C6]/30 text-sm sm:text-base focus:outline-none focus:border-[#56B6C6]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 font-semibold text-[#170C79] text-sm sm:text-base">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Dhaka, Bangladesh"
              className="w-full p-3 sm:p-4 rounded-2xl border-2 border-[#56B6C6]/30 text-sm sm:text-base focus:outline-none focus:border-[#56B6C6]"
            />
          </div>

          {/* Adoption Fee */}
          <div>
            <label className="block mb-2 font-semibold text-[#170C79] text-sm sm:text-base">
              Adoption Fee
            </label>

            <input
              type="number"
              name="adoptionFee"
              value={formData.adoptionFee}
              onChange={handleChange}
              placeholder="100"
              className="w-full p-3 sm:p-4 rounded-2xl border-2 border-[#56B6C6]/30 text-sm sm:text-base focus:outline-none focus:border-[#56B6C6]"
            />
          </div>

          {/* Owner Email */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-[#170C79] text-sm sm:text-base">
              Owner Email
            </label>

            <input
              type="email"
              value={formData.ownerEmail}
              readOnly
              className="w-full p-3 sm:p-4 rounded-2xl bg-gray-100 border-2 border-[#56B6C6]/20 text-gray-500 text-sm sm:text-base cursor-not-allowed"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-semibold text-[#170C79] text-sm sm:text-base">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Tell us about this adorable pet..."
              className="w-full p-3 sm:p-4 rounded-2xl border-2 border-[#56B6C6]/30 text-sm sm:text-base resize-none focus:outline-none focus:border-[#56B6C6]"
            />
          </div>

          {/* Button */}
          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#56B6C6] hover:bg-[#170C79] text-white font-bold py-4 sm:py-5 rounded-2xl transition duration-300 text-base sm:text-lg shadow-lg"
            >
              {loading ? "Adding Pet..." : "Add Pet 🐾"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}