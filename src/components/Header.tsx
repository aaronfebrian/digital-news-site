import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import "./header.css";
import Nav from "./Nav";
import Sci from "./Sci";
import LogoutButton from "./LogoutButton";

interface User {
  username: string;
  role: string;
}

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State untuk toggle menu

  // Mengambil data pengguna dari sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user") || '{}');
  const isAdmin = user.role === "admin";

  const handleUserClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.classList.toggle("mobile-nav-active");
  };

  return (
    <ProtectedRoute>
      <header id="header" className="header d-flex align-items-center fixed-top">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center">
            <h1>Info.in</h1>
          </a>
          <Nav userRole={isAdmin ? "admin" : "user"} />
          <div className="position-relative">
            <Sci />
            <a className="mx-2 user-icon" onClick={handleUserClick}>
              <span>
                <i className="bi bi-person-circle"></i>
              </span>
            </a>
            {showUserMenu && (
              <div className="user-menu">
                <div className="user-menu-header">
                  <p>{user?.username}</p>
                </div>
                <div className="user-menu-options">
                  <LogoutButton />
                </div>
              </div>
            )}
            {menuOpen ? (
              <i className="bi bi-x mobile-nav-toggle" onClick={handleToggleMenu}></i>
            ) : (
              <i className="bi bi-list mobile-nav-toggle" onClick={handleToggleMenu}></i>
            )}
          </div>
        </div>
      </header>
    </ProtectedRoute>
  );
}
