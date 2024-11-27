import React from "react";

const WhyUsCard = ({ title, description, absolute }) => {
  return (
    <div
      className={`${
        absolute ? "absolute" : ""
      } bg-[#E9E8E7] xl:p-10 w-full rounded-xl flex flex-col justify-center gap-2 xl:gap-4 max-w-[700px]`}
    >
      <h1 className="text-xl xl:text-3xl font-semibold">{title}</h1>
      <p className="xl:text-lg text-sm">{description}</p>
    </div>
  );
};

export default WhyUsCard;
