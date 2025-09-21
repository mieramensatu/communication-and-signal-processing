import React, { useEffect, useState } from "react";
import logo from "../../assets/img/logo (1).png";

function Navbar({ onSelectCategory }) {
  const [active, setActive] = useState("home");
  const [openDropdown, setOpenDropdown] = useState(false);

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
      { threshold: [0.2, 0.1, 0.2, 0.3] }
    );

    section.forEach((sec) => observer.observe(sec));

    console.log("active:", active);

    return () => {
      section.forEach((sec) => observer.unobserve(sec));
    };
  }, [active]);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (id === "member") {
      onSelectCategory("all");
      setActive("member");
    }
    setOpenDropdown(false);
  };

  const handleSelectCategory = (category) => {
    onSelectCategory(category);
    setActive("member");
    setOpenDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="List">
          <ul className="list-item">
            <li>
              <button
                onClick={() => handleScroll("home")}
                className={active === "home" ? "active" : ""}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleScroll("activities")}
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
                    <button onClick={() => handleSelectCategory("all")}>
                      All Members
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleSelectCategory("researcher")}>
                      Researchers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleSelectCategory("visiting")}>
                      Visiting Researchers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleSelectCategory("internship")}>
                      Internship Students
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleSelectCategory("finalyear")}>
                      Final Project
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleSelectCategory("mbkm")}>
                      MBKM
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <button
          onClick={() => handleScroll("contact")}
          className="button-contact"
        >
          Contact Us
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
