import Image from 'next/image';
import React from 'react';

const SuccessStories = () => {
    const stories = [
  {
    name: "Milo",
    owner: "Adopted by Sarah",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop",
    story:
      "Milo was rescued from the streets and is now living his happiest life full of cuddles, toys, and sunny park walks.",
  },
  {
    name: "Luna",
    owner: "Adopted by Ahmed",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1200&auto=format&fit=crop",
    story:
      "Luna used to be shy and scared. After adoption, she became playful, confident, and everyone’s favorite companion.",
  },
  {
    name: "Coco",
    owner: "Adopted by Emma",
    image:
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?q=80&w=1200&auto=format&fit=crop",
    story:
      "Coco finally found a forever home where she spends her days napping, playing, and spreading happiness.",
  },
];
    return (
       <section className="w-full bg-[#EFE3CA] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[#56B6C6] font-semibold tracking-widest uppercase">
            Happy Tails
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#170C79] mt-3">
            Success Stories
          </h2>

          <p className="text-[#170C79]/70 max-w-2xl mx-auto mt-5 text-lg">
            Every adoption creates a beautiful new beginning. Here are some of
            our favorite happy endings from pets who found their forever homes.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-4 border-[#56B6C6]/20 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute top-4 left-4 bg-[#170C79] text-white text-sm px-4 py-2 rounded-full shadow-md">
                  {story.owner}
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="text-2xl font-bold text-[#170C79] mb-3">
                  {story.name}
                </h3>

                <p className="text-[#170C79]/75 leading-relaxed">
                  {story.story}
                </p>

                {/* Cute paw button */}
                <button className="mt-6 bg-[#56B6C6] hover:bg-[#170C79] text-white font-semibold px-5 py-3 rounded-full transition duration-300">
                  Read Story 🐾
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default SuccessStories;