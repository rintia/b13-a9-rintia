import PetCard from "@/components/PetCard";

const AllPetsPage = async () => {
  const res = await fetch("http://localhost:5000/pets", {
    cache: "no-store",
  });

  const pets = await res.json();

  return (
    <div className="min-h-screen bg-[#EFE3CA] py-12 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#170C79]">
            Adopt Your Pawfect Friend 🐾
          </h1>

          <p className="mt-4 text-[#170C79]/70 max-w-2xl mx-auto">
            Give these adorable pets a forever home filled with love.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPetsPage;