import React from "react";
import PackageCard from "./PackageCard";

const packages = [
  {
    name: "Starter",
    price: "300",
    description:
      "For individuals looking to showcase their work and build an online presence.",
    what_is_included: [
      "A ready to use portfolio website",
      "over 5 templates to choose from",
      "A custom domain",
      "24/7 customer support",
      "Fast delivery",
    ],
  },
  {
    name: "Pro",
    price: "500",
    description:
      "For professionals and small businesses looking to grow their online presence.",
    what_is_included: [
      "A ready to use portfolio website",
      "over 10 templates to choose from",
      "A custom domain",
      "24/7 customer support",
      "Fast delivery",
      "SEO optimization",
    ],
  },
  {
    name: "Enterprise",
    price: "1000",
    description:
      "For businesses looking to scale their online presence and reach a wider audience.",
    what_is_included: [
      "A ready to use portfolio website",
      "over 15 templates to choose from",
      "A custom domain",
      "24/7 customer support",
      "Fast delivery",
      "SEO optimization",
      "Social media integration",
    ],
  },
];

const Tiers = () => {
  return (
    <div className=" bg-main text-[#E9E8E7] xl:px-36 px-12 xl:py-36 py-20 flex flex-col gap-16 xl:gap-24 min-h-screen">
      <h1 className="text-4xl xl:text-5xl font-semibold">Packages</h1>

      <div className="grid xl:grid-cols-3 grid-cols-1 gap-10 ">
        {packages.map((pkg, index) => (
          <PackageCard
            key={pkg.name}
            name={pkg.name}
            price={pkg.price}
            description={pkg.description}
            what_is_included={pkg.what_is_included}
            bg_color={index % 2 === 0 ? "bg-[#121212]" : "bg-[#E9E8E7]"}
          />
        ))}
      </div>
    </div>
  );
};

export default Tiers;
