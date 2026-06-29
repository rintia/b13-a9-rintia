import Link from "next/link";


const Banner = () => {
  return (
    <div className="bg-[url('../assets/banner.jpg')] bg-cover bg-no-repeat bg-fixed text-white  flex justify-between flex-col items-center  gap-5 h-150">
      <div className="p-10 text-center flex justify-center flex-col items-center gap-3.5 flex-1">
        <h1 className="text-7xl text-[#170C79]">
          Get Ready <br /> To Adopt
        </h1>

        <p className="text-2xl text-cyan-500 bg-[#EFE3CA] p-2">
          Find your furry soulmate with just one click. From many to choose from
        </p>

        <div className="flex justify-center">
          <Link href='/pets'>
          <button className="uppercase bg-cyan-500 px-5 py-3 cursor-pointer">
            Adopt Now
          </button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Banner;