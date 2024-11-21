import Image from "next/image";
import React from "react";
import website from "@/public/assets/website.svg";
import Button from "@/components/Button";

const WhatWeDo = () => {
  return (
    <div className=" bg-[#E9E8E7] text-main xl:px-36 px-12 py-36 flex flex-col xl:flex-row gap-6 xl:gap-0 justify-between items-center">
      <div className="flex flex-col gap-4 xl:gap-8">
        <span>
          <h2 className="xl:text-lg font-semibold opacity-65">What we do</h2>
          <h1 className="xl:text-5xl text-2xl font-semibold leading-tight">
            Want to take your buisness <br /> to the next level?
          </h1>
        </span>
        <ul className="list-disc list-inside">
          <li>
            We are a team of developers and designers who can help you achieve
            your goals.
          </li>
          <li>
            We specialize in creating websites and web applications that are
            tailored to your needs.
          </li>
          <li>
            Whether you need a simple website or a complex web application, we
            can help you.
          </li>
          <li>
            We have experience working with clients from a variety of industries
            and can help you achieve your goals.
          </li>
        </ul>
        <Button text={`Our team`} />
      </div>
      <div className=" h-fit select-none">
        <Image width={700} height={500} src={website.src} alt="website" />
      </div>
    </div>
  );
};

export default WhatWeDo;
