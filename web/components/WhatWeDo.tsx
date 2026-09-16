import Image from "next/image";
import React from "react";
import website from "@/public/assets/website.svg";
import WhatWeDoPoints from "./WhatWeDoPoints";

const WhatWeDo = () => {
  return (
    <section id="services" className=" bg-paper text-ink xl:px-36 px-12 py-36 flex flex-col xl:flex-row gap-6 xl:gap-0 justify-between items-center">
      <WhatWeDoPoints />
      <div className=" h-fit select-none">
        <Image
          src={website}
          alt=""
          width={700}
          height={500}
        />
      </div>
    </section>
  );
};

export default WhatWeDo;
