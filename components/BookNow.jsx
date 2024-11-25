import React from "react";

const BookNow = ({ bg_color }) => {
  bg_color = bg_color || "bg-[#121212]";
  bg_color = bg_color === "bg-[#121212]" ? "bg-[#E9E8E7]" : "bg-[#121212]";

  const text_color =
    bg_color === "bg-[#121212]" ? "text-[#E9E8E7]" : "text-[#121212]";
  return (
    <button
      className={`${bg_color} ${text_color} w-full py-3 xl:py-5 rounded-full`}
    >
      Book Now
    </button>
  );
};

export default BookNow;
