"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Hero = () => {
  const paragraphRef = useRef(null);
  const visionwebRef = useRef(null);
  const devs = useRef(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline();
    const lines = paragraphRef.current.children;
    gsap.fromTo(
      lines,
      { y: "50%", clipPath: "inset( 0 0 100% 0)" },
      {
        y: "0%",
        clipPath: "inset(0 0 0% 0)",
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.2,
      }
    );
    tl.from(visionwebRef.current, {
      opacity: 0,
      delay: 0.2,
      duration: 1.5,
      ease: "elastic.in",
    })
      .fromTo(
        devs.current,

        {
          opacity: 0,
          y: "50%",
        },
        {
          delay: 0.2,
          opacity: 1,
          y: "0%",
          duration: 0.5,
        }
      )
      .fromTo(
        scrollRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
        }
      )
      .fromTo(
        "#header",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
        },
        "-=0.5"
      );
  }, []);
  return (
    <div className="h-screen bg-[#E9E8E7] text-main flex justify-center items-center relative">
      <div className="flex flex-col gap-4 xl:gap-0 items-center font-medium text-sm">
        <p
          ref={paragraphRef}
          className="opacity-85 flex flex-col items-center hover-text"
        >
          <span>This is the vision web deviis</span>
          <span>Hey there</span>
        </p>
        <h1 className="2xl:text-[10rem] md:text-9xl text-5xl leading-[0.85] select-none flex flex-col hover-text">
          <span ref={visionwebRef}>Visionweb</span>
          <span ref={devs}>Devs</span>
        </h1>
      </div>
      <div
        ref={scrollRef}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 font-[400] text-sm xl:text-base"
      >
        SCROLL
      </div>
    </div>
  );
};

export default Hero;
