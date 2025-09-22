import React, { useEffect, useState } from "react";
import logo from "../../assets/img/logo (1).png";

function Navbar({ onSelectCategory }) {
  const [active, setActive] = useState("home");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false); // ⬅️ tambahan

  useEffect(() => {
    const section = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    section.forEach((sec) => observer.observe(sec));

    return () => {
      section.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpenDropdown(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="List">
          <ul className="list-item">
            <li>
              <button
                onClick={() => handleScrollTo("home")}
                className={active === "home" ? "active" : ""}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScrollTo("activities")}
                className={active === "activities" ? "active" : ""}
              >
                Activity
              </button>
            </li>
            <li
              className="dropdown"
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <button className={active.includes("member") ? "active" : ""}>
                Member ▾
              </button>
              {openDropdown && (
                <ul className="dropdown-menu">
                  <li>
                    <button onClick={() => onSelectCategory("all")}>
                      All Members
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onSelectCategory("researcher")}>
                      Researchers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onSelectCategory("visiting")}>
                      Visiting Researchers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onSelectCategory("internship")}>
                      Internship Students
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onSelectCategory("finalyear")}>
                      Final Project
                    </button>
                  </li>
                  <li>
                    <button onClick={() => onSelectCategory("mbkm")}>
                      MBKM
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <button
          onClick={() => handleScrollTo("contact")}
          className="button-contact"
        >
          Contact Us
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
