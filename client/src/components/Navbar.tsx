import React, { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { Link } from "react-router";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navData = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Expense",
      href: "/expense",
    },
    {
      label: "Income",
      href: "/income",
    },
  ];
  return (
    <header className="bg-transparent shadow-md h-[70px] flex sm:px-8 px-6 w-screen">
      <nav className="container flex items-center justify-between">
        <div className="">
          <Link to="/" className="font-bold font-mono md:text-4xl text-2xl">
            FinTrack
          </Link>
        </div>
        <div className=" hidden md:flex items-center justify-between gap-x-3.5">
          {navData.map((item, index) => (
            <div key={index} className="">
              <Link
                to={item.href}
                className="font-semibold  md:text-xl text-lg hover:text-primary-dark transition-all duration-200 ease-linear "
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-between gap-x-3.5">
        <button className=" h-auto flex items-center justify-center gap-x-2 font-extrabold">
            Logout <LogOut className="text-red-700 " />
          </button>
          <div className="w-10 h-10 rounded-full bg-primary-dark overflow-hidden flex items-center justify-center ">
            {" "}
            T
          </div>

    
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
