import React, { useEffect } from "react";
import polytechnique from "../../assets/img/collaboration/UPHF_logo.png";
import telkom from "../../assets/img/collaboration/telkom.png";
import polban from "../../assets/img/collaboration/polban.png";
import uin from "../../assets/img/collaboration/UIN bandung.png";
import garut from "../../assets/img/collaboration/UniversitasGarut.png";
import upi from "../../assets/img/collaboration/UPI.png";
import nurtanio from "../../assets/img/collaboration/Universitas-Nurtanio-PNG-600x608.png";
import jazan from "../../assets/img/collaboration/jazanUNIV.png";
import everynet from "../../assets/img/collaboration/everynet.png";
import itb from "../../assets/img/collaboration/logo_ITB.png";
import itenas from "../../assets/img/collaboration/itenas.png";

function Partner() {
  useEffect(() => {
    const logoSlide = document.querySelector(
      ".scrolling-logos .logo-container .logo-slide"
    );

    if (logoSlide) {
      const clone = logoSlide.cloneNode(true);
      logoSlide.parentNode.appendChild(clone);
    } else {
      console.error("Element '.logo-slide' not found.");
    }
  }, []);

  return (
    <div className="scrolling-logos">
      <div className="logo-container">
        <div className="logo-slide">
          <img
            src={polytechnique}
            alt="Universite Polytechnique Hauts-de-France"
          />
          <img src={telkom} alt="Telkom" />
          <img src={polban} alt="Polban" />
          <img src={uin} alt="uin" />
          <img src={garut} alt="garut" />
          <img src={upi} alt="upi" />
          <img src={nurtanio} alt="nurtanio" />
          <img src={jazan} alt="jazan" />
          <img src={everynet} alt="everynet" />
          <img src={itb} alt="itb" />
          <img src={itenas} alt="itenas" />
        </div>
      </div>
    </div>
  );
}

export default Partner;
