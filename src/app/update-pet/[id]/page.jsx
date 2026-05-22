import UpdatePetForm from "@/components/UpdatePetForm";

const UpdatePetPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/pets/${id}`,
    { cache: "no-store" }
  );

  const pet = await res.json();

  return <UpdatePetForm pet={pet} />;
};

export default UpdatePetPage;