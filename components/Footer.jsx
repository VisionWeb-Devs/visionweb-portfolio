import React from "react";
import { Urbanist } from "next/font/google";
import { Roboto } from "next/font/google";
import Link from "@/components/Link";

const urbanist = Urbanist({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});
const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
  display: "swap",
});

const Footer = () => {
  return (
    <footer className="bg-main px-12 py-12">
      <div className="bg-[#E9E8E7] rounded-3xl uppercase text-main px-12 py-9 flex flex-col gap-20">
        <div className="flex flex-col items-end ">
          <div className={` text-[350px] leading-[300px] font-bold`}>
            CONTACT
          </div>
          <div
            className={`${roboto.className}  text-xl tracking-wider text-end`}
          >
            Let's Connect! Reach out and let the conversation begin. Your <br />{" "}
            thoughts, questions, and ideas are always welcome
          </div>
        </div>
        <div
          className={`${urbanist.className} text-xl font-bold flex justify-between items-end`}
        >
          <div className="flex items-end gap-20">
            <ul className="flex flex-col gap-2">
              <a
                href="https://www.instagram.com/visionwebdevs/"
                target="_blank"
              >
                <Link text={"INSTAGRAM"} />
              </a>

              <a
                href="https://www.linkedin.com/company/visionweb-devs/"
                target="_blank"
              >
                <Link text={"LINKEDIN"} />
              </a>
              <a href="https://www.github.com/VisionWeb-Devs" target="_blank">
                <Link text={"GITHUB"} />
              </a>
            </ul>
            <ul className="flex flex-col gap-2">
              {/* <Link text={"setif, Algeria"} /> */}
              <Link text={"+213799902523"} />
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=visionwebdevs@gmail.com"
                target="_blank"
              >
                <Link text={"visionwebdevs@gmail.com"} />
              </a>
            </ul>
          </div>
          <div className="flex gap-1">
            &copy; {new Date().getFullYear()} VisionWeb Devs.
            <a
              href="https://www.visionwebdevs.tech/inspiration"
              target="_blank"
            >
              <Link text="Inspiration" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
