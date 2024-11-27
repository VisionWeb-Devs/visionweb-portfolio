"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import image from "@/public/assets/delivery_truck.svg";
import image1 from "@/public/assets/package_arived.svg";
import image2 from "@/public/assets/solution.svg";
import image3 from "@/public/assets/team_up.svg";
import WhyUsCard from "./WhyUsCard";

gsap.registerPlugin(ScrollTrigger);

const whyUs = [
  {
    title: "Fast Delivery",
    description:
      "We understand the importance of time. That's why our efficient logistics team ensures that your orders are processed and delivered at lightning speed, meeting your expectations and deadlines without compromise.",
    image: image,
  },
  {
    title: "Quality Products",
    description:
      "Our commitment to excellence drives us to source and deliver only the finest products available in the market. We meticulously test and inspect every item to ensure it meets the highest standards of quality and reliability.",
    image: image1,
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated customer support team is always at your service, day or night. Whether you have a question, concern, or need assistance, we are just a call or message away, ensuring your satisfaction at all times.",
    image: image2,
  },
  {
    title: "Team Work",
    description:
      "Collaboration and teamwork are at the heart of everything we do. Our skilled and passionate team works together seamlessly to bring you the best experience, from product selection to delivery and beyond.",
    image: image3,
  },
];

const MeetTheTeam = () => {
  const component = useRef(null);
  const container = useRef(null);
  const images = useRef(null);
  useEffect(() => {
    ScrollTrigger.matchMedia({
      // Extra-large screens and up (>= 1280px)
      "(min-width: 1280px)": () => {
        const textChildren = Array.from(container.current.children);
        // const imagesChildren = Array.from(images.current.children);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: component.current,
            start: "top top",
            end: "+=3000",
            toggleActions: "play none none none",
            scrub: 2,
            pin: true,
          },
        });

        textChildren.forEach((text, index) => {
          // const image = imagesChildren[index];
          // const previousImage = imagesChildren[index - 1];
          tl.from(
            text,
            {
              y: text.offsetHeight + window.innerHeight / 2,
              duration: 3,
              ease: "power2.out",
            },
            "+=1"
          );
          // if (image) {
          //   if (index !== 0) {
          //     tl.from(
          //       text,
          //       {
          //         y: text.offsetHeight + window.innerHeight / 2,
          //         duration: 3,
          //         ease: "power2.out",
          //       },
          //       "+=1"
          //     ).from(
          //       image,
          //       {
          //         opacity: 0,
          //         duration: 3,
          //         ease: "power2.out",
          //       },
          //       "<"
          //     );
          //   }
          //   if (previousImage) {
          //     tl.to(
          //       previousImage,
          //       {
          //         opacity: 0,
          //         duration: 3,
          //         ease: "power2.out",
          //       },
          //       "<"
          //     ).to(
          //       textChildren[index - 1],
          //       {
          //         opacity: 0,
          //         duration: 3,
          //         ease: "power2.out",
          //       },
          //       "<"
          //     );
          //   }
          // }
        });
      },
    });
    return () => {
      // Cleanup ScrollTriggers on component unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div
      ref={component}
      className="xl:px-44 px-12 xl:py-36 py-20 min-h-screen bg-[#E9E8E7] text-main flex xl:flex-row flex-col xl:justify-center xl:items-center gap-10 xl:gap-24 overflow-y-hidden"
    >
      <div
        ref={images}
        className="flex flex-col justify-center items-center relative w-full xl:w-[1000px] xl:h-[700px]"
      >
        {/* {whyUs.map((item, index) => ( */}
        <img
          key={image.title}
          src={image.src}
          alt={image.alt}
          // `${ index === 0 ? "" : "absolute"}
          className={`bg-white p-2 rounded-xl object-contain`}
        />
        {/* ))} */}
      </div>
      <div
        ref={container}
        className="hidden xl:flex overflow-hidden  flex-col relative"
      >
        {whyUs.map((item, index) => (
          <WhyUsCard
            key={item.title}
            hidden={index === 0}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <div
        ref={container}
        className="xl:hidden overflow-hidden flex flex-col gap-10 relative"
      >
        {whyUs.map((item, index) => (
          <WhyUsCard
            key={item.title}
            absolute={false}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
