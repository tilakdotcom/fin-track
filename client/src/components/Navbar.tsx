import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary-dark shadow-md h-[70px] flex sm:px-8 px-6 ">
      <nav className="container flex items-center justify-between">
        <div className="">
          <Link to="/" className="text-white font-bold  md:text-4xl text-2xl">
            FinTrack
          </Link>
        </div>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center text-gray-700 focus:outline-none"
        >
          {menuOpen ? (
            <X className="w-10 h-10" />
          ) : (
            <Menu className="w-10 h-10" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
