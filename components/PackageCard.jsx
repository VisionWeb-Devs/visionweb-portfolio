import React from "react";
import BookNow from "./BookNow";

const PackageCard = ({
  name,
  price,
  description,
  what_is_included,
  bg_color,
}) => {
  const text_color =
    bg_color === "bg-[#121212]" ? "text-[#E9E8E7]" : "text-[#121212]";
  const border_color =
    bg_color === "bg-[#121212]" ? "border-[#E9E8E7]" : "border-[#121212]";
  return (
    <div
      className={`${bg_color} ${text_color} rounded-2xl border ${border_color} flex flex-col w-fit font-semibold`}
    >
      <div className="text-xl px-8 py-4"> {name}</div>
      <hr className={`${border_color}`} />
      <div className="flex flex-col gap-[24px] xl:gap-[32px] px-6 py-8 xl:px-8 xl:py-10">
        <div className="flex flex-col gap-[16px] xl:gap-[32px]">
          <div>
            <div className="xl:text-8xl text-5xl">€{price}</div>
            <div className="opacity-60 xl:text-base text-sm">Per website</div>
          </div>
          <div className="opacity-60  xl:text-base text-sm">{description}</div>
        </div>
        <BookNow bg_color={bg_color} />
        <ul className="flex flex-col gap-[8px]  xl:text-base text-sm">
          <div className="opacity-60">What is included:</div>
          {what_is_included.map((item) => (
            <div key={item} className="flex gap-2">
              <span className="opacity-60 font-normal ">&#10003;</span>
              {item}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageCard;
