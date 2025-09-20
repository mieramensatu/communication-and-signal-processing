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
  const [selectedCategory, setSelectedCategory] = useState("researcher");
  return (
    <div>
      <Navbar onSelectCategory={setSelectedCategory} />
      <Hero />
      <Partner />
      <About />
      <Activities />
      <Reset />
      <Member category={selectedCategory} />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
