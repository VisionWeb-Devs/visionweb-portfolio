"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

const projects = [
  {
    name: "Project 1",
    image: "https://via.placeholder.com/750",
    description: "This is a project",
  },
  {
    name: "Project 2",
    image: "https://via.placeholder.com/500x750",
    description: "This is a project",
  },
  {
    name: "Project 3",
    image: "https://via.placeholder.com/500x800",
    description: "This is a project",
  },
  {
    name: "Project 4",
    image: "https://via.placeholder.com/720x1280",
    description: "This is a project",
  },
];

const OurProjects = () => {
  const horizontalContainer = useRef(null);
  const container = useRef(null);
  const arrow = useRef(null);
  const headding = useRef(null);
  const underheadding = useRef(null);
  const paragraph = useRef(null);
  const what = useRef(null);
  const seeourprojects = useRef(null);
  const headdingCursor = useRef(null);
  const underheaddingCursor = useRef(null);
  // useEffect(() => {
  //   gsap.to(horizontalContainer.current, {
  //     xPercent: -100 * (horizontalContainer.current.children.length - 1),
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: horizontalContainer.current,
  //       pin: true,
  //       scrub: 1,
  //       start: "top top",
  //       end: () => `+=${horizontalContainer.current.scrollWidth}`,
  //     },
  //   });
  // }, []);
  useEffect(() => {
    const pin = gsap.fromTo(
      horizontalContainer.current,
      {
        translateX: 0,
      },
      {
        translateX:
          -horizontalContainer.current.scrollWidth + window.innerWidth,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: () => `+=${horizontalContainer.current.scrollWidth - 1000}`,
          scrub: 0.6,
          pin: true,
          snap: {
            snapTo: (value) => {
              const proximityThreshold = 0.07;
              return Math.abs(value) <= proximityThreshold ? 0 : value;
            },
            duration: 0.3,
            ease: "power1.inOut",
          },
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headding.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none none",
      },
    });
    const cursorTween = gsap.fromTo(
      headdingCursor.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      }
    );
    tl.fromTo(
      what.current,
      {
        text: "",
      },
      {
        text: "What?!",
        duration: 1,
      },
      0
    )
      .fromTo(
        seeourprojects.current,
        {
          text: "",
        },
        {
          text: " want to see some of our projects?",
          duration: 4,
        },
        1
      )
      .add(() => {
        cursorTween.kill();
      })
      .to(headdingCursor.current, {
        opacity: 0,
      })
      .fromTo(
        underheaddingCursor.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
        }
      )
      .fromTo(
        underheadding.current,
        {
          text: "",
        },
        {
          text: "Alright here you go",
          duration: 2,
        }
      )
      .fromTo(
        paragraph.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
        }
      )
      .fromTo(
        arrow.current,
        {
          x: 0,
          opacity: 0,
        },
        {
          x: 40,
          ease: "power1.inOut",
          opacity: 1,
          duration: 2,
          repeat: -1,
          repeatDelay: 0.5,
        },
        "-=1"
      );
  }, []);

  return (
    // <div className="overflow-hidden">
    //   <div
    //     ref={horizontalContainer}
    //     className="h-screen w-[200vw] overflow-x-clip flex"
    //   >
    //     <div className="h-screen w-[200vw] bg-main text-[#E9E8E7] flex items-center justify-center">
    //       // What some of our projects? Alright here you go //{" "}
    //     </div>
    //   </div>
    // </div>
    <section className="overflow-hidden bg-main">
      <div ref={container}>
        <div
          ref={horizontalContainer}
          className="overflow-x-hidden w-fit flex relative bg-main"
        >
          {/* <div className="h-screen w-fit bg-main text-[#E9E8E7] flex"> */}
          <div className="relative h-screen w-screen bg-main text-[#E9E8E7] flex flex-col items-center justify-center gap-24 xl:px-36 px-12 py-36">
            <span className="flex flex-col items-center">
              <span ref={headding} className="text-5xl font-semibold">
                <span ref={what}></span>
                <span ref={seeourprojects}></span>
                {/* What?! want to see some of our projects? */}
                <span ref={headdingCursor} className="font-normal">
                  |
                </span>
              </span>
              <span className="text-4xl font-medium">
                <span ref={underheadding}></span>
                {/* Alright here you go */}
                <span ref={underheaddingCursor} className="font-normal">
                  |
                </span>
              </span>
            </span>
            <span ref={paragraph} className="text-xl text-center ">
              Our team have been working hard on these so <br /> no comments pls
            </span>
            <div
              ref={arrow}
              className="absolute xl:right-36 right-12 bottom-24 text-3xl"
            >
              {"->"}
            </div>
          </div>
          {/* <div className="flex items-end gap-[1000px] xl:px-36 px-12 py-36"></div> */}
          {/* </div> */}
          <div className="h-screen w-fit bg-main text-[#E9E8E7] flex items-end gap-[1000px]   xl:px-36 px-12 py-36">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
