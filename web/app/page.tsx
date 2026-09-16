import Tiers from "@/components/Tiers";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MeetTheTeam from "@/components/MeetTheTeam";
import OurProjectsSection from "@/components/OurProjectsSection";
import WhatWeDo from "@/components/WhatWeDo";

const Home = () => {
  return (
    <div>
      <main id="main">
        <Hero />
        <WhatWeDo />
        <OurProjectsSection />
        <MeetTheTeam />
        <div className="bg-ink">
          <Tiers />
          <Footer />
        </div>
      </main>
    </div>
  );
};
export default Home;
