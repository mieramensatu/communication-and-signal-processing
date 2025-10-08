import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo (1).png";

function Navbar({ onSelectCategory, fullWidth = false }) {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navRef = useRef(null);

  useEffect(() => {
    if (window.location.pathname !== "/") return;

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
  }, []);

  // Efek saat scroll (untuk navbar scrolled style)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup dropdown & mobile menu saat klik di luar
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

  // Scroll ke section (hanya berlaku di halaman utama)
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
    setOpenDropdown(false);
  };

  // Pilih kategori member dan scroll ke section "member" (hanya di halaman utama)
  const handleCategorySelect = (category) => {
    if (typeof onSelectCategory === "function") {
      onSelectCategory(category);
    }
    // Hanya scroll jika di halaman utama
    if (window.location.pathname === "/") {
      handleScrollTo("member");
    } else {
      // Jika di luar halaman utama, arahkan ke /#member
      navigate("/#member");
      // Opsional: tambahkan logika scroll setelah load jika diperlukan
    }
  };

  // Toggle mobile menu
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  // ✅ Handle klik logo: scroll atau navigasi tergantung halaman
  const handleLogoClick = (e) => {
    e.preventDefault();

    if (window.location.pathname === "/") {
      // Di halaman utama → scroll ke home
      handleScrollTo("home");
    } else {
      // Di halaman lain → navigasi ke beranda
      navigate("/");
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} ref={navRef}>
      <div className={fullWidth ? "container-fluid" : "container"}>
        {/* Logo */}
        <div className="logo">
          <a href="/" onClick={handleLogoClick}>
            <img src={logo} alt="Logo" />
          </a>
        </div>

        {/* Hamburger untuk mobile */}
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menu navigasi */}
        <div className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
          <ul className="list-item">
            <li>
              <button
                onClick={() => {
                  if (window.location.pathname === "/") {
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
                  if (window.location.pathname === "/") {
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

        {/* Tombol Contact Us */}
        <button
          onClick={() => {
            if (window.location.pathname === "/") {
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
