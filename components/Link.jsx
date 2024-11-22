"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Link = ({ text }) => {
  const link = useRef(null);
  const topText = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      topText.current,
      {
        y: 0,
      },
      {
        y: -(link.current.clientHeight + topText.current.clientHeight) / 2,
        duration: 0.15,
        ease: "power2.out",
      }
    ).fromTo(
      topText.current,
      {
        y: (link.current.clientHeight + topText.current.clientHeight) / 2,
      },
      {
        y: 0,
        duration: 0.15,
        ease: "power2.out",
      }
    );
    gsap.set(topText.current, {
      y: 0,
    });
    link.current.addEventListener("mouseover", () => {
      tl.play();
    });
    link.current.addEventListener("mouseout", () => {
      tl.reverse();
    });
    return () => {
      document.removeEventListener("mouseenter", () => {});
      document.removeEventListener("mouseleave", () => {});
    };
  }, []);
  return (
    <div ref={link} className="uppercase overflow-hidden">
      <div ref={topText}>{text}</div>
    </div>
  );
};

export default Link;
