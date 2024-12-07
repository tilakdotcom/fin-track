import { useMenu } from "@/context/MenuState";
import { NavbarLinks } from "@/data/Links";
import { useAppSelector } from "@/store/reduxHooks";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  const { open, setOpen } = useMenu();
  const user = useAppSelector((state: RootState) => state.user.currentUser);

  return (
    <div
      className={`
    absolute z-50 top-[70px] h-[calc(100%-70px)]  overflow-hidden   w-9/12 bg-gray-800 md:hidden ${
      open ? "right-0" : "-right-0"
    } transition-all duration-500 ease-in-out `}
    >
      {user ? (
        <div className=" space-y-2 mt-5 transition-all duration-500 ease-in-out">
          {NavbarLinks.map((item, index) => (
            <div className="text-center py-2" key={index}>
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
        <div className=" space-y-2 mt-5 transition-all duration-500 ease-in-out">
          {guest.map((item, index) => (
            <div className="text-center  py-2" key={index}>
              <Link
                onClick={() => setOpen(!open)}
                to={item.href}
                className="font-semibold  md:text-xl text-lg hover:text-primary-dark transition-all duration-200 ease-linear "
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const guest = [
  { label: "Login", href: "/login" },
  { label: "Signup", href: "/signup" },
];
