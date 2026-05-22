"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";

const AdoptionForm = ({ pet }) => {
  const [form, setForm] = useState({
    pickupDate: "",
    message: "",
  });

  const userData = authClient.useSession();
    const user = userData.data?.user;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      petId: pet._id,
      petName: pet.petName,
      userName: user.name,
      userEmail: user.email,
      pickupDate: form.pickupDate,
      message: form.message,
      status: "pending",
    };

    console.log(payload);

    // TODO: send to backend
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border-2 border-[#56B6C6]/20 p-6 h-fit">

      <h2 className="text-2xl font-extrabold text-[#170C79] mb-6">
        Adoption Form 🐾
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
    <label className="block mb-1 text-[#170C79] font-semibold">
      Pet Name
    </label>
        <input value={pet.petName} readOnly className="w-full p-3 bg-gray-100 rounded-xl" />
        <label className="block mb-1 text-[#170C79] font-semibold">
      Your Name
    </label>
        <input value={user.name} readOnly className="w-full p-3 bg-gray-100 rounded-xl" />
        <label className="block mb-1 text-[#170C79] font-semibold">
      Your Email
    </label>
        <input value={user.email} readOnly className="w-full p-3 bg-gray-100 rounded-xl" />
    <label className="block mb-1 text-[#170C79] font-semibold">
      Pickup Date
    </label>
        <input
          type="date"
          name="pickupDate"
          value={form.pickupDate}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl border-[#56B6C6]/30"
          required
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Why do you want to adopt?"
          className="w-full p-3 border rounded-xl border-[#56B6C6]/30"
        />

        <button className="w-full bg-[#56B6C6] hover:bg-[#170C79] text-white font-bold py-3 rounded-xl">
          Adopt Now 🐶
        </button>

      </form>
    </div>
  );
};

export default AdoptionForm;