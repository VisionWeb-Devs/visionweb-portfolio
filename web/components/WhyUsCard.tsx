import React from "react";

type WhyUsCardProps = {
  title: string;
  description: string;
};

/**
 * Positioning is now owned by the parent, which stacks these cards; the card
 * itself no longer takes an `absolute` flag.
 */
const WhyUsCard = ({ title, description }: WhyUsCardProps) => {
  return (
    <div className="bg-surface xl:p-10 w-full rounded-xl flex flex-col justify-center gap-2 xl:gap-4 max-w-[700px]">
      <h3 className="text-xl xl:text-3xl font-semibold">{title}</h3>
      <p className="xl:text-lg text-sm">{description}</p>
    </div>
  );
};

export default WhyUsCard;
