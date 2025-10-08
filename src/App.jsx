// src/App.jsx
import React, { useState } from "react";
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
  const [memberCategory, setMemberCategory] = useState("researcher");
  const [activeResearcher, setActiveResearcher] = useState("all");

  return (
    <div>
      {/* Teruskan handler ke Navbar */}
      <Navbar onSelectCategory={setMemberCategory} />

      <Hero />
      <Partner />
      <About />
      <Activities
        activeResearcher={activeResearcher}
        onFilterChange={setActiveResearcher}
      />
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
