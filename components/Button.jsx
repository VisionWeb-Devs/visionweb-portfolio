"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Button = ({ text }) => {
  const button = useRef(null);
  const arrow = useRef(null);
  const topText = useRef(null);
  const bottomText = useRef(null);

  useEffect(() => {
    // gsap.set(bottomText.current, { top: button.current.clientHeight });
    const tl = gsap.timeline({ paused: true });
    tl.to(
      topText.current,

      {
        y: -button.current.clientHeight,
        duration: 0.1,
        ease: "power2.out",
      }
    );
    tl.to(
      bottomText.current,
      {
        top:
          (button.current.clientHeight - bottomText.current.clientHeight) / 2,
        duration: 0.1,
        ease: "power2.out",
      },
      0.1
    ).to(
      button.current,
      {
        color: "#000",
        backgroundColor: "#121212",
        backgroundPosition: "0 100%",
        duration: 0.1,
        ease: "power2.out",
      },
      0.1
    );
    tl.to(
      arrow.current,
      {
        rotate: 360,
        color: "#ffffff",
        duration: 0.3,
        ease: "power2.out",
      },
      0
    ).to(arrow.current, {
      x: 5,
      scale: 1.1,
      duration: 0.1,
      ease: "power2.out",
    });

    button.current.addEventListener("mouseover", () => {
      tl.play();
    });
    button.current.addEventListener("mouseout", () => {
      tl.reverse();
    });
  }, []);
  return (
    <button
      ref={button}
      className="border-2 border-main  font-semibold px-8 py-2 rounded-md w-fit flex overflow-hidden relative select-none"
    >
      <span ref={topText} className="text-main block">
        {text}
      </span>
      <span ref={bottomText} className="text-white absolute top-[100%]">
        {text}
      </span>
      <span ref={arrow} className="text-main ml-1">
        {" ->"}
      </span>
    </button>
  );
};

export default Button;
