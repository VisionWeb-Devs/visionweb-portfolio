"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      cursorRef.current,
      {
        scale: 1,
        duration: 0.1,
        ease: "power2.out",
      },
      {
        scale: 0.5,
        duration: 0.1,
        ease: "power2.out",
      }
    );
    document.addEventListener("mousedown", () => {
      tl.play();
    });
    document.addEventListener("mouseup", () => {
      tl.reverse();
    });

    document.addEventListener("mousemove", (e) => {
      gsap.to(cursorRef.current, {
        x: e.x,
        y: e.y,
        duration: 0,
      });
    });

    document.addEventListener("scroll", (e) => {
      gsap.to(cursorRef.current, {
        top: window.scrollY,
        duration: 0.1,
        ease: "power2.out",
      });
    });

    return () => {
      document.removeEventListener("mousemove", () => {});
      document.removeEventListener("mousedown", () => {});
      document.removeEventListener("mouseup", () => {});
      document.removeEventListener("scroll", () => {});
    };
  }, []);
  return (
    <div
      className="absolute w-4 h-4 bg-[#E9E8E7] rounded-full z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-difference hidden xl:block"
      ref={cursorRef}
    ></div>
  );
};

export default Cursor;
