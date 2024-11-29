import React from "react";
import PackageCard from "./PackageCard";

const packages = [
  {
    name: "Portfolio Website",
    price: "+20,000 DZD",
    description:
      "Perfect for professionals and businesses looking to establish a credible online presence. Showcase your expertise and brand identity with a sleek, professional portfolio.",
    what_is_included: [
      "A design crafted to align seamlessly with your brand’s identity.",
      "Responsive and mobile-friendly to impress visitors on any device.",
      "Built with SEO-friendly practices to improve discoverability.",
    ],
  },
  {
    name: "E-commerce Template",
    price: "+40,000 DZD",
    description:
      " Ideal for entrepreneurs and businesses ready to launch their online store and boost sales. Transform your vision into a functional and engaging shopping experience.",
    what_is_included: [
      "A fully operational e-commerce system with shopping cart and category management.",
      "An intuitive admin panel to track, manage, and fulfill orders effortlessly.",
      "A responsive design to attract and convert visitors on both desktop and mobile.",
    ],
  },
  {
    name: "Custom Website",
    price: "Contact for Pricing",
    description:
      "For businesses and individuals seeking a truly unique online presence that stands out from the competition. Let us bring your vision to life with a website that combines cutting-edge design and functionality.",
    what_is_included: [
      "A one-of-a-kind design with interactive animations and custom features.",
      "Fully tailored solutions to meet your business goals and audience needs.",
      "Uncompromising attention to detail for a premium, high-quality result.",
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
