"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

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
        <Link href="/admin">admin</Link>
      </div>
    </div>
  );
}
