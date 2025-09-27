import React from "react";

function Hero() {
  const handleScroll = () => {
    const memberSection = document.getElementById("member");
    if (memberSection) {
      memberSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-content">
          <h1>Communication and Signal Processing Research Group</h1>
        </div>
        <div className="hero-button">
          <p>
            We focus on pushing the boundaries of Communication and Signal
            Processing. By exploring new techniques in transmitting, receiving,
            and analyzing signals, our research group contributes to building
            smarter and more reliable communication systems.
          </p>
          <button onClick={handleScroll}>
            Our Members
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
