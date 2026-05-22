// components/PetCareTips.jsx

import {
  FaPaw,
  FaBone,
  FaHeart,
  FaBath,
  FaClinicMedical,
  FaWalking,
} from "react-icons/fa";

const tips = [
  {
    icon: <FaBone />,
    title: "Healthy Nutrition",
    points: [
      "Provide balanced meals daily",
      "Keep fresh water available",
      "Avoid harmful human foods",
    ],
  },
  {
    icon: <FaWalking />,
    title: "Daily Exercise",
    points: [
      "Take pets for regular walks",
      "Play interactive games",
      "Keep them mentally active",
    ],
  },
  {
    icon: <FaBath />,
    title: "Clean & Groomed",
    points: [
      "Brush fur regularly",
      "Keep paws and ears clean",
      "Schedule gentle baths",
    ],
  },
  {
    icon: <FaClinicMedical />,
    title: "Vet Checkups",
    points: [
      "Stay updated on vaccines",
      "Monitor unusual behavior",
      "Schedule routine checkups",
    ],
  },
  {
    icon: <FaHeart />,
    title: "Love & Attention",
    points: [
      "Spend quality time together",
      "Reward good behavior",
      "Create a safe environment",
    ],
  },
];

export default function Tips() {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="flex justify-center items-center gap-2 text-[#56B6C6] mb-4">
            <FaPaw className="text-2xl" />
            <span className="uppercase tracking-widest font-semibold">
              Pet Care Guide
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#170C79]">
            Caring For Your Furry Friends
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-[#170C79]/70 text-lg">
            Simple pet care tips to keep your companions healthy, happy, and
            loved every single day.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-[#EFE3CA] rounded-3xl p-8 shadow-md hover:shadow-xl transition duration-300 border-2 border-transparent hover:border-[#56B6C6]"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#56B6C6] flex items-center justify-center text-white text-3xl shadow-lg mb-6">
                {tip.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[#170C79] mb-5">
                {tip.title}
              </h3>

              {/* Bullet Points */}
              <ul className="space-y-4">
                {tip.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[#170C79]/80"
                  >
                    <span className="mt-1 text-[#56B6C6]">
                      <FaPaw size={14} />
                    </span>

                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}