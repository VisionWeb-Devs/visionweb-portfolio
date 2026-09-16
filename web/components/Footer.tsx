import React from "react";
import { Urbanist } from "next/font/google";
import { Roboto } from "next/font/google";
import Link from "@/components/Link";
import ContactForm from "./ContactForm";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n";
import { site } from "@/lib/site";
import NextLink from "next/link";

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

const Footer = ({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) => {
  return (
    <footer id="contact" className="bg-ink px-4 xl:px-12 py-12">
      <div className="bg-paper rounded-3xl uppercase text-ink px-4 xl:px-12 xl:py-9 py-6 flex flex-col gap-8 xl:gap-20">
        <div className="flex flex-col xl:items-end ">
          <div
            className={`self-center xl:text-[350px] text-[70px] xl:leading-[300px] font-bold`}
          >
            {messages.contact.heading}
          </div>
          <div
            className={`${roboto.className}  xl:text-xl tracking-wider xl:text-end`}
          >
            {messages.contact.intro}
          </div>
        </div>
        <div className="max-w-3xl w-full self-center">
          <ContactForm messages={messages.contact} locale={locale} />
        </div>
        <div
          className={`${urbanist.className} xl:text-xl text-lg font-bold flex xl:flex-row flex-col justify-between xl:items-end`}
        >
          <div className="flex xl:flex-row flex-col xl:items-end gap-4 xl:gap-20">
            <ul className="flex flex-col gap-2">
              <a
                href="https://www.instagram.com/visionweb.devs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link text={"INSTAGRAM"} />
              </a>

              <a
                href="https://www.linkedin.com/company/visionweb-devs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link text={"LINKEDIN"} />
              </a>
              <a href="https://www.github.com/VisionWeb-Devs" target="_blank"
                rel="noopener noreferrer">
                <Link text={"GITHUB"} />
              </a>
            </ul>
            <ul className="flex flex-col gap-2">
              {/* <Link text={"setif, Algeria"} /> */}
              {/* <Link text={"+213799902523"} /> */}
              <a
                href={site.social.discord}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link text={"Discord"} />
              </a>
              <a href={`tel:${site.contact.phoneE164}`}>
                <Link text={site.contact.phone} />
              </a>
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link text={"WhatsApp"} />
              </a>
              <a href={`mailto:${site.contact.email}`}>
                <Link text={site.contact.email} />
              </a>
            </ul>
          </div>
          <div className="mt-6 xl:mt-0 flex flex-wrap items-end gap-x-4 gap-y-1">
            <NextLink href={`/${locale}/privacy`}>
              <Link text={messages.footer.privacy} />
            </NextLink>
            <NextLink href={`/${locale}/terms`}>
              <Link text={messages.footer.terms} />
            </NextLink>
            &copy; {new Date().getFullYear()} VisionWeb Devs.
            <a
              href="https://www.visionwebdevs.tech/inspiration"
              target="_blank"
                rel="noopener noreferrer"
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
