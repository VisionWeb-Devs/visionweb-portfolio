import Image from "next/image";
import React from "react";
import website from "@/public/assets/website.svg";
import WhatWeDoPoints from "./WhatWeDoPoints";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";

const WhatWeDo = ({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages["services"];
}) => {
  return (
    <section id="services" data-nav-theme="light" className=" bg-surface text-on-surface xl:px-36 px-12 py-36 flex flex-col xl:flex-row gap-6 xl:gap-0 justify-between items-center">
      <WhatWeDoPoints locale={locale} messages={messages} />
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
