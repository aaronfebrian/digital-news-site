// components/Nav.tsx
import React from "react";
import { navs } from "@/data/data";
import './nav.css'

interface NavProps {
  userRole: string;
}

export default function Nav({ userRole }: NavProps) {
  return (
    <nav id="navbar" className="navbar">
      <ul>
        {navs.map((navItem) => (
          (navItem.name !== 'Create Post' || userRole === 'admin') && (
            <li key={navItem.id}>
              <a className={navItem.active ? "nav-link scrollto active" : "nav-link scrollto"} href={navItem.link}>
                {navItem.name}
              </a>
            </li>
          )
        ))}
      </ul>
    </nav>
  );
}
