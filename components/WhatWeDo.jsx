import Image from "next/image";
import React from "react";
import website from "@/public/assets/website.svg";
import WhatWeDoPoints from "./WhatWeDoPoints";

const WhatWeDo = () => {
  return (
    <div className=" bg-[#E9E8E7] text-main xl:px-36 px-12 py-36 flex flex-col xl:flex-row gap-6 xl:gap-0 justify-between items-center">
      <WhatWeDoPoints />
      <div className=" h-fit select-none">
        <Image width={700} height={500} src={website.src} alt="website" />
      </div>
    </div>
  );
};

export default WhatWeDo;
