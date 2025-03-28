import React from "react";
import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer-main">
      © {year} | Developed by <strong>Turja Talukder</strong>
    </footer>
  );
};

export default Footer;
