import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faXTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <p>Copyright © 2025 BRIN</p>
        <ul className="social-links">
          <li>
            <a
              href="https://www.youtube.com/c/BadanRisetdanInovasiNasionalBRIN/featured"
              target="_blank"
              rel="noopener noreferrer"
              className="youtube"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </li>
          <li>
            <a
              href="https://x.com/brin_indonesia"
              target="_blank"
              rel="noopener noreferrer"
              className="twitter"
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/brin_indonesia/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/brin.indonesia"
              target="_blank"
              rel="noopener noreferrer"
              className="facebook"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
