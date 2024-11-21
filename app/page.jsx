import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MeetTheTeam from "@/components/meetTheTeam";
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
        <ContactUs />
        <Footer />
      </main>
    </div>
  );
};
export default Home;
