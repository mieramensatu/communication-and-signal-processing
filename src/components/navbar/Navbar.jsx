import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 👈 tambahkan useLocation
import logo from "../../assets/img/logo (1).png";

function Navbar({ onSelectCategory, fullWidth = false }) {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 dapatkan path saat ini
  const [active, setActive] = useState("home");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navRef = useRef(null);

  // 🔹 Efek untuk menentukan active berdasarkan URL
  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/article/")) {
      setActive("activities"); // Highlight "Activity" saat di halaman artikel
    } else if (path === "/") {
      // Biarkan IntersectionObserver mengatur active (lihat useEffect berikutnya)
      setActive("home");
    } else {
      // Untuk halaman lain (jika ada), default ke home atau sesuaikan
      setActive("home");
    }
  }, [location.pathname]);

  // Intersection Observer hanya untuk halaman utama
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = document.querySelectorAll("section[id]");
    if (sections.length === 0) return;

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
  }, [location.pathname]); // 👈 tambahkan dependency

  // Efek scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Klik di luar
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
    if (location.pathname === "/") {
      handleScrollTo("member");
    } else {
      navigate("/#member");
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      handleScrollTo("home");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} ref={navRef}>
      <div className={fullWidth ? "container-fluid" : "container"}>
        <div className="logo">
          <a href="/" onClick={handleLogoClick}>
            <img src={logo} alt="Logo" />
          </a>
        </div>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
          <ul className="list-item">
            <li>
              <button
                onClick={() => {
                  if (location.pathname === "/") {
                    handleScrollTo("home");
                  } else {
                    navigate("/");
                  }
                }}
                className={active === "home" ? "active" : ""}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  if (location.pathname === "/") {
                    handleScrollTo("activities");
                  } else {
                    navigate("/#activities");
                  }
                }}
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
                    <button onClick={() => handleCategorySelect("Researcher")}>
                      Researchers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCategorySelect("Visiting")}>
                      Visiting Researchers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCategorySelect("Internship")}>
                      Internship Students
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCategorySelect("FinalYear")}>
                      Final Project
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleCategorySelect("MBKM")}>
                      MBKM
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <button
          onClick={() => {
            if (location.pathname === "/") {
              handleScrollTo("contact");
            } else {
              navigate("/#contact");
            }
          }}
          className="button-contact"
        >
          Contact Us
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
