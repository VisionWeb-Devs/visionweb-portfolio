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
    <footer className="bg-main px-4 xl:px-12 py-12">
      <div className="bg-[#E9E8E7] rounded-3xl uppercase text-main px-4 xl:px-12 xl:py-9 py-6 flex flex-col gap-8 xl:gap-20">
        <div className="flex flex-col xl:items-end ">
          <div
            className={`self-center xl:text-[350px] text-[70px] xl:leading-[300px] font-bold`}
          >
            CONTACT
          </div>
          <div
            className={`${roboto.className}  xl:text-xl tracking-wider xl:text-end`}
          >
            Let&apos;s Connect! Reach out and let the conversation begin. Your{" "}
            <br /> thoughts, questions, and ideas are always welcome
          </div>
        </div>
        <div
          className={`${urbanist.className} xl:text-xl text-lg font-bold flex xl:flex-row flex-col justify-between xl:items-end`}
        >
          <div className="flex xl:flex-row flex-col xl:items-end gap-4 xl:gap-20">
            <ul className="flex flex-col gap-2">
              <a
                href="https://www.instagram.com/visionweb.devs/"
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
              {/* <Link text={"+213799902523"} /> */}
              <a href="https://discord.gg/dgXrgJxdKs" target="_blank">
                <Link text={"Discrod"} />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@visionwebdevs.tech"
                target="_blank"
              >
                <Link text={"contact@visionwebdevs.tech"} />
              </a>
            </ul>
          </div>
          <div className="mt-6 xl:mt-0 flex gap-1">
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
