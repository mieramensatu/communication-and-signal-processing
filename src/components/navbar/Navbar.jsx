import React, { useEffect, useState } from "react";
import logo from "../../assets/img/logo (1).png";

function Navbar({ onSelectCategory }) {
  const [active, setActive] = useState("home");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      { threshold: 0.1 }
    );

    section.forEach((sec) => observer.observe(sec));

    return () => {
      section.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

  const handleMemberClick = (category) => {
    onSelectCategory(category);
    handleScrollTo("member");
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
                    <button onClick={() => handleMemberClick("all")}>
                      All Members
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleMemberClick("researcher")}>
                      Researchers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleMemberClick("visiting")}>
                      Visiting Researchers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleMemberClick("internship")}>
                      Internship Students
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleMemberClick("finalyear")}>
                      Final Project
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleMemberClick("mbkm")}>
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
