"use client";
import Button from "@/components/Button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatWeDoPoints = () => {
  const headding = useRef(null);
  const list = useRef(null);
  const smallHeadding = useRef(null);
  const button = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.fromTo(
      smallHeadding.current,
      {
        opacity: 0,
        ease: "none",
        duration: 0.5,
      },
      {
        opacity: 0.65,
        ease: "none",
        duration: 0.5,
        delay: 0.3,
        scrollTrigger: {
          trigger: smallHeadding.current,
          start: "bottom bottom",
          toggleActions: "play none none none",
        },
      }
    );
    gsap.fromTo(
      headding.current,
      {
        y: 40,
        opacity: 0,
        ease: "none",
        duration: 0.3,
      },
      {
        y: 0,
        ease: "power2.out",
        duration: 0.3,
        opacity: 1,
        scrollTrigger: {
          trigger: headding.current,
          start: "bottom bottom",
          toggleActions: "play none none none",
        },
      }
    );
    gsap.fromTo(
      [...list.current.children, button.current],
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.2,
        delay: 0.3,
        scrollTrigger: {
          trigger: list.current,
          start: "bottom bottom",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div className="flex flex-col gap-4 xl:gap-8" id="whatwedo">
      <span>
        <h2 ref={smallHeadding} className="xl:text-lg font-semibold opacity-65">
          What we do
        </h2>
        <h1
          ref={headding}
          className="xl:text-5xl text-2xl font-semibold leading-tight"
        >
          Want to take your buisness <br /> to the next level?
        </h1>
      </span>
      <ul ref={list} className="list-disc list-inside">
        <li>
          We are a team of developers and designers who can help you achieve
          your goals.
        </li>
        <li>
          We specialize in creating websites and web applications that are
          tailored to your needs.
        </li>
        <li>
          Whether you need a simple website or a complex web application, we can
          help you.
        </li>
        <li>
          We have experience working with clients from a variety of industries
          and can help you achieve your goals.
        </li>
      </ul>
      <div ref={button}>
        <Button text={`Our team`} />
      </div>
    </div>
  );
};

export default WhatWeDoPoints;
