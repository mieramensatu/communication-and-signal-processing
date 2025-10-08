import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/img/logo (1).png";

function Navbar({ onSelectCategory, fullWidth = false }) {
  const [active, setActive] = useState("home");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navRef = useRef(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
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

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false);
        setOpenDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
    setOpenDropdown(false);
  };

  const handleCategorySelect = (category) => {
    if (typeof onSelectCategory === "function") {
      onSelectCategory(category);
    }
    handleScrollTo("member");
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} ref={navRef}>
      <div className={fullWidth ? "container-fluid" : "container"}>
        {/* Logo */}
        <div className="logo">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("home");
            }}
          >
            <img src={logo} alt="Logo" />
          </a>
        </div>

        {/* Hamburger Button - Mobile Only */}
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu Items (di tengah) */}
        <div className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
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
              onClick={(e) => {
                if (window.innerWidth <= 768) {
                  e.stopPropagation();
                  setOpenDropdown(!openDropdown);
                }
              }}
              onMouseEnter={() =>
                window.innerWidth > 768 && setOpenDropdown(true)
              }
              onMouseLeave={() =>
                window.innerWidth > 768 && setOpenDropdown(false)
              }
            >
              <button className={active === "member" ? "active" : ""}>
                Member ▾
              </button>
              {(openDropdown || isMenuOpen) && (
                <ul className="dropdown-menu">
                  <li>
                    <button onClick={() => handleCategorySelect("all")}>
                      All Members
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCategorySelect("researcher")}>
                      Researchers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCategorySelect("visiting")}>
                      Visiting Researchers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCategorySelect("internship")}>
                      Internship Students
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCategorySelect("finalyear")}>
                      Final Project
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCategorySelect("mbkm")}>
                      MBKM
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Contact Us Button (di kanan) */}
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
