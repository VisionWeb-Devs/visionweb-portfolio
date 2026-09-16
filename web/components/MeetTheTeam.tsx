"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import deliveryTruck from "@/public/assets/delivery_truck.svg";
import packageArrived from "@/public/assets/package_arived.svg";
import solution from "@/public/assets/solution.svg";
import teamUp from "@/public/assets/team_up.svg";
import WhyUsCard from "./WhyUsCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { WhyUsItem } from "@/types/content";

/**
 * NOTE: this copy is e-commerce/logistics placeholder text that was never
 * replaced — it describes order fulfilment, not web development. It is left
 * verbatim here so the rewrite is a content decision rather than a silent one.
 */
const whyUs: WhyUsItem[] = [
  {
    title: "Fast Delivery",
    description:
      "We understand the importance of time. That's why our efficient logistics team ensures that your orders are processed and delivered at lightning speed, meeting your expectations and deadlines without compromise.",
    image: deliveryTruck,
  },
  {
    title: "Quality Products",
    description:
      "Our commitment to excellence drives us to source and deliver only the finest products available in the market. We meticulously test and inspect every item to ensure it meets the highest standards of quality and reliability.",
    image: packageArrived,
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated customer support team is always at your service, day or night. Whether you have a question, concern, or need assistance, we are just a call or message away, ensuring your satisfaction at all times.",
    image: solution,
  },
  {
    title: "Team Work",
    description:
      "Collaboration and teamwork are at the heart of everything we do. Our skilled and passionate team works together seamlessly to bring you the best experience, from product selection to delivery and beyond.",
    image: teamUp,
  },
];

type StackedCardProps = {
  item: WhyUsItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

const StackedCard = ({ item, index, total, progress }: StackedCardProps) => {
  const slot = 1 / total;
  const start = index * slot;
  const end = start + slot * 0.7;

  const y = useTransform(progress, [start, end], ["70%", "0%"]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div
      style={index === 0 ? undefined : { y, opacity }}
      className={index === 0 ? "" : "absolute inset-0"}
    >
      <WhyUsCard title={item.title} description={item.description} />
    </motion.div>
  );
};

const MeetTheTeam = () => {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const section = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  const pinned = isDesktop && !reduceMotion;

  const illustration = (
    <div className="flex flex-col justify-center items-center relative w-full xl:w-[1000px] xl:h-[700px]">
      {/* Decorative: the illustration carries no information the adjacent cards
          do not already state, so it is hidden from assistive tech. */}
      <Image
        src={deliveryTruck}
        alt=""
        className="bg-white p-2 rounded-xl object-contain"
      />
    </div>
  );

  // Below xl, or with reduced motion, the cards are simply a stacked list.
  // The previous version rendered the whole list twice — once in a `hidden
  // xl:flex` block and again in an `xl:hidden` block — so every description
  // appeared twice in the DOM for crawlers and screen readers.
  if (!pinned) {
    return (
      <section id="why-us" data-nav-theme="light" className="xl:px-44 px-12 xl:py-36 py-20 min-h-screen bg-paper text-ink flex xl:flex-row flex-col xl:justify-center xl:items-center gap-10 xl:gap-24">
        {illustration}
        <div className="flex flex-col gap-10">
          {whyUs.map((item) => (
            <WhyUsCard
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="why-us"
      ref={section}
      data-nav-theme="light"
      className="relative h-[400vh] bg-paper"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="xl:px-44 px-12 h-full bg-paper text-ink flex xl:flex-row flex-col xl:justify-center xl:items-center gap-10 xl:gap-24">
          {illustration}
          <div className="relative flex flex-col w-full max-w-[700px]">
            {whyUs.map((item, index) => (
              <StackedCard
                key={item.title}
                item={item}
                index={index}
                total={whyUs.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
