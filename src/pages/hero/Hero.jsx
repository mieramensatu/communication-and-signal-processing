import React from "react";

function Hero() {
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
          <a href="#member" className="btn">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
