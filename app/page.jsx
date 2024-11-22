import Tiers from "@/components/Tiers";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MeetTheTeam from "@/components/MeetTheTeam";
import OurProjects from "@/components/OurProjects";
import WhatWeDo from "@/components/WhatWeDo";

const Home = () => {
  return (
    <div>
      <main>
        <Hero />
        <WhatWeDo />
        <OurProjects />
        <MeetTheTeam />
        <Tiers />
        <Footer />
      </main>
    </div>
  );
};
export default Home;
