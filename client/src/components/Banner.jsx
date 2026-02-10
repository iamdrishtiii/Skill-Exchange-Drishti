import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const featuredSkills = [
    "Web Development",
    "UI/UX Design",
    "Data Analysis",
    "Digital Marketing",
    "Photography",
    "Fitness Training",
  ];

  return (
    <div className="relative m-6 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 p-10 text-white shadow-lg">
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 text-white text-xl font-bold hover:opacity-80"
      >
        <RxCross2/>
      </button>

      <h2 className="text-2xl font-semibold mb-2">
         Featured Skills in High Demand
      </h2>

      <p className="text-sm mb-4 opacity-90">
        Explore trending skills..
      </p>

      <div className="flex flex-wrap gap-3">
        {featuredSkills.map((skill, index) => (
          <span
            key={index}
            className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-white/30 transition"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
