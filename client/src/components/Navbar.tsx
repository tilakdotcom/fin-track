import React, { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import { logout } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import api from "@/lib/axiousInstance";

const loginData = [
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
const NavBar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useAppSelector((s) => s.persistedReducer.user);
  const dispatch = useAppDispatch();
  //for error
  const errorToast = () => toast.error("Login Failed");

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await api.post("user/logout");
      if (!res) {
        errorToast();
        throw new Error("Logout Failed");
      }
      toast.success("Logout has been successfully");
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      errorToast();
      return;
    } finally {
      setLoading(false);
    }
  };
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-transparent shadow-md h-[70px] flex sm:px-8 px-6 w-screen">
      <nav className=" container flex items-center justify-between">
        <div className="">
          <Link to="/" className="font-bold font-mono md:text-4xl text-2xl">
            FinTrack
          </Link>
        </div>

        {currentUser ? (
          <div className=" hidden md:flex items-center justify-between gap-x-3.5">
            {loginData.map((item, index) => (
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
        ) : (
          ""
        )}
        {currentUser ? (
          <div className="hidden md:flex items-center justify-between gap-x-3.5">
            <button
              disabled={loading}
              onClick={handleLogout}
              className={`border-[1px] border-transparent hover:border-red-700 py-1 px-2 rounded-full  h-auto flex items-center justify-center gap-x-2 font-extrabold transition-all duration-150 ease-linear ${
                loading ? "cursor-not-allowed bg-gray-600" : ""
              }`}
            >
              Logout <LogOut className="text-red-700 " />
            </button>
            <div className="w-10 h-10 rounded-full bg-primary-dark overflow-hidden flex items-center justify-center ">
              {" "}
              T
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center justify-between gap-x-3.5">
            <>
              <Link
                to="/login"
                className="py-1.5 rounded-full px-5 border-[1px] border-indigo-600 bg-indigo-500 hover:bg-indigo-800 transition duration-300 ease-in-out text-white text-base font-bold"
              >
                Login
              </Link>
              {/* Signup */}
              <Link
                to="/signup"
                className="py-1.5 rounded-full px-5 border-[1px] border-green-600 bg-green-500 hover:bg-green-700 transition duration-300 ease-in-out text-white text-base font-bold"
              >
                Sign up
              </Link>
            </>
          </div>
        )}

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
