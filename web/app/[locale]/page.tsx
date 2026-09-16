import Tiers from "@/components/Tiers";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MeetTheTeam from "@/components/MeetTheTeam";
import OurProjectsSection from "@/components/OurProjectsSection";
import WhatWeDo from "@/components/WhatWeDo";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import { isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n";
import { notFound } from "next/navigation";

const Home = async ({ params }: PageProps<"/[locale]">) => {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const messages = await getMessages(locale);

  return (
    <div>
      <main id="main">
        <Hero messages={messages.hero} />
        <WhatWeDo locale={locale} messages={messages.services} />
        <OurProjectsSection locale={locale} messages={messages.work} />
        <MeetTheTeam />
        <Process locale={locale} messages={messages.process} />
        <div className="bg-ink">
          <Tiers locale={locale} messages={messages.pricing} />
          <Faq locale={locale} messages={messages.faq} />
          <Footer locale={locale} messages={messages} />
        </div>
      </main>
    </div>
  );
};
export default Home;
