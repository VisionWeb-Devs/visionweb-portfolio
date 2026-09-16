import Tiers from "@/components/Tiers";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MeetTheTeam from "@/components/MeetTheTeam";
import OurProjectsSection from "@/components/OurProjectsSection";
import WhatWeDo from "@/components/WhatWeDo";
import Process from "@/components/Process";
import Faq from "@/components/Faq";

const Home = () => {
  return (
    <div>
      <main id="main">
        <Hero />
        <WhatWeDo />
        <OurProjectsSection />
        <MeetTheTeam />
        <Process />
        <div className="bg-ink">
          <Tiers />
          <Faq />
          <Footer />
        </div>
      </main>
    </div>
  );
};
export default Home;
