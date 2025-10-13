import React, { useState, useEffect } from "react";
import "./main.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Hero from "./pages/hero/Hero";
import Partner from "./pages/partner/Partner";
import About from "./pages/about/About";
import Activities from "./pages/activities/Activities";
import Reset from "./pages/reset/Reset";
import Contact from "./pages/contact/Contact";
import Member from "./pages/member/Member";

function App() {
  const [memberCategory, setMemberCategory] = useState("Researcher");
  const [activeResearcher, setActiveResearcher] = useState("all");

  useEffect(() => {
    if (activeResearcher !== "all") {
      const activitiesSection = document.getElementById("activities");
      if (activitiesSection) {
        setTimeout(() => {
          activitiesSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 1100);
      }
    }
  }, [activeResearcher]);

  return (
    <div>
      <Navbar onSelectCategory={setMemberCategory} />
      <Hero />
      <Partner />
      <About />
      <Activities activeResearcher={activeResearcher} />
      <Reset />
      <Member
        category={memberCategory}
        onShowResearch={(name) => setActiveResearcher(name)}
      />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
