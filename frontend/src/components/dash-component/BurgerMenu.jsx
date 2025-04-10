"use client";

import { useState, useEffect, useRef } from "react";

export default function HamburgerMenu() {
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef(null);

  // Toggle menu when hamburger icon is clicked
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  // Handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle admin link click
  const handleAdminClick = () => {
    setIsActive(false);
    console.log("Admin section clicked");
  };

  return (
    <div ref={menuRef} className={`hamburger-menu ${isActive ? "active" : ""}`}>
      <div className="hamburger-icon" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="menu-items">
        <a href="#" className="menu-item" onClick={handleAdminClick}>
          Admin
        </a>
      </div>
    </div>
  );
}
