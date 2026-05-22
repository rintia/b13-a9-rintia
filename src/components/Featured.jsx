import Link from "next/link";
import PetCard from "./PetCard";

const Featured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`, {
    cache: "no-store",
  });

  const featuredPets = await res.json();

  

  return (
    <div className="my-12 max-w-7xl mx-auto px-4">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#170C79]">
            Featured Pets 🐾
          </h1>

          <p className="text-[#170C79]/70 mt-2">
            Meet some of our most lovable furry friends waiting for a forever home
          </p>
        </div>

        <Link href="/pets">
          <button className="px-6 py-3 rounded-full border-2 border-[#56B6C6] text-[#56B6C6] font-semibold hover:bg-[#56B6C6] hover:text-white transition">
            See All Pets 🐶
          </button>
        </Link>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
        {featuredPets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>

    </div>
  );
};

export default Featured;